// "Pico" — simulated model with the same chatStream interface as lib/webllm.js,
// so the chat UI works identically with either backend.
import { PICO_REPLIES, PICO_FALLBACKS } from '../data/simulatedReplies.js'

let fallbackIdx = 0

function pickReply(userText) {
  for (const r of PICO_REPLIES) {
    if (r.match.test(userText)) return r.reply
  }
  const reply = PICO_FALLBACKS[fallbackIdx % PICO_FALLBACKS.length]
  fallbackIdx++
  return reply
}

export async function chatStream(messages, _opts, onToken) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  const reply = pickReply(lastUser?.content ?? '')
  const words = reply.split(/(\s+)/)
  let full = ''
  for (const w of words) {
    full += w
    onToken?.(w, full)
    // word-by-word jitter so it *feels* like streaming inference
    await new Promise((res) => setTimeout(res, 18 + Math.random() * 50))
  }
  return full
}
