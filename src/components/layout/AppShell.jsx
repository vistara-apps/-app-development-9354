import React, { useState, useEffect } from 'react'
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
  Home,
  Bell,
  Settings,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Button from '../ui/Button'

const AppShell = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  // Track scroll position for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, description: 'Overview of your data and activity' },
    { name: 'Generate Data', href: '/generate', icon: Database, description: 'Create synthetic datasets' },
    { name: 'Compliance', href: '/compliance', icon: FileCheck, description: 'Manage regulatory compliance' },
    { name: 'Billing', href: '/billing', icon: CreditCard, description: 'Manage your subscription' },
  ]

  const isActive = (href) => location.pathname === href

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-surface shadow-modal transform transition-transform"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
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
        <div 
          className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-surface/95 backdrop-blur-sm px-4 sm:gap-x-6 sm:px-6 lg:px-8 transition-shadow ${
            scrolled ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          <button
            type="button"
            className="-m-2.5 p-2.5 text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary rounded-md lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Page title on mobile */}
            <div className="flex items-center lg:hidden">
              <h1 className="text-lg font-semibold text-textPrimary">
                {navigation.find(item => isActive(item.href))?.name || 'SynthoData Pro'}
              </h1>
            </div>
            
            <div className="flex flex-1" />
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notification button */}
              <button
                type="button"
                className="p-1.5 text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              
              {/* Help button */}
              <button
                type="button"
                className="p-1.5 text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary rounded-md hidden sm:block"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              
              {/* Theme toggle */}
              <button
                type="button"
                className="p-1.5 text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              {/* User profile */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div 
                    className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-textPrimary">{user?.email}</div>
                  <div className="text-xs text-textSecondary">{user?.company_name}</div>
                </div>
              </div>
              
              {/* Sign out button */}
              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center space-x-2"
                aria-label="Sign out"
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
        <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
        <span className="ml-2 text-xl font-bold text-textPrimary">SynthoData Pro</span>
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Main Navigation">
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
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span className="flex flex-col">
                      {item.name}
                      {!isActive(item.href) && (
                        <span className="text-xs font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          
          {/* Settings link at bottom */}
          <li className="mt-auto">
            <Link
              to="/settings"
              onClick={closeSidebar}
              className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-textSecondary hover:text-textPrimary hover:bg-border/50 transition-colors"
            >
              <Settings className="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AppShell
