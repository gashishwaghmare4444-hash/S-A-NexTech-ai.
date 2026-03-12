import { NextRequest, NextResponse } from 'next/server'

// Demo sessions data (used when Supabase is not configured)
const demoSessions = [
  { id: '1', user_id: 'demo', title: 'Building a REST API', model: 'llama3-8b-8192', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', user_id: 'demo', title: 'Quantum computing basics', model: 'llama3-8b-8192', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!supabaseUrl || supabaseUrl.includes('your_')) {
      return NextResponse.json(demoSessions)
    }

    // Real implementation with Supabase
    const { createServerClient } = await import('@/lib/supabase')
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(demoSessions)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, model } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!supabaseUrl || supabaseUrl.includes('your_')) {
      return NextResponse.json({
        id: Math.random().toString(36).slice(2),
        user_id: 'demo',
        title: title || 'New conversation',
        model: model || 'llama3-8b-8192',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    const { createServerClient } = await import('@/lib/supabase')
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('sessions')
      .insert({ title: title || 'New conversation', model: model || 'llama3-8b-8192', user_id: 'demo' })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
