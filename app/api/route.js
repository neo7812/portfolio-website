import { AzureOpenAI } from "openai";
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_MODEL || "gpt-35-turbo";
const apiVersion = "2024-04-01-preview";

if (!endpoint || !apiKey || !deployment) {
  throw new Error("Missing required environment variables");
}

const client = new AzureOpenAI({
  apiKey,
  endpoint,
  deployment,
  apiVersion,
});

const DATA_RESUME = `
SAURABH UPADHYAY
saurabhu294@gmail.com 9936498445
SUMMARY
Enthusiastic team player ready to contribute to company success. I take keen interest in algorithms and love problem
solving. Seeking opportunities to further enhance my technical skills.
EXPERIENCE
Senior Associate
Genpact September 2023 - Present IN, UTTAR , PRADESH, Noida
Intern
Genpact February 2023 - June 2023, IN, UTTAR PRADESH, Noida
PROJECTS
FB DM HELPDESK
This app will allow clients to connect their fb accounts, listen to their messenger messages, and reply to them within the
application.
•
• Tech-stack used: HTML5,CSS3,JavaScript,Node.js,Express.js
• Database: MongoDB
•Mongoose
Real-time chat app
• Self learning project
• Tech stack used - node.js, Socket.IO
EDUCATION
B.Tech in Computer Science and Engineering,NIET GREATER NOIDA2019-2023
2023
SKILLS
SKILLS
Technical Skills - C++, HTML5, CSS, JavaScript, Node.js, React
Coursework - Data Structures and Algorithms, OOPs
Frameworks - Express.js
Tools - Sublime Text, VSCode
Databases: MySQL, MongoDB
Version Control - Git
Leetcode - https://leetcode.com/Saurabh_Upadhyay/
SOFT SKILLS
Verbal and Written Communication
Collaborative
Quick to adapt
Detail-Oriented
Diligent`;

export async function POST(req) {
    try {
        const { messages } = await req.json();

        const systemMessage = {
            role: 'system',
            content: `You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Saurabh from his resume.`
        };

        const fullMessages = [systemMessage, ...messages];

        const response = await client.chat.completions.create({
            messages: fullMessages,
            max_tokens: 128
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'There was an error processing your request.',
            error: error.message
        }, { status: 500 });
    }
}