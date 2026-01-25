import { Ollama } from "ollama";
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

class OllamaModel {
  // 2026 Low-Spec Optimization
  static intent_model = "qwen2.5:0.5b"; // Tiny & Fast
  static policy_model = "qwen2.5:0.5b";
  static draft_model = "qwen2.5-coder:1.5b-instruct"; // Faster than 3b for 8GB RAM

  static _AI = new Ollama({
    host: process.env.OLLAMA_HOST || "http://localhost:11434",
  });

  private static logTime(label: string, startTime: number) {
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    console.log(`[TIMER] ${label}: ${duration}s`);
    return duration;
  }

  // Common options optimized for Ryzen 3 / 8GB RAM
  private static getLowSpecOptions(isDraft: boolean) {
    return {
      temperature: 0,
      num_ctx: 1024, // Reduce memory footprint significantly
      num_thread: 4, // Force Ryzen 3 core usage
      num_predict: isDraft ? 300 : 100, // Stop yapping early to save time
      low_vram: true, // Hint to Ollama to be careful with memory
    };
  }

  public static async getIntent(prompt: string): Promise<IntentResponse> {
    const start = performance.now();
    try {
      const response = await this._AI.chat({
        model: this.intent_model,
        messages: [
          { role: "system", content: intentInstruction },
          { role: "user", content: prompt },
        ],
        options: this.getLowSpecOptions(false),
        keep_alive: "30m", // Keep in RAM so the next call is instant
        format: "json",
      });

      this.logTime("Intent Analysis", start);
      return JSON.parse(response.message.content || "{}");
    } catch (error) {
      console.error("Intent Error:", error);
      throw error;
    }
  }

  public static async getPolicy(param: Policy): Promise<string> {
    const start = performance.now();
    try {
      const response = await this._AI.chat({
        model: this.policy_model,
        messages: [
          { role: "system", content: PolicyInstruction },
          { role: "user", content: JSON.stringify(param) },
        ],
        options: this.getLowSpecOptions(false),
        keep_alive: "30m",
        format: "json",
      });

      this.logTime("Policy Retrieval", start);
      const parsed = JSON.parse(response.message.content || "{}");
      return parsed.policy || "";
    } catch (error) {
      console.error("Policy Error:", error);
      throw error;
    }
  }

  public static async genDraft(param: genDraft): Promise<genDraftResponse> {
    const start = performance.now();
    try {
      const response = await this._AI.chat({
        model: this.draft_model,
        messages: [
          { role: "system", content: GenDraftInstruction },
          { role: "user", content: JSON.stringify(param) },
        ],
        options: this.getLowSpecOptions(true),
        keep_alive: "30m",
        format: "json",
      });

      this.logTime("Draft Generation", start);
      return JSON.parse(response.message.content || "{}");
    } catch (error) {
      console.error("Draft Error:", error);
      throw error;
    }
  }

  public static async listModels(): Promise<string[]> {
    try {
      const response = await this._AI.list();
      return response.models.map((model) => model.name);
    } catch (error) {
      return [];
    }
  }
}

export default OllamaModel;
