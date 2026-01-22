import gemini from "./models/gemini.js";
import openAi from "./models/openAi.js";
import OllamaModel from "./models/ollama.js";
import type { agent, Policy } from "./types.js";

const getModel = (agent: agent) => {
  switch (agent) {
    case "Ollama":
      return OllamaModel;
    case "gemini":
      return gemini;
    case "openai":
      return openAi;
    default:
      throw new Error("Unsupported agent");
  }
};

const validateDraft = (
  draft: string,
  strictness: number
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
        issues.push(`Forbidden emotional term detected: "${regex.source}"`);
      }
    });
  }

  // 2. Formatting & Adjective Check (For Level 5)
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
          `Level 5 Violation: Subjective adverb detected: "${regex.source}"`
        );
      }
    });
  }

  // 3. Placeholder Logic
  // Matches [Text] but NOT [[Text]]. Uses negative lookbehind and lookahead.
  const genericPlaceholderRegex = /(?<!\[)\[(?!\[).+?\](?!\])/g;

  if (genericPlaceholderRegex.test(draft)) {
    issues.push(
      "Improper placeholder format. Use [[VARIABLE_NAME]] instead of [Name]."
    );
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
};

const main = async () => {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let agentName: agent = "Ollama"; // Default
    let promptParts: string[] = [];

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--agent" && i + 1 < args.length) {
        const val = args[i + 1].toLowerCase();
        if (val === "ollama") agentName = "Ollama";
        else if (val === "gemini") agentName = "gemini";
        else if (val === "openai") agentName = "openai";
        i++; // Skip next arg
      } else {
        promptParts.push(args[i]);
      }
    }

    const prompt = promptParts.length > 0
      ? promptParts.join(" ")
      : "Draft a formal email to an employee, John Doe, terminating his employment effective immediately due to repeated policy violations despite warnings.";

    console.log(`\nUsing Agent: ${agentName}`);
    console.log(`Prompt: "${prompt}"\n`);

    console.time("Total Execution Time");
    const model = getModel(agentName);

    if (model) {
      console.log("--- Analyzing Intent ---");
      const IntentResponse = await model.getIntent(prompt);
      console.log(`Intent Detected: Type=${IntentResponse.type}, Mode=${IntentResponse.mode}, Level=${IntentResponse.strictnessLevel}`);

      console.log("\n--- Generating Policy ---");
      const PolicyResponse = await model.getPolicy({
        ...IntentResponse,
        prompt,
      });
      console.log("Policy Generated.");

      console.log("\n--- Generating Final Draft (Thinking Mode Active) ---");

      let Draft = await model.genDraft({
        ...IntentResponse,
        prompt,
        policy: PolicyResponse,
      });

      console.log("Generated Draft:\n", Draft.draft);
      let finalOutput = Draft.draft;

      console.log("\n--- Validating Draft ---");
      let validation = validateDraft(finalOutput, Draft.strictnessLevel);

      let attempts = 0;
      const maxAttempts = 3;

      while (!validation.isValid && attempts < maxAttempts) {
        attempts++;
        console.log(`\nValidation Failed (Attempt ${attempts}/${maxAttempts}). Issues:`);
        validation.issues.forEach((issue) => console.log("- " + issue));

        const correctionPrompt = `
    The previous draft FAILED validation for Strictness Level ${Draft.strictnessLevel}.
    ISSUES: ${validation.issues.join(", ")}
    ACTION: Fix these specific issues. Remove banned words. Strictly follow the policy.
    Rewrite the draft.
  `;
        console.log("Regenerating with feedback...");

        Draft = await model.genDraft({
          ...IntentResponse,
          prompt: prompt + "   " + correctionPrompt,
          policy: PolicyResponse,
        });

        finalOutput = Draft.draft;
        console.log("New Draft Candidate:\n", finalOutput);
        validation = validateDraft(finalOutput, Draft.strictnessLevel);
      }

      if (validation.isValid) {
        console.log("\n\nSUCCESS: Draft matches all strictness criteria.");
        console.log("Final Output:\n--------------------------------------------------\n", finalOutput, "\n--------------------------------------------------");
      } else {
        console.log("\n\nFAILURE: Draft failed validation after max attempts.");
        console.log("Last Output:\n", finalOutput);
      }
    }
    console.timeEnd("Total Execution Time");
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
};

await main();
