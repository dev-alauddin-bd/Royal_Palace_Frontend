import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';

// 🛡️ Simple In-Memory Cache to save tokens
let recommendationCache: any = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 Hour

export async function POST(req: Request) {
  try {
    const { rooms, forceRefresh } = await req.json();

    // Check if we have a valid cache and not forcing a refresh
    const now = Date.now();
    if (!forceRefresh && recommendationCache && (now - lastCacheTime < CACHE_DURATION)) {
      console.log("[Room AI] Returning cached recommendation.");
      return new Response(JSON.stringify(recommendationCache), { status: 200 });
    }

    // 🛡️ Smart Provider Switcher (Groq -> OpenRouter)
    let aiResponse: string | null = null;

    // 1. Try Groq first
    if (process.env.GROQ_API_KEY) {
      try {
        console.log(`[Room AI] Attempting Groq...`);
        const groq = createOpenAI({ baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY });
        const result = await generateText({
          model: groq('llama-3.3-70b-versatile'),
          system: `You are the Royal Palace Elite Concierge. 
          Your task is to pick EXACTLY ONE most prestigious room from the provided list. 
          Output ONLY a single, sophisticated paragraph (max 20 words) explaining why this specific room is the ultimate choice for a sovereign guest. 
          DO NOT list other rooms. DO NOT ask questions. DO NOT provide a greeting.`,
          prompt: `Select the most luxurious room from this inventory: ${JSON.stringify(rooms.slice(0, 5).map((r: any) => ({ title: r.title, price: r.price })))}`,
        });
        aiResponse = result.text;
        console.log(`[Room AI] Groq success!`);
      } catch (err) {
        console.error(`[Room AI] Groq failed, switching...`);
      }
    }

    // 2. Fallback to OpenRouter if Groq failed or no key
    if (!aiResponse && process.env.OPENROUTER_API_KEY) {
      try {
        console.log(`[Room AI] Attempting OpenRouter...`);
        const openrouter = createOpenAI({
          baseURL: 'https://openrouter.ai/api/v1',
          apiKey: process.env.OPENROUTER_API_KEY,
          headers: { 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'Royal Palace' }
        });
        const result = await generateText({
          model: openrouter('google/gemini-2.0-flash-lite-001'),
          system: `You are the Royal Palace Elite Concierge. 
          Your task is to pick EXACTLY ONE most prestigious room from the provided list. 
          Output ONLY a single, sophisticated paragraph (max 20 words) explaining why this specific room is the ultimate choice for a sovereign guest. 
          DO NOT list other rooms. DO NOT ask questions. DO NOT provide a greeting.`,
          prompt: `Select the most luxurious room from this inventory: ${JSON.stringify(rooms.slice(0, 5).map((r: any) => ({ title: r.title, price: r.price })))}`,
        });
        aiResponse = result.text;
        console.log(`[Room AI] OpenRouter success!`);
      } catch (err) {
        console.error(`[Room AI] OpenRouter failed.`);
      }
    }

    if (aiResponse) {
      const selectedRoom = rooms.find((r: any) => aiResponse?.toLowerCase().includes(r.title.toLowerCase())) || rooms[0];
      const result = {
        roomTitle: selectedRoom?.title,
        explanation: aiResponse,
        roomId: selectedRoom?._id,
        image: selectedRoom?.images?.[0]
      };
      
      // Update Cache
      recommendationCache = result;
      lastCacheTime = Date.now();
      
      return new Response(JSON.stringify(result), { status: 200 });
    }

    // 🏆 Final Fallback if both providers fail
    return new Response(JSON.stringify({
      roomTitle: rooms[0]?.title || "Royal Suite",
      explanation: "Our most sought-after suite, offering unparalleled elegance and panoramic views of the royal domain.",
      roomId: rooms[0]?._id,
      image: rooms[0]?.images?.[0] || "/images/Hero-Banner.webp"
    }), { status: 200 });

  } catch (error) {
    console.error("[Room API Fatal Error]:", error);
    return new Response(JSON.stringify({ error: "Registry synchronization failed" }), { status: 500 });
  }
}
