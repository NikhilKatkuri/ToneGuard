import { GoogleGenAI } from "@google/genai";
import type {
  genDraft,
  genDraftResponse,
  IntentResponse,
  Policy,
} from "../types.js";
import "dotenv/config";
import {
  GenDraftInstruction,
  intentInstruction,
  PolicyInstruction,
} from "../instructions.js";

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
      console.log("\n\nRaw response from Gemini API:", res.text);
      console.log("\n\n");

      return JSON.parse(res.text || "{}") as IntentResponse;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getPolicy(param: Policy): Promise<string> {
    try {
      const res = await this._AI.models.generateContent({
        model: this.model,
        contents: { ...param }.toString(),
        config: {
          systemInstruction: PolicyInstruction,
          responseMimeType: "application/json",
          temperature: 0,
        },
      });
      console.log("\n\nRaw response from Gemini API:", res.text);
      console.log("\n\n");
      return JSON.parse(res.text || "{}").policy || "";
    } catch (error) {
      throw error;
    }
  }

  public static async genDraft(param: genDraft): Promise<genDraftResponse> {
    try {
      const res = await this._AI.models.generateContent({
        model: this.model,
        contents: { ...param }.toString(),
        config: {
          systemInstruction: GenDraftInstruction,
          responseMimeType: "application/json",
          temperature: 0,
        },
      });
      console.log("\n\nRaw response from Gemini API:", res.text);
      console.log("\n\n");
      return JSON.parse(res.text || "{}") as genDraftResponse;
    } catch (error) {
      throw error;
    }
  }

  public static async ruleValidation(prompt: string) {
    return `Rule validation for prompt: ${prompt} via Gemini model.`;
  }
}

export default gemini;
