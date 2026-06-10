import { useProgress } from '../../state/ProgressContext.jsx'
import { sound } from '../../lib/sound.js'

export default function XPBar({ onOpenSettings }) {
  const { state, level, dispatch } = useProgress()
  return (
    <div className="xp-bar">
      <div className="xp-level-chip" title={`Level ${level.level}`}>
        <span className="xp-level-num">Lv {level.level}</span>
        <span className="xp-level-title">{level.title}</span>
      </div>
      <div className="xp-track" title={level.isMax ? 'MAX level!' : `${state.player.xp} / ${level.nextXp} XP`}>
        <div className="xp-fill" style={{ width: `${Math.round(level.progress * 100)}%` }} />
      </div>
      <span className="xp-amount">⚡{state.player.xp}</span>
      <button
        className="hud-icon-btn"
        title={state.settings.soundOn ? 'Mute sounds' : 'Unmute sounds'}
        onClick={() => { dispatch({ type: 'TOGGLE_SOUND' }); sound.play('click') }}
      >
        {state.settings.soundOn ? '🔊' : '🔇'}
      </button>
      <button className="hud-icon-btn" title="Settings & badges" onClick={onOpenSettings}>⚙️</button>
    </div>
  )
}
