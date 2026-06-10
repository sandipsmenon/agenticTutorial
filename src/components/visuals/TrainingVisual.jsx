import { useEffect, useState } from 'react'

const PHASES = [
  { icon: '📚', name: 'Collect data', desc: 'Gather mountains of text: books, code, articles…' },
  { icon: '🏋️', name: 'Pre-training', desc: 'The model plays "guess the next token" billions of times, adjusting its parameters each time it is wrong.' },
  { icon: '🎯', name: 'Fine-tuning', desc: 'Teach it to be a helpful assistant with curated example conversations.' },
  { icon: '🗳️', name: 'Human feedback (RLHF)', desc: 'People rank answers; the model learns to prefer the good ones.' },
]

export default function TrainingVisual() {
  const [active, setActive] = useState(0)

  // auto-advance the pipeline highlight
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PHASES.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="visual-card">
      <h3 className="visual-title">🏭 The model training pipeline</h3>
      <div className="pipeline">
        {PHASES.map((p, i) => (
          <div key={p.name} className="pipeline-step-wrap">
            <button
              className={`pipeline-step ${i === active ? 'pipeline-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="pipeline-icon">{p.icon}</span>
              <span className="pipeline-name">{p.name}</span>
            </button>
            {i < PHASES.length - 1 && <span className="pipeline-arrow">➜</span>}
          </div>
        ))}
      </div>
      <div className="pipeline-desc pop-in" key={active}>
        <strong>{PHASES[active].icon} {PHASES[active].name}:</strong> {PHASES[active].desc}
      </div>
      <div className="loss-curve">
        <svg viewBox="0 0 300 110" width="100%" aria-label="Training loss going down over time">
          <text x="8" y="14" fontSize="10" fill="#8a86b8">loss (how wrong the model is)</text>
          <line x1="20" y1="100" x2="290" y2="100" stroke="#cdc6ff" strokeWidth="2" />
          <line x1="20" y1="100" x2="20" y2="10" stroke="#cdc6ff" strokeWidth="2" />
          <path className="loss-path" d="M22 24 C 80 30, 110 62, 160 76 S 250 92, 288 94" fill="none" stroke="#6c5ce7" strokeWidth="3.5" strokeLinecap="round" />
          <text x="200" y="88" fontSize="11" fill="#6c5ce7" fontWeight="bold">getting smarter →</text>
        </svg>
      </div>
      <p className="visual-hint">
        Training a frontier LLM takes thousands of GPUs running for months — that's why most people
        <em> use</em> pre-trained models instead of training their own from scratch.
      </p>
    </div>
  )
}
