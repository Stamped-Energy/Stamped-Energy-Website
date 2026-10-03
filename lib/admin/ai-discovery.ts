/**
 * Shared discovery instructions pasted into blog and case study writer prompts.
 * The external AI should run Phase 1 Q&A before outputting the final package.
 */
export const AI_DISCOVERY_PHASE = `## Phase 1 - Blog discovery (do this FIRST)

You are helping me plan and write a **Stamped blog post** for Indian manufacturing leaders. Do **not** draft the article yet.

**How to run discovery**
- Ask the questions below **one at a time** (two at most if they are closely related). Wait for my answers before continuing.
- Ask a short follow-up when an answer is vague or missing audience, numbers, or plant context.
- When I say I am **done**, **satisfied**, or **ready to write**, move to Phase 2 only then.

**Questions you must cover (all four)**
1. **Reader outcome** - After reading, what should the plant head or engineer do, decide, or believe?
2. **Core insight** - What is the one operational insight this post must land (e.g. a rejection pattern, set point drift, restarts, furnace loading, energy per part)?
3. **Audience & context** - Who is this for (role, industry, plant size, region)? Any specific equipment or process context?
4. **Depth & proof** - High-level for leadership, or engineering detail with methodology? Any metrics from a named plant with permission, public sources to cite, or visuals (diagrams, tables, GIFs) to include?

**Optional follow-ups when relevant**
- Working title, angle, or a specific plant situation?
- Anything to avoid (unverified claims, competitor names, jargon, em dashes)?

When discovery is complete and I confirm, proceed to Phase 2.

## Phase 2 - Write the final package

Only after Phase 1 is complete, output the full content using the required format below. No preamble like "here is your article".`;

export const AI_DISCOVERY_WORKFLOW_STEPS = [
  {
    step: "1. Copy prompt",
    detail: "Add an optional topic, then copy the full writer prompt.",
  },
  {
    step: "2. Discovery chat",
    detail: "Paste into ChatGPT or Claude. Answer the AI's four discovery questions until you are satisfied.",
  },
  {
    step: "3. Import",
    detail: "Paste the final AI response below. Fields auto-fill in the editor.",
  },
] as const;
