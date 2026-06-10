import { useState } from 'react'

// MCP: one protocol connecting an AI app to many tools/data sources.
const CONNECTORS = [
  { icon: '🐙', name: 'GitHub', example: 'list_pull_requests, create_issue' },
  { icon: '💬', name: 'Slack', example: 'send_message, search_channels' },
  { icon: '📁', name: 'Google Drive', example: 'search_files, read_file' },
  { icon: '🗄️', name: 'Database', example: 'run_query, list_tables' },
]

export default function MCPVisual() {
  const [active, setActive] = useState(null)

  return (
    <div className="visual-card">
      <h3 className="visual-title">🔌 MCP — a USB-C port for AI</h3>
      <div className="mcp-diagram">
        <div className="mcp-host">
          <div className="mcp-host-icon">🤖</div>
          <div className="mcp-host-name">AI App<br /><small>(e.g. Claude)</small></div>
        </div>
        <div className="mcp-wire">
          <div className="mcp-protocol">MCP</div>
          <div className="mcp-pulse" />
        </div>
        <div className="mcp-servers">
          {CONNECTORS.map((c, i) => (
            <button
              key={c.name}
              className={`mcp-server ${active === i ? 'mcp-server-active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="mcp-server-icon">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="pipeline-desc pop-in">
          <strong>{CONNECTORS[active].icon} {CONNECTORS[active].name} connector</strong> exposes tools like{' '}
          <code>{CONNECTORS[active].example}</code> — the AI can call these just like any other tool.
        </div>
      )}
      {active === null && <p className="visual-hint">👆 Click a connector to see the tools it provides!</p>}
      <div className="local-cards">
        <div className="mini-card">📜 <strong>MCP</strong> = Model Context Protocol — an open standard, so any app can talk to any connector</div>
        <div className="mini-card">🧩 <strong>Before MCP:</strong> every app needed custom code for every tool. <strong>After:</strong> build a connector once, use it everywhere</div>
        <div className="mini-card">🔐 <strong>You stay in control:</strong> connectors only get the permissions you grant them</div>
      </div>
    </div>
  )
}
