package oracle

import "strings"

var REDSTONE_PRICE_FEEDS = map[string]string{

	// WBTC
	strings.ToLower("0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"): strings.ToUpper("BTC"),
	// WETH
	strings.ToLower("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"): strings.ToUpper("ETH"),
	//USDT
	strings.ToLower("0xdac17f958d2ee523a2206206994597c13d831ec7"): strings.ToUpper("USDT"),
	//WBNB
	strings.ToLower("0x418D75f65a02b3D53B2418FB8E1fe493759c7605"): strings.ToUpper("BNB"),
	//USDC
	strings.ToLower("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"): strings.ToUpper("USDC"),
	//WSOL
	strings.ToLower("0xD31a59c85aE9D8edEFeC411D448f90841571b89c"): strings.ToUpper("SOL"),
	//DAI
	strings.ToLower("0x6b175474e89094c44da98b954eedeac495271d0f"): strings.ToUpper("DAI"),
	//MATIC
	strings.ToLower("0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"): strings.ToUpper("MATIC"),
	// TON
	strings.ToLower("0x582d872a1b094fc48f5de31d3b73f2d9be47def1"): strings.ToUpper("TON"),
	// LEO
	strings.ToLower("0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"): strings.ToUpper("LEO"),
	// LINK
	strings.ToLower("0x514910771af9ca656af840dff83e8264ecf986ca"): strings.ToUpper("LINK"),
	// TUSD
	strings.ToLower("0x0000000000085d4780B73119b644AE5ecd22b376"): strings.ToUpper("TUSD"),
	// UNI
	strings.ToLower("0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"): strings.ToUpper("UNI"),
	// OKB
	strings.ToLower("0x75231f58b43240c9718dd58b4967c5114342a86c"): strings.ToUpper("OKB"),
	//HBAR
	strings.ToLower("0x435FC409F14b2500A1E24C20516250Ad89341627"): strings.ToUpper("HBAR"),
	// MNT
	strings.ToLower("0x3c3a81e81dc49a522a592e7622a7e711c06bf354"): strings.ToUpper("MNT"),
	// CRO
	strings.ToLower("0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"): strings.ToUpper("CRO"),
	// QNT
	strings.ToLower("0x4a220e6096b25eadb88358cb44068a3248254675"): strings.ToUpper("QNT"),
	// MKR
	strings.ToLower("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"): strings.ToUpper("MKR"),
	// NEAR
	strings.ToLower("0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4"): strings.ToUpper("NEAR"),
	//GRT
	strings.ToLower("0xc944e90c64b2c07662a292be6244bdf05cda44a7"): strings.ToUpper("GRT"),
	// AAVE
	strings.ToLower("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"): strings.ToUpper("AAVE"),
	//AXS
	strings.ToLower("0xbb0e17ef65f82ab018d8edd776e8dd940327b28b"): strings.ToUpper("AXS"),
	//SAND
	strings.ToLower("0x3845badAde8e6dFF049820680d1F14bD3903a5d0"): strings.ToUpper("SAND"),
	// THETA
	strings.ToLower("0x3883f5e181fccaF8410FA61e12b59BAd963fb645"): strings.ToUpper("THETA"),
	// INJ
	strings.ToLower("0xe28b3b32b6c345a34ff64674606124dd5aceca30"): strings.ToUpper("INJ"),
	// MANA
	strings.ToLower("0x0f5d2fb29fb7d3cfee444a200298f468908cc942"): strings.ToUpper("MANA"),
	//FTM
	strings.ToLower("0x4e15361fd6b4bb609fa63c81a2be19d873717870"): strings.ToUpper("FTM"),
	//SNX
	strings.ToLower("0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"): strings.ToUpper("SNX"),
	//RNDR
	strings.ToLower("0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"): strings.ToUpper("RNDR"),
	//KAVA
	strings.ToLower("0x0C356B7fD36a5357E5A017EF11887ba100C9AB76"): strings.ToUpper("KAVA"),
	//PAXG
	strings.ToLower("0x45804880de22913dafe09f4980848ece6ecbaf78"): strings.ToUpper("PAXG"),
	//XAUt
	strings.ToLower("0x68749665FF8D2d112Fa859AA293F07A622782F38"): strings.ToUpper("XAUT"),
	//FLOW
	strings.ToLower("0x5c147e74D63B1D31AA3Fd78Eb229B65161983B2b"): strings.ToUpper("FLOW"),
	//CHZ
	strings.ToLower("0x3506424f91fd33084466f402d5d97f05f8e3b4af"): strings.ToUpper("CHZ"),
	//FXS
	strings.ToLower("0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0"): strings.ToUpper("FXS"),
	//HT
	strings.ToLower("0x6f259637dcd74c767781e37bc6133cd6a68aa161"): strings.ToUpper("HT"),
	//COMP
	strings.ToLower("0xc00e94cb662c3520282e6f5717214004a7f26888"): strings.ToUpper("COMP"),
	//NEXO
	strings.ToLower("0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206"): strings.ToUpper("NEXO"),
	//NFT
	strings.ToLower("0x198d14f2ad9ce69e76ea330b374de4957c3f850a"): strings.ToUpper("NFT"),
	//WOO
	strings.ToLower("0x4691937a7508860f876c9c0a2a617e7d9e945d4b"): strings.ToUpper("WOO"),
	//MX
	strings.ToLower("0x11eef04c884e24d9b7b4760e7476d06ddf797f36"): strings.ToUpper("MX"),
	//CAKE
	strings.ToLower("0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898"): strings.ToUpper("CAKE"),
	// GNO
	strings.ToLower("0x6810e776880c02933d47db1b9fc05908e5386b96"): strings.ToUpper("GNO"),
	// BAT
	strings.ToLower("0x0d8775f648430679a709e98d2b0cb6250d2887ef"): strings.ToUpper("BAT"),
	//1INCH
	strings.ToLower("0x111111111117dc0aa78b770fa6a738034120c302"): strings.ToUpper("1INCH"),
	// CRV
	strings.ToLower("0xD533a949740bb3306d119CC777fa900bA034cd52"): strings.ToUpper("CRV"),
	//ENJ
	strings.ToLower("0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c"): strings.ToUpper("ENJ"),
	//MASK
	strings.ToLower("0x69af81e73a73b40adf4f3d4223cd9b1ece623074"): strings.ToUpper("MASK"),
	// ANKR
	strings.ToLower("0x8290333cef9e6d528dd5618fb97a76f268f3edd4"): strings.ToUpper("ANKR"),
}

type RedStonePricePayload []struct {
	ID               string  `json:"id"`
	Symbol           string  `json:"symbol"`
	Provider         string  `json:"provider"`
	Value            float64 `json:"value"`
	LiteEvmSignature string  `json:"liteEvmSignature"`
	PermawebTx       string  `json:"permawebTx"`
	Version          string  `json:"version"`
	Source           struct {
		Ascendex      float64 `json:"ascendex"`
		Band          float64 `json:"band"`
		Bequant       float64 `json:"bequant"`
		Binance       float64 `json:"binance"`
		Binancecoinm  float64 `json:"binancecoinm"`
		Binanceus     float64 `json:"binanceus"`
		Binanceusdm   float64 `json:"binanceusdm"`
		Bitcoincom    float64 `json:"bitcoincom"`
		Bitfinex2     float64 `json:"bitfinex2"`
		Bittrex       float64 `json:"bittrex"`
		Btcturk       float64 `json:"btcturk"`
		Cex           float64 `json:"cex"`
		Coinbaseprime float64 `json:"coinbaseprime"`
		Coinbasepro   float64 `json:"coinbasepro"`
		Coingecko     float64 `json:"coingecko"`
		Currencycom   float64 `json:"currencycom"`
		Hitbtc        float64 `json:"hitbtc"`
		Hollaex       float64 `json:"hollaex"`
		Huobipro      float64 `json:"huobipro"`
		Kaiko         float64 `json:"kaiko"`
		KaikoV2       float64 `json:"kaiko-v2"`
		Kraken        float64 `json:"kraken"`
		Kucoin        float64 `json:"kucoin"`
		Lbank         float64 `json:"lbank"`
		Oceanex       float64 `json:"oceanex"`
		Okx           float64 `json:"okx"`
		Poloniex      float64 `json:"poloniex"`
		Probit        float64 `json:"probit"`
	} `json:"source"`
	Timestamp         int64  `json:"timestamp"`
	Minutes           int    `json:"minutes"`
	ProviderPublicKey string `json:"providerPublicKey"`
}
