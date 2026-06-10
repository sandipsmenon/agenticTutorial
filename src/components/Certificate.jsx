import { useEffect, useRef } from 'react'
import { drawCertificate } from '../lib/certificate.js'
import { useProgress } from '../state/ProgressContext.jsx'
import { BADGES } from '../data/badges.js'
import { STAGES } from '../data/stages/index.js'

export default function Certificate() {
  const { state, level, dispatch } = useProgress()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    drawCertificate(canvasRef.current, {
      name: state.player.name,
      levelTitle: level.title,
      xp: state.player.xp,
      badgeCount: Object.keys(state.badges).length,
      badgeTotal: BADGES.length,
      stageEmojis: STAGES.map((s) => s.emoji),
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    })
  }, [state.player.name, state.player.xp, state.badges, level.title])

  const download = () => {
    const url = canvasRef.current.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-adventure-certificate.png'
    a.click()
  }

  return (
    <div className="cert-wrap">
      <label className="cert-name-row">
        ✍️ Your name, adventurer:
        <input
          className="token-input cert-name-input"
          value={state.player.name}
          maxLength={28}
          placeholder="Type your name for the certificate…"
          onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })}
        />
      </label>
      <canvas ref={canvasRef} className="cert-canvas" />
      <button className="btn btn-primary btn-big" onClick={download}>
        ⬇️ Download certificate (PNG)
      </button>
    </div>
  )
}
