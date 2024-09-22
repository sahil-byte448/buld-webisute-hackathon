package main

import (
	"fmt"

	"github.com/p2eengineering/kalp-sdk-public/kalpsdk"
)

type HealthcareContract struct {
	kalpsdk.Contract
}

// Init initializes the contract
func (h *HealthcareContract) Init(ctx kalpsdk.TransactionContextInterface) (bool, error) {
	h.Logger.Info("Healthcare Data Sharing Smart Contract initialized")
	return true, nil
}

// SetConsentStatus sets the consent status for sharing patient data with a provider
func (h *HealthcareContract) SetConsentStatus(ctx kalpsdk.TransactionContextInterface, patientId string, providerId string, consent string) error {
	h.Logger.Info(fmt.Sprintf("Setting consent status for patient %s and provider %s", patientId, providerId))
	consentKey := fmt.Sprintf("consent-%s-%s", patientId, providerId)
	consentValue := []byte("false")
	if consent == "true" {
		consentValue = []byte("true")
	}
	return ctx.PutStateWithoutKYC(consentKey, consentValue)
}

// GetConsentStatus retrieves the consent status for a patient-provider pair
func (h *HealthcareContract) GetConsentStatus(ctx kalpsdk.TransactionContextInterface, patientId string, providerId string) (bool, error) {
	h.Logger.Info(fmt.Sprintf("Getting consent status for patient %s and provider %s", patientId, providerId))
	consentKey := fmt.Sprintf("consent-%s-%s", patientId, providerId)
	consentBytes, err := ctx.GetState(consentKey)
	if err != nil {
		return false, fmt.Errorf("failed to read consent: %v", err)
	}
	if consentBytes == nil {
		return false, fmt.Errorf("consent not found for patient %s and provider %s", patientId, providerId)
	}
	return string(consentBytes) == "true", nil
}

// SharePatientData stores patient data to be shared with a specific provider
func (h *HealthcareContract) SharePatientData(ctx kalpsdk.TransactionContextInterface, patientId string, providerId string, data string) error {
	h.Logger.Info(fmt.Sprintf("Sharing data for patient %s with provider %s", patientId, providerId))

	// Check consent before sharing data
	consentKey := fmt.Sprintf("consent-%s-%s", patientId, providerId)
	consentBytes, err := ctx.GetState(consentKey)
	if err != nil {
		return fmt.Errorf("failed to read consent: %v", err)
	}
	if consentBytes == nil || string(consentBytes) != "true" {
		return fmt.Errorf("no consent for sharing data for patient %s with provider %s", patientId, providerId)
	}

	dataKey := fmt.Sprintf("data-%s-%s", patientId, providerId)
	return ctx.PutStateWithoutKYC(dataKey, []byte(data))
}

// GetPatientData retrieves the patient data shared with a specific provider
func (h *HealthcareContract) GetPatientData(ctx kalpsdk.TransactionContextInterface, patientId string, providerId string) ([]byte, error) {
	h.Logger.Info(fmt.Sprintf("Getting data for patient %s shared with provider %s", patientId, providerId))
	dataKey := fmt.Sprintf("data-%s-%s", patientId, providerId)
	dataBytes, err := ctx.GetState(dataKey)
	if err != nil {
		return nil, fmt.Errorf("failed to read patient data: %v", err)
	}
	if dataBytes == nil {
		return nil, fmt.Errorf("no data found for patient %s and provider %s", patientId, providerId)
	}
	return dataBytes, nil
}
