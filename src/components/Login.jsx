import React, { useState } from 'react'
import { Shield, Database, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from './ui/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await login(email, password)
    if (!result.success) {
      alert(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Shield className="h-10 w-10 text-accent" />
            <h1 className="text-4xl font-bold text-white">SynthoData Pro</h1>
          </div>
          <p className="text-xl text-gray-300 mb-8">
            Generate Realistic, Compliant Synthetic Data for AI & Analytics
          </p>
        </div>

        <div className="bg-surface rounded-xl p-8 shadow-modal">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textPrimary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textPrimary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-textSecondary text-center">
              Demo credentials: any email and password
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-surface/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Database className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-white text-sm">Realistic Data</p>
          </div>
          <div className="bg-surface/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Lock className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-white text-sm">HIPAA/GDPR Compliant</p>
          </div>
          <div className="bg-surface/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-white text-sm">Enterprise Security</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login