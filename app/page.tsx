"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Zap, Shield, Cpu, Globe, Star, Check, ChevronDown, ChevronUp, Menu, X, Sparkles, Brain, BarChart3, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by Groq\'s ultra-fast LPU inference engine. Get responses in milliseconds, not seconds.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Brain,
    title: 'Advanced Intelligence',
    description: 'Access state-of-the-art LLaMA 3 models with deep reasoning capabilities and context awareness.',
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, SOC2 compliance, and granular access controls keep your data safe.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Usage Analytics',
    description: 'Comprehensive dashboards tracking token usage, request volume, and cost optimization.',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Deployed across 30+ edge locations worldwide for minimal latency wherever you are.',
    gradient: 'from-pink-400 to-rose-600',
  },
  {
    icon: Cpu,
    title: 'API First',
    description: 'RESTful API with comprehensive SDKs for Python, JavaScript, and every major language.',
    gradient: 'from-amber-400 to-yellow-600',
  },
]

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: ['50 requests/day', '100K tokens/month', 'Basic analytics', 'Community support', 'Standard models'],
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For power users and developers',
    features: ['500 requests/day', '2M tokens/month', 'Advanced analytics', 'Priority support', 'All models', 'API access', 'Custom system prompts'],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For teams and organizations',
    features: ['Unlimited requests', '50M tokens/month', 'Custom analytics', 'Dedicated support', 'Custom fine-tuning', 'SSO/SAML', 'SLA guarantee', 'Custom models'],
    highlighted: false,
    badge: null,
  },
]

const faqs = [
  {
    q: 'How fast are the AI responses?',
    a: 'Our Groq-powered infrastructure delivers responses at 500+ tokens per second — significantly faster than traditional GPU-based solutions. Most responses complete in under 2 seconds.',
  },
  {
    q: 'What AI models are available?',
    a: 'We currently offer LLaMA 3 8B and 70B models via Groq, with more models being added regularly. Pro users get early access to new models.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'Absolutely. We use AES-256 encryption at rest and in transit. Conversations are never used for model training. Enterprise plans include data residency options.',
  },
  {
    q: 'Can I use the API programmatically?',
    a: 'Yes! Pro and Enterprise plans include full API access with OpenAI-compatible endpoints, making migration from other providers seamless.',
  },
  {
    q: 'What happens if I exceed my limits?',
    a: 'You\'ll receive notifications as you approach limits. We never cut off conversations mid-stream — you\'ll be able to complete your current session.',
  },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-x-hidden">
      {/* Mesh background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-cyan-950/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                S&A <span className="gradient-text-static">NexTech</span> AI
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Pricing', 'FAQ', 'Docs'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="gradient" size="sm">Get started free</Button>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-black/80 backdrop-blur-xl p-4 space-y-4"
          >
            {['Features', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-white/70 hover:text-white py-2">
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign in</Button>
              </Link>
              <Link href="/auth/signup" className="flex-1">
                <Button variant="gradient" size="sm" className="w-full">Get started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-white/70 mb-8 border border-violet-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Powered by Groq LPU — 500+ tokens/second
            <ArrowRight className="w-3 h-3" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6"
          >
            The AI Platform{' '}
            <span className="gradient-text">Built for Speed</span>
            {' '}& Scale
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            S&A NexTech AI delivers blazing-fast AI responses through Groq's revolutionary LPU technology. 
            Chat, analyze, and build — at unprecedented speed.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/signup">
              <Button variant="gradient" size="xl" className="group w-full sm:w-auto">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '500+', label: 'Tokens/sec' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '<100ms', label: 'Avg latency' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl gradient-text-static mb-1">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual - Chat demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-3xl mx-auto mt-20 glass-card p-1 shadow-2xl shadow-violet-900/20"
        >
          <div className="rounded-xl overflow-hidden">
            {/* Window header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-xs text-white/30 ml-2 font-mono">nextech-ai — chat</span>
            </div>
            {/* Chat messages */}
            <div className="p-6 space-y-4 bg-[#080810]">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold shrink-0">U</div>
                <div className="glass-card px-4 py-3 text-sm text-white/80 max-w-sm">
                  Explain quantum entanglement in simple terms
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="glass-card px-4 py-3 text-sm text-white/80 max-w-lg leading-relaxed">
                    <span className="text-violet-400 font-medium">Quantum entanglement</span> is like having two magical coins that are always connected, no matter how far apart they are...
                    <span className="inline-block w-0.5 h-4 bg-violet-400 ml-1 animate-pulse align-text-bottom" />
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-white/30">
                    <span className="text-green-400">● 487 tok/s</span>
                    <span>llama3-8b-8192</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="violet" className="mb-4">Features</Badge>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4">
              Everything you need to build{' '}
              <span className="gradient-text-static">faster</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A complete AI development platform with all the tools, APIs, and infrastructure to ship production AI features.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="glass-card p-6 group hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="cyan" className="mb-4">Pricing</Badge>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-white/50 text-lg">Start free. Scale as you grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-violet-600/20 to-cyan-600/10 border border-violet-500/30 glow-violet'
                    : 'glass-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="violet" className="shadow-lg shadow-violet-900/50">{plan.badge}</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl">${plan.price}</span>
                    <span className="text-white/40 text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup">
                  <Button
                    variant={plan.highlighted ? 'gradient' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.price === 0 ? 'Get started free' : `Start ${plan.name}`}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="green" className="mb-4">FAQ</Badge>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-violet-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display font-bold text-4xl tracking-tight mb-4">
                Ready to build with{' '}
                <span className="gradient-text-static">AI superpowers</span>?
              </h2>
              <p className="text-white/50 mb-8 text-lg">
                Join thousands of developers using S&A NexTech AI to ship faster.
              </p>
              <Link href="/auth/signup">
                <Button variant="gradient" size="xl" className="group">
                  Start building for free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-display font-semibold text-sm">S&A NexTech AI</span>
            </div>
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} S&A NexTech AI. Built with ❤️ using Next.js & Groq.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
