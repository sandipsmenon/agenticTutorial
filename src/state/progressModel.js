// Pure progress model: default state, v1 migration, reducer, XP math.
// No browser globals at import time — fully node-testable.
import { BADGES } from '../data/badges.js'
import { levelForXp } from '../data/levels.js'

export const V1_KEY = 'ai-adventure-progress-v1'
export const V2_KEY = 'ai-adventure-progress-v2'

export const XP = {
  STEP: 5,
  FIRST_TRY: 20,
  RETRY_CORRECT: 10,
  STAGE: 50,
  LAB: 15,
  BOSS: 150,
  V1_STAGE_GRANT: 50,
}

export function defaultState() {
  return {
    version: 2,
    player: { name: '', xp: 0 },
    stages: {}, // { [id]: {completed, bestScore, total, firstTrySolves, furthestStep, attempts, completedAt} }
    badges: {}, // { [id]: timestampMs }
    boss: { passed: false, bestScore: 0, attempts: 0 },
    labs: {
      nn: { trained: false, bestAcc: 0 },
      embed: { explored: 0, words: [] },
      sampling: { triedLow: false, triedHigh: false },
      agent: { wins: 0 },
      live: { chatted: false, simulated: false },
    },
    settings: { soundOn: true },
    stats: { correct: 0, wrong: 0, streak: 0, bestStreak: 0 },
  }
}

// Fill any missing fields with defaults (forward/backward compatible loads).
export function normalize(raw) {
  const d = defaultState()
  if (!raw || typeof raw !== 'object') return d
  const merge = (base, over) => {
    const out = { ...base }
    for (const k of Object.keys(over ?? {})) {
      if (
        base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) &&
        over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])
      ) out[k] = merge(base[k], over[k])
      else out[k] = over[k]
    }
    return out
  }
  const s = merge(d, raw)
  s.version = 2
  return s
}

export function migrateV1(v1) {
  const s = defaultState()
  const completed = Array.isArray(v1?.completed) ? v1.completed : []
  for (const id of completed) {
    s.stages[id] = {
      completed: true, bestScore: 0, total: 0, firstTrySolves: 0,
      furthestStep: 999, attempts: 1, completedAt: Date.now(),
    }
    s.player.xp += XP.V1_STAGE_GRANT
  }
  // Evaluate badges once so returning users get what they already earned.
  return evaluateBadges(s).state
}

// storage: anything with getItem (window.localStorage in the app, a stub in tests)
export function loadState(storage) {
  try {
    const v2 = storage.getItem(V2_KEY)
    if (v2) return normalize(JSON.parse(v2))
  } catch { /* fall through */ }
  try {
    const v1 = storage.getItem(V1_KEY)
    if (v1) return migrateV1(JSON.parse(v1))
  } catch { /* fall through */ }
  return defaultState()
}

export function evaluateBadges(state) {
  const unlocked = []
  let badges = state.badges
  for (const b of BADGES) {
    if (!badges[b.id] && b.check(state)) {
      badges = { ...badges, [b.id]: Date.now() }
      state = { ...state, badges }
      unlocked.push(b.id)
    }
  }
  return { state, unlocked }
}

function addXp(state, amount) {
  const before = levelForXp(state.player.xp).level
  const xp = state.player.xp + amount
  const after = levelForXp(xp).level
  return {
    state: { ...state, player: { ...state.player, xp } },
    leveledUp: after > before ? after : 0,
  }
}

function stageEntry(state, id) {
  return (
    state.stages[id] ?? {
      completed: false, bestScore: 0, total: 0, firstTrySolves: 0,
      furthestStep: -1, attempts: 0, completedAt: 0,
    }
  )
}

// reduce(state, action) -> { state, effects: [{type:'xp',amount}|{type:'badge',id}|{type:'levelup',level}] }
export function reduce(state, action) {
  const effects = []
  let s = state

  const gainXp = (amount) => {
    const r = addXp(s, amount)
    s = r.state
    effects.push({ type: 'xp', amount })
    if (r.leveledUp) effects.push({ type: 'levelup', level: r.leveledUp })
  }

  switch (action.type) {
    case 'STEP_SEEN': {
      const { stageId, stepIndex } = action
      const st = stageEntry(s, stageId)
      if (stepIndex > st.furthestStep && !st.completed) {
        s = { ...s, stages: { ...s.stages, [stageId]: { ...st, furthestStep: stepIndex } } }
        gainXp(XP.STEP)
      }
      break
    }
    case 'ANSWER': {
      const { correct, firstTry } = action
      const stats = { ...s.stats }
      if (correct) {
        stats.correct += 1
        if (firstTry) {
          stats.streak += 1
          stats.bestStreak = Math.max(stats.bestStreak, stats.streak)
        }
      } else {
        stats.wrong += 1
        stats.streak = 0
      }
      s = { ...s, stats }
      if (correct) gainXp(firstTry ? XP.FIRST_TRY : XP.RETRY_CORRECT)
      break
    }
    case 'STAGE_DONE': {
      const { stageId, score = 0, total = 0, firstTrySolves = 0 } = action
      const st = stageEntry(s, stageId)
      const first = !st.completed
      s = {
        ...s,
        stages: {
          ...s.stages,
          [stageId]: {
            ...st,
            completed: true,
            attempts: st.attempts + 1,
            bestScore: Math.max(st.bestScore, score),
            total: Math.max(st.total, total),
            firstTrySolves: Math.max(st.firstTrySolves, firstTrySolves),
            completedAt: st.completedAt || Date.now(),
          },
        },
      }
      if (first) gainXp(XP.STAGE)
      break
    }
    case 'LAB_EVENT': {
      const { lab, data = {} } = action
      const labs = { ...s.labs }
      let milestone = false
      if (lab === 'nn') {
        const acc = data.acc ?? 0
        milestone = acc >= 0.9 && labs.nn.bestAcc < 0.9
        labs.nn = { trained: true, bestAcc: Math.max(labs.nn.bestAcc, acc) }
      } else if (lab === 'embed') {
        const words = labs.embed.words.includes(data.word)
          ? labs.embed.words
          : [...labs.embed.words, data.word]
        milestone = words.length >= 5 && labs.embed.explored < 5
        labs.embed = { explored: words.length, words }
      } else if (lab === 'sampling') {
        const triedLow = labs.sampling.triedLow || data.temp <= 0.2
        const triedHigh = labs.sampling.triedHigh || data.temp >= 1.8
        milestone = triedLow && triedHigh && !(labs.sampling.triedLow && labs.sampling.triedHigh)
        labs.sampling = { triedLow, triedHigh }
      } else if (lab === 'agent') {
        if (data.win) {
          milestone = labs.agent.wins === 0
          labs.agent = { wins: labs.agent.wins + 1 }
        }
      } else if (lab === 'live') {
        const next = { ...labs.live }
        if (data.real) next.chatted = true
        if (data.simulated) next.simulated = true
        milestone = (next.chatted || next.simulated) && !(labs.live.chatted || labs.live.simulated)
        labs.live = next
      }
      s = { ...s, labs }
      if (milestone) gainXp(XP.LAB)
      break
    }
    case 'BOSS_DONE': {
      const { score = 0, total = 10, passed } = action
      const firstPass = passed && !s.boss.passed
      s = {
        ...s,
        boss: {
          passed: s.boss.passed || !!passed,
          bestScore: Math.max(s.boss.bestScore, score),
          attempts: s.boss.attempts + 1,
        },
      }
      void total
      if (firstPass) gainXp(XP.BOSS)
      break
    }
    case 'SET_NAME':
      s = { ...s, player: { ...s.player, name: String(action.name).slice(0, 40) } }
      break
    case 'TOGGLE_SOUND':
      s = { ...s, settings: { ...s.settings, soundOn: !s.settings.soundOn } }
      break
    case 'IMPORT_STATE':
      s = normalize(action.state)
      break
    case 'RESET':
      s = defaultState()
      break
    default:
      break
  }

  const evald = evaluateBadges(s)
  s = evald.state
  for (const id of evald.unlocked) effects.push({ type: 'badge', id })
  return { state: s, effects }
}
