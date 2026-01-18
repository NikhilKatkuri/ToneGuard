import { GoogleGenAI } from "@google/genai";
import type { IntentResponse } from "../types.js";
import "dotenv/config";
import { intentInstruction } from "../instructions.js";

class gemini {
  static model = "gemini-3-flash-preview";

  static _AI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  public static async getIntent(prompt: string): Promise<IntentResponse> {
    console.log(`Intent for prompt: ${prompt} via Gemini model.`);

    try {
      const res = await this._AI.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          systemInstruction: intentInstruction,
          responseMimeType: "application/json",
          temperature: 0,
        },
      });
      console.log("Raw response from Gemini API:", res.text);

      return JSON.parse(res.text || "{}") as IntentResponse;
    } catch (error: any) {
      if (error.status === 429) {
        console.error("Google Gemini API rate limit exceeded!");
        console.error(
          "You have reached the free tier limit of 20 requests per day."
        );
        console.error("Please wait or upgrade your plan to continue.");

        const retryInfo = error.details?.find(
          (detail: any) =>
            detail["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
        );

        if (retryInfo?.retryDelay) {
          console.error(`Suggested retry delay: ${retryInfo.retryDelay}`);
        }

        // Return mock response for development
        console.log("🔄 Returning mock response for development...");
        return {
          type: "email",
          mode: "strictly_professional",
          strictnessLevel: 3,
        };
      } else if (error.status === 401) {
        console.error(
          "Invalid API key. Please check your GOOGLE_API_KEY environment variable."
        );
        throw new Error("Invalid API key configuration");
      } else if (error.status >= 500) {
        console.error(
          "Google Gemini API server error. Please try again later."
        );
        throw new Error("API server error");
      } else {
        console.error("Unexpected error:", error.message);
        throw error;
      }
    }
  }

  public static async getPolicy(prompt: string) {
    return `Policy for prompt: ${prompt} via Gemini model.`;
  }

  public static async genDraft(prompt: string) {
    return `Draft for prompt: ${prompt} via Gemini model.`;
  }

  public static async ruleValidation(prompt: string) {
    return `Rule validation for prompt: ${prompt} via Gemini model.`;
  }
}

export default gemini;
