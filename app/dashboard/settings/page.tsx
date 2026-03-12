"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Palette, Key, Trash2, Save, Eye, EyeOff, Check, Bell, Shield, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [name, setName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex@example.com')
  const [selectedModel, setSelectedModel] = useState('llama3-8b-8192')
  const [selectedTheme, setSelectedTheme] = useState('dark-violet')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const models = [
    { id: 'llama3-8b-8192', name: 'LLaMA 3 8B', speed: '500 tok/s', badge: 'Fast' },
    { id: 'llama3-70b-8192', name: 'LLaMA 3 70B', speed: '180 tok/s', badge: 'Smart' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', speed: '350 tok/s', badge: 'Balanced' },
  ]

  const themes = [
    { id: 'dark-violet', label: 'Violet', primary: '#8b5cf6', accent: '#22d3ee' },
    { id: 'dark-cyan', label: 'Cyan', primary: '#22d3ee', accent: '#8b5cf6' },
    { id: 'dark-rose', label: 'Rose', primary: '#f43f5e', accent: '#8b5cf6' },
    { id: 'dark-amber', label: 'Amber', primary: '#f59e0b', accent: '#22d3ee' },
  ]

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl">Settings</h1>
        <p className="text-white/40 text-sm mt-0.5">Manage your account and preferences</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <User className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xl font-bold">
                A
              </div>
              <Button variant="outline" size="sm">Change avatar</Button>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <Button variant="gradient" size="sm" onClick={handleSave} className="gap-2">
              {saved ? <><Check className="w-3.5 h-3.5" /> Saved!</> : <><Save className="w-3.5 h-3.5" /> Save changes</>}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Preferences */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-base">AI Preferences</CardTitle>
                <CardDescription>Configure your default AI model and behavior</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Default Model</label>
              <div className="space-y-2">
                {models.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                      selectedModel === model.id
                        ? "border-violet-500/40 bg-violet-500/10"
                        : "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 transition-colors",
                        selectedModel === model.id ? "border-violet-400 bg-violet-400" : "border-white/20"
                      )} />
                      <div>
                        <div className="text-sm font-medium">{model.name}</div>
                        <div className="text-xs text-white/40">{model.speed}</div>
                      </div>
                    </div>
                    <Badge variant="violet" className="text-[10px]">{model.badge}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center">
                <Palette className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize your interface theme</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Color Theme</label>
              <div className="flex gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all",
                      selectedTheme === theme.id ? "border-white/30" : "border-transparent hover:border-white/10"
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                      }}
                    />
                    <span className="text-[10px] text-white/50">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* API Keys */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
                <Key className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription>Manage your developer API access</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Your Groq API Key</label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  placeholder="gsk_••••••••••••••••••••••••"
                  className="pr-10"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-white/25 mt-1">
                Your key is encrypted and stored securely. Get a key at{' '}
                <a href="https://console.groq.com" target="_blank" className="text-violet-400 hover:underline">console.groq.com</a>
              </p>
            </div>
            <Button variant="gradient" size="sm" className="gap-2">
              <Save className="w-3.5 h-3.5" />
              Save key
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Notifications</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Usage limit warnings', desc: 'Get notified at 80% and 100% usage', enabled: true },
                { label: 'New features', desc: 'Be the first to know about updates', enabled: true },
                { label: 'Monthly usage report', desc: 'Receive a summary each month', enabled: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-white/30">{item.desc}</div>
                  </div>
                  <div
                    className={cn(
                      "w-10 h-5.5 rounded-full transition-colors cursor-pointer relative",
                      item.enabled ? "bg-violet-500" : "bg-white/10"
                    )}
                    style={{ height: '22px', width: '40px' }}
                  >
                    <div className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                      item.enabled ? "translate-x-5" : "translate-x-0.5"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="border-red-500/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-base text-red-400">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/10 bg-red-500/5">
              <div>
                <div className="text-sm font-medium">Delete all conversations</div>
                <div className="text-xs text-white/30">Permanently removes all chat history</div>
              </div>
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
                Delete
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/10 bg-red-500/5">
              <div>
                <div className="text-sm font-medium">Delete account</div>
                <div className="text-xs text-white/30">Permanently delete your account and data</div>
              </div>
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
                Delete account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
