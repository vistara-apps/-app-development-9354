import React from 'react'
import { CreditCard, TrendingUp, Download, Calendar } from 'lucide-react'
import AppShell from './layout/AppShell'
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card'
import Button from './ui/Button'
import { useAuth } from '../contexts/AuthContext'

const Billing = () => {
  const { user } = useAuth()

  const subscriptionTiers = [
    {
      name: 'Starter',
      price: '$5,000',
      period: 'per month',
      features: [
        'Up to 100K records/month',
        'Basic compliance (HIPAA, GDPR)',
        'CSV/JSON export',
        'Email support'
      ],
      current: false
    },
    {
      name: 'Professional',
      price: '$15,000',
      period: 'per month',
      features: [
        'Up to 1M records/month',
        'All compliance standards',
        'All export formats',
        'Priority support',
        'Custom patterns'
      ],
      current: true
    },
    {
      name: 'Enterprise',
      price: '$50,000+',
      period: 'per month',
      features: [
        'Unlimited records',
        'Custom compliance requirements',
        'Dedicated support',
        'API access',
        'On-premise deployment'
      ],
      current: false
    }
  ]

  const usageData = [
    { metric: 'Records Generated', current: '847,293', limit: '1,000,000', percentage: 84.7 },
    { metric: 'API Calls', current: '15,432', limit: '50,000', percentage: 30.9 },
    { metric: 'Storage Used', current: '2.3 GB', limit: '10 GB', percentage: 23.0 },
  ]

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-01', amount: '$15,000', status: 'Paid' },
    { id: 'INV-2023-012', date: '2023-12-01', amount: '$15,000', status: 'Paid' },
    { id: 'INV-2023-011', date: '2023-11-01', amount: '$15,000', status: 'Paid' },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary">Billing & Usage</h1>
          <p className="text-base leading-7 text-textSecondary mt-2">
            Manage your subscription and monitor usage across all features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Current Plan</p>
                  <p className="text-2xl font-bold text-textPrimary">{user?.subscription_plan}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Monthly Spend</p>
                  <p className="text-2xl font-bold text-textPrimary">$15,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-textSecondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">Next Billing</p>
                  <p className="text-2xl font-bold text-textPrimary">Feb 1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {usageData.map((usage) => (
                <div key={usage.metric}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-textPrimary">{usage.metric}</span>
                    <span className="text-sm text-textSecondary">
                      {usage.current} / {usage.limit}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${usage.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-textSecondary">{usage.percentage}% used</span>
                    <span className="text-xs text-textSecondary">
                      {(100 - usage.percentage).toFixed(1)}% remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`border rounded-lg p-6 ${
                    tier.current 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-textPrimary">{tier.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-textPrimary">{tier.price}</span>
                      <span className="text-textSecondary">/{tier.period.split(' ')[1]}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-textSecondary">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.current ? 'secondary' : 'primary'}
                    className="w-full"
                    disabled={tier.current}
                  >
                    {tier.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-border rounded-md bg-bg"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">{invoice.id}</p>
                      <p className="text-xs text-textSecondary">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-textPrimary">{invoice.amount}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {invoice.status}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

export default Billing