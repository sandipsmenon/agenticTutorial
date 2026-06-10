import { TOTAL_STAGES } from './stageMeta.js'

const completedCount = (state) =>
  Object.values(state.stages).filter((s) => s.completed).length

// Predicates run after every action; a badge unlocks the first time check() is true.
export const BADGES = [
  {
    id: 'first-steps', icon: '👣', name: 'First Steps',
    desc: 'Complete your first stage',
    check: (s) => completedCount(s) >= 1,
  },
  {
    id: 'halfway-hero', icon: '🌗', name: 'Halfway Hero',
    desc: 'Complete 6 stages',
    check: (s) => completedCount(s) >= 6,
  },
  {
    id: 'scholar', icon: '🎓', name: 'Scholar',
    desc: `Complete all ${TOTAL_STAGES} stages`,
    check: (s) => completedCount(s) >= TOTAL_STAGES,
  },
  {
    id: 'sharpshooter', icon: '🎯', name: 'Sharpshooter',
    desc: 'Ace a stage quiz with every answer right on the first try',
    check: (s) =>
      Object.values(s.stages).some(
        (st) => st.completed && st.total > 0 && st.firstTrySolves >= st.total,
      ),
  },
  {
    id: 'on-fire', icon: '🔥', name: 'On Fire',
    desc: 'Get 8 first-try answers right in a row',
    check: (s) => s.stats.bestStreak >= 8,
  },
  {
    id: 'mad-scientist', icon: '🧪', name: 'Mad Scientist',
    desc: 'Train a neural network to 90% accuracy in the lab',
    check: (s) => (s.labs.nn.bestAcc ?? 0) >= 0.9,
  },
  {
    id: 'cartographer', icon: '🧭', name: 'Cartographer',
    desc: 'Explore 5 words in the embedding map',
    check: (s) => (s.labs.embed.explored ?? 0) >= 5,
  },
  {
    id: 'fire-and-ice', icon: '🌡️', name: 'Fire & Ice',
    desc: 'Sample at temperature ≤ 0.2 and ≥ 1.8 in the sampling lab',
    check: (s) => s.labs.sampling.triedLow && s.labs.sampling.triedHigh,
  },
  {
    id: 'agent-architect', icon: '🛠️', name: 'Agent Architect',
    desc: 'Equip an agent with the right tools and watch it succeed',
    check: (s) => (s.labs.agent.wins ?? 0) >= 1,
  },
  {
    id: 'model-whisperer', icon: '💬', name: 'Model Whisperer',
    desc: 'Chat with a model in the Live Model Lab',
    check: (s) => s.labs.live.chatted || s.labs.live.simulated,
  },
  {
    id: 'boss-slayer', icon: '🏰', name: 'Boss Slayer',
    desc: 'Conquer the Final Gauntlet',
    check: (s) => s.boss.passed,
  },
  {
    id: 'legend', icon: '👑', name: 'Legend',
    desc: 'Unlock every other badge',
    check: (s) =>
      BADGES.filter((b) => b.id !== 'legend').every((b) => s.badges[b.id]),
  },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))
