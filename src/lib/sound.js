// WebAudio sound effects, synthesized from scratch — zero audio assets.
// Every entry point is guarded so calls are no-ops in headless/node environments.
let ctx = null
let master = null
let muted = false

function ensureCtx() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) {
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.35
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function tone({ freq = 440, type = 'sine', start = 0, dur = 0.15, vol = 1, slideTo = 0 }) {
  const c = ensureCtx()
  if (!c || muted) return
  const t0 = c.currentTime + start
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain)
  gain.connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

const RECIPES = {
  click: () => tone({ freq: 700, type: 'square', dur: 0.04, vol: 0.25 }),
  correct: () => {
    tone({ freq: 523.25, dur: 0.1 })
    tone({ freq: 659.25, start: 0.09, dur: 0.1 })
    tone({ freq: 783.99, start: 0.18, dur: 0.18 })
  },
  wrong: () => tone({ freq: 330, type: 'triangle', dur: 0.3, slideTo: 220, vol: 0.6 }),
  // pitch climbs with the current streak for a satisfying combo feel
  xp: (streak = 0) => tone({ freq: 600 + Math.min(streak, 10) * 60, dur: 0.09, vol: 0.5 }),
  levelup: () => {
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, start: i * 0.11, dur: 0.16 }),
    )
  },
  badge: () => {
    tone({ freq: 880, dur: 0.5, vol: 0.6 })
    tone({ freq: 884, dur: 0.55, vol: 0.4 }) // slight detune = bell shimmer
    tone({ freq: 1318.5, start: 0.12, dur: 0.45, vol: 0.4 })
  },
  fanfare: () => {
    ;[392, 523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, start: i * 0.13, dur: 0.18 }),
    )
  },
}

export const sound = {
  setMuted(m) { muted = m },
  isMuted: () => muted,
  play(name, arg) {
    try { RECIPES[name]?.(arg) } catch { /* never break the app over audio */ }
  },
}
