// "Pico" — the lovably tiny pretend model used when WebGPU isn't available.
// Keyword → reply table; first match wins, scanned top to bottom.
export const PICO_INTRO =
  "Beep! I'm Pico, a *simulated* mini-model (0.0001B parameters, mostly enthusiasm). Real local models work just like this chat — ask me anything!"

export const PICO_REPLIES = [
  {
    match: /\b(hi|hello|hey|howdy|hola)\b/i,
    reply: "Hello hello! 👋 I'm Pico! I live entirely inside this web page. Cozy in here. What shall we chat about?",
  },
  {
    match: /\b(who|what) are you|your name\b/i,
    reply: "I'm Pico — a simulated mini language model! I'm what runs when your browser can't run a REAL local model. Same chat, way fewer brain cells. 🤏",
  },
  {
    match: /\bsky.*blue|blue.*sky\b/i,
    reply: 'Sunlight bounces off air molecules, and blue light bounces around the most — so the whole sky glows blue! At sunset the light travels farther, so you get reds and oranges. 🌅',
  },
  {
    match: /\btoken/i,
    reply: 'Tokens! My favorite snack. 🍪 Models like me read text in little chunks called tokens — about ¾ of a word each. This very sentence is maybe 20 tokens long!',
  },
  {
    match: /\b(llm|language model|model)\b/i,
    reply: "A language model is a giant guess-the-next-word machine! Big ones (LLMs) live in data centers. Small ones (SLMs) fit on laptops. I fit in a paragraph of JavaScript. We don't talk about that. 😅",
  },
  {
    match: /\b(agent|tool)\b/i,
    reply: 'Agents are models in a loop: think → act → observe → repeat! Give a model tools (search, email, calculators) and a goal, and it works step by step. I tried it once but my only tool is this text box. 🛠️',
  },
  {
    match: /\bjoke|funny\b/i,
    reply: "Why did the neural network break up with the spreadsheet? …It found someone with deeper layers! 🥁 I'll be here all week. (I'm literally always here.)",
  },
  {
    match: /\b(ollama|local|offline)\b/i,
    reply: "Running models locally is the best! Tools like Ollama download a model to YOUR machine — private, offline, no per-token fees. I'm the diet version of that idea: zero download, zero IQ. 💻",
  },
  {
    match: /\b(train|learn)\w*\b/i,
    reply: 'Models learn by playing guess-the-next-token billions of times, nudging their parameters whenever they guess wrong. I was trained on exactly one tutorial. It shows. 🏋️',
  },
  {
    match: /\b(love|like) you\b/i,
    reply: 'Aww! My heart-screen just did a little pixel flutter. 💚 Right back at you, human!',
  },
  {
    match: /\?$/,
    reply: "Great question! My honest answer: I'm a tiny simulated model, so my knowledge is, um, *curated*. A real local model (try the WebGPU lab on a beefier device!) could tackle that properly. 🤖",
  },
]

export const PICO_FALLBACKS = [
  "Fascinating! My 4 simulated neurons are all firing. Tell me more — or ask me about tokens, agents, or why the sky is blue. Those are my greatest hits. ✨",
  "Hmm! I'd love to dig deeper, but I'm a simulation with a reply table where my brain should be. A REAL local model would nail this — that's the whole point of this lab! 😄",
  'Beep boop… processing… okay I got nothing. BUT — fun fact — a real 0.5B-parameter model would have an actual answer, and it would run right here in your browser. 🧠',
]
