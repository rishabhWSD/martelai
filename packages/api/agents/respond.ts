// packages/api/agents/respond.ts
import { NextResponse } from 'next/server';
import { streamAgentReply } from '@/lib/agents/chatMemory';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt, agent } = await req.json();

    if (!prompt || !agent) {
      return NextResponse.json(
        { error: 'Missing prompt or agent' },
        { status: 400 }
      );
    }

    const stream = await streamAgentReply(prompt, agent);
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Agent API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
