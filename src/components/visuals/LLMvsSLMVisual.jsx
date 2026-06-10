// LLM vs SLM side-by-side comparison
export default function LLMvsSLMVisual() {
  return (
    <div className="visual-card">
      <div className="vs-grid">
        <div className="vs-col vs-llm">
          <div className="vs-blob vs-blob-big">🐘</div>
          <h3>LLM <span className="vs-sub">Large Language Model</span></h3>
          <ul>
            <li>💪 Hundreds of billions of parameters</li>
            <li>🧠 Great at hard reasoning &amp; broad knowledge</li>
            <li>☁️ Usually runs in big data centers (GPUs galore)</li>
            <li>💸 More expensive &amp; slower per answer</li>
            <li>🏷️ e.g. Claude Opus, GPT-4 class models</li>
          </ul>
        </div>
        <div className="vs-divider">VS</div>
        <div className="vs-col vs-slm">
          <div className="vs-blob vs-blob-small">🐭</div>
          <h3>SLM <span className="vs-sub">Small Language Model</span></h3>
          <ul>
            <li>🪶 Millions to a few billion parameters</li>
            <li>⚡ Fast, cheap, great for focused tasks</li>
            <li>💻 Can run on your laptop or even a phone</li>
            <li>🔒 Keeps data local — nice for privacy</li>
            <li>🏷️ e.g. Phi-3, Gemma 2B, Llama 3.2 1B</li>
          </ul>
        </div>
      </div>
      <p className="visual-hint">
        “Parameters” are the model's adjustable knobs — the numbers it learned during training.
        More knobs ≈ more capability, but also more compute needed.
      </p>
    </div>
  )
}
