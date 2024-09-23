🥼Blockchain-Based Healthcare Data Sharing

Overview

This project implements a blockchain-based solution for securely sharing healthcare data between patients and healthcare providers. It ensures that patient consent is required before any data is shared, leveraging smart contracts for consent management, data sharing, and traceability on the Kalp DLT platform.

Features

Consent Management: Patients can provide or revoke consent for sharing their data with specific providers.
Data Sharing: Healthcare data is stored and shared securely between patients and providers.
Smart Contracts: All actions are recorded on the blockchain to ensure transparency and traceability.
Project Structure


krc.go: Contains the smart contract logic for managing consent and sharing patient data.
Init: Initializes the contract.
SetConsentStatus: Updates the consent status for a patient-provider pair.
GetConsentStatus: Retrieves the consent status.
SharePatientData: Shares patient data if consent has been granted.
GetPatientData: Retrieves the data shared with a provider.
main.go: The main entry point for the application, initializing and starting the smart contract using the Kalp SDK.
Installation

Clone the repository:
bash
Copy code
git clone https://github.com/your-repo/blockchain-healthcare.git
Install dependencies:
bash
Copy code
go mod tidy
Usage

Run the smart contract:
bash
Copy code
go run main.go
This will deploy the healthcare smart contract on the Kalp DLT.
Use the provided API methods to set and retrieve consent, and share data.
Smart Contract Functions

SetConsentStatus(patientId, providerId, consent): Allows a patient to set or revoke consent.
GetConsentStatus(patientId, providerId): Retrieves the consent status for a specific provider.
SharePatientData(patientId, providerId, data): Shares healthcare data with a provider (requires consent).
GetPatientData(patientId, providerId): Retrieves data shared with a specific provider.
License

This project is licensed under the MIT License.

FILE DESCRIPTION FOR FRONTEND

File Descriptions

useHealthcareApi.tsx:
This file likely contains the custom React hook to interact with the healthcare API, handling HTTP requests, and possibly state management related to healthcare data.
page.tsx:
A page component, possibly the main content or a specific route in the application that displays healthcare-related data fetched from the API.
layout.tsx:
This file probably defines the layout of the web application, including shared components like headers, footers, navigation, or other structure-related aspects of the UI.
Setup Instructions

Clone the repository:
bash
Copy code
git clone https://github.com/your-repository.git
Install dependencies: Navigate to the project folder and run:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
Build for production:
bash
Copy code
npm run build
Usage

useHealthcareApi Hook: Import and use this custom hook in your components to fetch healthcare-related data from the API.
Page Component: Add the page component to your routes or render it directly to display healthcare data.
Layout Component: Wrap your application or specific routes within the layout component to maintain consistent UI structure across the application.
Dependencies

React: The primary framework for building user interfaces.
TypeScript: For type checking and better developer experience.
Other dependencies: Check the package.json file for a full list of required packages.
Contributing

Fork the repository.
Create a new feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add feature').
Push to the branch (git push origin feature-name).
Open a pull request.