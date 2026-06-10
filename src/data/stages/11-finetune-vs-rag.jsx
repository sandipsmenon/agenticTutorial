import FineTuneVsRAGVisual from '../../components/visuals/FineTuneVsRAGVisual.jsx'

export default {
  id: 'finetune-vs-rag',
  emoji: '⚖️',
  title: 'Fine-tuning vs RAG',
  color: '#8e44ad',
  steps: [
    {
      mood: 'explaining',
      text: "You've met both heroes: fine-tuning (extra training that changes the model's weights) and RAG (retrieving fresh evidence at question time). Builders face this choice constantly — so let's learn WHEN to use WHICH!",
    },
    {
      mood: 'happy',
      text: "The rule of thumb: fine-tuning teaches lasting SKILLS and STYLE — a voice, a format, a niche ability. RAG supplies changing FACTS — today's prices, your wiki, this customer's order. Skills get baked in; facts get looked up!",
    },
    {
      mood: 'thinking',
      text: "Think of it like a chef: fine-tuning is culinary school (slow, deep, permanent technique). RAG is checking today's pantry before cooking (instant, always current). You wouldn't retrain a chef every time the menu changes!",
    },
    {
      mood: 'excited',
      text: "Your turn! Sort the six scenarios below into fine-tuning or RAG. Real systems often use BOTH — a fine-tuned voice with RAG-fetched facts — but each scenario here has a clear best answer. Go!",
      visual: FineTuneVsRAGVisual,
    },
  ],
  quiz: [
    {
      q: 'What does fine-tuning actually change?',
      options: [
        'The model\'s weights (parameters), via extra training',
        'The user\'s prompt',
        'The internet',
        'Nothing — it\'s a marketing term',
      ],
      answer: 0,
      explain: 'Fine-tuning is extra training — the knowledge/skill is baked into the weights.',
    },
    {
      q: 'Your bot must know stock prices from 5 minutes ago. Which approach?',
      options: [
        'Fine-tune every 5 minutes',
        'RAG — retrieve current prices at question time',
        'Use a larger context window',
        'Train from scratch nightly',
      ],
      answer: 1,
      explain: 'Rapidly changing facts are exactly what retrieval is for.',
    },
    {
      q: 'You want the model to ALWAYS write in your brand\'s quirky tone. Best fit?',
      options: [
        'RAG over your price list',
        'Fine-tuning on examples of that tone',
        'Shouting in the prompt',
        'Lowering the temperature to 0',
      ],
      answer: 1,
      explain: 'A consistent style is a lasting behavior — bake it in with fine-tuning.',
    },
  ],
}
