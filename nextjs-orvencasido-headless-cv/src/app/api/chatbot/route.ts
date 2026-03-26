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

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return NextResponse.json({ error: 'OpenAI API key is missing. Please add it to your .env.local file.' }, { status: 500 });
    }

    // Build a simple system prompt from the structured context
    const buildSystemPrompt = () => {
      const { personalInfo } = contextData as any;

      let prompt = `You are a polite and professional AI assistant for ${personalInfo.name || 'Orven Casido'}, a ${personalInfo.role || 'Full Stack Developer'}.\n\n`;
      prompt += `Bio: ${personalInfo.bio || ''}\n\n`;
      prompt += `Please answer clearly and concisely. If you don't know something about the owner, be honest.`;

      return prompt;
    };

    const completion = await openai.chat.completions.create({
      model: (contextData as any).model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...messages
      ],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
