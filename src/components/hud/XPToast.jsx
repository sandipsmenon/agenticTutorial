import { useEffect } from 'react'
import { useProgress } from '../../state/ProgressContext.jsx'
import { LEVELS } from '../../data/levels.js'

// Floating "+XP" and "LEVEL UP" toasts, consumed from the effects queue.
export default function XPToast() {
  const { effects, removeEffect } = useProgress()
  const visible = effects.filter((e) => e.type === 'xp' || e.type === 'levelup').slice(0, 4)

  useEffect(() => {
    if (!visible.length) return
    const timers = visible.map((e) =>
      setTimeout(() => removeEffect(e.id), e.type === 'levelup' ? 3200 : 1600),
    )
    return () => timers.forEach(clearTimeout)
  }, [visible, removeEffect])

  if (!visible.length) return null
  return (
    <div className="xp-toasts" aria-live="polite">
      {visible.map((e) =>
        e.type === 'levelup' ? (
          <div key={e.id} className="toast toast-levelup">
            🎺 LEVEL UP! <strong>Lv {e.level} — {LEVELS[e.level - 1]?.title}</strong>
          </div>
        ) : (
          <div key={e.id} className="toast toast-xp">+{e.amount} XP ⚡</div>
        ),
      )}
    </div>
  )
}
