import { useMemo, useState } from 'react'
import Quiz from './Quiz.jsx'
import Mascot from './Mascot.jsx'
import SpeechBubble from './SpeechBubble.jsx'
import { pickBossQuestions, BOSS_PASS, BOSS_SIZE } from '../data/bossQuiz.js'
import { useProgress } from '../state/ProgressContext.jsx'
import { sound } from '../lib/sound.js'

export default function BossQuiz({ onVictory, onExit }) {
  const { dispatch } = useProgress()
  const [round, setRound] = useState(0)
  const questions = useMemo(() => pickBossQuestions(), [round])
  const [reactMood, setReactMood] = useState(null)

  const handleAnswer = ({ correct, firstTry }) => {
    dispatch({ type: 'ANSWER', correct, firstTry })
    setReactMood(correct ? 'celebrating' : 'shocked')
    setTimeout(() => setReactMood(null), 1200)
  }

  const handlePass = ({ score, total }) => {
    dispatch({ type: 'BOSS_DONE', score, total, passed: true })
    sound.play('fanfare')
    onVictory()
  }

  return (
    <div className="boss-screen">
      <header className="stage-header boss-header">
        <button className="btn btn-ghost" onClick={onExit}>← Retreat to map</button>
        <div className="stage-header-title">
          <span className="stage-header-emoji">🏰</span>
          <span>
            <small>The grand finale</small>
            <h1>The Final Gauntlet</h1>
          </span>
        </div>
      </header>
      <div className="dialogue-row">
        <Mascot mood={reactMood ?? 'worried'} size={140} />
        <SpeechBubble text={`This is it — ${BOSS_SIZE} questions drawn from EVERYTHING you've learned. Score ${BOSS_PASS} or more to claim your certificate. The questions reshuffle every attempt. Deep breath… GO!`} />
      </div>
      <Quiz
        key={round}
        questions={questions}
        passThreshold={BOSS_PASS}
        onAnswer={handleAnswer}
        onPass={handlePass}
      />
      <div className="stage-nav">
        <button
          className="btn btn-ghost"
          onClick={() => { dispatch({ type: 'BOSS_DONE', score: 0, total: BOSS_SIZE, passed: false }); setRound((r) => r + 1) }}
        >
          🔀 Reshuffle questions
        </button>
      </div>
    </div>
  )
}
