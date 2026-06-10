import { useState } from 'react'

const ROUNDS = [
  {
    topic: 'Question: "Tell me about the Moon."',
    answers: [
      { text: 'The Moon orbits Earth roughly every 27 days.', fake: false },
      { text: 'The Moon\'s gravity causes ocean tides on Earth.', fake: false },
      { text: 'The Moon\'s famous Lake Serenity holds 3% of its fresh water.', fake: true, why: 'Sounds official, but the Moon has NO liquid water — "Mare Serenitatis" is a dry plain of ancient lava!' },
    ],
  },
  {
    topic: 'Question: "Who invented the telephone?"',
    answers: [
      { text: 'Alexander Graham Bell received the first US telephone patent in 1876.', fake: false },
      { text: 'In his 1879 acceptance speech for the Nobel Prize in Telephony, Bell thanked his cat.', fake: true, why: 'Triple hallucination: no "Nobel Prize in Telephony" exists, Nobel Prizes started in 1901, and the cat is pure invention — yet it sounds plausible!' },
      { text: 'Antonio Meucci built early voice-communication devices before Bell.', fake: false },
    ],
  },
]

export default function HallucinationVisual() {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)
  const r = ROUNDS[round]
  const done = picked !== null
  const fakeIdx = r.answers.findIndex((a) => a.fake)
  const gotIt = picked === fakeIdx

  return (
    <div className="visual-card">
      <h3 className="visual-title">🕵️ Spot the hallucination!</h3>
      <p className="halluc-topic">{r.topic} — one of these confident answers is <strong>made up</strong>. Which?</p>
      <div className="quiz-options">
        {r.answers.map((a, i) => {
          let cls = 'quiz-option'
          if (done && a.fake) cls += ' quiz-wrong'
          else if (done) cls += ' quiz-correct'
          return (
            <button key={i} className={cls} disabled={done} onClick={() => setPicked(i)}>
              <span className="quiz-letter">🤖</span>
              {a.text}
            </button>
          )
        })}
      </div>
      {done && (
        <div className={`quiz-feedback pop-in ${gotIt ? 'quiz-feedback-good' : 'quiz-feedback-bad'}`}>
          <strong>{gotIt ? '🎯 Caught it!' : '😅 Sneaky, right?'}</strong> {r.answers[fakeIdx].why}
          {round + 1 < ROUNDS.length && (
            <div className="visual-actions">
              <button className="btn btn-primary" onClick={() => { setRound(round + 1); setPicked(null) }}>
                Next round →
              </button>
            </div>
          )}
        </div>
      )}
      <div className="local-cards" style={{ marginTop: 16 }}>
        <div className="mini-card">🧠 <strong>Why it happens:</strong> models are trained to produce <em>plausible</em> text — not verified facts</div>
        <div className="mini-card">📚 <strong>Defense 1:</strong> ground answers in real documents (RAG)</div>
        <div className="mini-card">🔍 <strong>Defense 2:</strong> ask for sources, then actually check them</div>
        <div className="mini-card">⚖️ <strong>Defense 3:</strong> the higher the stakes, the more you verify</div>
      </div>
    </div>
  )
}
