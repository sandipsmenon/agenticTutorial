import PromptBuilderVisual from '../../components/visuals/PromptBuilderVisual.jsx'

export default {
  id: 'prompt-engineering',
  emoji: '🪄',
  title: 'Prompt Engineering',
  color: '#f39c12',
  steps: [
    {
      mood: 'excited',
      text: "Welcome to the bonus zone, adventurer! First up: prompt engineering — the art of ASKING well. The same model can give you a shrug or a masterpiece, depending entirely on your prompt!",
    },
    {
      mood: 'explaining',
      text: "Great prompts have ingredients: a ROLE ('you are a science teacher'), CONTEXT (who's asking and why), a CLEAR TASK, an EXAMPLE of what you want, and a FORMAT ('3 bullet points'). Toggle them below and watch the answer transform!",
      visual: PromptBuilderVisual,
    },
    {
      mood: 'happy',
      text: "That example trick has a fancy name: few-shot prompting — show the model 2-3 examples of what you want, and it copies the pattern. No retraining, no code. It's the cheapest superpower in AI!",
      visual: PromptBuilderVisual,
    },
    {
      mood: 'thinking',
      text: "One more pro move: ask the model to 'think step by step' for tricky problems. Giving it room to reason before answering often beats demanding an instant answer. Be specific, show examples, let it think!",
    },
  ],
  quiz: [
    {
      q: 'Which prompt is likely to get the BEST result?',
      options: [
        '"dogs"',
        '"Write about dogs"',
        '"You are a vet. Write 3 friendly tips for new puppy owners, as a checklist."',
        '"WRITE ABOUT DOGS PLEASE" (politeness is all you need)',
      ],
      answer: 2,
      explain: 'Role + audience + clear task + format — that\'s the recipe!',
    },
    {
      q: 'What is "few-shot prompting"?',
      options: [
        'Asking very short questions',
        'Including a few examples of what you want in the prompt',
        'Retraining the model a few times',
        'Asking the same question repeatedly',
      ],
      answer: 1,
      explain: 'A few examples in the prompt teach the pattern — no training required.',
    },
    {
      q: 'Your prompt gets a mediocre answer. The cheapest fix is usually…',
      options: [
        'Buying a bigger model',
        'Fine-tuning for a week',
        'Improving the prompt: add role, context, examples, and format',
        'Giving up — AI just can\'t do it',
      ],
      answer: 2,
      explain: 'Always squeeze the prompt first — it\'s free and often dramatic.',
    },
  ],
}
