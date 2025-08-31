import React from 'react'
import AppShell from './layout/AppShell'
import StatsGrid from './dashboard/StatsGrid'
import RecentDatasets from './dashboard/RecentDatasets'
import ComplianceOverview from './dashboard/ComplianceOverview'
import UsageChart from './dashboard/UsageChart'

const Dashboard = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary">Dashboard</h1>
          <p className="text-base leading-7 text-textSecondary mt-2">
            Monitor your synthetic data generation and compliance status
          </p>
        </div>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsageChart />
          <ComplianceOverview />
        </div>

        <RecentDatasets />
      </div>
    </AppShell>
  )
}

export default Dashboard