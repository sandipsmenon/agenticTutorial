import { useEffect, useState } from 'react'
import {
  detectWebGPU, pickModelId, loadEngine, unloadEngine, isModelCached,
  chatStream as realChatStream, MODELS,
} from '../../lib/webllm.js'
import { chatStream as picoChatStream } from '../../lib/simulatedModel.js'
import { PICO_INTRO } from '../../data/simulatedReplies.js'
import { useProgress } from '../../state/ProgressContext.jsx'
import ChatPanel from './ChatPanel.jsx'
import ModelDownloadCard from './ModelDownloadCard.jsx'
import Mascot from '../Mascot.jsx'

// checking → unsupported | idle → downloading → ready | error ; 'simulated' reachable from most states
export default function LiveModelLab() {
  const { dispatch } = useProgress()
  const [phase, setPhase] = useState('checking')
  const [gpu, setGpu] = useState({ supported: false, hasF16: false })
  const [modelIdx, setModelIdx] = useState(0)
  const [cached, setCached] = useState(false)
  const [progress, setProgress] = useState({ pct: 0, text: '' })
  const [error, setError] = useState('')
  const [temp, setTemp] = useState(0.8)
  const [topP, setTopP] = useState(0.95)

  useEffect(() => {
    let alive = true
    detectWebGPU().then(async (res) => {
      if (!alive) return
      setGpu(res)
      if (!res.supported) {
        setPhase('unsupported')
      } else {
        setPhase('idle')
        isModelCached(pickModelId(MODELS[0], res.hasF16)).then((c) => alive && setCached(c))
      }
    })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (phase !== 'idle' || !gpu.supported) return
    let alive = true
    isModelCached(pickModelId(MODELS[modelIdx], gpu.hasF16)).then((c) => alive && setCached(c))
    return () => { alive = false }
  }, [modelIdx, phase, gpu])

  const startDownload = async () => {
    setPhase('downloading')
    setProgress({ pct: 0, text: 'Preparing…' })
    try {
      await loadEngine(pickModelId(MODELS[modelIdx], gpu.hasF16), (pct, text) =>
        setProgress({ pct, text }),
      )
      setPhase('ready')
    } catch (e) {
      setError(e?.message ?? 'Unknown error')
      setPhase('error')
    }
  }

  const eject = async () => {
    await unloadEngine()
    setPhase('idle')
  }

  const goSimulated = () => setPhase('simulated')

  return (
    <div className="lab-panel">
      <h2 className="lab-title">⚡ Live Model Lab — a REAL AI in your browser</h2>

      {phase === 'checking' && <p className="lab-sub">🔬 Checking whether your browser supports WebGPU…</p>}

      {phase === 'unsupported' && (
        <>
          <div className="quiz-feedback quiz-feedback-bad">
            <strong>😢 No WebGPU here.</strong> This browser/device can't run a real local model
            (try Chrome or Edge on a laptop with a GPU). BUT — meet <strong>Pico</strong>, my simulated
            little cousin. Same chat experience, pretend brain:
          </div>
          <div className="visual-actions">
            <button className="btn btn-primary btn-big" onClick={goSimulated}>🤏 Chat with Pico</button>
          </div>
        </>
      )}

      {phase === 'idle' && (
        <>
          <p className="lab-sub">
            ✅ Your browser supports <strong>WebGPU</strong>! That means it can run a genuine language
            model — weights, GPU inference and all — without any server.
          </p>
          <ModelDownloadCard
            modelIdx={modelIdx}
            setModelIdx={setModelIdx}
            cached={cached}
            onStart={startDownload}
            onSimulated={goSimulated}
          />
        </>
      )}

      {phase === 'downloading' && (
        <div className="visual-card">
          <div className="download-row">
            <Mascot mood="thinking" size={90} accessory="goggles" />
            <div className="download-progress">
              <div className="download-text">{progress.text || 'Downloading…'}</div>
              <div className="stage-progress-track">
                <div className="stage-progress-fill" style={{ width: `${Math.round(progress.pct * 100)}%` }} />
              </div>
              <div className="download-pct">{Math.round(progress.pct * 100)}%</div>
            </div>
          </div>
          <p className="visual-hint">
            Fetching model weights → compiling GPU shaders → ready. The download is cached, so next
            time is instant!
          </p>
        </div>
      )}

      {phase === 'error' && (
        <>
          <div className="quiz-feedback quiz-feedback-bad">
            <strong>💥 Loading failed:</strong> {error}. This often means low memory or an
            interrupted download. You can retry — or chat with simulated Pico instead!
          </div>
          <div className="visual-actions">
            <button className="btn btn-primary" onClick={startDownload}>↻ Retry</button>
            <button className="btn btn-ghost" onClick={goSimulated}>🤏 Use Pico</button>
          </div>
        </>
      )}

      {phase === 'ready' && (
        <>
          <div className="quiz-feedback quiz-feedback-good">
            <strong>🎉 {MODELS[modelIdx].label} is alive in your browser!</strong> Everything you type
            stays on your device. Play with temperature to change its personality!
          </div>
          <div className="sampling-sliders">
            <label className="lab-label">
              🌡️ Temperature: <strong>{temp.toFixed(2)}</strong>
              <input type="range" min="0" max="1.8" step="0.05" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            </label>
            <label className="lab-label">
              🎯 Top-p: <strong>{topP.toFixed(2)}</strong>
              <input type="range" min="0.1" max="1" step="0.05" value={topP} onChange={(e) => setTopP(Number(e.target.value))} />
            </label>
          </div>
          <ChatPanel
            chatStream={realChatStream}
            engineLabel={`⚡ ${MODELS[modelIdx].label} — running locally via WebGPU`}
            intro="Hello! I'm a real language model running entirely inside your browser. Ask me anything!"
            opts={{ temperature: temp, topP }}
            onFirstReply={() => dispatch({ type: 'LAB_EVENT', lab: 'live', data: { real: true } })}
          />
          <div className="visual-actions">
            <button className="btn btn-ghost" onClick={eject}>⏏️ Unload model (free memory)</button>
          </div>
        </>
      )}

      {phase === 'simulated' && (
        <>
          <ChatPanel
            chatStream={picoChatStream}
            engineLabel="🤏 Pico — simulated mini-model (0.0001B parameters of pure enthusiasm)"
            intro={PICO_INTRO}
            onFirstReply={() => dispatch({ type: 'LAB_EVENT', lab: 'live', data: { simulated: true } })}
          />
          <p className="visual-hint">
            Pico fakes it — but the chat plumbing (streaming tokens, message history) is identical
            to the real thing. On a WebGPU-capable device this same lab downloads an actual model!
          </p>
          {gpu.supported && (
            <div className="visual-actions">
              <button className="btn btn-ghost" onClick={() => setPhase('idle')}>← Back to the real model</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
