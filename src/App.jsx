import { useEffect, useState } from 'react'
import { STAGES } from './data/stages.jsx'
import Mascot from './components/Mascot.jsx'
import SpeechBubble from './components/SpeechBubble.jsx'
import StageMap from './components/StageMap.jsx'
import StagePlayer from './components/StagePlayer.jsx'
import Confetti from './components/Confetti.jsx'

const STORAGE_KEY = 'ai-adventure-progress-v1'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* corrupted storage — start fresh */
  }
  return { completed: [] }
}

export default function App() {
  // view: 'welcome' | 'map' | 'stage' | 'finale'
  const [view, setView] = useState('welcome')
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const completed = progress.completed
  const unlockedCount = Math.min(completed.length + 1, STAGES.length)
  const allDone = completed.length === STAGES.length

  const startStage = (i) => {
    setActiveStage(i)
    setView('stage')
  }

  const completeStage = () => {
    const id = STAGES[activeStage].id
    const newCompleted = completed.includes(id) ? completed : [...completed, id]
    setProgress({ completed: newCompleted })
    if (newCompleted.length === STAGES.length) {
      setView('finale')
    } else {
      setView('map')
    }
  }

  const resetProgress = () => {
    setProgress({ completed: [] })
    setView('welcome')
  }

  if (view === 'welcome') {
    return (
      <div className="app welcome-screen">
        <div className="welcome-stars" aria-hidden="true">✦ ✧ ✦ ✧ ✦</div>
        <h1 className="welcome-title">AI Adventure</h1>
        <p className="welcome-tagline">Learn how AI really works — one stage at a time!</p>
        <div className="dialogue-row welcome-dialogue">
          <Mascot mood="excited" size={200} />
          <SpeechBubble
            text={
              completed.length > 0
                ? `Welcome back, adventurer! You've completed ${completed.length} of ${STAGES.length} stages. Ready to keep going?`
                : "Beep boop — hello, human! I'm Neuro! 🤖 I'll be your guide through 7 stages: AI basics, LLMs, tokens, training, running models locally, agents, and MCP connectors. Finish each quiz to unlock the next stage. Shall we?"
            }
          />
        </div>
        <button className="btn btn-primary btn-huge" onClick={() => setView('map')}>
          {completed.length > 0 ? '▶ Continue adventure' : '🚀 Start the adventure!'}
        </button>
        {completed.length > 0 && (
          <button className="btn btn-ghost" onClick={resetProgress}>↻ Start over from scratch</button>
        )}
      </div>
    )
  }

  if (view === 'finale') {
    return (
      <div className="app finale-screen">
        <Confetti />
        <div className="certificate pop-in">
          <div className="certificate-ribbon">🏆</div>
          <h1>Certificate of Awesomeness</h1>
          <p className="certificate-line">This certifies that</p>
          <p className="certificate-name">YOU, brave adventurer</p>
          <p className="certificate-line">
            completed all {STAGES.length} stages of the AI Adventure and now understand
            AI &amp; ML, LLMs &amp; SLMs, tokens, model training, local models, agents, and MCP!
          </p>
          <div className="certificate-stamps">
            {STAGES.map((s) => (
              <span key={s.id} title={s.title}>{s.emoji}</span>
            ))}
          </div>
        </div>
        <div className="dialogue-row">
          <Mascot mood="celebrating" size={180} />
          <SpeechBubble text="WOOHOO! You did it! 🎉 You went from 'what is AI?' to understanding agents and MCP connectors. Go build something amazing — and come back any time to replay a stage!" />
        </div>
        <div className="finale-actions">
          <button className="btn btn-primary btn-big" onClick={() => setView('map')}>🗺️ Back to the map</button>
          <button className="btn btn-ghost" onClick={resetProgress}>↻ Start over</button>
        </div>
      </div>
    )
  }

  if (view === 'stage') {
    return (
      <div className="app">
        <StagePlayer
          stage={STAGES[activeStage]}
          stageNumber={activeStage + 1}
          totalStages={STAGES.length}
          onComplete={completeStage}
          onExit={() => setView('map')}
        />
      </div>
    )
  }

  // map view
  return (
    <div className="app">
      <header className="map-header">
        <button className="btn btn-ghost" onClick={() => setView('welcome')}>← Home</button>
        <div className="map-score">⭐ {completed.length} / {STAGES.length} stages complete</div>
        {allDone && (
          <button className="btn btn-primary" onClick={() => setView('finale')}>🏆 View certificate</button>
        )}
      </header>
      <div className="dialogue-row map-dialogue">
        <Mascot mood={allDone ? 'celebrating' : 'happy'} size={140} />
        <SpeechBubble
          text={
            allDone
              ? 'You finished EVERYTHING! Replay any stage, or admire your shiny certificate!'
              : `Pick a glowing stage to ${completed.length ? 'continue' : 'begin'}! Complete each quiz to light up the next one. ${STAGES.length - completed.length} to go!`
          }
        />
      </div>
      <StageMap
        stages={STAGES}
        unlockedCount={unlockedCount}
        completed={completed}
        onSelect={startStage}
      />
    </div>
  )
}
