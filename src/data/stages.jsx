import AIBrainVisual from '../components/visuals/AIBrainVisual.jsx'
import NextTokenVisual from '../components/visuals/NextTokenVisual.jsx'
import LLMvsSLMVisual from '../components/visuals/LLMvsSLMVisual.jsx'
import TokenizerVisual from '../components/visuals/TokenizerVisual.jsx'
import TrainingVisual from '../components/visuals/TrainingVisual.jsx'
import LocalModelVisual from '../components/visuals/LocalModelVisual.jsx'
import AgentLoopVisual from '../components/visuals/AgentLoopVisual.jsx'
import MCPVisual from '../components/visuals/MCPVisual.jsx'

// Each stage: intro dialogue steps (mascot mood + speech + optional visual), then a quiz.
export const STAGES = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'agents',
    emoji: '🤖',
    title: 'Agents & the Loop',
    color: '#a55eea',
    steps: [
      {
        mood: 'explaining',
        text: "Now for my favorite topic: AGENTS! A plain chatbot just answers. An agent gets a GOAL and works toward it — planning, using tools, and checking its progress. The secret sauce is the agent loop!",
        visual: AgentLoopVisual,
      },
      {
        mood: 'happy',
        text: "Think → Act → Observe → repeat! Step through the booking example: the agent plans, calls a tool, reads the result, and decides what to do next — until the goal is reached. Click 'Next step' to drive the loop yourself!",
        visual: AgentLoopVisual,
      },
      {
        mood: 'explaining',
        text: "Tools are how agents touch the world: searching the web, reading files, calling APIs, running code. The model outputs 'I want to call tool X with these arguments', the system runs it, and feeds the result back in.",
        visual: AgentLoopVisual,
      },
      {
        mood: 'thinking',
        text: "Good agent design adds guardrails: a step limit so it can't loop forever, asking a human before risky actions, and breaking big goals into small plans. An agent is powerful — and like any power tool, it needs a safety switch!",
      },
    ],
    quiz: [
      {
        q: 'What three phases repeat in the agent loop?',
        options: [
          'Eat → Sleep → Code',
          'Think → Act → Observe',
          'Copy → Paste → Ship',
          'Ask → Wait → Forget',
        ],
        answer: 1,
        explain: 'Think (plan), Act (use a tool), Observe (read the result) — then loop!',
      },
      {
        q: 'What turns a plain LLM into an agent?',
        options: [
          'A bigger context window',
          'Running it on a faster GPU',
          'Putting it in a loop with tools and a goal',
          'Giving it a cute name',
        ],
        answer: 2,
        explain: 'Agent = LLM + loop + tools + goal. (Cute names optional but encouraged.)',
      },
      {
        q: 'Why do agents need a step limit?',
        options: [
          'To save disk space',
          'So they can\'t loop forever if they get stuck',
          'Because tools expire',
          'To make them faster at math',
        ],
        answer: 1,
        explain: 'Guardrails like step limits and human approval keep agents safe and predictable.',
      },
    ],
  },
  {
    id: 'mcp',
    emoji: '🔌',
    title: 'MCP & Connectors',
    color: '#00cec9',
    steps: [
      {
        mood: 'explaining',
        text: "Last stop: how do agents plug into ALL those tools without custom code for each one? Meet MCP — the Model Context Protocol. Think of it as a USB-C port for AI!",
        visual: MCPVisual,
      },
      {
        mood: 'happy',
        text: "Apps like Claude Desktop use connectors — MCP servers for GitHub, Slack, Google Drive, databases, you name it. Click the connectors below to peek at the tools each one offers!",
        visual: MCPVisual,
      },
      {
        mood: 'explaining',
        text: "The beauty: it's an open standard. Build a connector ONCE and every MCP-compatible app can use it. The AI discovers the available tools, and you control exactly what each connector is allowed to do.",
        visual: MCPVisual,
      },
      {
        mood: 'excited',
        text: "And that's the whole journey — from 'what is AI' all the way to agents with connectors! One more quiz and you'll earn your AI Adventurer certificate! 🏆",
      },
    ],
    quiz: [
      {
        q: 'What is MCP best compared to?',
        options: [
          'A faster CPU',
          'A USB-C port — one standard plug for many tools',
          'A bigger hard drive',
          'A new programming language',
        ],
        answer: 1,
        explain: 'One open protocol, many connectors — plug and play for AI tools!',
      },
      {
        q: 'What does an MCP connector (server) do?',
        options: [
          'Exposes tools and data (like GitHub or Slack actions) for AI apps to use',
          'Makes the model larger',
          'Replaces the internet',
          'Trains new models overnight',
        ],
        answer: 0,
        explain: 'Connectors expose tools — the AI calls them through the standard protocol.',
      },
      {
        q: 'Why is MCP being an OPEN standard a big deal?',
        options: [
          'It makes models cheaper to train',
          'A connector built once works with any MCP-compatible AI app',
          'It removes the need for permissions',
          'It only works with one company\'s app',
        ],
        answer: 1,
        explain: 'Build once, use everywhere — no custom integration code per app.',
      },
    ],
  },
]
