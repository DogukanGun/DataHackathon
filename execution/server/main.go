package main

import (
	"execution/uniswap"
	"fmt"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {

	if len(os.Args) < 3 {
		fmt.Println("Please provide at least two arguments.")
		return
	}

	// Access the first and second arguments.
	token0 := os.Getenv("token0")
	token1 := os.Getenv("token1")
	envNames := []string{"ETH_URL"}
	status, _, envMap := InitializeENV(envNames, ".env")
	if !status {
		fmt.Println("Error in env")
		os.Exit(1)
	}
	client, err := ethclient.Dial(envMap["ETH_URL"])

	if err != nil {
		fmt.Println(fmt.Sprintf("Error in client connection: %s", err))
		os.Exit(1)
	}
	price, _, _, err := uniswap.UniswapV3PriceOracle(token0, token1, []int64{500, 3000, 5000}, client)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error in price calculation: %s", err))
		os.Exit(1)
	}
	fmt.Println(price)
}

// Function to initialize the variables
func InitializeENV(varNames []string, envFileName string) (bool, string, map[string]string) {
	//Initialize the map object
	theMap := map[string]string{}
	targetVar := ""

	// First check if env file exists & load the file if it exists
	dotenvErr := godotenv.Load(envFileName)

	if dotenvErr == nil {
		log.Println(".env file located and loaded. Running on Development Mode")
	}

	if dotenvErr != nil {
		log.Println("Failed to load .env file: ", dotenvErr)
		log.Println("Switching to the Production Mode")
	}

	for _, varName := range varNames {
		// Get the variable from the env
		envVar := os.Getenv(varName)

		// Check if the variable has been initialized
		if envVar != "" {
			// Add the variable to the map
			theMap[varName] = envVar
		} else {
			// Indicate that there is a variable that has not been initialized and leave the handling to the user
			targetVar = varName
			return false, targetVar, theMap
		}
	}

	return true, targetVar, theMap
}
