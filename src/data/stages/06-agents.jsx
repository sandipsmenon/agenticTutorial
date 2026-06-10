import AgentLoopVisual from '../../components/visuals/AgentLoopVisual.jsx'

export default {
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
}
