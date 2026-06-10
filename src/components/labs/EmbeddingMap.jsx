import { useState } from 'react'
import { EMBED_WORDS, EMBED_CLUSTERS, ANALOGY_ARROWS } from '../../data/embeddingPoints.js'
import { useProgress } from '../../state/ProgressContext.jsx'

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

export default function EmbeddingMap() {
  const { dispatch } = useProgress()
  const [selected, setSelected] = useState(null)
  const [showArrows, setShowArrows] = useState(false)

  const sel = EMBED_WORDS.find((w) => w.w === selected)
  const neighbors = sel
    ? EMBED_WORDS.filter((w) => w.w !== sel.w)
        .map((w) => ({ ...w, d: dist(w, sel) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 5)
    : []
  const maxD = 130 // ~map diagonal, for similarity %

  const pick = (w) => {
    setSelected(w)
    dispatch({ type: 'LAB_EVENT', lab: 'embed', data: { word: w } })
  }

  return (
    <div className="lab-panel">
      <h2 className="lab-title">🗺️ Embedding Map — where meanings live</h2>
      <p className="lab-sub">
        Every word here has coordinates based on its MEANING. Click any word to find its
        nearest neighbors — similar meanings are physically close!
      </p>
      <div className="embed-grid">
        <svg viewBox="0 0 100 100" className="embed-svg" aria-label="2D map of word embeddings">
          <rect x="0" y="0" width="100" height="100" rx="4" fill="#221d4f" />
          {/* neighbor connection lines */}
          {sel && neighbors.map((n) => (
            <line key={n.w} x1={sel.x} y1={sel.y} x2={n.x} y2={n.y}
              stroke="#ffd166" strokeWidth="0.45" strokeDasharray="1.4 1" opacity="0.85" />
          ))}
          {/* analogy arrows */}
          {showArrows && ANALOGY_ARROWS.map(({ from, to }) => {
            const a = EMBED_WORDS.find((w) => w.w === from)
            const b = EMBED_WORDS.find((w) => w.w === to)
            return (
              <g key={from}>
                <line x1={a.x} y1={a.y} x2={b.x - 1.4} y2={b.y}
                  stroke="#00f5c4" strokeWidth="0.7" />
                <polygon
                  points={`${b.x - 1},${b.y} ${b.x - 3},${b.y - 1.4} ${b.x - 3},${b.y + 1.4}`}
                  fill="#00f5c4" />
              </g>
            )
          })}
          {EMBED_WORDS.map((w) => {
            const isSel = selected === w.w
            const isNb = neighbors.some((n) => n.w === w.w)
            return (
              <g key={w.w} className="embed-word" onClick={() => pick(w.w)}>
                <circle cx={w.x} cy={w.y} r={isSel ? 2.6 : isNb ? 2.1 : 1.6}
                  fill={EMBED_CLUSTERS[w.c].color}
                  stroke={isSel ? '#fff' : isNb ? '#ffd166' : 'none'} strokeWidth="0.5" />
                <text x={w.x} y={w.y - 2.6} textAnchor="middle" fontSize="2.9"
                  fill={isSel ? '#fff' : isNb ? '#ffd166' : '#cdc6ff'}
                  fontWeight={isSel || isNb ? 700 : 400}>
                  {w.w}
                </text>
              </g>
            )
          })}
        </svg>
        <div className="embed-side">
          {sel ? (
            <div className="pop-in" key={sel.w}>
              <h3>“{sel.w}” — nearest neighbors:</h3>
              <ol className="embed-list">
                {neighbors.map((n) => (
                  <li key={n.w}>
                    <strong>{n.w}</strong>
                    <span className="embed-sim">{Math.max(1, Math.round((1 - n.d / maxD) * 100))}% similar</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="lab-sub">👈 Click a word to explore! (Explore 5 to earn the Cartographer badge.)</p>
          )}
          <label className="setting-row">
            <span>✨ Show the famous analogy arrows<br /><small>man→woman ≈ king→queen</small></span>
            <input type="checkbox" checked={showArrows} onChange={(e) => setShowArrows(e.target.checked)} />
          </label>
          {showArrows && (
            <p className="visual-hint">
              The two green arrows are PARALLEL — the “maleness→femaleness” direction is the same
              everywhere! Real embeddings (with hundreds of dimensions) capture relationships as
              directions like this.
            </p>
          )}
          <div className="embed-legend">
            {EMBED_CLUSTERS.map((c) => (
              <span key={c.name} className="legend-item">
                <span className="legend-dot" style={{ background: c.color }} /> {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
