import { useMemo, useState } from 'react'
import { softmaxT, topPMask, sampleIndex } from '../../lib/sampling.js'
import { useProgress } from '../../state/ProgressContext.jsx'
import { getLoadedModelId, chatStream as realChatStream } from '../../lib/webllm.js'

// First step shown as live bars; the rest of the chain builds a sentence.
const CHAIN = [
  { options: [
    { word: 'electric', logit: 2.6 }, { word: 'fluffy', logit: 2.0 }, { word: 'giant', logit: 1.2 },
    { word: 'invisible', logit: 0.6 }, { word: 'spicy', logit: -0.4 }, { word: 'haunted', logit: -1.0 },
  ]},
  { options: [
    { word: 'sheep', logit: 2.8 }, { word: 'clouds', logit: 1.8 }, { word: 'toasters', logit: 0.6 },
    { word: 'mountains', logit: 0.2 }, { word: 'noodles', logit: -0.6 }, { word: 'grandmas', logit: -1.2 },
  ]},
  { options: [
    { word: 'dancing', logit: 2.4 }, { word: 'floating', logit: 1.9 }, { word: 'singing', logit: 1.0 },
    { word: 'exploding', logit: -0.2 }, { word: 'knitting', logit: -0.8 },
  ]},
  { options: [
    { word: 'in the moonlight.', logit: 2.5 }, { word: 'on the moon.', logit: 1.6 },
    { word: 'inside a teacup.', logit: 0.4 }, { word: 'through spacetime.', logit: -0.3 },
    { word: 'in your sock drawer.', logit: -0.9 },
  ]},
]

export default function SamplingPlayground() {
  const { dispatch } = useProgress()
  const [temp, setTemp] = useState(0.8)
  const [topP, setTopP] = useState(0.95)
  const [sampled, setSampled] = useState(null)
  const [realOut, setRealOut] = useState(null)
  const [realBusy, setRealBusy] = useState(false)
  const realLoaded = !!getLoadedModelId()

  const probs0 = useMemo(() => softmaxT(CHAIN[0].options.map((o) => o.logit), temp), [temp])
  const keep0 = useMemo(() => topPMask(probs0, topP), [probs0, topP])

  const sample = () => {
    const words = CHAIN.map((step) => {
      const probs = softmaxT(step.options.map((o) => o.logit), temp)
      const keep = topPMask(probs, topP)
      return step.options[sampleIndex(probs, keep)].word
    })
    setSampled(`My robot dreams about ${words.join(' ')}`)
    dispatch({ type: 'LAB_EVENT', lab: 'sampling', data: { temp } })
  }

  const askReal = async () => {
    setRealBusy(true)
    setRealOut('')
    try {
      await realChatStream(
        [{ role: 'user', content: 'Complete this sentence in under 15 words, be creative: "My robot dreams about…"' }],
        { temperature: temp, topP },
        (_t, full) => setRealOut(full),
      )
    } catch (e) {
      setRealOut(`(model error: ${e.message})`)
    }
    setRealBusy(false)
  }

  return (
    <div className="lab-panel">
      <h2 className="lab-title">🌡️ Sampling Playground — temperature & top-p</h2>
      <p className="lab-sub">
        Models don't always pick the #1 token — they roll weighted dice. <strong>Temperature </strong>
        reshapes the dice; <strong>top-p</strong> removes the silly long tail. Drag the sliders!
      </p>

      <div className="sampling-sliders">
        <label className="lab-label">
          🌡️ Temperature: <strong>{temp.toFixed(2)}</strong>
          <span className="slider-tag">{temp <= 0.3 ? 'predictable 🧊' : temp >= 1.5 ? 'chaotic 🔥' : 'balanced'}</span>
          <input type="range" min="0.1" max="2" step="0.05" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
        </label>
        <label className="lab-label">
          🎯 Top-p: <strong>{topP.toFixed(2)}</strong>
          <span className="slider-tag">{topP <= 0.5 ? 'only safe picks' : 'wide net'}</span>
          <input type="range" min="0.1" max="1" step="0.05" value={topP} onChange={(e) => setTopP(Number(e.target.value))} />
        </label>
      </div>

      <div className="prompt-line">“My robot dreams about <span className="blank-slot">____</span>”</div>
      <div className="prob-bars">
        {CHAIN[0].options.map((o, i) => (
          <div key={o.word} className={`prob-row ${!keep0[i] ? 'prob-cut' : ''}`}>
            <span className="prob-word">{o.word}</span>
            <span className="prob-track">
              <span className="prob-fill" style={{ width: `${probs0[i] * 100}%` }} />
            </span>
            <span className="prob-pct">{(probs0[i] * 100).toFixed(1)}%</span>
            {!keep0[i] && <span className="prob-cut-tag">cut by top-p</span>}
          </div>
        ))}
      </div>

      <div className="visual-actions">
        <button className="btn btn-primary btn-big" onClick={sample}>🎲 Sample a sentence!</button>
        {realLoaded && (
          <button className="btn btn-ghost" onClick={askReal} disabled={realBusy}>
            ⚡ Ask the REAL model {realBusy ? '…' : ''}
          </button>
        )}
      </div>
      {sampled && <div className="pipeline-desc pop-in" key={sampled}>🤖 {sampled}</div>}
      {realOut !== null && <div className="pipeline-desc pop-in">⚡ Real model says: {realOut || '…'}</div>}

      <p className="visual-hint">
        Try temperature 0.1 (boring but reliable — great for code) and then 1.9 (creative chaos —
        great for brainstorming). Hit both extremes to earn the <strong>Fire &amp; Ice</strong> badge! 🌡️
      </p>
    </div>
  )
}
