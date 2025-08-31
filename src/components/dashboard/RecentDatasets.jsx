import React, { useState, useEffect } from 'react'
import { Calendar, FileText, CheckCircle, Clock, Download } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card'
import { useData } from '../../contexts/DataContext'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import { SkeletonText } from '../ui/Skeleton'

const RecentDatasets = () => {
  const { datasets } = useData()
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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

  const handleDownload = (datasetId) => {
    setDownloadingId(datasetId)
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null)
      // Show success toast
      if (useData().toast) {
        useData().toast.addToast('Dataset downloaded successfully', 'success')
      }
    }, 1500)
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Recent Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            // Skeleton loading state
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-bg rounded-md border border-border animate-pulse"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="flex-shrink-0 bg-border/70 h-8 w-8 rounded"></div>
                  <div className="min-w-0 flex-1 w-full">
                    <SkeletonText lines={1} className="w-3/4 mb-2" />
                    <div className="flex items-center space-x-4 mt-1">
                      <SkeletonText lines={1} className="w-24 h-3" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 bg-border/70 h-8 w-20 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            datasets.slice(0, 5).map((dataset) => (
              <div
                key={dataset.dataset_id}
                className="flex items-center justify-between p-4 bg-bg rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-textPrimary truncate">
                      {dataset.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-4 mt-1">
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={downloadingId === dataset.dataset_id}
                      onClick={() => handleDownload(dataset.dataset_id)}
                      aria-label={`Download ${dataset.description}`}
                    >
                      {downloadingId === dataset.dataset_id ? (
                        <Spinner size="sm" className="mr-1" />
                      ) : (
                        <Download className="h-4 w-4 mr-1" />
                      )}
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
          
          {!loading && datasets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-textSecondary">No datasets found</p>
              <Button 
                variant="primary" 
                size="sm" 
                className="mt-4"
                onClick={() => window.location.href = '/generate'}
              >
                Generate Your First Dataset
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentDatasets
