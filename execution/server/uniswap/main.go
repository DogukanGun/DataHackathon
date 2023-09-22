package uniswap

import (
	"errors"
	"execution/uniswap/erc20"
	"execution/uniswap/factoryV3"
	uniswapPoolV3 "execution/uniswap/poolV3"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"math"
	"math/big"
	"strings"
)

func UniswapV3PriceOracle(tokenAddress string, baseToken string, feeArr []int64, client *ethclient.Client) (price float64, selectedFee int64, tokenDecimal uint8, err error) {

	// Initialize the factory instance
	v3Factory, err := factoryV3.NewUniswapFactoryV3(common.HexToAddress("0x1F98431c8aD98523631AE4a59f267346ea31F984"),
		client)

	if err != nil {
		return
	}

	// Get the corresponding pool
	poolAddress := common.HexToAddress("0x0000000000000000000000000000000000000000")
	previousLiq := big.NewInt(0)
	currentAddress := common.HexToAddress("0x0000000000000000000000000000000000000000")
	v3Pool := &uniswapPoolV3.UniswapPoolV3Caller{}
	selectedFee = 0

	// Pick the pool with the higest liquidity
	for _, fee := range feeArr {
		currentLiq := big.NewInt(0)

		currentAddress, err = v3Factory.GetPool(nil, common.HexToAddress(tokenAddress), common.HexToAddress(baseToken),
			big.NewInt(fee))

		if currentAddress.Hex() == "0x0000000000000000000000000000000000000000" {
			continue
		}

		// Initialzie the V3Pool Instance
		v3Pool, err = uniswapPoolV3.NewUniswapPoolV3Caller(currentAddress, client)

		if err != nil {
			continue
		}

		currentLiq, err = v3Pool.Liquidity(nil)

		if err != nil {
			continue
		}

		if 1 == currentLiq.Cmp(previousLiq) {
			previousLiq.Set(currentLiq)
			poolAddress.SetBytes(currentAddress.Bytes())
			selectedFee = fee
		}

	}

	if poolAddress.Hex() == "0x0000000000000000000000000000000000000000" {
		err = errors.New("no pool found for the corresponding token pair")
		return
	}

	// Re-initialzie the V3Pool Instance
	v3Pool, err = uniswapPoolV3.NewUniswapPoolV3Caller(poolAddress, client)

	if err != nil {
		return
	}

	token0Address, err := v3Pool.Token0(nil)

	if err != nil {
		return
	}

	token1Address, err := v3Pool.Token1(nil)

	if err != nil {
		return
	}

	preliminaryResult := float64(0)

	// If we want to calculate average price over a period of time

	currentSlot, err := v3Pool.Slot0(nil)

	if err != nil {
		return
	}

	// Uniswap stores the spot price in a variable that is equal to sqrt(price*(2**96))
	x96AsBigFloat := big.NewFloat(0).SetInt(currentSlot.SqrtPriceX96)
	x96Multiplied, _ := x96AsBigFloat.Quo(x96AsBigFloat, big.NewFloat(math.Pow(2, 96))).Float64()
	preliminaryResult = math.Pow(x96Multiplied, 2)

	// Normalize according to their decimals
	token0instance, err := erc20.NewErc20Caller(token0Address, client)

	if err != nil {
		return
	}

	token1instance, err := erc20.NewErc20Caller(token1Address, client)

	if err != nil {
		return
	}

	token0decimals, err := token0instance.Decimals(nil)

	if err != nil {
		return
	}

	token1decimals, err := token1instance.Decimals(nil)
	tokenDecimal = token1decimals

	if err != nil {
		return
	}

	decimalDiff := float64(int64(token0decimals) - int64(token1decimals))
	multiplier := math.Pow(10, -1*decimalDiff)

	//Preliminary result is (1)TOKEN0 / (1)TOKEN1 thus wee need to determine what is our TOKEN0 and TOKEN1
	if strings.ToLower(token1Address.String()) != strings.ToLower(tokenAddress) {
		preliminaryResult = 1 / preliminaryResult
		multiplier = math.Pow(10, decimalDiff)
		tokenDecimal = token0decimals
	}

	// Finalize the result
	price = (1 / preliminaryResult) * multiplier
	return

}
