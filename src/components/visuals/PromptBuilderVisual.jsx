import { useState } from 'react'

const INGREDIENTS = [
  { id: 'role', icon: '🎭', label: 'Role', snippet: 'You are a friendly science teacher.' },
  { id: 'context', icon: '📋', label: 'Context', snippet: 'My 10-year-old is curious about space.' },
  { id: 'task', icon: '🎯', label: 'Clear task', snippet: 'Explain why planets orbit the sun.' },
  { id: 'examples', icon: '💡', label: 'Example', snippet: 'Example tone: "Gravity is like an invisible leash!"' },
  { id: 'format', icon: '📐', label: 'Format', snippet: 'Answer in 3 short bullet points.' },
]

const RESPONSES = [
  { min: 0, quality: 'Vague 😵', color: '#ff6b6b', text: '“Planets, huh? They are big rocks and gas balls in space. Some are far. Anything else?”' },
  { min: 2, quality: 'Decent 🙂', color: '#fd9644', text: '“Planets orbit the sun because of gravity — the sun pulls on them while they move forward, bending their path into a loop.”' },
  { min: 4, quality: 'Chef\'s kiss 🤩', color: '#00b894', text: '“• The sun\'s gravity is like an invisible leash gently tugging each planet!\n• Planets also zoom forward — the tug + the zoom bends their path into a circle.\n• No leash? They\'d fly off in a straight line into space!”' },
]

export default function PromptBuilderVisual() {
  const [on, setOn] = useState({ task: true })
  const active = INGREDIENTS.filter((i) => on[i.id])
  const score = active.length
  const resp = [...RESPONSES].reverse().find((r) => score >= r.min) ?? RESPONSES[0]

  return (
    <div className="visual-card">
      <h3 className="visual-title">🪄 Build a better prompt — toggle the ingredients!</h3>
      <div className="prompt-chips">
        {INGREDIENTS.map((ing) => (
          <button
            key={ing.id}
            className={`prompt-chip ${on[ing.id] ? 'prompt-chip-on' : ''}`}
            onClick={() => setOn((o) => ({ ...o, [ing.id]: !o[ing.id] }))}
          >
            {ing.icon} {ing.label}
          </button>
        ))}
      </div>
      <div className="prompt-preview">
        <div className="prompt-preview-label">Your prompt:</div>
        {active.length === 0
          ? <em className="prompt-empty">“space”  (just vibes, no instructions)</em>
          : active.map((i) => <div key={i.id} className="prompt-line-item">{i.icon} {i.snippet}</div>)}
      </div>
      <div className="quality-meter">
        <span>Response quality:</span>
        <span className="quality-track">
          <span className="quality-fill" style={{ width: `${(score / INGREDIENTS.length) * 100}%`, background: resp.color }} />
        </span>
        <strong style={{ color: resp.color }}>{resp.quality}</strong>
      </div>
      <div className="pipeline-desc pop-in" key={resp.quality} style={{ whiteSpace: 'pre-line' }}>
        🤖 {resp.text}
      </div>
      <p className="visual-hint">
        Same model, wildly different answers — the only thing that changed is the prompt.
        Role + context + a clear task + examples + format = prompt engineering!
      </p>
    </div>
  )
}
