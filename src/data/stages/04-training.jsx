import TrainingVisual from '../../components/visuals/TrainingVisual.jsx'

export default {
  id: 'training',
  emoji: '🏋️',
  title: 'Training a Model',
  color: '#fd9644',
  steps: [
    {
      mood: 'explaining',
      text: "So how does a model LEARN? Step one: collect a mountain of text. Step two: pre-training — the model guesses the next token, checks the real answer, and nudges its parameters when it's wrong. Billions and billions of times!",
      visual: TrainingVisual,
    },
    {
      mood: 'happy',
      text: "Watch the loss curve — 'loss' measures how wrong the model is. As training goes on, loss goes down, and the model gets smarter. That downhill slide is the sound of learning!",
      visual: TrainingVisual,
    },
    {
      mood: 'explaining',
      text: "Raw pre-trained models are like brilliant parrots — knowledgeable but unruly. So we fine-tune them on example conversations, then use human feedback (RLHF): people rank answers, and the model learns to prefer helpful, harmless ones.",
      visual: TrainingVisual,
    },
    {
      mood: 'thinking',
      text: "Heads up: training a frontier model takes thousands of GPUs for months and costs millions. That's why almost everyone USES pre-trained models — or lightly fine-tunes one — rather than starting from scratch!",
    },
  ],
  quiz: [
    {
      q: 'During pre-training, what does the model practice?',
      options: [
        'Playing video games',
        'Predicting the next token and correcting itself when wrong',
        'Memorizing the dictionary in order',
        'Drawing pictures of cats',
      ],
      answer: 1,
      explain: 'Guess, check, adjust — repeated billions of times. That\'s pre-training!',
    },
    {
      q: 'What does a FALLING loss curve mean?',
      options: [
        'The model is breaking',
        'The model is making fewer mistakes — it\'s learning!',
        'The computer is running out of power',
        'The data is shrinking',
      ],
      answer: 1,
      explain: 'Lower loss = fewer mistakes = a smarter model.',
    },
    {
      q: 'What is RLHF for?',
      options: [
        'Making the model bigger',
        'Teaching the model to prefer helpful answers using human rankings',
        'Speeding up the internet',
        'Compressing the model files',
      ],
      answer: 1,
      explain: 'Humans rank answers; the model learns to produce the kind people prefer.',
    },
  ],
}
