import { useEffect, useRef, useState } from 'react'

const LIBRARY = [
  { id: 0, icon: '🍕', title: 'Pizza dough recipe' },
  { id: 1, icon: '🐹', title: 'Hamster care guide' },
  { id: 2, icon: '🛼', title: 'Skate park rules' },
  { id: 3, icon: '🌋', title: 'Volcano facts' },
  { id: 4, icon: '🎂', title: 'Office birthday list' },
  { id: 5, icon: '📶', title: 'Wi-Fi setup manual' },
]

const QUESTIONS = [
  {
    q: 'How hot should my pizza oven be?',
    hits: [0],
    answer: '“Your dough recipe says: bake at 250°C for 8–10 minutes.” 📄✔',
  },
  {
    q: 'What does my hamster eat, and when is Maya\'s birthday?',
    hits: [1, 4],
    answer: '“Pellets + fresh veggies daily (care guide), and Maya\'s birthday is March 12 (birthday list)!” 📄📄✔',
  },
  {
    q: 'Why is the Wi-Fi slow near the volcano poster?',
    hits: [5, 3],
    answer: '“The manual suggests moving the router higher; volcano facts are thrilling but not the problem.” 😄',
  },
]

export default function RAGPipelineVisual() {
  const [qIdx, setQIdx] = useState(null)
  const [phase, setPhase] = useState(0) // 0 idle, 1 embed, 2 search, 3 answer
  const timers = useRef([])

  const ask = (i) => {
    timers.current.forEach(clearTimeout)
    setQIdx(i)
    setPhase(1)
    timers.current = [
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1800),
    ]
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const cur = qIdx !== null ? QUESTIONS[qIdx] : null

  return (
    <div className="visual-card">
      <h3 className="visual-title">🧭 RAG: let the model look things up — pick a question!</h3>
      <div className="rag-questions">
        {QUESTIONS.map((q, i) => (
          <button key={i} className={`btn ${qIdx === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => ask(i)}>
            {q.q}
          </button>
        ))}
      </div>
      <div className="rag-flow">
        <div className={`rag-step ${phase >= 1 ? 'rag-on' : ''}`}>❓ Question</div>
        <div className="rag-arrow">→</div>
        <div className={`rag-step ${phase >= 1 ? 'rag-on' : ''}`}>🔢 Turn into embedding</div>
        <div className="rag-arrow">→</div>
        <div className={`rag-step ${phase >= 2 ? 'rag-on' : ''}`}>📚 Search the library</div>
        <div className="rag-arrow">→</div>
        <div className={`rag-step ${phase >= 3 ? 'rag-on' : ''}`}>🤖 Answer with evidence</div>
      </div>
      <div className="rag-library">
        {LIBRARY.map((doc) => {
          const hit = phase >= 2 && cur?.hits.includes(doc.id)
          return (
            <div key={doc.id} className={`rag-doc ${hit ? 'rag-doc-hit' : phase >= 2 && cur ? 'rag-doc-dim' : ''}`}>
              <span className="rag-doc-icon">{doc.icon}</span>
              {doc.title}
              {hit && <span className="rag-doc-badge">match!</span>}
            </div>
          )
        })}
      </div>
      {phase >= 3 && cur && (
        <div className="pipeline-desc pop-in">🤖 {cur.answer}</div>
      )}
      <p className="visual-hint">
        RAG = Retrieval-Augmented Generation. Instead of guessing from memory, the model
        <strong> retrieves</strong> the most similar documents (using embeddings!) and answers
        <strong> grounded in real text</strong> — great for facts the model never saw in training.
      </p>
    </div>
  )
}
