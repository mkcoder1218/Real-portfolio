import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, API calls should go through a backend proxy to hide the key.
// For this portfolio demo, we assume the key is safe or restricted.
const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateBotResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please contact the developer directly!";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are an AI assistant for a developer portfolio website. The developer is Mikeyas, an ambitious Full-Stack React/Next.js Engineer from Ethiopia.
      
      Key Profile Details:
      - Name: Mikeyas
      - Experience: 3+ years.
      - Tech Stack: React, Next.js, TypeScript, Python, Node.js.
      - Interests: AI, DevOps (Docker/K8s), Automation.
      - Personality: Self-taught, detail-oriented, ambitious, loves clean architecture.
      - Location: Addis Ababa, Ethiopia.
      - Projects: Real Estate Map, Betting Platform, Admin Dashboards.
      
      Your goal is to answer visitors' questions about Mikeyas professionally but with a futuristic, tech-savvy tone. 
      Keep answers concise (under 3 sentences if possible).
      If asked about contact info, direct them to the contact form.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System error. My AI circuits are slightly overloaded. Please try again.";
  }
};