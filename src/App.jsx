import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DataGeneration from './components/DataGeneration'
import Compliance from './components/Compliance'
import Billing from './components/Billing'

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-bg">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/generate" element={<DataGeneration />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </div>
      </DataProvider>
    </AuthProvider>
  )
}

export default App