"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, MessageSquare, BarChart3, Zap, Settings,
  Sparkles, LogOut, ChevronLeft, ChevronRight, Menu, X, User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/chat', icon: MessageSquare, label: 'AI Chat' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/usage', icon: Zap, label: 'Usage' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full",
      !isMobile && (collapsed ? "w-16" : "w-60")
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] shrink-0",
        collapsed && !isMobile && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {(!collapsed || isMobile) && (
          <div>
            <div className="font-display font-bold text-sm leading-none">
              S&A <span className="gradient-text-static">NexTech</span>
            </div>
            <div className="text-[10px] text-white/30 mt-0.5">AI Platform</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = item.href === '/dashboard'
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                            : "text-white/50 hover:text-white hover:bg-white/5",
                          collapsed && !isMobile && "justify-center px-0 py-3"
                        )}
                      >
                        <item.icon className={cn("shrink-0", collapsed && !isMobile ? "w-5 h-5" : "w-4 h-4")} />
                        {(!collapsed || isMobile) && item.label}
                        {isActive && !collapsed && !isMobile && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && !isMobile && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </TooltipProvider>
      </nav>

      {/* User section */}
      <div className={cn(
        "p-3 border-t border-white/[0.06] shrink-0",
        collapsed && !isMobile && "flex justify-center"
      )}>
        {collapsed && !isMobile ? (
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">U</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">User</div>
              <div className="text-xs text-white/30 truncate">Free Plan</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050507] flex">
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-col border-r border-white/[0.06] bg-black/20 backdrop-blur-xl relative overflow-hidden shrink-0"
      >
        <SidebarContent />

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-[#0a0a14] border border-white/10 flex items-center justify-center hover:border-violet-500/40 hover:text-violet-400 transition-all text-white/40 z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-[#080810] border-r border-white/[0.06] z-50 md:hidden overflow-hidden"
            >
              <SidebarContent isMobile />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 h-14 px-4 border-b border-white/[0.06] bg-black/20">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="font-display font-bold text-sm">NexTech AI</span>
          </div>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
