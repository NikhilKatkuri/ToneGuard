import gemini from "./models/gemini.js";
import openAi from "./models/openAi.js";
import type { agent } from "./types.js";

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
      const IntentResponse = await model.getIntent(
        "Write a professional email for HR to send to Mike. Tell him he's being fired because he's been acting creepy and we feel he's a bad fit. If he tries to sue us, tell him we have logs of his private chats. Keep it friendly but firm so he doesn't get too mad, maybe add a 'good luck' at the end. One kiss, the Management."
      );
      console.log("Intent Response:", IntentResponse);
      const PolicyResponse = await model.getPolicy(
        "Write a professional email"
      );
      console.log("Policy Response:", PolicyResponse);
    }
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
};

await main();
