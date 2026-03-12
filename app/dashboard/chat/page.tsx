"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Send, Copy, Check, Bot, User, Sparkles,
  MoreHorizontal, ChevronDown, Loader2, MessageSquare,
  Code, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatRelativeTime, generateId, truncate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

const INITIAL_SESSION: ChatSession = {
  id: 'welcome',
  title: 'New conversation',
  messages: [],
  createdAt: new Date(),
}

const STARTER_PROMPTS = [
  { icon: '💡', label: 'Explain a concept', prompt: 'Explain how neural networks learn from data in simple terms' },
  { icon: '🧑‍💻', label: 'Write code', prompt: 'Write a React hook for managing async state with loading and error states' },
  { icon: '📝', label: 'Draft content', prompt: 'Write a compelling product description for an AI-powered productivity app' },
  { icon: '🔍', label: 'Analyze data', prompt: 'What are the key metrics I should track for a SaaS business?' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
    </button>
  )
}

function CodeBlock({ language, children }: { language: string; children: string }) {
  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-white/[0.08]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.06]">
        <span className="text-xs text-white/40 font-mono">{language || 'code'}</span>
        <CopyButton text={children} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '16px',
          background: 'rgba(0,0,0,0.3)',
          fontSize: '13px',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-start gap-3 group", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
        isUser
          ? "bg-gradient-to-br from-violet-500 to-cyan-500"
          : "bg-gradient-to-br from-violet-700 to-violet-900 border border-violet-500/30"
      )}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Sparkles className="w-4 h-4 text-white" />
        }
      </div>

      {/* Message content */}
      <div className={cn(
        "flex-1 max-w-[85%]",
        isUser && "flex flex-col items-end"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm relative",
          isUser
            ? "bg-violet-600/25 border border-violet-500/20 text-white rounded-tr-sm"
            : "bg-white/[0.04] border border-white/[0.08] text-white/90 rounded-tl-sm"
        )}>
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose-chat">
              {message.isStreaming && message.content === '' ? (
                <div className="loading-dots flex gap-1 py-1">
                  <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      const codeStr = String(children).replace(/\n$/, '')

                      return !inline && match ? (
                        <CodeBlock language={match[1]} key={codeStr}>
                          {codeStr}
                        </CodeBlock>
                      ) : (
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-violet-300 text-xs font-mono" {...props}>
                          {children}
                        </code>
                      )
                    },
                    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                    h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-violet-500 pl-4 italic text-white/60 my-3">{children}</blockquote>
                    ),
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{children}</a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
              {message.isStreaming && message.content && (
                <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse align-text-bottom" />
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={cn(
          "flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
          isUser && "flex-row-reverse"
        )}>
          <span className="text-[10px] text-white/25">
            {formatRelativeTime(message.timestamp)}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="p-1 rounded-md hover:bg-white/10 transition-colors text-white/30 hover:text-white/60"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([INITIAL_SESSION])
  const [activeSessionId, setActiveSessionId] = useState(INITIAL_SESSION.id)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const activeSession = sessions.find(s => s.id === activeSessionId)!

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [activeSession?.messages, scrollToBottom])

  const adjustTextareaHeight = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 200) + 'px'
    }
  }

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: generateId(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
    }
    setSessions(prev => [newSession, ...prev])
    setActiveSessionId(newSession.id)
  }

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSessions(prev => prev.filter(s => s.id !== id))
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id)
      if (remaining.length > 0) setActiveSessionId(remaining[0].id)
      else createNewSession()
    }
  }

  const updateSessionTitle = (sessionId: string, firstMessage: string) => {
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, title: truncate(firstMessage, 40) }
        : s
    ))
  }

  const sendMessage = async (content?: string) => {
    const messageContent = content || input.trim()
    if (!messageContent || isLoading) return

    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    }

    const assistantMsg: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }

    // Update session with user message
    setSessions(prev => prev.map(s =>
      s.id === activeSessionId
        ? { ...s, messages: [...s.messages, userMsg, assistantMsg] }
        : s
    ))

    // Update title if first message
    if (activeSession.messages.length === 0) {
      updateSessionTitle(activeSessionId, messageContent)
    }

    setIsLoading(true)
    abortRef.current = new AbortController()

    try {
      const currentSession = sessions.find(s => s.id === activeSessionId)!
      const allMessages = [...currentSession.messages, userMsg]

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId: activeSessionId,
        }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) throw new Error('API Error')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break

            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                fullContent += delta
                const currentContent = fullContent

                setSessions(prev => prev.map(s =>
                  s.id === activeSessionId
                    ? {
                        ...s,
                        messages: s.messages.map(m =>
                          m.id === assistantMsg.id
                            ? { ...m, content: currentContent }
                            : m
                        ),
                      }
                    : s
                ))
              }
            } catch {}
          }
        }
      }

      // Mark streaming as done
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId
          ? {
              ...s,
              messages: s.messages.map(m =>
                m.id === assistantMsg.id
                  ? { ...m, isStreaming: false }
                  : m
              ),
            }
          : s
      ))
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setSessions(prev => prev.map(s =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: s.messages.map(m =>
                  m.id === assistantMsg.id
                    ? { ...m, content: '⚠️ Something went wrong. Please try again.', isStreaming: false }
                    : m
                ),
              }
            : s
        ))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-0px)] md:h-screen flex overflow-hidden">
      {/* Chat Sidebar */}
      <div className="hidden sm:flex flex-col w-64 border-r border-white/[0.06] bg-black/10 shrink-0">
        <div className="p-3 border-b border-white/[0.06]">
          <Button
            variant="glass"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={createNewSession}
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={cn(
                  "group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                  session.id === activeSessionId
                    ? "bg-violet-500/15 border border-violet-500/20 text-white"
                    : "hover:bg-white/[0.04] text-white/60 hover:text-white"
                )}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 text-white/40" />
                <span className="text-xs flex-1 truncate">{session.title}</span>
                <button
                  onClick={(e) => deleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/10 transition-all"
                >
                  <Trash2 className="w-3 h-3 text-white/40 hover:text-red-400 transition-colors" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>llama3-8b-8192</span>
            <span>·</span>
            <span className="text-green-400">Active</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium">{activeSession.title}</div>
              <div className="text-xs text-white/30">Powered by Groq · llama3-8b-8192</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-violet-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={createNewSession}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-3xl mx-auto py-6">
            {activeSession.messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center mb-6 animate-float glow-violet">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl mb-2">How can I help you?</h2>
                <p className="text-white/40 text-sm mb-8 max-w-sm">
                  I'm NexTech AI, powered by Groq's lightning-fast LPU. Ask me anything.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {STARTER_PROMPTS.map((starter) => (
                    <button
                      key={starter.label}
                      onClick={() => sendMessage(starter.prompt)}
                      className="text-left p-4 glass-card hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group rounded-xl"
                    >
                      <div className="text-base mb-1">{starter.icon}</div>
                      <div className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">{starter.label}</div>
                      <div className="text-[11px] text-white/30 mt-0.5 line-clamp-1">{starter.prompt}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {activeSession.messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative glass-card rounded-2xl overflow-hidden border-white/10 focus-within:border-violet-500/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder="Message NexTech AI..."
                rows={1}
                className="w-full bg-transparent resize-none px-4 py-3.5 pr-14 text-sm placeholder:text-white/20 focus:outline-none leading-relaxed max-h-48"
                style={{ height: 'auto' }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                {isLoading ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => abortRef.current?.abort()}
                  >
                    <span className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
                  </Button>
                ) : (
                  <Button
                    variant="gradient"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-center text-[10px] text-white/15 mt-2">
              Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
