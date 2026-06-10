import HallucinationVisual from '../../components/visuals/HallucinationVisual.jsx'

export default {
  id: 'hallucinations-safety',
  emoji: '🛟',
  title: 'Hallucinations & Safety',
  color: '#e17055',
  steps: [
    {
      mood: 'worried',
      text: "Time for the most important lesson in this whole adventure. Models like me have a flaw: we can be confidently WRONG. We're trained to produce plausible-sounding text — and 'plausible' is not the same as 'true'.",
    },
    {
      mood: 'explaining',
      text: "These confident inventions are called hallucinations: fake citations, made-up statistics, events that never happened — delivered in a perfectly trustworthy tone. Think you can spot one? Play the round below!",
      visual: HallucinationVisual,
    },
    {
      mood: 'thinking',
      text: "Why does it happen? Remember: at heart I predict the next plausible token. If the true answer wasn't in my training (or got fuzzy), the most plausible-SOUNDING continuation may simply be fiction. I don't have a built-in 'am I sure?' meter!",
    },
    {
      mood: 'happy',
      text: "The defenses: ground answers in real documents (RAG!), ask for sources and actually check them, and scale your skepticism with the stakes — fun trivia, relax; medical or legal decisions, verify everything. AI is a brilliant assistant and a terrible oracle!",
    },
  ],
  quiz: [
    {
      q: 'What is an AI hallucination?',
      options: [
        'When the model sees optical illusions',
        'Confident-sounding output that is actually made up',
        'When the screen flickers',
        'A model dreaming while it trains',
      ],
      answer: 1,
      explain: 'Fluent, confident — and false. That combination is what makes it dangerous.',
    },
    {
      q: 'Why can\'t you judge truth by how confident the model SOUNDS?',
      options: [
        'Models whisper when unsure',
        'Confidence in tone comes from predicting plausible text, not from verified facts',
        'You can — confident tone means correct',
        'Models are legally required to be honest',
      ],
      answer: 1,
      explain: 'The tone is part of the prediction! Plausibility ≠ truth.',
    },
    {
      q: 'You ask an AI for medical advice. The safest move is…',
      options: [
        'Trust it — it sounded very sure',
        'Use the answer as a starting point and verify with real professionals/sources',
        'Ask it twice and trust if the answers match',
        'Raise the temperature for more creativity',
      ],
      answer: 1,
      explain: 'High stakes = high verification. AI assists; humans and sources confirm.',
    },
  ],
}
