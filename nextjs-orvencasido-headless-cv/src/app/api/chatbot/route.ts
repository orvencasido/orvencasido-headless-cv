import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import contextData from '@/components/chatbot/context.json';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemMessage = {
      role: 'system',
      content: contextData.systemPrompt
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
