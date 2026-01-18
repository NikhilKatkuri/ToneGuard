import OpenAI from "openai";
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

class openAi {
  static model = "gpt-3.5-turbo";

  static _AI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  public static async getIntent(prompt: string): Promise<IntentResponse> {
    console.log(`Intent for prompt: ${prompt} via OpenAI model.`);

    try {
      const res = await this._AI.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: intentInstruction,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
      });
      console.log(
        "\n\nRaw response from OpenAI API:",
        res.choices[0]?.message?.content,
      );
      console.log("\n\n");

      return JSON.parse(
        res.choices[0]?.message?.content || "{}",
      ) as IntentResponse;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getPolicy(param: Policy): Promise<string> {
    try {
      const res = await this._AI.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: PolicyInstruction,
          },
          {
            role: "user",
            content: { ...param }.toString(),
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
      });
      console.log(
        "\n\nRaw response from OpenAI API:",
        res.choices[0]?.message?.content,
      );
      console.log("\n\n");
      return JSON.parse(res.choices[0]?.message?.content || "{}").policy || "";
    } catch (error) {
      throw error;
    }
  }

  public static async genDraft(param: genDraft): Promise<genDraftResponse> {
    try {
      const res = await this._AI.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: GenDraftInstruction,
          },
          {
            role: "user",
            content: { ...param }.toString(),
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
      });
      console.log(
        "\n\nRaw response from OpenAI API:",
        res.choices[0]?.message?.content,
      );
      console.log("\n\n");
      return JSON.parse(
        res.choices[0]?.message?.content || "{}",
      ) as genDraftResponse;
    } catch (error) {
      throw error;
    }
  }

  public static async ruleValidation(prompt: string) {
    return `Rule validation for prompt: ${prompt} via OpenAI model.`;
  }
}

export default openAi;
