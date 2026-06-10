import { useState } from 'react'
import { STAGES } from './data/stages/index.js'
import Mascot from './components/Mascot.jsx'
import SpeechBubble from './components/SpeechBubble.jsx'
import StageMap from './components/StageMap.jsx'
import StagePlayer from './components/StagePlayer.jsx'
import BossQuiz from './components/BossQuiz.jsx'
import Certificate from './components/Certificate.jsx'
import Confetti from './components/Confetti.jsx'
import XPBar from './components/hud/XPBar.jsx'
import XPToast from './components/hud/XPToast.jsx'
import BadgeUnlockModal from './components/hud/BadgeUnlockModal.jsx'
import SettingsDrawer from './components/hud/SettingsDrawer.jsx'
import LabHub from './components/labs/LabHub.jsx'
import NeuralPlayground from './components/labs/NeuralPlayground.jsx'
import EmbeddingMap from './components/labs/EmbeddingMap.jsx'
import SamplingPlayground from './components/labs/SamplingPlayground.jsx'
import AgentSandbox from './components/labs/AgentSandbox.jsx'
import LiveModelLab from './components/labs/LiveModelLab.jsx'
import { useProgress } from './state/ProgressContext.jsx'
import { sound } from './lib/sound.js'

const LAB_COMPONENTS = {
  live: LiveModelLab,
  nn: NeuralPlayground,
  sampling: SamplingPlayground,
  embed: EmbeddingMap,
  agent: AgentSandbox,
}

// Brief full-screen flash after finishing a stage.
function StageClearOverlay({ stage, onDone }) {
  return (
    <div className="stage-clear" onClick={onDone} onAnimationEnd={onDone}>
      <div className="stage-clear-inner">
        <div className="stage-clear-emoji">{stage.emoji}</div>
        <h1>STAGE CLEAR!</h1>
        <p>+50 XP ⚡</p>
      </div>
    </div>
  )
}

export default function App() {
  // view: welcome | map | stage | labhub | lab | boss | finale
  const [view, setView] = useState('welcome')
  const [activeStage, setActiveStage] = useState(0)
  const [activeLab, setActiveLab] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [clearedStage, setClearedStage] = useState(null)
  const { state, dispatch } = useProgress()

  const completed = STAGES.filter((s) => state.stages[s.id]?.completed).map((s) => s.id)
  const unlockedCount = Math.min(completed.length + 1, STAGES.length)
  const allStagesDone = completed.length === STAGES.length
  const bossPassed = state.boss.passed

  const go = (v) => { sound.play('click'); setView(v) }

  const startStage = (i) => {
    sound.play('click')
    setActiveStage(i)
    setView('stage')
  }

  const completeStage = ({ stageId, score, total, firstTrySolves }) => {
    const wasNew = !state.stages[stageId]?.completed
    dispatch({ type: 'STAGE_DONE', stageId, score, total, firstTrySolves })
    if (wasNew) setClearedStage(STAGES[activeStage])
    setView('map')
  }

  const hud = (
    <>
      <XPToast />
      <BadgeUnlockModal />
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {clearedStage && (
        <StageClearOverlay stage={clearedStage} onDone={() => setClearedStage(null)} />
      )}
    </>
  )

  if (view === 'welcome') {
    return (
      <div className="app welcome-screen view-fade" key="welcome">
        {hud}
        <div className="welcome-stars" aria-hidden="true">✦ ✧ ✦ ✧ ✦</div>
        <h1 className="welcome-title">AI Adventure</h1>
        <p className="welcome-tagline">Learn how AI really works — {STAGES.length} stages, 5 hands-on labs, 1 epic boss!</p>
        <div className="dialogue-row welcome-dialogue">
          <Mascot mood="excited" size={200} />
          <SpeechBubble
            text={
              completed.length > 0
                ? `Welcome back, adventurer! ${completed.length} of ${STAGES.length} stages done${bossPassed ? ', boss CONQUERED' : ''}, ${state.player.xp} XP earned. Ready to continue?`
                : `Beep boop — hello, human! I'm Neuro! 🤖 Ahead of you: ${STAGES.length} stages (from "what is AI?" to multimodal models), my hands-on Lab — where you can train a real neural network and even run a REAL AI model in your browser — and a final boss quiz. Earn XP, collect badges, become a legend. Shall we?`
            }
          />
        </div>
        <button className="btn btn-primary btn-huge" onClick={() => go('map')}>
          {completed.length > 0 ? '▶ Continue adventure' : '🚀 Start the adventure!'}
        </button>
      </div>
    )
  }

  if (view === 'finale') {
    return (
      <div className="app finale-screen view-fade" key="finale">
        {hud}
        <Confetti />
        <h1 className="welcome-title" style={{ fontSize: 'clamp(2rem,6vw,3.4rem)' }}>You are a Legend! 🏆</h1>
        <Certificate />
        <div className="dialogue-row">
          <Mascot mood="celebrating" size={180} accessory="gradcap" />
          <SpeechBubble text="YOU DID IT ALL! Stages, gauntlet, the works. Type your name above, download your certificate, and wear it with pride. The labs stay open forever — come back and play anytime! 🎉" />
        </div>
        <div className="finale-actions">
          <button className="btn btn-primary btn-big" onClick={() => go('map')}>🗺️ Back to the map</button>
        </div>
      </div>
    )
  }

  if (view === 'stage') {
    return (
      <div className="app view-fade" key={`stage-${activeStage}`}>
        {hud}
        <StagePlayer
          stage={STAGES[activeStage]}
          stageNumber={activeStage + 1}
          totalStages={STAGES.length}
          onComplete={completeStage}
          onExit={() => go('map')}
        />
      </div>
    )
  }

  if (view === 'boss') {
    return (
      <div className="app view-fade" key="boss">
        {hud}
        <BossQuiz onVictory={() => setView('finale')} onExit={() => go('map')} />
      </div>
    )
  }

  if (view === 'labhub') {
    return (
      <div className="app view-fade" key="labhub">
        {hud}
        <LabHub onOpenLab={(id) => { setActiveLab(id); go('lab') }} onExit={() => go('map')} />
      </div>
    )
  }

  if (view === 'lab') {
    const LabComponent = LAB_COMPONENTS[activeLab] ?? LabHub
    return (
      <div className="app view-fade" key={`lab-${activeLab}`}>
        {hud}
        <header className="map-header">
          <button className="btn btn-ghost" onClick={() => go('labhub')}>← Lab Hub</button>
          <XPBar onOpenSettings={() => setSettingsOpen(true)} />
        </header>
        <LabComponent />
      </div>
    )
  }

  // map view
  return (
    <div className="app view-fade" key="map">
      {hud}
      <header className="map-header">
        <button className="btn btn-ghost" onClick={() => go('welcome')}>← Home</button>
        <XPBar onOpenSettings={() => setSettingsOpen(true)} />
      </header>
      <div className="dialogue-row map-dialogue">
        <Mascot mood={bossPassed ? 'celebrating' : allStagesDone ? 'worried' : 'happy'} size={140} />
        <SpeechBubble
          text={
            bossPassed
              ? 'Gauntlet CONQUERED! Replay anything, chase missing badges in the lab, or admire your certificate. You magnificent legend!'
              : allStagesDone
                ? 'All stages complete… which means the castle gates are OPEN. The Final Gauntlet awaits — 10 questions, everything you\'ve learned. I believe in you!'
                : `Pick a glowing stage to ${completed.length ? 'continue' : 'begin'}! ${STAGES.length - completed.length} stage${STAGES.length - completed.length === 1 ? '' : 's'} between you and the castle. And do visit my Lab — real experiments, real badges!`
          }
        />
      </div>
      <button className="lab-entry" onClick={() => go('labhub')}>
        <span className="lab-entry-icon">🧪</span>
        <span>
          <strong>Neuro's AI Lab</strong>
          <small>Train a network · chat with a real model · 5 experiments, always open</small>
        </span>
        <span className="lab-entry-arrow">→</span>
      </button>
      <StageMap
        stages={STAGES}
        unlockedCount={unlockedCount}
        completed={completed}
        bossUnlocked={allStagesDone}
        bossPassed={bossPassed}
        onSelect={startStage}
        onBoss={() => go('boss')}
      />
      {bossPassed && (
        <div className="visual-actions" style={{ justifyContent: 'center', marginTop: 18 }}>
          <button className="btn btn-primary" onClick={() => go('finale')}>🏆 View certificate</button>
        </div>
      )}
    </div>
  )
}
