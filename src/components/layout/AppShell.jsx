import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Shield, 
  Database, 
  FileCheck, 
  CreditCard, 
  Menu, 
  X,
  User,
  LogOut,
  Home
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'

const AppShell = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Generate Data', href: '/generate', icon: Database },
    { name: 'Compliance', href: '/compliance', icon: FileCheck },
    { name: 'Billing', href: '/billing', icon: CreditCard },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-surface shadow-modal">
            <SidebarContent 
              navigation={navigation} 
              isActive={isActive} 
              closeSidebar={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-surface border-r border-border">
          <SidebarContent navigation={navigation} isActive={isActive} />
        </div>
      </div>

      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-surface px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-textSecondary lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-textPrimary">{user?.email}</div>
                  <div className="text-xs text-textSecondary">{user?.company_name}</div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

const SidebarContent = ({ navigation, isActive, closeSidebar }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto p-6">
      <div className="flex h-16 shrink-0 items-center">
        <Shield className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold text-textPrimary">SynthoData Pro</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={closeSidebar}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-white'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-border/50'
                    }`}
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AppShell