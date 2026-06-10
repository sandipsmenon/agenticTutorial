import NextTokenVisual from '../../components/visuals/NextTokenVisual.jsx'
import LLMvsSLMVisual from '../../components/visuals/LLMvsSLMVisual.jsx'

export default {
  id: 'llm-slm',
  emoji: '🐘',
  title: 'LLMs & SLMs',
  color: '#e84393',
  steps: [
    {
      mood: 'explaining',
      text: "Now, the brains behind chatbots: Language Models! At heart, a language model plays one simple game — guess the next word. Try it yourself below: which word feels most likely?",
      visual: NextTokenVisual,
    },
    {
      mood: 'happy',
      text: "Do that prediction over and over, billions of times during training, and the model gets eerily good at writing, answering, and even coding. One word at a time!",
      visual: NextTokenVisual,
    },
    {
      mood: 'explaining',
      text: "Models come in sizes! LLMs (Large Language Models) are the heavyweight champions — huge, powerful, living in data centers. SLMs (Small Language Models) are nimble — they can run right on your laptop or phone!",
      visual: LLMvsSLMVisual,
    },
    {
      mood: 'thinking',
      text: "Which one to use? Big model for hard reasoning and broad knowledge; small model for speed, privacy, and cost. Pros mix both — like using a truck for big loads and a bike for quick trips!",
      visual: LLMvsSLMVisual,
    },
  ],
  quiz: [
    {
      q: 'What simple game does a language model play at its core?',
      options: [
        'Chess against itself',
        'Guess the next word (token)',
        'Find the hidden picture',
        'Rock, paper, scissors',
      ],
      answer: 1,
      explain: 'Yep — next-token prediction is the core trick behind all that smart-sounding text!',
    },
    {
      q: 'When would an SLM be the BETTER choice?',
      options: [
        'When you need the deepest possible reasoning',
        'When you want a fast, private model on your own device',
        'Never — bigger is always better',
        'Only on supercomputers',
      ],
      answer: 1,
      explain: 'SLMs shine when you want speed, low cost, privacy, or offline use.',
    },
    {
      q: 'What are "parameters" in a model?',
      options: [
        'The adjustable numbers the model learned during training',
        'The buttons on the keyboard',
        'Rules written by programmers',
        'The model\'s internet settings',
      ],
      answer: 0,
      explain: 'Parameters are the learned "knobs" — billions of numbers tuned during training.',
    },
  ],
}
