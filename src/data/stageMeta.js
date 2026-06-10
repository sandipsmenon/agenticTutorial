// Pure metadata (no JSX) so node-side logic can know stages without importing components.
export const STAGE_IDS = [
  'what-is-ai',
  'llm-slm',
  'tokens',
  'training',
  'local',
  'agents',
  'mcp',
  'prompt-engineering',
  'embeddings-rag',
  'hallucinations-safety',
  'finetune-vs-rag',
  'multimodal',
]

export const TOTAL_STAGES = STAGE_IDS.length
