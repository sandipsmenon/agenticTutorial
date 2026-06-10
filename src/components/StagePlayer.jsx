import { useState } from 'react'
import Mascot from './Mascot.jsx'
import SpeechBubble from './SpeechBubble.jsx'
import Quiz from './Quiz.jsx'

// Plays one stage: dialogue steps (mascot + visual), then the quiz.
export default function StagePlayer({ stage, stageNumber, totalStages, onComplete, onExit }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [inQuiz, setInQuiz] = useState(false)

  const steps = stage.steps
  const step = steps[Math.min(stepIndex, steps.length - 1)]
  const Visual = step.visual
  const progressPct = inQuiz ? 100 : Math.round((stepIndex / steps.length) * 100)

  const advance = () => {
    if (stepIndex + 1 < steps.length) setStepIndex(stepIndex + 1)
    else setInQuiz(true)
  }
  const back = () => {
    if (inQuiz) setInQuiz(false)
    else if (stepIndex > 0) setStepIndex(stepIndex - 1)
  }

  return (
    <div className="stage-player">
      <header className="stage-header" style={{ '--stage-color': stage.color }}>
        <button className="btn btn-ghost" onClick={onExit}>← Map</button>
        <div className="stage-header-title">
          <span className="stage-header-emoji">{stage.emoji}</span>
          <span>
            <small>Stage {stageNumber} of {totalStages}</small>
            <h1>{stage.title}</h1>
          </span>
        </div>
        <div className="stage-progress-track">
          <div className="stage-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      {!inQuiz ? (
        <div className="stage-body">
          <div className="dialogue-row">
            <Mascot mood={step.mood} size={170} />
            <SpeechBubble text={step.text} />
          </div>

          {Visual && (
            <div className="visual-slot pop-in" key={`${stage.id}-${stepIndex}`}>
              <Visual />
            </div>
          )}

          <div className="stage-nav">
            <button className="btn btn-ghost" onClick={back} disabled={stepIndex === 0}>← Back</button>
            <span className="step-counter">{stepIndex + 1} / {steps.length}</span>
            <button className="btn btn-primary btn-big" onClick={advance}>
              {stepIndex + 1 < steps.length ? 'Next →' : '🎯 Take the quiz!'}
            </button>
          </div>
        </div>
      ) : (
        <div className="stage-body">
          <div className="dialogue-row">
            <Mascot mood="thinking" size={140} />
            <SpeechBubble text={`Quiz time! Answer all ${stage.quiz.length} questions correctly to unlock the next stage. No pressure — you can retry as many times as you like!`} />
          </div>
          <Quiz questions={stage.quiz} onPass={onComplete} />
          <div className="stage-nav">
            <button className="btn btn-ghost" onClick={back}>← Review the lesson</button>
          </div>
        </div>
      )}
    </div>
  )
}
