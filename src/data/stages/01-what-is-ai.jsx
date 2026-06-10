import AIBrainVisual from '../../components/visuals/AIBrainVisual.jsx'

export default {
  id: 'what-is-ai',
  emoji: '🧠',
  title: 'What is AI?',
  color: '#6c5ce7',
  steps: [
    {
      mood: 'excited',
      text: "Hi there! I'm Neuro, your robot guide! 🎉 Welcome to AI Adventure — together we'll explore how Artificial Intelligence really works. Ready? Let's go!",
    },
    {
      mood: 'explaining',
      text: "First things first: AI is the big umbrella idea of making machines do 'smart' things. Inside it lives Machine Learning — instead of programming rules by hand, we let computers learn patterns from examples!",
      visual: AIBrainVisual,
    },
    {
      mood: 'happy',
      text: "Deep Learning uses neural networks — math loosely inspired by brain neurons — stacked in many layers. And the newest star, Generative AI, doesn't just recognize things… it CREATES text, images, music and code!",
      visual: AIBrainVisual,
    },
    {
      mood: 'thinking',
      text: "So when you chat with me or any AI assistant, you're talking to a deep-learning model that learned from huge amounts of text. No magic — just math, data, and a LOT of practice!",
    },
  ],
  quiz: [
    {
      q: 'What is Machine Learning?',
      options: [
        'Programming every rule by hand',
        'Letting computers learn patterns from examples',
        'A robot that lifts weights',
        'A type of computer keyboard',
      ],
      answer: 1,
      explain: 'Exactly! Instead of hand-written rules, ML systems learn patterns from data.',
    },
    {
      q: 'Which is the BIGGEST umbrella term?',
      options: ['Deep Learning', 'Generative AI', 'Artificial Intelligence', 'Machine Learning'],
      answer: 2,
      explain: 'AI is the big umbrella — ML, Deep Learning and GenAI all live inside it.',
    },
  ],
}
