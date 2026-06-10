import { useEffect, useRef, useState } from 'react'
import { SCENARIOS, TOOLBOX } from '../../data/agentScenarios.js'
import { useProgress } from '../../state/ProgressContext.jsx'
import Mascot from '../Mascot.jsx'
import Confetti from '../Confetti.jsx'

export default function AgentSandbox() {
  const { dispatch } = useProgress()
  const [scenIdx, setScenIdx] = useState(0)
  const [equipped, setEquipped] = useState([])
  const [log, setLog] = useState([])
  const [outcome, setOutcome] = useState(null) // 'win' | 'fail' | null
  const timers = useRef([])

  const scen = SCENARIOS[scenIdx]

  const toggleTool = (id) => {
    if (outcome) return
    setEquipped((eq) =>
      eq.includes(id) ? eq.filter((t) => t !== id) : eq.length < scen.maxTools ? [...eq, id] : eq,
    )
  }

  const reset = (nextIdx = scenIdx) => {
    timers.current.forEach(clearTimeout)
    setScenIdx(nextIdx)
    setEquipped([])
    setLog([])
    setOutcome(null)
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    timers.current.forEach(clearTimeout)
    setLog([])
    setOutcome(null)
    let t = 0
    let failed = false
    for (const step of scen.script) {
      if (failed) break
      t += 1000
      if (step.needs && !equipped.includes(step.needs)) {
        const failStep = { phase: 'fail', text: step.fail }
        timers.current.push(setTimeout(() => setLog((l) => [...l, failStep]), t))
        timers.current.push(setTimeout(() => {
          setOutcome('fail')
          dispatch({ type: 'LAB_EVENT', lab: 'agent', data: { win: false } })
        }, t + 600))
        failed = true
      } else {
        timers.current.push(setTimeout(() => setLog((l) => [...l, step]), t))
        if (step.phase === 'done') {
          timers.current.push(setTimeout(() => {
            setOutcome('win')
            dispatch({ type: 'LAB_EVENT', lab: 'agent', data: { win: true } })
          }, t + 400))
        }
      }
    }
  }

  const PHASE_META = {
    think: { label: '🤔 Think', cls: 'phase-think' },
    act: { label: '🛠️ Act', cls: 'phase-act' },
    observe: { label: '👀 Observe', cls: 'phase-observe' },
    done: { label: '🏁 Done', cls: 'phase-done' },
    fail: { label: '💥 Stuck!', cls: 'phase-fail' },
  }

  return (
    <div className="lab-panel">
      {outcome === 'win' && <Confetti count={50} />}
      <h2 className="lab-title">🛠️ Agent Sandbox — equip your agent!</h2>
      <p className="lab-sub">
        Agents are only as capable as their tools. Pick up to {scen.maxTools} tools, run the
        mission, and watch the Think → Act → Observe loop succeed… or face-plant. 😄
      </p>

      <div className="sandbox-scenarios">
        {SCENARIOS.map((s, i) => (
          <button key={s.id} className={`btn ${i === scenIdx ? 'btn-primary' : 'btn-ghost'}`} onClick={() => reset(i)}>
            {s.title}
          </button>
        ))}
      </div>

      <div className="sandbox-goal">
        <strong>🎯 Mission:</strong> {scen.goal}
        <div className="sandbox-hint">💡 {scen.hint}</div>
      </div>

      <div className="toolshelf">
        {TOOLBOX.map((tool) => {
          const on = equipped.includes(tool.id)
          return (
            <button
              key={tool.id}
              className={`tool-card ${on ? 'tool-on' : ''}`}
              onClick={() => toggleTool(tool.id)}
              disabled={!!outcome}
            >
              <span className="tool-icon">{tool.icon}</span>
              {tool.name}
              {on && <span className="tool-check">✓</span>}
            </button>
          )
        })}
      </div>

      <div className="visual-actions" style={{ justifyContent: 'center' }}>
        <button className="btn btn-primary btn-big" onClick={run} disabled={equipped.length === 0 || log.length > 0 && !outcome}>
          🚀 Run agent ({equipped.length}/{scen.maxTools} tools)
        </button>
        {(outcome || log.length > 0) && (
          <button className="btn btn-ghost" onClick={() => reset()}>↻ Re-equip</button>
        )}
      </div>

      {log.length > 0 && (
        <div className="sandbox-log">
          {log.map((step, i) => {
            const meta = PHASE_META[step.phase]
            return (
              <div key={i} className={`agent-step-card pop-in ${meta.cls}`}>
                <div className="agent-step-label">{meta.label}</div>
                <div className="agent-step-text">{step.text}</div>
              </div>
            )
          })}
        </div>
      )}

      {outcome && (
        <div className={`sandbox-outcome pop-in ${outcome === 'win' ? 'quiz-feedback-good' : 'quiz-feedback-bad'}`}>
          <Mascot mood={outcome === 'win' ? 'celebrating' : 'worried'} size={90} accessory="goggles" />
          <div>
            {outcome === 'win' ? (
              <><strong>Mission accomplished!</strong> Right tools = a capable agent. This is exactly
              how real agent builders think: what will the agent NEED to check, compute, read, or send?</>
            ) : (
              <><strong>The agent got stuck!</strong> It planned fine — but planning can't replace a
              missing tool. Re-equip and try again. (Decoy tools like the Dice Roller never help… or do they? No. No, they don't.) 🎲</>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
