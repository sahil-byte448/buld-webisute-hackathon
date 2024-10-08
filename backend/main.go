package main

import (
	"log"

	"github.com/p2eengineering/kalp-sdk-public/kalpsdk"
)

func main() {
	contract := kalpsdk.Contract{IsPayableContract: false}
	contract.Logger = kalpsdk.NewLogger()

	// Create a new instance of your HealthcareContract
	healthcareContract := &HealthcareContract{contract}

	// Create a new instance of KalpContractChaincode with your healthcare contract
	chaincode, err := kalpsdk.NewChaincode(healthcareContract)
	if err != nil {
		log.Panicf("Error creating KalpContractChaincode: %v", err)
	}

	contract.Logger.Info("Initializing Kalp DLT Healthcare Data Sharing Smart Contract")

	// Start the chaincode
	if err := chaincode.Start(); err != nil {
		log.Panicf("Error starting chaincode: %v", err)
	}
}
