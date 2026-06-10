import { useEffect, useRef, useState } from 'react'
import { makeNet, trainStep, accuracy, makeDataset, predictGrid } from '../../lib/tinyNN.js'
import { useProgress } from '../../state/ProgressContext.jsx'

const GRID = 60
const CANVAS = 360
const DATASETS = [
  { id: 'blobs', name: '🫧 Two blobs', hint: 'easy' },
  { id: 'xor', name: '🧩 XOR quadrants', hint: 'medium' },
  { id: 'circle', name: '🎯 Circle in ring', hint: 'medium' },
  { id: 'spiral', name: '🌀 Two spirals', hint: 'hard — try Deep mode!' },
]

export default function NeuralPlayground() {
  const { dispatch } = useProgress()
  const canvasRef = useRef(null)
  const netRef = useRef(null)
  const dataRef = useRef([])
  const rafRef = useRef(0)
  const lossHistRef = useRef([])
  const epochsRef = useRef(0)
  const reportedRef = useRef(false)

  const [dataset, setDataset] = useState('blobs')
  const [deep, setDeep] = useState(false)
  const [lr, setLr] = useState(0.3)
  const lrRef = useRef(lr)
  lrRef.current = lr
  const [running, setRunning] = useState(false)
  const [stats, setStats] = useState({ acc: 0, loss: 0, epochs: 0 })
  const [addClass, setAddClass] = useState(1)

  const resetNet = () => {
    netRef.current = makeNet(deep ? [2, 8, 8, 1] : [2, 8, 1], Date.now() % 100000)
    lossHistRef.current = []
    epochsRef.current = 0
    reportedRef.current = false
    setStats({ acc: 0, loss: 0, epochs: 0 })
  }

  // (re)build data + net when dataset/depth changes
  useEffect(() => {
    dataRef.current = makeDataset(dataset, 140, 7)
    resetNet()
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, deep])

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // decision boundary as a coarse probability grid
    const probs = predictGrid(netRef.current, GRID)
    const img = ctx.createImageData(GRID, GRID)
    for (let i = 0; i < probs.length; i++) {
      const p = probs[i]
      // class 1 = warm pink, class 0 = cool blue
      img.data[i * 4] = 108 + p * 147       // R
      img.data[i * 4 + 1] = 92 + (1 - p) * 100
      img.data[i * 4 + 2] = 231 - p * 46
      img.data[i * 4 + 3] = 255
    }
    // blit small grid scaled up
    const off = document.createElement('canvas')
    off.width = GRID
    off.height = GRID
    off.getContext('2d').putImageData(img, 0, 0)
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(off, 0, 0, CANVAS, CANVAS)
    // points
    for (const { x, y } of dataRef.current) {
      const px = ((x[0] + 1) / 2) * CANVAS
      const py = ((x[1] + 1) / 2) * CANVAS
      ctx.beginPath()
      ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fillStyle = y === 1 ? '#ff7eb9' : '#74d8ff'
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#1c1a40'
      ctx.stroke()
    }
    // loss sparkline (top-left corner)
    const hist = lossHistRef.current
    if (hist.length > 1) {
      ctx.beginPath()
      const maxLoss = Math.max(...hist, 0.7)
      hist.forEach((l, i) => {
        const lx = 10 + (i / (hist.length - 1)) * 110
        const ly = 10 + (l / maxLoss) * 50
        i === 0 ? ctx.moveTo(lx, ly) : ctx.lineTo(lx, ly)
      })
      ctx.strokeStyle = '#ffd166'
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.fillStyle = 'rgba(28,26,64,0.75)'
      ctx.font = '11px sans-serif'
      ctx.fillText('loss', 12, 72)
    }
  }

  // training loop
  useEffect(() => {
    if (!running) return
    let alive = true
    const tick = () => {
      if (!alive) return
      const t0 = performance.now()
      let loss = 0
      let k = 0
      // adaptive: as many epochs as fit in ~8ms
      while (performance.now() - t0 < 8 && k < 40) {
        loss = trainStep(netRef.current, dataRef.current, lrRef.current)
        k++
      }
      epochsRef.current += k
      lossHistRef.current.push(loss)
      if (lossHistRef.current.length > 80) lossHistRef.current.shift()
      const acc = accuracy(netRef.current, dataRef.current)
      setStats({ acc, loss, epochs: epochsRef.current })
      if (acc >= 0.9 && !reportedRef.current && epochsRef.current > 50) {
        reportedRef.current = true
        dispatch({ type: 'LAB_EVENT', lab: 'nn', data: { acc } })
      }
      draw()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const addPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    dataRef.current = [...dataRef.current, { x: [x, y], y: addClass }]
    draw()
  }

  return (
    <div className="lab-panel">
      <h2 className="lab-title">🧫 Neural Playground — train a real network, live!</h2>
      <p className="lab-sub">
        This is a genuine neural network learning by gradient descent in your browser —
        the same math (tiny scale!) that trains giant LLMs. Pick a pattern and press Train!
      </p>
      <div className="nn-grid">
        <div className="nn-canvas-wrap">
          <canvas
            ref={canvasRef}
            width={CANVAS}
            height={CANVAS}
            className="nn-canvas"
            onClick={addPoint}
            title="Click to add a point of the selected class"
          />
          <div className="nn-stats">
            <span className={`stat-pill ${stats.acc >= 0.9 ? 'stat-good' : ''}`}>
              🎯 accuracy <strong>{Math.round(stats.acc * 100)}%</strong>
            </span>
            <span className="stat-pill">📉 loss <strong>{stats.loss.toFixed(3)}</strong></span>
            <span className="stat-pill">🔁 epochs <strong>{stats.epochs}</strong></span>
          </div>
        </div>
        <div className="nn-controls">
          <label className="lab-label">Pattern</label>
          <div className="nn-datasets">
            {DATASETS.map((d) => (
              <button
                key={d.id}
                className={`btn ${dataset === d.id ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => { setRunning(false); setDataset(d.id) }}
                title={d.hint}
              >
                {d.name}
              </button>
            ))}
          </div>
          <label className="lab-label">
            Learning rate: <strong>{lr.toFixed(2)}</strong>
            <input type="range" min="0.01" max="1" step="0.01" value={lr}
              onChange={(e) => setLr(Number(e.target.value))} />
          </label>
          <label className="setting-row">
            <span>🕳️ Deep mode (extra hidden layer)</span>
            <input type="checkbox" checked={deep} onChange={(e) => { setRunning(false); setDeep(e.target.checked) }} />
          </label>
          <label className="setting-row">
            <span>🖱️ Click canvas adds:</span>
            <button className="btn btn-ghost" onClick={() => setAddClass((c) => 1 - c)}>
              {addClass === 1 ? '🩷 pink dot' : '🩵 blue dot'}
            </button>
          </label>
          <div className="nn-actions">
            <button className="btn btn-primary btn-big" onClick={() => setRunning(!running)}>
              {running ? '⏸ Pause' : '▶ Train!'}
            </button>
            <button className="btn btn-ghost" onClick={() => { setRunning(false); resetNet(); draw() }}>
              ↻ Reset weights
            </button>
          </div>
          {stats.acc >= 0.9 && stats.epochs > 50 && (
            <div className="quiz-feedback quiz-feedback-good pop-in">
              🧪 <strong>90%+ accuracy!</strong> You just trained a neural network. The loss fell,
              the boundary bent itself around the data — that's learning!
            </div>
          )}
        </div>
      </div>
      <p className="visual-hint">
        The background color is the network's current opinion of every point in space; dots are
        training data. Watch the boundary morph as the weights update — and try the spiral with
        Deep mode to see why depth matters!
      </p>
    </div>
  )
}
