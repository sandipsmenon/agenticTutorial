import TokenizerVisual from '../../components/visuals/TokenizerVisual.jsx'

export default {
  id: 'tokens',
  emoji: '✂️',
  title: 'Tokens',
  color: '#00b894',
  steps: [
    {
      mood: 'explaining',
      text: "Here's a secret: models don't read letters or whole words — they read TOKENS! Text gets chopped into bite-sized chunks. Type anything in the box below and watch it get tokenized!",
      visual: TokenizerVisual,
    },
    {
      mood: 'happy',
      text: "Tokens matter for two big reasons. One: the context window — a model can only 'see' a limited number of tokens at once, like a desk that only fits so many papers.",
      visual: TokenizerVisual,
    },
    {
      mood: 'thinking',
      text: "Two: cost! Cloud AI services charge per token, for both your input AND the model's output. Long conversations = more tokens = more money. That's why prompt length matters!",
      visual: TokenizerVisual,
    },
  ],
  quiz: [
    {
      q: 'What does a language model actually read and write?',
      options: ['Whole paragraphs at once', 'Pixels', 'Tokens — small chunks of text', 'Sound waves'],
      answer: 2,
      explain: 'Tokens! Roughly ¾ of a word each in English.',
    },
    {
      q: 'What is the "context window"?',
      options: [
        'The window where you type',
        'The maximum number of tokens the model can consider at once',
        'A browser pop-up',
        'The model\'s training data',
      ],
      answer: 1,
      explain: "It's the model's working memory — once it's full, older tokens fall out of view.",
    },
    {
      q: 'Why do longer prompts cost more on cloud AI services?',
      options: [
        'They use more electricity at your house',
        'Pricing is per token, and longer text = more tokens',
        'They don\'t — all prompts cost the same',
        'Because of taxes',
      ],
      answer: 1,
      explain: 'You pay per token, both for input and output. Token-thrift is real!',
    },
  ],
}
