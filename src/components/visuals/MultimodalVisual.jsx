import { useState } from 'react'

const INPUTS = [
  { id: 'image', icon: '🖼️', name: 'Image' },
  { id: 'audio', icon: '🎤', name: 'Audio' },
  { id: 'text', icon: '📄', name: 'Text' },
]
const OUTPUTS = [
  { id: 'text', icon: '📝', name: 'Text' },
  { id: 'image', icon: '🎨', name: 'Image' },
  { id: 'audio', icon: '🔊', name: 'Speech' },
]

const EXAMPLES = {
  'image-text': '“Describe this photo” → 🤖 “A golden retriever catching a frisbee mid-air on a sunny beach.”',
  'image-image': '“Make this photo look like a watercolor painting” → 🎨 a watercolor version appears!',
  'image-audio': '“Read out what this street sign says” → 🔊 “The sign says: Beach closes at sunset.”',
  'audio-text': '“Transcribe this meeting” → 📝 a tidy transcript with speaker names.',
  'audio-image': '“Draw the scene this song describes” → 🎨 a moonlit jazz café appears!',
  'audio-audio': '“Translate my voice note to Spanish — in my voice” → 🔊 ¡hecho!',
  'text-text': '“Summarize this article in 3 bullets” → 📝 the classic!',
  'text-image': '“A robot teaching a classroom of ducklings, cartoon style” → 🎨 instant artwork!',
  'text-audio': '“Read this bedtime story aloud, gently” → 🔊 soothing narration.',
}

export default function MultimodalVisual() {
  const [inp, setInp] = useState('image')
  const [out, setOut] = useState('text')

  return (
    <div className="visual-card">
      <h3 className="visual-title">🎨 The modality mixer — pick an input and an output!</h3>
      <div className="mm-grid">
        <div className="mm-col">
          <div className="mm-col-label">IN</div>
          {INPUTS.map((m) => (
            <button key={m.id} className={`mm-btn ${inp === m.id ? 'mm-on' : ''}`} onClick={() => setInp(m.id)}>
              {m.icon} {m.name}
            </button>
          ))}
        </div>
        <div className="mm-brain">
          <div className="mm-brain-core">🧠<br /><small>everything<br />becomes tokens</small></div>
          <div className="mm-flow mm-flow-in">▸▸▸</div>
          <div className="mm-flow mm-flow-out">▸▸▸</div>
        </div>
        <div className="mm-col">
          <div className="mm-col-label">OUT</div>
          {OUTPUTS.map((m) => (
            <button key={m.id} className={`mm-btn ${out === m.id ? 'mm-on' : ''}`} onClick={() => setOut(m.id)}>
              {m.icon} {m.name}
            </button>
          ))}
        </div>
      </div>
      <div className="pipeline-desc pop-in" key={`${inp}-${out}`}>
        {EXAMPLES[`${inp}-${out}`]}
      </div>
      <p className="visual-hint">
        Multimodal models turn pixels, sound waves and words into the <strong>same kind of tokens</strong>,
        so one model can see, hear, read — and answer in whichever modality you ask for.
      </p>
    </div>
  )
}
