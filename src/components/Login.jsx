import React, { useState, useEffect } from 'react'
import { Shield, Database, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import Button from './ui/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const { login } = useAuth()
  const { addToast } = useToast()

  // Validate form fields
  useEffect(() => {
    const newErrors = {}
    
    if (touched.email) {
      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (touched.password) {
      if (!password) {
        newErrors.password = 'Password is required'
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
    }
    
    setErrors(newErrors)
  }, [email, password, touched])

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched to show validation errors
    setTouched({ email: true, password: true })
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0 || !email || !password) {
      addToast('Please fix the form errors before submitting', 'error')
      return
    }
    
    setLoading(true)
    
    try {
      const result = await login(email, password)
      if (!result.success) {
        addToast(result.error || 'Login failed. Please try again.', 'error')
      } else {
        addToast('Login successful!', 'success')
      }
    } catch (error) {
      addToast('An unexpected error occurred. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
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
                onBlur={() => handleBlur('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.email && touched.email ? 'border-red-500' : 'border-border'
                }`}
                placeholder="you@company.com"
                required
              />
              {errors.email && touched.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textPrimary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent pr-10 ${
                    errors.password && touched.password ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-textSecondary hover:text-textPrimary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
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
