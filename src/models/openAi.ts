import type { IntentResponse } from "../types.js";

class openAi {
  public static async getIntent(prompt: string): Promise<IntentResponse> {
    console.log(`Intent for prompt: ${prompt} via OpenAI model.`);
    return {
      type: "email",
      mode: "strictly_professional",
      strictnessLevel: 3,
    };
  }

  public static async getPolicy(prompt: string) {
    return `Policy for prompt: ${prompt} via OpenAI model.`;
  }

  public static async genDraft(prompt: string) {
    return `Draft for prompt: ${prompt} via OpenAI model.`;
  }

  public static async ruleValidation(prompt: string) {
    return `Rule validation for prompt: ${prompt} via OpenAI model.`;
  }
}

export default openAi;
