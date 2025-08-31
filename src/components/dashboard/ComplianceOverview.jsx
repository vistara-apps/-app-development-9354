import React from 'react'
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card'

const ComplianceOverview = () => {
  const complianceItems = [
    {
      regulation: 'HIPAA',
      status: 'compliant',
      datasets: 145,
      lastAudit: '2024-01-10',
    },
    {
      regulation: 'GDPR',
      status: 'compliant',
      datasets: 89,
      lastAudit: '2024-01-08',
    },
    {
      regulation: 'SOX',
      status: 'warning',
      datasets: 23,
      lastAudit: '2024-01-05',
    },
    {
      regulation: 'GCP',
      status: 'compliant',
      datasets: 67,
      lastAudit: '2024-01-12',
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-accent" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Shield className="h-5 w-5 text-textSecondary" />
    }
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Compliance Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div
              key={item.regulation}
              className="flex items-center justify-between p-3 bg-bg rounded-md border border-border"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="text-sm font-medium text-textPrimary">
                    {item.regulation}
                  </p>
                  <p className="text-xs text-textSecondary">
                    {item.datasets} datasets • Last audit: {item.lastAudit}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'compliant'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'compliant' ? 'Compliant' : 'Needs Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ComplianceOverview