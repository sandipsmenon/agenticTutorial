import { BADGES } from '../../data/badges.js'
import { useProgress } from '../../state/ProgressContext.jsx'

export default function BadgeShelf() {
  const { state } = useProgress()
  const unlocked = Object.keys(state.badges).length
  return (
    <div className="badge-shelf">
      <h3>🏅 Badges — {unlocked}/{BADGES.length}</h3>
      <div className="badge-grid">
        {BADGES.map((b) => {
          const got = !!state.badges[b.id]
          return (
            <div key={b.id} className={`badge-cell ${got ? 'badge-got' : 'badge-missing'}`} title={b.desc}>
              <span className="badge-cell-icon">{got ? b.icon : '❔'}</span>
              <span className="badge-cell-name">{b.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
