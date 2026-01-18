export type ToneGuardMode =
  | "neutral"
  | "strictly_professional"
  | "legal_compliance";

type StrictnessLevel = 1 | 2 | 3 | 4 | 5;
type format = "email" | "letter" | "message";
export interface IntentResponse {
  type: format;
  mode: ToneGuardMode;
  strictnessLevel: StrictnessLevel; // 1 to 5 scale 1 has the least strictness and 5 has the most strictness
}

export type agent = "Ollama" | "gemini" | "openai";

export interface Policy extends IntentResponse {
  prompt: string;
}
export interface genDraft extends Policy {
  policy: string;
}

export interface genDraftResponse {
  status: "success" | "refused";
  type: format;
  strictnessLevel: StrictnessLevel;
  mode: ToneGuardMode;
  draft: string;
  violationReason: string | null;
}
