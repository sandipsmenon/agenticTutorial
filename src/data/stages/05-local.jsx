import LocalModelVisual from '../../components/visuals/LocalModelVisual.jsx'

export default {
  id: 'local',
  emoji: '💻',
  title: 'Run It Locally',
  color: '#0984e3',
  steps: [
    {
      mood: 'excited',
      text: "Want a model that lives on YOUR computer? Tools like Ollama make it one command: 'ollama pull' downloads a model, 'ollama run' starts chatting. Watch the demo terminal below!",
      visual: LocalModelVisual,
    },
    {
      mood: 'explaining',
      text: "The trick that makes this possible is quantization — storing the model's numbers with less precision (like 4-bit instead of 16-bit), shrinking it enough to fit in ordinary RAM with only a small quality dip.",
      visual: LocalModelVisual,
    },
    {
      mood: 'happy',
      text: "Why bother? Privacy — your data never leaves your machine. Cost — no per-token fees. Offline — works on a plane! The trade-off: local models are smaller, so they're not as brilliant as the giant cloud ones.",
      visual: LocalModelVisual,
    },
  ],
  quiz: [
    {
      q: 'What does Ollama help you do?',
      options: [
        'Order llamas online',
        'Download and run language models on your own computer',
        'Train frontier models from scratch',
        'Speed up your Wi-Fi',
      ],
      answer: 1,
      explain: 'Ollama (and friends like LM Studio) make running local models a one-liner.',
    },
    {
      q: 'What is quantization?',
      options: [
        'A quantum computer feature',
        'Storing model numbers with less precision so the model fits in less memory',
        'Deleting half the model\'s knowledge',
        'A type of encryption',
      ],
      answer: 1,
      explain: 'Lower-precision numbers → much smaller model, with only a small quality cost.',
    },
    {
      q: 'Which is NOT a typical benefit of running models locally?',
      options: [
        'Better privacy',
        'No per-token fees',
        'Works offline',
        'More capable than the biggest cloud models',
      ],
      answer: 3,
      explain: 'Local models are handy, but the biggest cloud LLMs are still the smartest.',
    },
  ],
}
