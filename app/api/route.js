import { AzureOpenAI } from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_MODEL || 'gpt-35-turbo';
const apiVersion = '2024-04-01-preview';

if (!endpoint || !apiKey || !deployment) {
  throw new Error('Missing required environment variables');
}

const client = new AzureOpenAI({
  apiKey,
  endpoint,
  deployment,
  apiVersion,
});

const DATA_RESUME = `
SAURABH UPADHYAY 9936498445 ⋄ Renukoot, Sonbhadra Email ⋄ Linkedin ⋄ Github ⋄ Portfolio OBJECTIVE Enthusiastic team player ready to contribute to company success. I take keen interest in full stack development. Seeking opportunities to further enhance my technical skills.. SKILLS SUMMARY Languages : Freamworks : Tools : Skills : EDUCATION JavaScript,C++,Typescript,C,HTML,CSS Node.js, Express.js, MongoDB, React.js, Next.js, MySQL, Tailwind CSS Git, Postman, REST APIs, Linux Front-end, Back-end, Agile B.Tech, Computer Science Engineering, NIET, Greater Noida EXPERIENCE 2019- 2023 Senior Associate Genpact • Master Data Management PROJECTS Sept 2023- Sept 2024 Noida SilentEcho (Fullstack,Typescript) (Link) (Github Link) • Developed a production-level app in Next.js, incorporating Zod for robust data validation, Resend for email handling, and NextAuth for authentication, including custom OTP functionality. • Integrated advanced features like AI-driven components, message APIs with aggregation pipelines, and React Hook Form with shadcn for enhanced user interactions and form handling. • Built and enhanced the user dashboard and navigation, ensuring seamless interaction with features like carousel elements, debouncing, and error management to deliver a smooth user experience. SaaSify (Front-end, Typescript) (Link) (Github Link) • Developed a responsive SaaS landing page using React, Next.js, TailwindCSS, and Framer Motion, with a focus on engaging animations and visual appeal. • Implemented dynamic features such as parallax effects and micro-interactions to enhance user experience across devices. • Optimized product showcase, pricing, and testimonials sections for consistency and responsiveness on mobile, tablet, and desktop views. INTERPERSONAL SKILLS • Problem solving, Verbal and Written Communication, Collaborative, Quick to adapt, Detail-Oriented. OTHER LINKS • Leetcode • Geeksforgeeks;
`;
export async function POST(req) {
  try {
    const { messages } = await req.json();

    const systemMessage = {
      role: 'system',
      content: `You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Saurabh from his resume.`,
    };

    const fullMessages = [systemMessage, ...messages];

    const response = await client.chat.completions.create({
      messages: fullMessages,
      max_tokens: 128,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        message: 'There was an error processing your request.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
