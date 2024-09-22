// page.tsx
"use client";
import React, { useState} from "react";
import { useHealthcareApi } from "../hooks/useHealthcareApi";

export default function HomePage() {
  const [patientId, setPatientId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [patientData, setPatientData] = useState("");
  const [consent, setConsent] = useState(false);
  const { getPatientData, sharePatientData, getConsentStatus, setConsentStatus, loading, error } = useHealthcareApi();

  const handleGetPatientData = async () => {
    try {
      const data = await getPatientData(patientId);
      console.log("Patient Data:", data);
      setPatientData(data.result || "No data found");
    } catch (err) {
      console.error("Error fetching patient data:", err);
    }
  };

  const handleSharePatientData = async () => {
    try {
      const data = await sharePatientData(patientId, providerId, patientData);
      console.log("Shared Data:", data);
    } catch (err) {
      console.error("Error sharing patient data:", err);
    }
  };

  const handleGetConsentStatus = async () => {
    try {
      const data = await getConsentStatus(patientId, providerId);
      console.log("Consent Status:", data);
      setConsent(data.result);
    } catch (err) {
      console.error("Error fetching consent status:", err);
    }
  };

  const handleSetConsentStatus = async () => {
    try {
      const data = await setConsentStatus(patientId, providerId, "true");
      console.log("Set Consent Status:", data);
    } catch (err) {
      console.error("Error setting consent status:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Healthcare Data Sharing Platform</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Patient ID</label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID"
          className="input mb-4"
        />
        <button onClick={handleGetPatientData} className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Get Patient Data"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Provider ID</label>
        <input
          type="text"
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          placeholder="Enter Provider ID"
          className="input mb-4"
        />
        <button onClick={handleGetConsentStatus} className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Get Consent Status"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Patient Data</label>
        <textarea
          value={patientData}
          onChange={(e) => setPatientData(e.target.value)}
          placeholder="Enter Patient Data"
          className="input mb-4"
        />
        <button onClick={handleSharePatientData} className="btn btn-secondary" disabled={loading}>
          {loading ? "Sharing..." : "Share Patient Data"}
        </button>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mr-2"
        />
        <label>Give Consent</label>
        <button onClick={handleSetConsentStatus} className="btn btn-secondary ml-4" disabled={loading}>
          {loading ? "Setting Consent..." : "Set Consent Status"}
        </button>
      </div>
    </div>
  );
}

