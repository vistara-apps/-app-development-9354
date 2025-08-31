import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card'

const UsageChart = () => {
  const data = [
    { name: 'Jan', datasets: 165, compliance: 98 },
    { name: 'Feb', datasets: 189, compliance: 99 },
    { name: 'Mar', datasets: 201, compliance: 97 },
    { name: 'Apr', datasets: 223, compliance: 99 },
    { name: 'May', datasets: 245, compliance: 98 },
    { name: 'Jun', datasets: 267, compliance: 100 },
    { name: 'Jul', datasets: 289, compliance: 99 },
  ]

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 90%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(220, 30%, 35%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(220, 30%, 35%)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 10%, 90%)',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px hsla(220, 30%, 15%, 0.08)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="datasets" 
                stroke="hsl(200, 80%, 50%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(200, 80%, 50%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(200, 80%, 50%)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="hsl(160, 100%, 40%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(160, 100%, 40%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(160, 100%, 40%)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-textSecondary">Datasets Generated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-textSecondary">Compliance Rate (%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UsageChart