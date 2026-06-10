import { useProgress } from '../../state/ProgressContext.jsx'
import { BADGE_BY_ID } from '../../data/badges.js'
import Confetti from '../Confetti.jsx'

// Shows badge unlocks one at a time (queue order).
export default function BadgeUnlockModal() {
  const { effects, removeEffect } = useProgress()
  const next = effects.find((e) => e.type === 'badge')
  if (!next) return null
  const badge = BADGE_BY_ID[next.id]
  if (!badge) return null

  return (
    <div className="modal-backdrop" onClick={() => removeEffect(next.id)}>
      <Confetti count={40} />
      <div className="badge-modal pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="badge-modal-icon">{badge.icon}</div>
        <div className="badge-modal-label">Badge unlocked!</div>
        <h2>{badge.name}</h2>
        <p>{badge.desc}</p>
        <button className="btn btn-primary btn-big" onClick={() => removeEffect(next.id)}>
          Awesome! ✨
        </button>
      </div>
    </div>
  )
}
