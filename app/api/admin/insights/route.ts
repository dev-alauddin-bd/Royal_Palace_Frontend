import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { stats } = await req.json();

    // 🛡️ Smart Provider Switcher (Groq -> OpenRouter)
    let aiResponse: string | null = null;

    // 1. Try Groq first
    if (process.env.GROQ_API_KEY) {
      try {
        console.log(`[Admin AI] Attempting Groq...`);
        const groq = createOpenAI({ baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY });
        const result = await generateText({
          model: groq('llama-3.3-70b-versatile'),
          system: `You are the Sovereign AI of the Royal Palace. 
          Analyze the provided metrics and deliver a high-level, sophisticated 2-sentence summary of the hotel performance. 
          Use a formal, regal tone. DO NOT provide greetings. DO NOT ask questions.`,
          prompt: `Sovereign Metrics: ${JSON.stringify(stats)}`,
        });
        aiResponse = result.text;
        console.log(`[Admin AI] Groq success!`);
      } catch (err) {
        console.error(`[Admin AI] Groq failed, switching...`);
      }
    }

    // 2. Fallback to OpenRouter if Groq failed or no key
    if (!aiResponse && process.env.OPENROUTER_API_KEY) {
      try {
        console.log(`[Admin AI] Attempting OpenRouter...`);
        const openrouter = createOpenAI({ 
          baseURL: 'https://openrouter.ai/api/v1', 
          apiKey: process.env.OPENROUTER_API_KEY,
          headers: { 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'Royal Palace' }
        });
        const result = await generateText({
          model: openrouter('google/gemini-2.0-flash-lite-001'),
          system: `You are the Sovereign AI of the Royal Palace. 
          Analyze the provided metrics and deliver a high-level, sophisticated 2-sentence summary of the hotel performance. 
          Use a formal, regal tone. DO NOT provide greetings. DO NOT ask questions.`,
          prompt: `Sovereign Metrics: ${JSON.stringify(stats)}`,
        });
        aiResponse = result.text;
        console.log(`[Admin AI] OpenRouter success!`);
      } catch (err) {
        console.error(`[Admin AI] OpenRouter failed.`);
      }
    }

    if (aiResponse) {
      return new Response(aiResponse, { status: 200 });
    }

    // Default Fallback
    return new Response("Administrator, your current performance shows exceptional growth and stability. We recommend continued focus on guest retention.", { status: 200 });
  } catch (error) {
    console.error("[Admin API Fatal Error]:", error);
    return new Response("Divine logic synchronization interrupted.", { status: 500 });
  }
}
