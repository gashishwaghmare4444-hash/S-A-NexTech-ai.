import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const groqKey = process.env.GROQ_API_KEY

    if (!groqKey) {
      // Return a demo response if no API key
      const demoResponse = generateDemoResponse(messages[messages.length - 1]?.content || '')
      return streamDemoResponse(demoResponse)
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: 'system',
            content: 'You are NexTech AI, a highly capable, helpful, and friendly AI assistant powered by Groq\'s ultra-fast LPU inference. You provide clear, accurate, and thoughtful responses. Format code in markdown code blocks when relevant.',
          },
          ...messages,
        ],
        max_tokens: 2048,
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)

      // Fall back to demo response
      const demoResponse = generateDemoResponse(messages[messages.length - 1]?.content || '')
      return streamDemoResponse(demoResponse)
    }

    // Return the stream directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateDemoResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase()

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! I'm **NexTech AI**, powered by Groq's ultra-fast LPU technology. I'm ready to help you with anything — coding, analysis, creative writing, or just a conversation. What can I do for you today?"
  }

  if (lower.includes('code') || lower.includes('function') || lower.includes('python') || lower.includes('javascript')) {
    return `Sure! Here's an example:

\`\`\`python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

# Example usage
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

This function uses dynamic programming to efficiently generate the Fibonacci sequence. The time complexity is **O(n)** and space complexity is **O(n)**.

Would you like me to explain how it works or show a different approach?`
  }

  if (lower.includes('groq') || lower.includes('speed') || lower.includes('fast')) {
    return `**Groq** is a revolutionary AI inference company that built the **LPU (Language Processing Unit)** — a chip specifically designed for AI inference.

Key advantages:
- ⚡ **500+ tokens/second** — 10x faster than GPU-based solutions
- 🎯 **Deterministic latency** — consistent response times
- 💚 **Energy efficient** — lower cost per token
- 🔥 **No memory bandwidth bottleneck** — the main limitation of GPUs

This is why NexTech AI feels so **blazing fast** compared to other AI platforms. The LPU architecture is fundamentally different from GPUs — it's designed from the ground up for transformer inference.`
  }

  return `I'm **NexTech AI**, running in demo mode since no Groq API key is configured.

To enable real AI responses:
1. Get a free API key at [console.groq.com](https://console.groq.com)
2. Add \`GROQ_API_KEY=your_key\` to your \`.env.local\` file
3. Restart the dev server

In production, I'll be powered by **Llama 3 8B** via Groq's LPU infrastructure, delivering responses at **500+ tokens per second**.

For now, I can still demonstrate the full UI and interaction flow. What would you like to explore?`
}

function streamDemoResponse(text: string): Response {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split('')
      let i = 0

      for (const char of words) {
        await new Promise(r => setTimeout(r, 15 + Math.random() * 10))

        const chunk = {
          id: 'demo',
          object: 'chat.completion.chunk',
          choices: [{
            delta: { content: char },
            index: 0,
            finish_reason: null,
          }],
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
      }

      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
