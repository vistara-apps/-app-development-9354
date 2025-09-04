import React, { createContext, useContext, useState } from 'react'
import { useToast } from './ToastContext'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const toast = useToast()
  const [datasets, setDatasets] = useState([
    {
      dataset_id: '1',
      user_id: '1',
      creation_timestamp: '2024-01-15T10:30:00Z',
      data_format: 'CSV',
      description: 'Patient Records - Diabetes Study',
      generation_parameters: {
        industry: 'Healthcare',
        size: 10000,
        compliance: ['HIPAA'],
        patterns: ['disease_progression']
      },
      status: 'completed'
    },
    {
      dataset_id: '2',
      user_id: '1',
      creation_timestamp: '2024-01-14T15:45:00Z',
      data_format: 'JSON',
      description: 'Financial Transactions - Fraud Detection',
      generation_parameters: {
        industry: 'Finance',
        size: 50000,
        compliance: ['GDPR'],
        patterns: ['fraud_indicators']
      },
      status: 'completed'
    },
    {
      dataset_id: '3',
      user_id: '1',
      creation_timestamp: '2024-01-16T09:15:00Z',
      data_format: 'CSV',
      description: 'Clinical Trial Data - Phase II',
      generation_parameters: {
        industry: 'Clinical Research',
        size: 5000,
        compliance: ['HIPAA', 'GCP'],
        patterns: ['treatment_response']
      },
      status: 'processing'
    }
  ])

  const [complianceRecords, setComplianceRecords] = useState([
    {
      record_id: '1',
      dataset_id: '1',
      regulation_type: 'HIPAA',
      certification_status: 'certified',
      audit_log_url: '/audit/1'
    },
    {
      record_id: '2',
      dataset_id: '2',
      regulation_type: 'GDPR',
      certification_status: 'certified',
      audit_log_url: '/audit/2'
    }
  ])

  const generateDataset = async (parameters) => {
    const newDataset = {
      dataset_id: String(datasets.length + 1),
      user_id: '1',
      creation_timestamp: new Date().toISOString(),
      data_format: parameters.format,
      description: parameters.description,
      generation_parameters: parameters,
      status: 'processing'
    }

    setDatasets(prev => [...prev, newDataset])

    // Simulate API call delay
    setTimeout(() => {
      setDatasets(prev => 
        prev.map(d => 
          d.dataset_id === newDataset.dataset_id 
            ? { ...d, status: 'completed' }
            : d
        )
      )
    }, 3000)

    return newDataset
  }

  const value = {
    datasets,
    complianceRecords,
    generateDataset,
    toast
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
