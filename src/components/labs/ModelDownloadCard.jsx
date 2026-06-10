import { MODELS } from '../../lib/webllm.js'

export default function ModelDownloadCard({ modelIdx, setModelIdx, cached, onStart, onSimulated }) {
  const model = MODELS[modelIdx]
  return (
    <div className="visual-card download-card">
      <h3 className="visual-title">⬇️ Download a real model into your browser</h3>
      <label className="lab-label">
        Model:
        <select className="model-select" value={modelIdx} onChange={(e) => setModelIdx(Number(e.target.value))}>
          {MODELS.map((m, i) => (
            <option key={m.id} value={i}>{m.label} — {m.size}</option>
          ))}
        </select>
      </label>
      <div className="local-cards">
        <div className="mini-card">📦 One-time download of <strong>{model.size}</strong>{cached ? ' — already cached, instant resume! ✅' : ' (cached for next time)'}</div>
        <div className="mini-card">🧠 Needs ~1–2 GB of memory while running — best on a laptop/desktop</div>
        <div className="mini-card">🔒 Runs 100% in YOUR browser via WebGPU — nothing you type leaves your device</div>
        <div className="mini-card">📵 Heads-up on metered connections: that's a real download!</div>
      </div>
      <div className="visual-actions" style={{ marginTop: 16 }}>
        <button className="btn btn-primary btn-big" onClick={onStart}>
          {cached ? '⚡ Load cached model' : '⬇️ Download & load'}
        </button>
        <button className="btn btn-ghost" onClick={onSimulated}>🤏 Try simulated Pico instead</button>
      </div>
    </div>
  )
}
