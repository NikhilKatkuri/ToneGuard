import gemini from "./models/gemini.js";
import openAi from "./models/openAi.js";
import type { agent, Policy } from "./types.js";

const getModel = (agent: agent) => {
  switch (agent) {
    case "Ollama":
      console.log("Running Ollama model...");
      break;
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
    const ai: agent = "gemini";
    console.log(`Selected AI agent: ${ai}`);
    const model = getModel(ai);

    if (model) {
      const prompt =
        "Write a letter to my hr (galatcix solution pvt ltd), that i want to resign intern ship because i have got a better opportunity in google";

      const IntentResponse = await model.getIntent(prompt);
      console.log("--- Generating Policy ---");
      const PolicyResponse = await model.getPolicy({
        ...IntentResponse,
        prompt,
      });

      console.log("--- Generating Final Draft (Thinking Mode Active) ---");

      const Draft = await model.genDraft({
        ...IntentResponse,
        prompt,
        policy: PolicyResponse,
      });

      console.log("Generated Draft:\n", Draft);
    }
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
};

await main();
