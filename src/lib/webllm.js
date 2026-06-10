// WebLLM wrapper — the ONLY place @mlc-ai/web-llm is referenced, and only via
// dynamic import, so it ships as a lazy chunk and never bloats the main bundle.

export const MODELS = [
  {
    id: 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC',
    f32Id: 'Qwen2.5-0.5B-Instruct-q4f32_1-MLC',
    label: 'Qwen 2.5 — 0.5B (small & speedy)',
    size: '≈ 420 MB',
  },
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    f32Id: 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
    label: 'Llama 3.2 — 1B (smarter, bigger)',
    size: '≈ 780 MB',
  },
]

export async function detectWebGPU() {
  try {
    if (typeof navigator === 'undefined' || !navigator.gpu) return { supported: false, hasF16: false }
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) return { supported: false, hasF16: false }
    return { supported: true, hasF16: adapter.features?.has?.('shader-f16') ?? false }
  } catch {
    return { supported: false, hasF16: false }
  }
}

export function pickModelId(model, hasF16) {
  return hasF16 ? model.id : model.f32Id
}

let engine = null
let engineModelId = null
let loadingPromise = null

export function getLoadedModelId() {
  return engine ? engineModelId : null
}

export async function isModelCached(modelId) {
  try {
    const webllm = await import('@mlc-ai/web-llm')
    return await webllm.hasModelInCache(modelId)
  } catch {
    return false
  }
}

// onProgress(fraction 0..1, statusText)
export async function loadEngine(modelId, onProgress) {
  if (engine && engineModelId === modelId) return engine
  if (loadingPromise) return loadingPromise
  loadingPromise = (async () => {
    const webllm = await import('@mlc-ai/web-llm')
    if (engine) {
      await engine.unload().catch(() => {})
      engine = null
    }
    engine = await webllm.CreateMLCEngine(modelId, {
      initProgressCallback: (r) => onProgress?.(r.progress ?? 0, r.text ?? ''),
    })
    engineModelId = modelId
    return engine
  })()
  try {
    return await loadingPromise
  } finally {
    loadingPromise = null
  }
}

export async function unloadEngine() {
  if (engine) {
    await engine.unload().catch(() => {})
    engine = null
    engineModelId = null
  }
}

// Same signature as simulatedModel.chatStream — UI is backend-agnostic.
export async function chatStream(messages, { temperature = 0.8, topP = 0.95 } = {}, onToken) {
  if (!engine) throw new Error('Model not loaded')
  const chunks = await engine.chat.completions.create({
    messages,
    stream: true,
    temperature,
    top_p: topP,
  })
  let full = ''
  for await (const chunk of chunks) {
    const delta = chunk.choices?.[0]?.delta?.content ?? ''
    if (delta) {
      full += delta
      onToken?.(delta, full)
    }
  }
  return full
}
