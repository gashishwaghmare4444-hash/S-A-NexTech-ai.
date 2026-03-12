"use client"

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Zap, Clock, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const requestsData = [
  { date: 'Mar 1', requests: 8, tokens: 3200 },
  { date: 'Mar 2', requests: 15, tokens: 6000 },
  { date: 'Mar 3', requests: 22, tokens: 8800 },
  { date: 'Mar 4', requests: 18, tokens: 7200 },
  { date: 'Mar 5', requests: 31, tokens: 12400 },
  { date: 'Mar 6', requests: 27, tokens: 10800 },
  { date: 'Mar 7', requests: 35, tokens: 14000 },
  { date: 'Mar 8', requests: 29, tokens: 11600 },
  { date: 'Mar 9', requests: 41, tokens: 16400 },
  { date: 'Mar 10', requests: 38, tokens: 15200 },
  { date: 'Mar 11', requests: 45, tokens: 18000 },
  { date: 'Mar 12', requests: 42, tokens: 16800 },
  { date: 'Mar 13', requests: 34, tokens: 13600 },
]

const hourlyData = [
  { hour: '0h', requests: 2 },
  { hour: '3h', requests: 1 },
  { hour: '6h', requests: 3 },
  { hour: '9h', requests: 12 },
  { hour: '12h', requests: 18 },
  { hour: '15h', requests: 22 },
  { hour: '18h', requests: 15 },
  { hour: '21h', requests: 8 },
]

const modelUsage = [
  { name: 'llama3-8b', value: 78, color: '#8b5cf6' },
  { name: 'llama3-70b', value: 22, color: '#22d3ee' },
]

const topicData = [
  { topic: 'Coding', count: 45 },
  { topic: 'Analysis', count: 32 },
  { topic: 'Writing', count: 28 },
  { topic: 'Q&A', count: 24 },
  { topic: 'Math', count: 12 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs border-violet-500/20">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#8b5cf6' }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl">Analytics</h1>
            <p className="text-white/40 text-sm mt-0.5">Track your AI usage and performance metrics</p>
          </div>
          <Badge variant="violet">Last 13 days</Badge>
        </div>
      </motion.div>

      {/* Top stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Requests', value: '385', trend: '+23%', icon: BarChart3, color: 'violet' },
          { label: 'Total Tokens', value: '154K', trend: '+18%', icon: Zap, color: 'cyan' },
          { label: 'Avg Latency', value: '1.2s', trend: '-15%', icon: Clock, color: 'green' },
          { label: 'Sessions', value: '48', trend: '+31%', icon: Activity, color: 'amber' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }}>
            <Card className="group hover:border-white/15 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    stat.color === 'violet' ? 'bg-violet-500/15' :
                    stat.color === 'cyan' ? 'bg-cyan-500/15' :
                    stat.color === 'green' ? 'bg-green-500/15' : 'bg-amber-500/15'
                  }`}>
                    <stat.icon className={`w-4 h-4 ${
                      stat.color === 'violet' ? 'text-violet-400' :
                      stat.color === 'cyan' ? 'text-cyan-400' :
                      stat.color === 'green' ? 'text-green-400' : 'text-amber-400'
                    }`} />
                  </div>
                  <Badge variant={stat.color === 'green' ? 'green' : stat.color === 'cyan' ? 'cyan' : 'violet'} className="text-[10px]">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="font-display font-bold text-2xl">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests over time */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Requests Over Time</CardTitle>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-violet-500/60" />
                    Requests
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={requestsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="requests" name="Requests" stroke="#8b5cf6" strokeWidth={2} fill="url(#reqGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Model Usage Pie */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Model Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {modelUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Legend
                      formatter={(value) => <span className="text-xs text-white/60">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {modelUsage.map((m) => (
                  <div key={m.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                      <span className="text-white/60">{m.name}</span>
                    </div>
                    <span className="font-medium">{m.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tokens over time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Token Usage (Daily)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={requestsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="tokens" name="Tokens" fill="#22d3ee" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hourly pattern */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Activity by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="requests"
                      name="Requests"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 3, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top topics */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Conversation Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topicData.map((topic) => {
                const pct = Math.round((topic.count / 45) * 100)
                return (
                  <div key={topic.topic} className="flex items-center gap-4">
                    <div className="w-16 text-xs text-white/50">{topic.topic}</div>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-xs text-white/50 text-right">{topic.count}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
