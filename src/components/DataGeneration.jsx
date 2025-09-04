import React, { useState } from 'react'
import { Database, FileText, Shield, Zap } from 'lucide-react'
import AppShell from './layout/AppShell'
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card'
import Button from './ui/Button'
import { useData } from '../contexts/DataContext'

const DataGeneration = () => {
  const [formData, setFormData] = useState({
    industry: 'Healthcare',
    description: '',
    size: 10000,
    format: 'CSV',
    compliance: [],
    patterns: []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const { generateDataset } = useData()

  const industries = [
    { value: 'Healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'Finance', label: 'Finance', icon: '💰' },
    { value: 'Clinical Research', label: 'Clinical Research', icon: '🔬' },
  ]

  const complianceOptions = {
    Healthcare: ['HIPAA', 'FDA 21 CFR Part 11'],
    Finance: ['GDPR', 'SOX', 'PCI DSS'],
    'Clinical Research': ['HIPAA', 'GCP', 'FDA 21 CFR Part 11']
  }

  const patternOptions = {
    Healthcare: ['disease_progression', 'treatment_response', 'patient_demographics'],
    Finance: ['fraud_indicators', 'transaction_patterns', 'credit_scoring'],
    'Clinical Research': ['treatment_response', 'adverse_events', 'biomarker_data']
  }

  const { addToast } = useData().toast || { addToast: () => {} }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    } else if (formData.description.length < 5) {
      errors.description = 'Description must be at least 5 characters'
    }
    
    if (formData.compliance.length === 0) {
      errors.compliance = 'Please select at least one compliance requirement'
    }
    
    if (formData.patterns.length === 0) {
      errors.patterns = 'Please select at least one data pattern'
    }
    
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      // Display the first error as a toast
      const firstError = Object.values(formErrors)[0]
      addToast(firstError, 'error')
      return
    }
    
    setIsGenerating(true)
    
    try {
      await generateDataset(formData)
      addToast('Dataset generation started! You can monitor progress in the dashboard.', 'success')
      setFormData({
        industry: 'Healthcare',
        description: '',
        size: 10000,
        format: 'CSV',
        compliance: [],
        patterns: []
      })
    } catch (error) {
      addToast('Error generating dataset: ' + (error.message || 'Unknown error'), 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleComplianceChange = (regulation) => {
    setFormData(prev => ({
      ...prev,
      compliance: prev.compliance.includes(regulation)
        ? prev.compliance.filter(c => c !== regulation)
        : [...prev.compliance, regulation]
    }))
  }

  const handlePatternChange = (pattern) => {
    setFormData(prev => ({
      ...prev,
      patterns: prev.patterns.includes(pattern)
        ? prev.patterns.filter(p => p !== pattern)
        : [...prev.patterns, pattern]
    }))
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary">Generate Synthetic Data</h1>
          <p className="text-base leading-7 text-textSecondary mt-2">
            Create realistic, compliant synthetic datasets for your AI and analytics needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>Dataset Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-2">
                      Industry
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {industries.map((industry) => (
                        <button
                          key={industry.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            industry: industry.value,
                            compliance: [],
                            patterns: []
                          }))}
                          className={`p-4 border rounded-md text-left transition-colors ${
                            formData.industry === industry.value
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="text-2xl mb-2">{industry.icon}</div>
                          <div className="font-medium">{industry.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-textPrimary mb-2">
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Patient Records - Diabetes Study"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-textPrimary mb-2">
                        Dataset Size
                      </label>
                      <select
                        id="size"
                        value={formData.size}
                        onChange={(e) => setFormData(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value={1000}>1,000 records</option>
                        <option value={10000}>10,000 records</option>
                        <option value={50000}>50,000 records</option>
                        <option value={100000}>100,000 records</option>
                        <option value={500000}>500,000 records</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="format" className="block text-sm font-medium text-textPrimary mb-2">
                        Output Format
                      </label>
                      <select
                        id="format"
                        value={formData.format}
                        onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="CSV">CSV</option>
                        <option value="JSON">JSON</option>
                        <option value="Parquet">Parquet</option>
                        <option value="Excel">Excel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-2">
                      Compliance Requirements
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {complianceOptions[formData.industry]?.map((regulation) => (
                        <label
                          key={regulation}
                          className="flex items-center space-x-2 p-3 border border-border rounded-md cursor-pointer hover:bg-border/50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.compliance.includes(regulation)}
                            onChange={() => handleComplianceChange(regulation)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-textPrimary">{regulation}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-2">
                      Data Patterns
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {patternOptions[formData.industry]?.map((pattern) => (
                        <label
                          key={pattern}
                          className="flex items-center space-x-2 p-3 border border-border rounded-md cursor-pointer hover:bg-border/50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.patterns.includes(pattern)}
                            onChange={() => handlePatternChange(pattern)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-textPrimary">
                            {pattern.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-spin" />
                        Generating Dataset...
                      </>
                    ) : (
                      <>
                        <Database className="h-5 w-5 mr-2" />
                        Generate Dataset
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Security Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">Privacy Preserving</p>
                      <p className="text-xs text-textSecondary">Differential privacy and k-anonymity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">Audit Trail</p>
                      <p className="text-xs text-textSecondary">Complete generation history</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">Real-time Validation</p>
                      <p className="text-xs text-textSecondary">Continuous compliance checking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estimated Generation Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.ceil((formData.size / 1000) * 4.5)}s
                  </div>
                  <p className="text-sm text-textSecondary mt-1">
                    For {formData.size.toLocaleString()} records
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default DataGeneration
