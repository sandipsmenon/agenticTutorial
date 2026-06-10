import { useState } from 'react'

// The agent loop: Think → Act → Observe, repeated until the goal is done.
const STORY = [
  { phase: 'goal', label: '🎯 Goal', text: 'User asks: “Book me a table for two tonight.”' },
  { phase: 'think', label: '🤔 Think', text: 'Plan: I need to find restaurants, check availability, then book.' },
  { phase: 'act', label: '🛠️ Act', text: 'Call tool: search_restaurants(near="user", time="7pm")' },
  { phase: 'observe', label: '👀 Observe', text: 'Result: “Luigi\'s has a free table at 7pm.”' },
  { phase: 'think', label: '🤔 Think', text: 'Luigi\'s works! Now I should make the reservation.' },
  { phase: 'act', label: '🛠️ Act', text: 'Call tool: book_table(restaurant="Luigi\'s", people=2, time="7pm")' },
  { phase: 'observe', label: '👀 Observe', text: 'Result: “Booking confirmed ✔ #1234”' },
  { phase: 'done', label: '🏁 Done', text: 'Reply to user: “Table for two booked at Luigi\'s, 7pm tonight!”' },
]

const PHASE_POS = {
  think: { x: 150, y: 38 },
  act: { x: 252, y: 150 },
  observe: { x: 48, y: 150 },
}

export default function AgentLoopVisual() {
  const [step, setStep] = useState(0)
  const cur = STORY[step]
  const activePhase = cur.phase

  return (
    <div className="visual-card">
      <h3 className="visual-title">🔁 The Agent Loop</h3>
      <div className="agent-grid">
        <svg viewBox="0 0 300 210" className="agent-loop-svg" aria-label="Agent loop diagram">
          {/* loop arrows */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="#a29bfe" />
            </marker>
          </defs>
          <path d="M180 55 Q 255 75 250 120" fill="none" stroke="#a29bfe" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M225 175 Q 150 205 78 177" fill="none" stroke="#a29bfe" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M48 122 Q 45 73 115 52" fill="none" stroke="#a29bfe" strokeWidth="3" markerEnd="url(#arrow)" />

          {Object.entries(PHASE_POS).map(([phase, pos]) => (
            <g key={phase} className={activePhase === phase ? 'agent-node-active' : 'agent-node'}>
              <circle cx={pos.x} cy={pos.y} r="34" fill={activePhase === phase ? '#6c5ce7' : '#e8e5ff'} />
              <text x={pos.x} y={pos.y - 2} textAnchor="middle" fontSize="17">
                {phase === 'think' ? '🤔' : phase === 'act' ? '🛠️' : '👀'}
              </text>
              <text x={pos.x} y={pos.y + 17} textAnchor="middle" fontSize="11" fontWeight="700"
                fill={activePhase === phase ? '#fff' : '#5b51d8'}>
                {phase.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>

        <div className="agent-story">
          <div className={`agent-step-card pop-in phase-${cur.phase}`} key={step}>
            <div className="agent-step-label">{cur.label}</div>
            <div className="agent-step-text">{cur.text}</div>
          </div>
          <div className="agent-controls">
            <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>← Back</button>
            <span className="agent-progress">step {step + 1} / {STORY.length}</span>
            <button className="btn btn-primary" disabled={step === STORY.length - 1} onClick={() => setStep((s) => s + 1)}>
              Next step →
            </button>
          </div>
        </div>
      </div>
      <p className="visual-hint">
        An <strong>agent</strong> = an LLM in a loop with tools. It thinks, takes an action, looks at
        the result, and repeats until the job is done (with a step limit so it can't loop forever!).
      </p>
    </div>
  )
}
