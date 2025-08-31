import React, { useState, useEffect } from 'react'
import { Database, FileCheck, Zap, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

const StatsGrid = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      name: 'Datasets Generated',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Database,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      name: 'Compliance Rate',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: FileCheck,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      name: 'Generation Speed',
      value: '45.2s',
      change: '-5s',
      changeType: 'positive',
      icon: Zap,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
      name: 'Monthly Usage',
      value: '$12,450',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.name} 
          className={`transform transition-all duration-500 ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
          hoverable
        >
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
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
                    <div className={`ml-2 flex items-center text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
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
