import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('synthodata_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      navigate('/login')
    }
    setLoading(false)
  }, [navigate])

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        user_id: '1',
        email,
        company_name: 'Acme Healthcare',
        industry: 'Healthcare',
        subscription_plan: 'Professional'
      }
      
      setUser(mockUser)
      localStorage.setItem('synthodata_user', JSON.stringify(mockUser))
      navigate('/')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('synthodata_user')
    navigate('/login')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}