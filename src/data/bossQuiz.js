// The Final Gauntlet — 20-question pool mixing every stage, slightly harder.
// pickBossQuestions() shuffles and deals 10; pass = 8/10.
export const BOSS_POOL = [
  {
    q: 'Your friend says "AI and Machine Learning are the same thing." What\'s the most accurate correction?',
    options: [
      'They are exactly the same',
      'ML is one approach INSIDE the bigger field of AI',
      'AI is a type of ML',
      'Neither exists, it\'s all marketing',
    ],
    answer: 1,
    explain: 'ML (learning from data) is one — very successful — branch of the broader AI field.',
  },
  {
    q: 'An LLM writes a whole essay. What is it actually doing under the hood?',
    options: [
      'Copy-pasting from a database of essays',
      'Predicting one token at a time, over and over',
      'Translating from a secret robot language',
      'Searching the web in real time',
    ],
    answer: 1,
    explain: 'Every word you see is the result of repeated next-token prediction.',
  },
  {
    q: 'You need a private assistant on a cheap laptop with no internet. Best pick?',
    options: [
      'The largest cloud LLM available',
      'A quantized SLM running locally (e.g. via Ollama)',
      'Training a new frontier model yourself',
      'A spreadsheet',
    ],
    answer: 1,
    explain: 'Small + quantized + local = private, offline, and laptop-friendly.',
  },
  {
    q: 'A 1,000-word document is roughly how many tokens in English?',
    options: ['About 10', 'About 130', 'About 1,300', 'About 130,000'],
    answer: 2,
    explain: '1 token ≈ ¾ of a word, so ~1,300 tokens for 1,000 words.',
  },
  {
    q: 'Why might a chatbot "forget" the start of a very long conversation?',
    options: [
      'It gets bored',
      'Old tokens fall outside the context window',
      'The internet connection drops old words',
      'Tokens expire after one hour',
    ],
    answer: 1,
    explain: 'The context window is finite — once full, the oldest tokens are out of view.',
  },
  {
    q: 'During training, the loss curve suddenly stops going down. What does that suggest?',
    options: [
      'The model finished learning everything possible from this setup',
      'The computer is broken',
      'Loss curves always go up eventually',
      'The data became sentient',
    ],
    answer: 0,
    explain: 'A plateaued loss means learning has stalled — time to adjust data, size, or settings.',
  },
  {
    q: 'What does RLHF add that pre-training alone does not?',
    options: [
      'More parameters',
      'Faster GPUs',
      'Human preferences — answers people actually find helpful and safe',
      'Bigger context windows',
    ],
    answer: 2,
    explain: 'Pre-training builds knowledge; RLHF shapes behavior using human rankings.',
  },
  {
    q: 'Quantizing a model from 16-bit to 4-bit numbers mainly trades…',
    options: [
      'privacy for speed',
      'a little quality for a LOT less memory',
      'tokens for parameters',
      'electricity for water',
    ],
    answer: 1,
    explain: 'Lower-precision weights shrink the model ~4× with only a small quality dip.',
  },
  {
    q: 'An agent books you a flight. Which sequence is the agent loop?',
    options: [
      'Sleep → Dream → Repeat',
      'Think → Act → Observe → repeat until done',
      'Download → Install → Restart',
      'Ask → Ignore → Apologize',
    ],
    answer: 1,
    explain: 'Plan, use a tool, read the result, loop until the goal is reached.',
  },
  {
    q: 'Your agent keeps calling the same broken tool forever. Which guardrail was missing?',
    options: ['A step limit', 'A bigger model', 'More tools', 'Louder beeping'],
    answer: 0,
    explain: 'Step limits (and failure handling) stop agents from looping endlessly.',
  },
  {
    q: 'What problem does MCP solve?',
    options: [
      'Models being too small',
      'Every AI app needing custom integration code for every tool',
      'Slow internet connections',
      'Expensive GPUs',
    ],
    answer: 1,
    explain: 'One open protocol: build a connector once, every MCP app can use it.',
  },
  {
    q: 'In MCP terms, what does a "connector" (server) for Slack actually provide?',
    options: [
      'A faster version of Slack',
      'Tools like send_message that the AI can call',
      'Free Slack subscriptions',
      'A new programming language',
    ],
    answer: 1,
    explain: 'Connectors expose tools and data through the standard protocol.',
  },
  {
    q: 'Which prompt will most likely get the BEST answer from a model?',
    options: [
      '"food"',
      '"Tell me about food"',
      '"You are a nutritionist. Suggest a 3-meal day for an active teen, in a table."',
      '"FOOD!!!" (all caps helps)',
    ],
    answer: 2,
    explain: 'Role + specifics + output format = the prompt-engineering trifecta.',
  },
  {
    q: 'Giving the model 2–3 example answers in your prompt is called…',
    options: ['Fine-tuning', 'Few-shot prompting', 'Quantization', 'Overclocking'],
    answer: 1,
    explain: 'Few-shot examples show the pattern you want — no training required.',
  },
  {
    q: 'How does RAG stop a model from making things up about YOUR documents?',
    options: [
      'It retrains the model nightly',
      'It retrieves the relevant text and puts it in the prompt as evidence',
      'It deletes wrong answers after the fact',
      'It makes the model smaller',
    ],
    answer: 1,
    explain: 'Retrieve → stuff into context → answer grounded in real text.',
  },
  {
    q: 'Embeddings place words in space so that…',
    options: [
      'alphabetical neighbors are close',
      'similar MEANINGS end up close together',
      'short words cluster in the middle',
      'every word is equally far apart',
    ],
    answer: 1,
    explain: 'Distance ≈ meaning: "puppy" sits near "dog", far from "spreadsheet".',
  },
  {
    q: 'A model confidently cites a paper that does not exist. This is…',
    options: [
      'a hallucination — fluent text is not guaranteed-true text',
      'proof the paper is secret',
      'a sign the model is being sarcastic',
      'impossible; models never err',
    ],
    answer: 0,
    explain: 'Models optimize for plausible text. Confidence ≠ correctness — verify!',
  },
  {
    q: 'Best defense when you need an AI answer with up-to-date facts?',
    options: [
      'Ask twice as nicely',
      'Use RAG or search so the model can cite real, current sources',
      'Raise the temperature',
      'Use a smaller model',
    ],
    answer: 1,
    explain: 'Ground the model in retrieved evidence instead of relying on its memory.',
  },
  {
    q: 'Your bot must answer using THIS week\'s price list. Fine-tuning or RAG?',
    options: [
      'Fine-tuning — retrain weekly',
      'RAG — retrieve the current list at question time',
      'Neither, prices are unknowable',
      'Both are equally practical here',
    ],
    answer: 1,
    explain: 'Fresh, changing facts → RAG. Fine-tuning is for style/skill, not daily data.',
  },
  {
    q: 'You want the model to ALWAYS answer in your company\'s quirky voice. Best tool?',
    options: [
      'Fine-tuning on examples of that voice',
      'RAG over the price list',
      'A bigger context window',
      'Lower temperature only',
    ],
    answer: 0,
    explain: 'Consistent style/behavior is the classic fine-tuning use case.',
  },
  {
    q: 'A multimodal model can describe a photo because…',
    options: [
      'it secretly asks a human',
      'images are turned into tokens the same brain can process alongside text',
      'photos contain hidden captions',
      'it guesses randomly and is often lucky',
    ],
    answer: 1,
    explain: 'Everything — pixels, audio, text — becomes tokens for one shared model.',
  },
]

export const BOSS_SIZE = 10
export const BOSS_PASS = 8

export function pickBossQuestions(rnd = Math.random) {
  const pool = [...BOSS_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, BOSS_SIZE)
}
