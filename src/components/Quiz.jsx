import { useState } from 'react'
import { sound } from '../lib/sound.js'

// One question at a time; instant feedback.
// passThreshold: minimum correct to pass (default: all of them).
// onAnswer({correct, firstTry}) fires per answer; onPass({score, total, firstTrySolves}) on success.
export default function Quiz({ questions, onPass, onAnswer, passThreshold }) {
  const threshold = passThreshold ?? questions.length
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [firstTrySolves, setFirstTrySolves] = useState(0)
  const [attempt, setAttempt] = useState(0) // 0 = first run-through
  const [finished, setFinished] = useState(false)

  const question = questions[qIndex]
  const answered = selected !== null
  const correct = answered && selected === question.answer

  const choose = (i) => {
    if (answered) return
    setSelected(i)
    const isCorrect = i === question.answer
    const firstTry = attempt === 0
    if (isCorrect) {
      setScore((s) => s + 1)
      if (firstTry) setFirstTrySolves((f) => f + 1)
      sound.play('correct')
    } else {
      sound.play('wrong')
    }
    onAnswer?.({ correct: isCorrect, firstTry })
  }

  const next = () => {
    sound.play('click')
    if (qIndex + 1 < questions.length) {
      setQIndex((q) => q + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const retry = () => {
    sound.play('click')
    setQIndex(0)
    setSelected(null)
    setScore(0)
    setFirstTrySolves(0)
    setAttempt((a) => a + 1)
    setFinished(false)
  }

  if (finished) {
    const passed = score >= threshold
    return (
      <div className="quiz-card pop-in">
        <div className="quiz-result-emoji">{passed ? '🎉' : '💪'}</div>
        <h3>
          {score === questions.length
            ? 'Perfect score!'
            : `You got ${score} of ${questions.length}`}
        </h3>
        <p>
          {passed
            ? 'You crushed it — onward!'
            : `You need ${threshold} of ${questions.length} to pass. Give it another go — you've got this!`}
        </p>
        {passed ? (
          <button
            className="btn btn-primary btn-big"
            onClick={() => onPass({ score, total: questions.length, firstTrySolves })}
          >
            Continue the adventure →
          </button>
        ) : (
          <button className="btn btn-primary btn-big" onClick={retry}>↻ Try again</button>
        )}
      </div>
    )
  }

  return (
    <div className="quiz-card pop-in" key={`${attempt}-${qIndex}`}>
      <div className="quiz-progress">
        Question {qIndex + 1} of {questions.length}
        <span className="quiz-dots">
          {questions.map((_, i) => (
            <span key={i} className={`quiz-dot ${i < qIndex ? 'quiz-dot-done' : i === qIndex ? 'quiz-dot-now' : ''}`} />
          ))}
        </span>
      </div>
      <h3 className="quiz-question">{question.q}</h3>
      <div className="quiz-options">
        {question.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered && i === question.answer) cls += ' quiz-correct'
          else if (answered && i === selected) cls += ' quiz-wrong'
          else if (answered) cls += ' quiz-dim'
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`quiz-feedback pop-in ${correct ? 'quiz-feedback-good' : 'quiz-feedback-bad'}`}>
          <strong>{correct ? '✅ Correct!' : '❌ Not quite!'}</strong> {question.explain}
          <div className="visual-actions">
            <button className="btn btn-primary" onClick={next}>
              {qIndex + 1 < questions.length ? 'Next question →' : 'See results 🏁'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
