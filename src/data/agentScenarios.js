// Agent sandbox scenarios. Deterministic: the scripted loop succeeds only if
// every `needs` tool is equipped; otherwise it fails at that step.
export const TOOLBOX = [
  { id: 'calendar', icon: '📅', name: 'Calendar' },
  { id: 'web_search', icon: '🔎', name: 'Web Search' },
  { id: 'send_email', icon: '📧', name: 'Send Email' },
  { id: 'calculator', icon: '🧮', name: 'Calculator' },
  { id: 'weather', icon: '🌤️', name: 'Weather' },
  { id: 'file_reader', icon: '📂', name: 'File Reader' },
  { id: 'music_player', icon: '🎵', name: 'Music Player' },
  { id: 'dice_roller', icon: '🎲', name: 'Dice Roller' },
]

export const SCENARIOS = [
  {
    id: 'party',
    title: 'Plan a surprise birthday party 🎂',
    goal: 'Find a free evening for Sam\'s surprise party and invite the friends.',
    hint: 'Think: what does the agent need to CHECK and to SEND?',
    maxTools: 4,
    script: [
      { phase: 'think', text: 'I need a date when Sam is free, then I should invite everyone.' },
      { phase: 'act', needs: 'calendar', text: 'calendar.find_free_evening(person="Sam")', fail: 'I need to check when Sam is free… but I have no Calendar tool! 😵' },
      { phase: 'observe', text: 'Result: Friday 7pm is free!' },
      { phase: 'think', text: 'Friday works. Now I\'ll send the invitations — secretly!' },
      { phase: 'act', needs: 'send_email', text: 'send_email(to=friends, subject="🤫 Surprise party Friday 7pm!")', fail: 'Time to invite everyone… but I can\'t send anything without the Email tool! 😵' },
      { phase: 'observe', text: 'Result: 12 invitations sent ✔' },
      { phase: 'done', text: 'Party planned for Friday 7pm and everyone\'s invited. Sam suspects nothing! 🎉' },
    ],
  },
  {
    id: 'picnic',
    title: 'Plan the perfect picnic 🧺',
    goal: 'Pick a sunny day this week and split the snack budget among 4 friends.',
    hint: 'The agent must look OUTSIDE (sky) and do some MATH.',
    maxTools: 4,
    script: [
      { phase: 'think', text: 'A picnic needs sunshine. Let me check the forecast first.' },
      { phase: 'act', needs: 'weather', text: 'weather.forecast(days=7)', fail: 'Hmm, will it rain? I have no Weather tool, so I genuinely can\'t tell! 😵' },
      { phase: 'observe', text: 'Result: Saturday is sunny ☀️ (24°C)' },
      { phase: 'think', text: 'Saturday it is! The snacks cost $48 — time to split it 4 ways.' },
      { phase: 'act', needs: 'calculator', text: 'calculator.eval("48 / 4")', fail: 'Math time… and I am embarrassingly bad at math without my Calculator tool! 😵' },
      { phase: 'observe', text: 'Result: 12' },
      { phase: 'done', text: 'Picnic on sunny Saturday — everyone chips in $12. Sandwiches assemble! 🥪' },
    ],
  },
  {
    id: 'report',
    title: 'Summarize the mystery report 🕵️',
    goal: 'Read quarterly-report.txt, check one fact online, and email the summary to the boss.',
    hint: 'Three jobs: READ, VERIFY, SEND.',
    maxTools: 4,
    script: [
      { phase: 'think', text: 'First I need to actually read the report file.' },
      { phase: 'act', needs: 'file_reader', text: 'file_reader.read("quarterly-report.txt")', fail: 'The report is right there… but I can\'t open files without the File Reader! 😵' },
      { phase: 'observe', text: 'Result: "…sales grew 23%, market size $4B (unverified)…"' },
      { phase: 'think', text: 'That $4B claim looks suspicious. Let me verify it before passing it on.' },
      { phase: 'act', needs: 'web_search', text: 'web_search("global market size 2026")', fail: 'I should fact-check that number… no Web Search tool, no fact-checking! 😵' },
      { phase: 'observe', text: 'Result: market size confirmed ≈ $4.1B ✔' },
      { phase: 'think', text: 'Verified! Now to send the boss a tidy summary.' },
      { phase: 'act', needs: 'send_email', text: 'send_email(to="boss", body="Sales +23%, $4B market confirmed.")', fail: 'Summary ready… but it\'s stuck in my head without the Email tool! 😵' },
      { phase: 'observe', text: 'Result: email delivered ✔' },
      { phase: 'done', text: 'Report read, fact checked, boss informed. Detective work complete! 🕵️✔' },
    ],
  },
]
