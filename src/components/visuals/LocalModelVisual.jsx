import { useEffect, useRef, useState } from 'react'

const SCRIPT = [
  { text: '$ ollama pull llama3.2', cls: 'term-cmd', delay: 400 },
  { text: 'pulling manifest… ✔', cls: 'term-out', delay: 700 },
  { text: 'downloading 2.0 GB ████████████ 100%', cls: 'term-out', delay: 1100 },
  { text: '$ ollama run llama3.2', cls: 'term-cmd', delay: 700 },
  { text: '>>> Why is the sky blue?', cls: 'term-user', delay: 900 },
  { text: 'Sunlight scatters off air molecules, and blue light scatters the most — so the sky looks blue! 🌤️', cls: 'term-ai', delay: 1100 },
  { text: '>>> (running 100% on YOUR machine — no internet needed!)', cls: 'term-note', delay: 900 },
]

export default function LocalModelVisual() {
  const [lines, setLines] = useState([])
  const [runId, setRunId] = useState(0)
  const timeouts = useRef([])

  useEffect(() => {
    setLines([])
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    let acc = 0
    SCRIPT.forEach((line) => {
      acc += line.delay
      timeouts.current.push(setTimeout(() => setLines((ls) => [...ls, line]), acc))
    })
    return () => timeouts.current.forEach(clearTimeout)
  }, [runId])

  return (
    <div className="visual-card">
      <h3 className="visual-title">💻 Running a model on your own computer</h3>
      <div className="terminal">
        <div className="terminal-bar">
          <span className="term-dot" style={{ background: '#ff5f57' }} />
          <span className="term-dot" style={{ background: '#febc2e' }} />
          <span className="term-dot" style={{ background: '#28c840' }} />
          <span className="terminal-title">my-laptop — ollama</span>
        </div>
        <div className="terminal-body">
          {lines.map((l, i) => (
            <div key={i} className={`term-line ${l.cls}`}>{l.text}</div>
          ))}
          <span className="speech-cursor">▍</span>
        </div>
      </div>
      <div className="visual-actions">
        <button className="btn btn-ghost" onClick={() => setRunId((r) => r + 1)}>↻ Replay demo</button>
      </div>
      <div className="local-cards">
        <div className="mini-card">🛠️ <strong>Tools:</strong> Ollama, LM Studio, llama.cpp</div>
        <div className="mini-card">🗜️ <strong>Quantization:</strong> shrink models (e.g. 16-bit → 4-bit numbers) so they fit in your RAM</div>
        <div className="mini-card">🔒 <strong>Why local?</strong> Privacy, no per-token fees, works offline</div>
        <div className="mini-card">⚖️ <strong>Trade-off:</strong> small local models are less capable than big cloud ones</div>
      </div>
    </div>
  )
}
