import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { client } from '@/sanity/client';

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

    if (!process.env.OPENAI_MODEL) {
      return NextResponse.json({ error: 'OpenAI Model is missing. Please add it to your .env.local file.' }, { status: 500 });
    }

    // Fetch the latest resume data directly from Sanity
    const query = `*[_type == "resume"][0]{
      name,
      jobTitle,
      email,
      phone,
      website,
      linkedin,
      github,
      summary,
      "skills": skills[]{ skill, description },
      "workExperience": workExperience[]{ company, position, startDate, endDate, description, responsibilities },
      "education": education[]{ school, degree, startDate, endDate, description },
      "projects": projects[]{ title, description, link, technologies }
    }`;

    // Use no-store to ensure the chatbot always has your latest info
    const sanityData = await client.fetch(query, {}, { cache: 'no-store' });

    // Build a HIGHLY CONCISE system prompt to save tokens
    const buildSystemPrompt = (data: any) => {
      let prompt = `You're an AI for ${data.name || 'Orven'}, a ${data.jobTitle || 'Dev'}. `;

      if (data.summary) {
        prompt += `Bio: ${data.summary.substring(0, 150)}... `;
      }

      if (data.skills && data.skills.length > 0) {
        prompt += `Skills: ${data.skills.map((s: any) => s.skill).join(', ')}. `;
      }

      if (data.workExperience && data.workExperience.length > 0) {
        prompt += `Exp: ${data.workExperience.map((job: any) => `${job.position}@${job.company}`).join(', ')}. `;
      }

      if (data.education && data.education.length > 0) {
        prompt += `Edu: ${data.education.map((edu: any) => edu.degree).join(', ')}. `;
      }

      if (data.projects && data.projects.length > 0) {
        prompt += `Projects: ${data.projects.map((proj: any) => proj.title).join(', ')}. `;
      }

      prompt += `Keep answers brief.`;

      // 1 token ≈ 4 characters. Cap system prompt at 800 chars (~200 tokens)
      return prompt.length > 800 ? prompt.substring(0, 800) : prompt;
    };

    const systemContent = buildSystemPrompt(sanityData || {});

    // Cap chat history at 400 characters (~100 tokens) to ensure total input is < 300 tokens
    let charCount = 0;
    const cappedMessages = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const contentLen = (msg.content || '').length;

      if (charCount + contentLen > 400) break;

      cappedMessages.unshift(msg);
      charCount += contentLen;
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      max_tokens: 300,
      messages: [
        { role: 'system', content: systemContent },
        ...cappedMessages
      ],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
