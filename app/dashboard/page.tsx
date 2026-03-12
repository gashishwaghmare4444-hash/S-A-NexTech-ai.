"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageSquare, Zap, BarChart3, TrendingUp, ArrowRight, Clock, Sparkles, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyData = [
  { day: 'Mon', requests: 12, tokens: 4800 },
  { day: 'Tue', requests: 19, tokens: 7600 },
  { day: 'Wed', requests: 8, tokens: 3200 },
  { day: 'Thu', requests: 27, tokens: 10800 },
  { day: 'Fri', requests: 35, tokens: 14000 },
  { day: 'Sat', requests: 14, tokens: 5600 },
  { day: 'Sun', requests: 22, tokens: 8800 },
]

const recentChats = [
  { id: '1', title: 'Building a REST API with Express', time: '2 hours ago', messages: 12 },
  { id: '2', title: 'Explain quantum computing basics', time: '5 hours ago', messages: 8 },
  { id: '3', title: 'React hooks best practices', time: 'Yesterday', messages: 24 },
  { id: '4', title: 'Python data analysis with pandas', time: '2 days ago', messages: 16 },
]

const statCards = [
  {
    title: 'Requests Today',
    value: '34',
    limit: '50',
    percent: 68,
    icon: MessageSquare,
    trend: '+12%',
    color: 'violet',
  },
  {
    title: 'Tokens Used',
    value: '48.2K',
    limit: '100K',
    percent: 48,
    icon: Zap,
    trend: '+8%',
    color: 'cyan',
  },
  {
    title: 'Active Sessions',
    value: '4',
    limit: null,
    percent: null,
    icon: Activity,
    trend: 'Live',
    color: 'green',
  },
  {
    title: 'Avg Response',
    value: '1.2s',
    limit: null,
    percent: null,
    icon: TrendingUp,
    trend: '-0.3s',
    color: 'amber',
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-violet-400">{payload[0].value} requests</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display font-bold text-2xl">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back. Here's your AI usage overview.</p>
        </div>
        <Link href="/dashboard/chat">
          <Button variant="gradient" size="sm" className="group">
            <Sparkles className="w-4 h-4 mr-2" />
            New Chat
            <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Card className="relative overflow-hidden group hover:border-white/15 transition-all duration-300">
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
                <div className="font-display font-bold text-2xl mb-0.5">{stat.value}</div>
                <div className="text-xs text-white/40 mb-3">
                  {stat.title}
                  {stat.limit && <span className="text-white/20"> / {stat.limit}</span>}
                </div>
                {stat.percent !== null && (
                  <Progress value={stat.percent} className="h-1" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Weekly Requests</CardTitle>
                <Badge variant="violet" className="text-xs">This week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#requestGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Chats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Chats</CardTitle>
                <Link href="/dashboard/chat">
                  <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white h-7">
                    View all <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {recentChats.map((chat) => (
                  <li key={chat.id}>
                    <Link href={`/dashboard/chat?session=${chat.id}`}>
                      <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-violet-300 transition-colors">{chat.title}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-white/30">
                            <Clock className="w-3 h-3" />
                            {chat.time}
                            <span>·</span>
                            {chat.messages} msgs
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: MessageSquare, title: 'Start AI Chat', desc: 'Have a conversation with Llama 3', href: '/dashboard/chat', color: 'violet' },
                { icon: BarChart3, title: 'View Analytics', desc: 'Explore your usage patterns', href: '/dashboard/analytics', color: 'cyan' },
                { icon: Zap, title: 'Check Usage', desc: 'Monitor tokens and requests', href: '/dashboard/usage', color: 'green' },
              ].map((action) => (
                <Link key={action.title} href={action.href}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03] transition-all group cursor-pointer">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      action.color === 'violet' ? 'bg-violet-500/15' :
                      action.color === 'cyan' ? 'bg-cyan-500/15' : 'bg-green-500/15'
                    }`}>
                      <action.icon className={`w-4 h-4 ${
                        action.color === 'violet' ? 'text-violet-400' :
                        action.color === 'cyan' ? 'text-cyan-400' : 'text-green-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-violet-300 transition-colors">{action.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-white/20 group-hover:text-violet-400 group-hover:translate-x-1 transition-all mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
