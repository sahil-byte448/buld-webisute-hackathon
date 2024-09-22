"use client";

import { useState } from 'react';

export const useHealthcareApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID;

  const callApi = async (endpoint: string, args: { [key: string]: any } = {}) => {
    if (!contractId) {
      throw new Error('Contract ID is not set. Please check your environment variables.');
    }

    setError(null);
    setLoading(true);

    const params = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: '2c22cc908bf629441770e86027cbc41487ae5af5', // This should be replaced with the actual user's wallet address
      args: args,
    };

    try {
      console.log(`Calling API: ${endpoint}`, params);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || '',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log(`Full API Response:`, data);

      if (!response.ok) {
        throw new Error(data.message || `API call failed with status ${response.status}`);
      }

      setLoading(false);
      return data;
    } catch (err: any) {
      console.error(`API Error:`, err);
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const getPatientData = async (patientId: string) => {
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/kalp/query/ZNd9fzZRIFt5o4yOFIp9E7BQxxomqioz1727028811273/Init`;
    const args = { patientId };
    return callApi(endpoint, args);
  };

  const sharePatientData = async (patientId: string, providerId: string, data: any) => {
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/kalp/invoke/ZNd9fzZRIFt5o4yOFIp9E7BQxxomqioz1727028811273/SharePatientData`;
    const args = { patientId, providerId, data };
    return callApi(endpoint, args);
  };

  const getConsentStatus = async (patientId: string, providerId: string) => {
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/kalp/query/ZNd9fzZRIFt5o4yOFIp9E7BQxxomqioz1727028811273/GetConsentStatus`;
    const args = { patientId, providerId };
    return callApi(endpoint, args);
  };

  const setConsentStatus = async (patientId: string, providerId: string, consent: boolean) => {
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/kalp/invoke/ZNd9fzZRIFt5o4yOFIp9E7BQxxomqioz1727028811273/SetConsentStatus`;
    const args = { patientId, providerId, consent };
    return callApi(endpoint, args);
  };


  

  return {
    getPatientData,
    sharePatientData,
    getConsentStatus,
    setConsentStatus,
    loading,
    error,
  };
};

