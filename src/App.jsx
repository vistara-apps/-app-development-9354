import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DataGeneration from './components/DataGeneration'
import Compliance from './components/Compliance'
import Billing from './components/Billing'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <div className="min-h-screen bg-bg text-textPrimary transition-colors duration-200">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/generate" element={<DataGeneration />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
            </div>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
