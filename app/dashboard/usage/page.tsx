"use client"

import { motion } from 'framer-motion'
import { Zap, MessageSquare, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const usageHistory = [
  { date: 'Today', requests: 34, tokens: 13600, limit: 50 },
  { date: 'Yesterday', requests: 47, tokens: 18800, limit: 50 },
  { date: 'Mar 11', requests: 45, tokens: 18000, limit: 50 },
  { date: 'Mar 10', requests: 38, tokens: 15200, limit: 50 },
  { date: 'Mar 9', requests: 41, tokens: 16400, limit: 50 },
]

export default function UsagePage() {
  const dailyUsed = 34
  const dailyLimit = 50
  const dailyPct = (dailyUsed / dailyLimit) * 100

  const monthlyTokens = 48200
  const monthlyTokenLimit = 100000
  const monthlyPct = (monthlyTokens / monthlyTokenLimit) * 100

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl">Usage & Limits</h1>
            <p className="text-white/40 text-sm mt-0.5">Monitor your AI usage and manage your plan</p>
          </div>
          <Badge variant="violet">Free Plan</Badge>
        </div>
      </motion.div>

      {/* Current plan */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5 pointer-events-none" />
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Free Plan</CardTitle>
                <CardDescription>Your current subscription</CardDescription>
              </div>
              <Link href="/pricing">
                <Button variant="gradient" size="sm">Upgrade to Pro</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Daily Requests', used: dailyUsed, limit: 50, unit: 'req' },
                { label: 'Monthly Tokens', used: Math.round(monthlyTokens / 1000), limit: 100, unit: 'K' },
                { label: 'Active Sessions', used: 4, limit: 10, unit: '' },
              ].map((item) => {
                const pct = (item.used / item.limit) * 100
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">{item.label}</span>
                      <span className="font-medium">
                        {item.used}{item.unit}
                        <span className="text-white/30"> / {item.limit}{item.unit}</span>
                      </span>
                    </div>
                    <Progress
                      value={pct}
                      indicatorClassName={pct > 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' : undefined}
                    />
                    {pct > 80 && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-orange-400">
                        <AlertCircle className="w-3 h-3" />
                        Approaching limit
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plan comparison */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plan Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  current: true,
                  features: ['50 req/day', '100K tokens/mo', 'Basic models', 'Community support'],
                  color: 'border-white/10',
                },
                {
                  name: 'Pro',
                  price: '$29/mo',
                  current: false,
                  featured: true,
                  features: ['500 req/day', '2M tokens/mo', 'All models', 'Priority support', 'API access'],
                  color: 'border-violet-500/30',
                },
                {
                  name: 'Enterprise',
                  price: '$99/mo',
                  current: false,
                  features: ['Unlimited', '50M tokens/mo', 'Custom models', 'Dedicated support', 'SSO'],
                  color: 'border-white/10',
                },
              ].map((plan) => (
                <div key={plan.name} className={`p-4 rounded-xl border ${plan.color} ${plan.featured ? 'bg-violet-500/5' : ''} relative`}>
                  {plan.current && (
                    <Badge variant="green" className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px]">Current</Badge>
                  )}
                  {plan.featured && (
                    <Badge variant="violet" className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px]">Recommended</Badge>
                  )}
                  <div className="font-display font-bold mb-1">{plan.name}</div>
                  <div className="text-xl font-bold gradient-text-static mb-4">{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Button variant={plan.featured ? 'gradient' : 'outline'} size="sm" className="w-full mt-4">
                      Upgrade
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage history */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Usage History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {usageHistory.map((day, i) => {
                const pct = (day.requests / day.limit) * 100
                return (
                  <div key={day.date}>
                    <div className="flex items-center gap-4 py-3">
                      <div className="w-20 text-sm text-white/50 shrink-0">{day.date}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5 text-xs">
                          <span className="text-white/50">{day.requests} requests</span>
                          <span className="text-white/30">{(day.tokens / 1000).toFixed(1)}K tokens</span>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                      <div className={`text-xs w-10 text-right font-medium ${pct > 80 ? 'text-orange-400' : pct > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {Math.round(pct)}%
                      </div>
                    </div>
                    {i < usageHistory.length - 1 && <Separator />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* API Usage */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Keys</CardTitle>
            <CardDescription>Manage your API access tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">API access</div>
                  <div className="text-xs text-white/30">Available on Pro plan</div>
                </div>
              </div>
              <Button variant="gradient" size="sm">
                Upgrade to unlock
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
