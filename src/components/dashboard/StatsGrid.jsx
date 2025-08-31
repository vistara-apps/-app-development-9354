import React from 'react'
import { Database, FileCheck, Zap, DollarSign } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

const StatsGrid = () => {
  const stats = [
    {
      name: 'Datasets Generated',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Database,
    },
    {
      name: 'Compliance Rate',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: FileCheck,
    },
    {
      name: 'Generation Speed',
      value: '45.2s',
      change: '-5s',
      changeType: 'positive',
      icon: Zap,
    },
    {
      name: 'Monthly Usage',
      value: '$12,450',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-textSecondary truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-textPrimary">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-accent' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsGrid