// Cumulative XP thresholds. Level N = index+1.
export const LEVELS = [
  { xp: 0, title: 'Curious Spark' },
  { xp: 100, title: 'Prompt Apprentice' },
  { xp: 250, title: 'Token Tinkerer' },
  { xp: 450, title: 'Neural Novice' },
  { xp: 700, title: 'Data Wrangler' },
  { xp: 1000, title: 'Agent Architect' },
  { xp: 1400, title: 'Model Whisperer' },
  { xp: 1900, title: 'AI Adventurer Supreme' },
]

export function levelForXp(xp) {
  let i = 0
  while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].xp) i++
  const cur = LEVELS[i]
  const next = LEVELS[i + 1] ?? null
  return {
    level: i + 1,
    title: cur.title,
    isMax: !next,
    progress: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1,
    nextXp: next ? next.xp : xp,
  }
}
