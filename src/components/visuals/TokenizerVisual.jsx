import { useMemo, useState } from 'react'

const CHIP_COLORS = ['#ffd6e7', '#d6f5ff', '#fff3c4', '#dcffd6', '#e8dcff', '#ffe0cc']

// Toy tokenizer: splits words into ~subword chunks so it *feels* like real BPE.
function toyTokenize(text) {
  const tokens = []
  const parts = text.split(/(\s+)/).filter((p) => p.length > 0)
  for (const part of parts) {
    if (/^\s+$/.test(part)) continue
    let word = part
    while (word.length > 4) {
      tokens.push(word.slice(0, 4))
      word = word.slice(4)
    }
    if (word) tokens.push(word)
  }
  return tokens
}

export default function TokenizerVisual() {
  const [text, setText] = useState('Robots love learning about artificial intelligence!')
  const tokens = useMemo(() => toyTokenize(text), [text])
  // Illustrative price: $3 per million input tokens
  const cost = ((tokens.length / 1_000_000) * 3).toFixed(8)

  return (
    <div className="visual-card">
      <h3 className="visual-title">✂️ Try the tokenizer — type anything!</h3>
      <input
        className="token-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a sentence…"
        aria-label="Text to tokenize"
      />
      <div className="token-chips">
        {tokens.map((t, i) => (
          <span key={i} className="token-chip" style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }}>
            {t}
          </span>
        ))}
      </div>
      <div className="token-stats">
        <div className="stat-pill">🔢 <strong>{tokens.length}</strong> tokens</div>
        <div className="stat-pill">🔤 <strong>{text.length}</strong> characters</div>
        <div className="stat-pill">💰 ≈ <strong>${cost}</strong> at $3/million tokens</div>
      </div>
      <p className="visual-hint">
        Real tokenizers are smarter (they learn common chunks like “ing” and “tion”), but the idea
        is the same: models read and write <em>tokens</em>, and you pay per token. A rough rule:
        1 token ≈ ¾ of an English word.
      </p>
    </div>
  )
}
