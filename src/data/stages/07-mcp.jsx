import MCPVisual from '../../components/visuals/MCPVisual.jsx'

export default {
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
}
