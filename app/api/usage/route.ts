import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Demo usage data
  const demoData = {
    today: {
      requests: 34,
      tokens: 13600,
      limit: 50,
    },
    monthly: {
      requests: 385,
      tokens: 154000,
      limit: 100000,
    },
    weekly: [
      { date: '2024-03-07', requests: 35, tokens: 14000 },
      { date: '2024-03-08', requests: 29, tokens: 11600 },
      { date: '2024-03-09', requests: 41, tokens: 16400 },
      { date: '2024-03-10', requests: 38, tokens: 15200 },
      { date: '2024-03-11', requests: 45, tokens: 18000 },
      { date: '2024-03-12', requests: 42, tokens: 16800 },
      { date: '2024-03-13', requests: 34, tokens: 13600 },
    ],
  }

  return NextResponse.json(demoData)
}

export async function POST(req: NextRequest) {
  try {
    const { userId, tokensUsed, requestsCount } = await req.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl.includes('your_')) {
      return NextResponse.json({ success: true })
    }

    const { createServerClient } = await import('@/lib/supabase')
    const supabase = createServerClient()

    await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_tokens: tokensUsed || 0,
      p_requests: requestsCount || 1,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track usage' }, { status: 500 })
  }
}
