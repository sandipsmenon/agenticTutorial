// Sampling math for the temperature/top-p playground. Pure; node-testable.

export function softmaxT(logits, temperature = 1) {
  const t = Math.max(temperature, 0.01)
  const scaled = logits.map((l) => l / t)
  const max = Math.max(...scaled)
  const exps = scaled.map((l) => Math.exp(l - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / sum)
}

// Returns a boolean keep-mask: the smallest set of tokens (by prob, desc)
// whose cumulative probability reaches topP. Everything else is cut.
export function topPMask(probs, topP = 1) {
  const order = probs
    .map((p, i) => [p, i])
    .sort((a, b) => b[0] - a[0])
  const keep = new Array(probs.length).fill(false)
  let cum = 0
  for (const [p, i] of order) {
    keep[i] = true
    cum += p
    if (cum >= topP) break
  }
  return keep
}

// Renormalize probs over the kept set, then sample an index.
export function sampleIndex(probs, keep, rnd = Math.random()) {
  const masked = probs.map((p, i) => (keep[i] ? p : 0))
  const sum = masked.reduce((a, b) => a + b, 0)
  let r = rnd * sum
  for (let i = 0; i < masked.length; i++) {
    r -= masked[i]
    if (r <= 0 && masked[i] > 0) return i
  }
  return masked.findIndex((p) => p > 0)
}
