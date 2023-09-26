package oracle

import (
	"encoding/json"
	"errors"
	"execution/uniswap/erc20"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"io"
	"net/http"
)

type PriceOracleResponse struct {
	Price            float64
	TokenDecimal     uint8
	OracleIdentifier string
	ExtraData        string
	Error            error
}

func RedStonePriceOracle(tokenAddress string, client *ethclient.Client, channel chan PriceOracleResponse) (response PriceOracleResponse) {
	// If the channel is closed the golang will panic while trying to send a value to that channel
	// but in this case the inner workings of the library is designed for this situation thus we need to handle the
	// panic
	defer panicHandler(response)

	// Initialize the result object
	response = PriceOracleResponse{
		Price:            0,
		TokenDecimal:     0,
		OracleIdentifier: "RedStone",
		ExtraData:        "",
		Error:            nil,
	}

	// Get the ERC20 token's decimal
	erc20Instance, err := erc20.NewErc20Caller(common.HexToAddress(tokenAddress), client)
	if err != nil {
		response.Error = err
		channel <- response
		return
	}

	response.TokenDecimal, response.Error = erc20Instance.Decimals(nil)

	if response.Error != nil {
		channel <- response
		return
	}

	// Get token abbreviation
	tokenAbb := REDSTONE_PRICE_FEEDS[tokenAddress]
	baseURL := "https://api.redstone.finance/prices/?symbol=" + tokenAbb + "&provider=redstone"

	resp, err := http.Get(baseURL)

	if err != nil {
		response.Error = err
		channel <- response
		return
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		response.Error = err
		channel <- response
		return
	}

	var redStonePriceObject RedStonePricePayload
	err = json.Unmarshal(body, &redStonePriceObject)

	if err != nil {
		response.Error = err
		channel <- response
		return
	}

	if len(redStonePriceObject) == 0 {
		response.Error = errors.New("redstone returned empty response for the given token")
		channel <- response
		return
	}

	response.Price = redStonePriceObject[0].Value
	channel <- response

	return
}

/*
panicHandler closing a channel on the receiver side will cause panic. This function handles this
*/
func panicHandler(input PriceOracleResponse) (output PriceOracleResponse) {
	input = output
	if r := recover(); r != nil {
		return
	}
	return
}
