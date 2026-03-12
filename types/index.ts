export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  model: string
  createdAt: Date
  updatedAt: Date
}

export interface UsageData {
  date: string
  requests: number
  tokens: number
}

export interface DashboardStats {
  totalRequests: number
  totalTokens: number
  activeSessions: number
  todayRequests: number
  weeklyRequests: UsageData[]
  tokensByDay: UsageData[]
}

export type PlanType = 'free' | 'pro' | 'enterprise'

export interface Plan {
  name: string
  price: number
  features: string[]
  dailyRequests: number
  monthlyTokens: number
}
