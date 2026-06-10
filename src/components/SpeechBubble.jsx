import { useEffect, useRef, useState } from 'react'

// Comic-style speech bubble with a typewriter effect.
// Click (or the Skip button) reveals the full text instantly.
export default function SpeechBubble({ text, speakerName = 'Neuro', onDone }) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    setShown('')
    setDone(false)
    indexRef.current = 0
    timerRef.current = setInterval(() => {
      indexRef.current += 2
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current)
        setShown(text)
        setDone(true)
        onDoneRef.current?.()
      } else {
        setShown(text.slice(0, indexRef.current))
      }
    }, 18)
    return () => clearInterval(timerRef.current)
  }, [text])

  const skip = () => {
    if (done) return
    clearInterval(timerRef.current)
    setShown(text)
    setDone(true)
    onDoneRef.current?.()
  }

  return (
    <div className="speech-bubble" onClick={skip} role="status">
      <div className="speech-speaker">{speakerName}</div>
      <p className="speech-text">
        {shown}
        {!done && <span className="speech-cursor">▍</span>}
      </p>
    </div>
  )
}
