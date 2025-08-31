import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card'
import { SkeletonText } from '../ui/Skeleton'
import { BarChart3, Calendar, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'

const UsageChart = () => {
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('monthly')
  const [chartData, setChartData] = useState([])
  
  const monthlyData = [
    { name: 'Jan', datasets: 165, compliance: 98 },
    { name: 'Feb', datasets: 189, compliance: 99 },
    { name: 'Mar', datasets: 201, compliance: 97 },
    { name: 'Apr', datasets: 223, compliance: 99 },
    { name: 'May', datasets: 245, compliance: 98 },
    { name: 'Jun', datasets: 267, compliance: 100 },
    { name: 'Jul', datasets: 289, compliance: 99 },
  ]
  
  const weeklyData = [
    { name: 'Week 1', datasets: 65, compliance: 97 },
    { name: 'Week 2', datasets: 72, compliance: 98 },
    { name: 'Week 3', datasets: 81, compliance: 99 },
    { name: 'Week 4', datasets: 71, compliance: 100 },
  ]

  useEffect(() => {
    // Simulate loading data
    setLoading(true)
    const timer = setTimeout(() => {
      setChartData(timeframe === 'monthly' ? monthlyData : weeklyData)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [timeframe])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 border border-border rounded-md shadow-card">
          <p className="font-medium text-textPrimary">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-textSecondary flex items-center">
              <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
              Datasets: {payload[0].value}
            </p>
            <p className="text-sm text-textSecondary flex items-center">
              <span className="inline-block w-3 h-3 bg-accent rounded-full mr-2"></span>
              Compliance: {payload[1].value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Usage Trends
        </CardTitle>
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <Button 
            variant={timeframe === 'weekly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('weekly')}
            aria-pressed={timeframe === 'weekly'}
          >
            Weekly
          </Button>
          <Button 
            variant={timeframe === 'monthly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('monthly')}
            aria-pressed={timeframe === 'monthly'}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <SkeletonText lines={1} className="w-1/4 mb-4" />
            <div className="h-80 bg-border/30 rounded-md animate-pulse"></div>
            <div className="flex justify-center space-x-6 mt-4">
              <SkeletonText lines={1} className="w-24" />
              <SkeletonText lines={1} className="w-24" />
            </div>
          </div>
        ) : (
          <>
            <div className="h-80" aria-label={`${timeframe} usage trends chart`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 90%)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(220, 30%, 35%)"
                    fontSize={12}
                    tick={{ fill: 'hsl(220, 30%, 35%)' }}
                  />
                  <YAxis 
                    stroke="hsl(220, 30%, 35%)"
                    fontSize={12}
                    tick={{ fill: 'hsl(220, 30%, 35%)' }}
                    tickFormatter={(value) => value}
                    domain={[0, 'dataMax + 20']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    name="Datasets Generated"
                    type="monotone" 
                    dataKey="datasets" 
                    stroke="hsl(200, 80%, 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(200, 80%, 50%)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(200, 80%, 50%)', strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1000}
                  />
                  <Line 
                    name="Compliance Rate (%)"
                    type="monotone" 
                    dataKey="compliance" 
                    stroke="hsl(160, 100%, 40%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(160, 100%, 40%)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(160, 100%, 40%)', strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationBegin={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-textSecondary">Datasets Generated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-textSecondary">Compliance Rate (%)</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto mt-2 sm:mt-0"
              >
                <Calendar className="h-4 w-4 mr-1" />
                <span>Export Data</span>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default UsageChart
