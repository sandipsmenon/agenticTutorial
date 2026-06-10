import { useEffect, useRef, useState } from 'react'

// Engine-agnostic streaming chat. `chatStream(messages, opts, onToken)` is either
// the real WebLLM backend or the simulated Pico backend — same interface.
export default function ChatPanel({ chatStream, engineLabel, intro, opts = {}, onFirstReply }) {
  const [messages, setMessages] = useState(intro ? [{ role: 'assistant', content: intro }] : [])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const firstReplyRef = useRef(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    const history = [...messages, { role: 'user', content: text }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setBusy(true)
    try {
      await chatStream(
        history.filter((m) => m.content),
        opts,
        (_tok, full) => {
          setMessages([...history, { role: 'assistant', content: full }])
        },
      )
      if (!firstReplyRef.current) {
        firstReplyRef.current = true
        onFirstReply?.()
      }
    } catch (e) {
      setMessages([...history, { role: 'assistant', content: `⚠️ Oops: ${e.message}` }])
    }
    setBusy(false)
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-engine">{engineLabel}</span>
      </div>
      <div className="chat-scroll" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role === 'user' ? 'chat-user' : 'chat-ai'}`}>
            {m.role === 'assistant' && <span className="chat-avatar">🤖</span>}
            <div className="chat-bubble">{m.content || <span className="speech-cursor">▍</span>}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="token-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything… (try: why is the sky blue?)"
          disabled={busy}
        />
        <button className="btn btn-primary" onClick={send} disabled={busy || !input.trim()}>
          {busy ? '…' : 'Send ➤'}
        </button>
      </div>
    </div>
  )
}
