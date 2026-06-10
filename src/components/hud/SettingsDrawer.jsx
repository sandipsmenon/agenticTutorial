import { useState } from 'react'
import { useProgress } from '../../state/ProgressContext.jsx'
import { encodeSave, decodeSave } from '../../lib/saveCodec.js'
import BadgeShelf from './BadgeShelf.jsx'

export default function SettingsDrawer({ open, onClose }) {
  const { state, dispatch } = useProgress()
  const [importText, setImportText] = useState('')
  const [msg, setMsg] = useState(null)

  if (!open) return null

  const copySave = async () => {
    const code = encodeSave(state)
    try {
      await navigator.clipboard.writeText(code)
      setMsg({ ok: true, text: 'Save code copied to clipboard! 📋' })
    } catch {
      setImportText(code)
      setMsg({ ok: true, text: 'Clipboard blocked — your code is in the box below, copy it manually.' })
    }
  }

  const importSave = () => {
    try {
      const imported = decodeSave(importText)
      dispatch({ type: 'IMPORT_STATE', state: imported })
      setMsg({ ok: true, text: 'Progress imported — welcome back! 🎉' })
      setImportText('')
    } catch (e) {
      setMsg({ ok: false, text: `Hmm: ${e.message}` })
    }
  }

  const reset = () => {
    if (window.confirm('Really erase ALL progress, XP and badges? This cannot be undone!')) {
      dispatch({ type: 'RESET' })
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-drawer pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>⚙️ Settings</h2>
          <button className="hud-icon-btn" onClick={onClose} aria-label="Close settings">✖️</button>
        </div>

        <label className="setting-row">
          <span>🔊 Sound effects</span>
          <input
            type="checkbox"
            checked={state.settings.soundOn}
            onChange={() => dispatch({ type: 'TOGGLE_SOUND' })}
          />
        </label>

        <BadgeShelf />

        <h3>💾 Backup your adventure</h3>
        <div className="save-row">
          <button className="btn btn-primary" onClick={copySave}>Copy save code</button>
          <button className="btn btn-ghost" onClick={importSave} disabled={!importText.trim()}>
            Import code
          </button>
        </div>
        <textarea
          className="save-box"
          placeholder="Paste a save code here to restore progress…"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={3}
        />
        {msg && <p className={`save-msg ${msg.ok ? 'save-ok' : 'save-bad'}`}>{msg.text}</p>}

        <button className="btn btn-danger" onClick={reset}>🗑️ Reset all progress</button>
      </div>
    </div>
  )
}
