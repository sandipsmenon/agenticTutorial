// "What is AI?" — nested rings showing AI ⊃ ML ⊃ Deep Learning ⊃ GenAI
export default function AIBrainVisual() {
  const rings = [
    { label: 'Artificial Intelligence', desc: 'Machines doing "smart" things', color: '#6c5ce7', size: 320 },
    { label: 'Machine Learning', desc: 'Learning patterns from data', color: '#a29bfe', size: 240 },
    { label: 'Deep Learning', desc: 'Neural networks with many layers', color: '#74b9ff', size: 165 },
    { label: 'Generative AI', desc: 'Creates text, images, code…', color: '#ffd166', size: 95 },
  ]
  return (
    <div className="visual-card">
      <div className="rings-wrap">
        {rings.map((r, i) => (
          <div
            key={r.label}
            className="ring pop-in"
            style={{
              width: r.size,
              height: r.size,
              background: r.color,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            {i < 3 && <span className="ring-label">{r.label}</span>}
            {i === 3 && <span className="ring-label ring-label-center">GenAI ✨</span>}
          </div>
        ))}
      </div>
      <div className="legend">
        {rings.map((r) => (
          <div key={r.label} className="legend-item">
            <span className="legend-dot" style={{ background: r.color }} />
            <strong>{r.label}</strong> — {r.desc}
          </div>
        ))}
      </div>
    </div>
  )
}
