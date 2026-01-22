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
  static model = "qwen2.5-coder:3b";

  static _AI = new Ollama({
    host: process.env.OLLAMA_HOST || "http://localhost:11434",
  });

  public static async getIntent(prompt: string): Promise<IntentResponse> {
    console.log(`Intent for prompt: ${prompt} via Ollama model.`);

    try {
      const response = await this._AI.chat({
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
        options: {
          temperature: 0,
        },
        format: "json", // Request JSON format response
      });

      console.log(
        "\n\nRaw response from Ollama API:",
        response.message.content,
      );
      console.log("\n\n");

      return JSON.parse(response.message.content || "{}") as IntentResponse;
    } catch (error: any) {
      console.error("Error calling Ollama API:", error);
      throw error;
    }
  }

  public static async getPolicy(param: Policy): Promise<string> {
    try {
      const response = await this._AI.chat({
        model: this.model,
        messages: [
          {
            role: "system",
            content: PolicyInstruction,
          },
          {
            role: "user",
            content: JSON.stringify(param),
          },
        ],
        options: {
          temperature: 0,
        },
        format: "json", // Request JSON format response
      });

      console.log(
        "\n\nRaw response from Ollama API:",
        response.message.content,
      );
      console.log("\n\n");

      const parsed = JSON.parse(response.message.content || "{}");
      return parsed.policy || "";
    } catch (error) {
      console.error("Error calling Ollama API:", error);
      throw error;
    }
  }

  public static async genDraft(param: genDraft): Promise<genDraftResponse> {
    try {
      const response = await this._AI.chat({
        model: this.model,
        messages: [
          {
            role: "system",
            content: GenDraftInstruction,
          },
          {
            role: "user",
            content: JSON.stringify(param),
          },
        ],
        options: {
          temperature: 0,
        },
        format: "json", // Request JSON format response
      });

      console.log(
        "\n\nRaw response from Ollama API:",
        response.message.content,
      );
      console.log("\n\n");

      return JSON.parse(response.message.content || "{}") as genDraftResponse;
    } catch (error) {
      console.error("Error calling Ollama API:", error);
      throw error;
    }
  }

  public static async ruleValidation(prompt: string): Promise<string> {
    return `Rule validation for prompt: ${prompt} via Ollama model.`;
  }

  // Method to check if Ollama server is running
  public static async isServerRunning(): Promise<boolean> {
    try {
      await this._AI.list();
      return true;
    } catch (error) {
      console.warn("Ollama server is not running or not accessible:", error);
      return false;
    }
  }

  // Method to list available models
  public static async listModels(): Promise<string[]> {
    try {
      const response = await this._AI.list();
      return response.models.map((model) => model.name);
    } catch (error) {
      console.error("Error listing Ollama models:", error);
      return [];
    }
  }

  // Method to set a different model
  public static setModel(modelName: string): void {
    this.model = modelName;
    console.log(`Ollama model set to: ${modelName}`);
  }
}

export default OllamaModel;
