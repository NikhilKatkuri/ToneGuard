import gemini from "./models/gemini.js";
import openAi from "./models/openAi.js";
import OllamaModel from "./models/ollama.js";
import type { agent, Policy } from "./types.js";

const getModel = (agent: agent) => {
  switch (agent) {
    case "Ollama":
      console.log("Running Ollama model...");
      return OllamaModel;
    case "gemini":
      return gemini;

    case "openai":
      return openAi;

    default:
      throw new Error("Unsupported agent");
  }
};

const main = async () => {
  try {
    console.time("Total Execution Time");
    const ai: agent = "Ollama"; // Changed to use Ollama
    console.log(`Selected AI agent: ${ai}`);
    const model = getModel(ai);

    if (model) {
      const prompt =
        "Generate a formal resignation letter for Nikhil Kumar (Employee ID: 12345) at Galatcix Solution Pvt Ltd. Reason: Career transition to Google. Effective: Immediately. Include a standard acknowledgement of internship guidance. Mode: Strictly Professional. Strictness: 5.";
      const IntentResponse = await model.getIntent(prompt);
      console.log("--- Generating Policy ---");
      const PolicyResponse = await model.getPolicy({
        ...IntentResponse,
        prompt,
      });

      console.log("--- Generating Final Draft (Thinking Mode Active) ---");

      let Draft = await model.genDraft({
        ...IntentResponse,
        prompt,
        policy: PolicyResponse,
      });

      console.log("Generated Draft:\n", Draft);
      const finalOutput = Draft.draft;
      console.log("\n\nFinal Output:\n", finalOutput);

      const validateDraft = (
        draft: string,
        strictness: number,
      ): { isValid: boolean; issues: string[] } => {
        const issues: string[] = [];

        // 1. Emotional Keywords Check (Cumulative for Level 3 and above)
        if (strictness >= 3) {
          const forbidden = [
            /thank/i,
            /appreciate/i,
            /hope/i,
            /feel/i,
            /sorry/i,
            /regret/i,
            /wish/i,
            /pleas(ed|ure)/i, // Added "pleased" or "pleasure"
          ];

          forbidden.forEach((regex) => {
            if (regex.test(draft)) {
              issues.push(
                `Forbidden emotional term detected: "${regex.source}"`,
              );
            }
          });
        }

        // 2. Formatting & Adjective Check (For Level 5)
        // Logic: If Level 5, we look for common subjective adverbs that the AI might sneak in.
        if (strictness === 5) {
          const subjectiveAdverbs = [
            /extremely/i,
            /very/i,
            /kindly/i,
            /fortunately/i,
            /unfortunately/i,
          ];
          subjectiveAdverbs.forEach((regex) => {
            if (regex.test(draft)) {
              issues.push(
                `Level 5 Violation: Subjective adverb detected: "${regex.source}"`,
              );
            }
          });
        }

        // 3. Placeholder Logic
        // We allow double brackets [[NAME]] as valid system placeholders.
        // We REJECT single brackets [Name] or empty brackets [] as "hallucinated placeholders."
        const genericPlaceholderRegex = /\[(?!\[).+?\]/g; // Matches [Text] but not [[Text]]

        if (genericPlaceholderRegex.test(draft)) {
          issues.push(
            "Improper placeholder format. Use [[VARIABLE_NAME]] instead of [Name].",
          );
        }

        return {
          isValid: issues.length === 0,
          issues,
        };
      };
      console.log("\n\n--- Validating Draft ---");
      const validation = validateDraft(finalOutput, Draft.strictnessLevel);
      if (!validation.isValid) {
        const correctionPrompt = `
    The previous draft FAILED validation for Strictness Level 5.
    ISSUES: ${validation.issues.join(", ")}
    ACTION: Remove all emotional language, adjectives, and "Thank you" phrases. 
    Rewrite using ONLY nouns and verbs.
  `;
        Draft = await model.genDraft({
          ...IntentResponse,
          prompt: prompt + "   " + correctionPrompt,
          policy: PolicyResponse,
        });
      }
      if (validation.isValid) {
        console.log("Draft is valid and meets the policy requirements.");
      } else {
        console.log("Draft validation failed. Issues found:");
        validation.issues.forEach((issue) => console.log("- " + issue));
      }
    }
    console.timeEnd("Total Execution Time");
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
};

await main();
