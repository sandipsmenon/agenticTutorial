import { useState } from 'react'

const SCENARIOS = [
  { id: 0, text: 'Bot must answer using TODAY\'s flight prices', best: 'rag', why: 'Prices change hourly — retrieve them fresh at question time.' },
  { id: 1, text: 'Bot must always talk like a cheerful pirate', best: 'ft', why: 'A consistent voice/style is baked-in behavior — classic fine-tuning.' },
  { id: 2, text: 'Answer questions about your 500-page company wiki', best: 'rag', why: 'Look the answer up in the wiki and cite it — no retraining needed when pages change.' },
  { id: 3, text: 'Medical scribe must use your hospital\'s exact report format', best: 'ft', why: 'A precise, repeated output format is a learned skill — fine-tune on examples.' },
  { id: 4, text: 'Chatbot needs each customer\'s current order status', best: 'rag', why: 'Per-user live data must be retrieved at runtime — you can\'t train it in.' },
  { id: 5, text: 'Model should master your niche programming language', best: 'ft', why: 'A new skill the base model lacks → teach it with fine-tuning on lots of examples.' },
]

export default function FineTuneVsRAGVisual() {
  const [placed, setPlaced] = useState({}) // id -> 'ft' | 'rag'
  const [activeCard, setActiveCard] = useState(null)
  const remaining = SCENARIOS.filter((s) => placed[s.id] === undefined)
  const correctCount = SCENARIOS.filter((s) => placed[s.id] === s.best).length
  const doneCount = Object.keys(placed).length

  const place = (side) => {
    if (activeCard === null) return
    setPlaced((p) => ({ ...p, [activeCard]: side }))
    setActiveCard(null)
  }

  return (
    <div className="visual-card">
      <h3 className="visual-title">⚖️ Fine-tuning or RAG? Sort the scenarios!</h3>
      {remaining.length > 0 ? (
        <>
          <div className="ftrag-cards">
            {remaining.map((s) => (
              <button
                key={s.id}
                className={`ftrag-card ${activeCard === s.id ? 'ftrag-card-active' : ''}`}
                onClick={() => setActiveCard(activeCard === s.id ? null : s.id)}
              >
                {s.text}
              </button>
            ))}
          </div>
          <p className="visual-hint" style={{ textAlign: 'center' }}>
            {activeCard === null ? '👆 Pick a card, then choose its home:' : '…now place it! 👇'}
          </p>
          <div className="ftrag-pans">
            <button className="ftrag-pan ftrag-ft" disabled={activeCard === null} onClick={() => place('ft')}>
              🏋️ Fine-tuning<br /><small>teach the model a lasting skill or style</small>
            </button>
            <button className="ftrag-pan ftrag-rag" disabled={activeCard === null} onClick={() => place('rag')}>
              📚 RAG<br /><small>look up fresh facts at question time</small>
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-result-emoji" style={{ margin: '8px 0' }}>
          {correctCount === SCENARIOS.length ? '🏆' : '💪'} {correctCount}/{SCENARIOS.length} sorted correctly!
        </div>
      )}
      {doneCount > 0 && (
        <div className="ftrag-results">
          {SCENARIOS.filter((s) => placed[s.id] !== undefined).map((s) => {
            const right = placed[s.id] === s.best
            return (
              <div key={s.id} className={`ftrag-result ${right ? 'ftrag-right' : 'ftrag-wrong'}`}>
                {right ? '✅' : '❌'} <strong>{s.text}</strong> → {s.best === 'ft' ? '🏋️ Fine-tuning' : '📚 RAG'}. {s.why}
              </div>
            )
          })}
        </div>
      )}
      {remaining.length === 0 && (
        <div className="visual-actions">
          <button className="btn btn-ghost" onClick={() => { setPlaced({}); setActiveCard(null) }}>↻ Sort again</button>
        </div>
      )}
      <p className="visual-hint">
        Rule of thumb: <strong>changing facts → RAG</strong>; <strong>lasting skills &amp; style → fine-tuning</strong>.
        Real systems often combine both!
      </p>
    </div>
  )
}
