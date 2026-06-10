import Mascot from '../Mascot.jsx'
import SpeechBubble from '../SpeechBubble.jsx'
import { useProgress } from '../../state/ProgressContext.jsx'

export const LABS = [
  { id: 'live', icon: '⚡', name: 'Live Model Lab', desc: 'Run a REAL AI model inside your browser (or meet Pico)', badge: 'model-whisperer' },
  { id: 'nn', icon: '🧫', name: 'Neural Playground', desc: 'Train an actual neural network and watch it learn', badge: 'mad-scientist' },
  { id: 'sampling', icon: '🌡️', name: 'Sampling Playground', desc: 'Temperature & top-p — the AI creativity dials', badge: 'fire-and-ice' },
  { id: 'embed', icon: '🗺️', name: 'Embedding Map', desc: 'Explore the space where meanings live', badge: 'cartographer' },
  { id: 'agent', icon: '🛠️', name: 'Agent Sandbox', desc: 'Equip an agent with tools and run the mission', badge: 'agent-architect' },
]

export default function LabHub({ onOpenLab, onExit }) {
  const { state } = useProgress()
  return (
    <div className="lab-hub">
      <header className="map-header">
        <button className="btn btn-ghost" onClick={onExit}>← Map</button>
        <h1 className="lab-hub-title">🧪 Neuro's AI Lab</h1>
        <span />
      </header>
      <div className="dialogue-row">
        <Mascot mood="excited" size={130} accessory="goggles" />
        <SpeechBubble text="Welcome to my laboratory! No quizzes here — just hands-on experiments. Train a network, bend probability, chat with a real model… each lab hides a badge. Don your goggles!" />
      </div>
      <div className="lab-cards">
        {LABS.map((lab) => {
          const done = !!state.badges[lab.badge]
          return (
            <button key={lab.id} className="lab-card" onClick={() => onOpenLab(lab.id)}>
              <span className="lab-card-icon">{lab.icon}</span>
              <span className="lab-card-name">{lab.name} {done && '🏅'}</span>
              <span className="lab-card-desc">{lab.desc}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
