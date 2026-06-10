import { useState } from 'react'

// Shows how a language model predicts the next word, with probability bars.
const EXAMPLES = [
  {
    prompt: 'The cat sat on the',
    options: [
      { word: 'mat', p: 62 },
      { word: 'sofa', p: 21 },
      { word: 'roof', p: 11 },
      { word: 'piano', p: 6 },
    ],
  },
  {
    prompt: 'To be or not to',
    options: [
      { word: 'be', p: 91 },
      { word: 'go', p: 5 },
      { word: 'eat', p: 3 },
      { word: 'dance', p: 1 },
    ],
  },
  {
    prompt: 'Once upon a',
    options: [
      { word: 'time', p: 88 },
      { word: 'midnight', p: 7 },
      { word: 'hill', p: 3 },
      { word: 'sandwich', p: 2 },
    ],
  },
]

export default function NextTokenVisual() {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const ex = EXAMPLES[idx]

  const next = () => {
    setPicked(null)
    setIdx((i) => (i + 1) % EXAMPLES.length)
  }

  return (
    <div className="visual-card">
      <h3 className="visual-title">🔮 The model guesses the next word</h3>
      <div className="prompt-line">
        “{ex.prompt} <span className="blank-slot">{picked ?? '____'}</span>”
      </div>
      <div className="prob-bars">
        {ex.options.map((o) => (
          <button
            key={o.word}
            className={`prob-row ${picked === o.word ? 'prob-picked' : ''}`}
            onClick={() => setPicked(o.word)}
          >
            <span className="prob-word">{o.word}</span>
            <span className="prob-track">
              <span className="prob-fill" style={{ width: `${o.p}%` }} />
            </span>
            <span className="prob-pct">{o.p}%</span>
          </button>
        ))}
      </div>
      <div className="visual-actions">
        <button className="btn btn-ghost" onClick={next}>Try another sentence →</button>
      </div>
      <p className="visual-hint">An LLM does this over and over — one word (token) at a time — to write whole essays!</p>
    </div>
  )
}
