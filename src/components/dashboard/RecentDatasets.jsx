import React from 'react'
import { Calendar, FileText, CheckCircle, Clock } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card'
import { useData } from '../../contexts/DataContext'
import Button from '../ui/Button'

const RecentDatasets = () => {
  const { datasets } = useData()

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-accent" />
      case 'processing':
        return <Clock className="h-4 w-4 text-primary animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-textSecondary" />
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Recent Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {datasets.slice(0, 5).map((dataset) => (
            <div
              key={dataset.dataset_id}
              className="flex items-center justify-between p-4 bg-bg rounded-md border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-textPrimary truncate">
                    {dataset.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-xs text-textSecondary">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(dataset.creation_timestamp)}</span>
                    </div>
                    <span className="text-xs text-textSecondary">
                      {dataset.generation_parameters.size?.toLocaleString()} records
                    </span>
                    <span className="text-xs text-textSecondary">
                      {dataset.data_format}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(dataset.status)}
                  <span className="text-sm text-textSecondary capitalize">
                    {dataset.status}
                  </span>
                </div>
                {dataset.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentDatasets