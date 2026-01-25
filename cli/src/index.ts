import OllamaModel from "./models/ollama.js";
import { performance } from "perf_hooks";

const validateDraft = (draft: string, strictness: number) => {
  const issues: string[] = [];
  if (strictness >= 3) {
    const forbidden = [/thank/i, /appreciate/i, /hope/i, /feel/i, /sorry/i];
    forbidden.forEach((r) => {
      if (r.test(draft)) issues.push(`Forbidden: "${r.source}"`);
    });
  }
  if (strictness === 5) {
    const adverbs = [/extremely/i, /very/i, /kindly/i, /unfortunately/i];
    adverbs.forEach((r) => {
      if (r.test(draft)) issues.push(`Level 5 Violation: "${r.source}"`);
    });
  }
  return { isValid: issues.length === 0, issues };
};

const main = async () => {
  const pipelineStart = performance.now();
  const prompt =
    process.argv.slice(2).join(" ") ||
    "Draft a formal termination for John Doe due to policy violations.";

  try {
    console.log(`\n[ToneGuard 2026] Target: <30s Latency`);

    // STEP 1: INTENT
    const t1 = performance.now();
    const intent = await OllamaModel.getIntent(prompt);
    console.log(
      `Step 1: Intent Detected (${((performance.now() - t1) / 1000).toFixed(2)}s)`,
    );

    // STEP 2: POLICY
    const t2 = performance.now();
    const policy = await OllamaModel.getPolicy({ ...intent, prompt });
    console.log(
      `Step 2: Policy Built (${((performance.now() - t2) / 1000).toFixed(2)}s)`,
    );

    // STEP 3: DRAFTING & VALIDATION LOOP
    let attempts = 0;
    let isValid = false;
    let finalDraft = "";

    while (!isValid && attempts < 3) {
      attempts++;
      const t3 = performance.now();
      const res = await OllamaModel.genDraft({ ...intent, prompt, policy });
      finalDraft = res.draft;

      const validation = validateDraft(finalDraft, intent.strictnessLevel);
      console.log(
        `Step 3: Draft Attempt ${attempts} (${((performance.now() - t3) / 1000).toFixed(2)}s)`,
      );

      if (validation.isValid) {
        isValid = true;
      } else {
        console.warn(`Validation failed: ${validation.issues.join(", ")}`);
        // Feed the failure back into the prompt for the next loop
        intent.prompt = `${prompt} [CORRECTION: Remove ${validation.issues.join(", ")}]`;
      }
    }

    const totalTime = ((performance.now() - pipelineStart) / 1000).toFixed(2);
    console.log(`\n--------------------------------------------------`);
    console.log(isValid ? "SUCCESS" : "FAILED (MAX ATTEMPTS)");
    console.log(`TOTAL TIME: ${totalTime}s`);
    console.log(`DRAFT:\n${finalDraft}`);
    console.log(`--------------------------------------------------`);
  } catch (error) {
    console.error("Critical Failure:", error);
  }
};

main();
