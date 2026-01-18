export type ToneGuardMode =
  | "neutral"
  | "strictly_professional"
  | "legal_compliance";

export interface IntentResponse {
  type: "email" | "letter" | "message";
  mode: ToneGuardMode;
  strictnessLevel: number; // 1 to 5 scale 1 has the least strictness and 5 has the most strictness
}

export type agent = "Ollama" | "gemini" | "openai";

export interface Policy {
  id: string;
  requiredPhrases: string[]; // Legal jargon or mandatory disclaimers
  prohibitedPhrases: string[]; // Emotional triggers or informal slang
  maxAdjectiveCount: number; // To enforce "Zero Emotion" (usually set to 0 or 1)
  complianceStandard: "ISO" | "GDPR" | "Internal_Legal";
  retryLimit: number; // How many times to loop back on 'fail'
}

export interface PolicyMap {
  [intent: string]: Policy; // Maps intent (e.g., "termination") to a Policy
}
