import React from 'react'
import { Shield, FileCheck, Download, Eye } from 'lucide-react'
import AppShell from './layout/AppShell'
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card'
import Button from './ui/Button'
import { useData } from '../contexts/DataContext'

const Compliance = () => {
  const { datasets, complianceRecords } = useData()

  const getComplianceForDataset = (datasetId) => {
    return complianceRecords.filter(record => record.dataset_id === datasetId)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary">Compliance Management</h1>
          <p className="text-base leading-7 text-textSecondary mt-2">
            Monitor and manage regulatory compliance across all your synthetic datasets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Overall Compliance</p>
                  <p className="text-2xl font-bold text-textPrimary">99.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileCheck className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Active Certifications</p>
                  <p className="text-2xl font-bold text-textPrimary">{complianceRecords.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-textSecondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Audit Reports</p>
                  <p className="text-2xl font-bold text-textPrimary">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dataset Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {datasets.map((dataset) => {
                const compliance = getComplianceForDataset(dataset.dataset_id)
                return (
                  <div
                    key={dataset.dataset_id}
                    className="p-4 border border-border rounded-md bg-bg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-textPrimary">
                          {dataset.description}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-textSecondary">
                            {dataset.generation_parameters.size?.toLocaleString()} records
                          </span>
                          <span className="text-sm text-textSecondary">
                            {dataset.data_format}
                          </span>
                          <span className="text-sm text-textSecondary">
                            {new Date(dataset.creation_timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          {dataset.generation_parameters.compliance?.map((reg) => (
                            <span
                              key={reg}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent"
                            >
                              {reg}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-accent">Compliant</span>
                          </div>
                          <p className="text-xs text-textSecondary">
                            {compliance.length} certification{compliance.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Report
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulation Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['HIPAA', 'GDPR', 'SOX', 'GCP', 'FDA 21 CFR Part 11'].map((regulation) => {
                  const count = complianceRecords.filter(r => r.regulation_type === regulation).length
                  return (
                    <div key={regulation} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-textPrimary">{regulation}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-textSecondary">{count} datasets</span>
                        <div className="w-16 bg-border rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${Math.min(100, (count / datasets.length) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'HIPAA Compliance Verified', dataset: 'Patient Records - Diabetes Study', time: '2 hours ago' },
                  { action: 'GDPR Audit Completed', dataset: 'Financial Transactions', time: '1 day ago' },
                  { action: 'SOX Review Initiated', dataset: 'Trading Data Analysis', time: '2 days ago' },
                  { action: 'GCP Certification Renewed', dataset: 'Clinical Trial Data', time: '3 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-bg rounded-md">
                    <FileCheck className="h-4 w-4 text-accent mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-textPrimary">{activity.action}</p>
                      <p className="text-xs text-textSecondary truncate">{activity.dataset}</p>
                    </div>
                    <span className="text-xs text-textSecondary whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}

export default Compliance