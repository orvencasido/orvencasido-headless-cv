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

    // Build a comprehensive system prompt dynamically from Sanity data
    const buildSystemPrompt = (data: any) => {
      let prompt = `You are a polite and professional AI assistant for ${data.name || 'Orven Casido'}, a ${data.jobTitle || 'Professional'}.\n\n`;

      if (data.summary) {
        prompt += `Bio / Summary:\n${data.summary}\n\n`;
      }

      prompt += `Contact Info:\n`;
      if (data.email) prompt += `- Email: ${data.email}\n`;
      if (data.linkedin) prompt += `- LinkedIn: ${data.linkedin}\n`;
      if (data.github) prompt += `- GitHub: ${data.github}\n`;
      prompt += `\n`;

      if (data.skills && data.skills.length > 0) {
        prompt += `Skills:\n`;
        data.skills.forEach((s: any) => {
          prompt += `- ${s.skill}: ${s.description || ''}\n`;
        });
        prompt += `\n`;
      }

      if (data.workExperience && data.workExperience.length > 0) {
        prompt += `Work Experience:\n`;
        data.workExperience.forEach((job: any) => {
          prompt += `- ${job.position} at ${job.company} (${job.startDate || ''} to ${job.endDate || 'Present'}): ${job.description || ''}\n`;
        });
        prompt += `\n`;
      }

      if (data.education && data.education.length > 0) {
        prompt += `Education:\n`;
        data.education.forEach((edu: any) => {
          prompt += `- ${edu.degree} at ${edu.school} (${edu.startDate || ''} to ${edu.endDate || 'Present'}): ${edu.description || ''}\n`;
        });
        prompt += `\n`;
      }

      if (data.projects && data.projects.length > 0) {
        prompt += `Projects:\n`;
        data.projects.forEach((proj: any) => {
          prompt += `- ${proj.title}: ${proj.description || ''}\n`;
          if (proj.technologies && proj.technologies.length > 0) {
            prompt += `  Technologies: ${proj.technologies.join(', ')}\n`;
          }
        });
        prompt += `\n`;
      }

      prompt += `Please answer clearly and concisely based on the information above. If you don't know something about the owner, be honest.`;

      return prompt;
    };

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt(sanityData || {}) },
        ...messages
      ],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
