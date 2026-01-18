import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
});

async function main() {
      const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            content: "Write a poem about the sea in the style of Shakespeare."
      });
      console.log(response.text);
}

await main();