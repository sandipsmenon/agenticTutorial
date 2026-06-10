# 🤖 AI Adventure — Learn AI with Neuro!

An interactive, cartoon-style tutorial that teaches AI fundamentals, hosted by
**Neuro**, an animated robot guide. Progress through 7 stages, answer quiz
questions to unlock the next one, and earn your AI Adventurer certificate! 🏆

## 🗺️ The 7 Stages

| # | Stage | What you learn |
|---|-------|----------------|
| 1 | 🧠 What is AI? | AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI |
| 2 | 🐘 LLMs & SLMs | Next-token prediction, large vs small models, parameters |
| 3 | ✂️ Tokens | Interactive tokenizer, context windows, per-token pricing |
| 4 | 🏋️ Training a Model | Pre-training, loss curves, fine-tuning, RLHF |
| 5 | 💻 Run It Locally | Ollama demo terminal, quantization, privacy trade-offs |
| 6 | 🤖 Agents & the Loop | Think → Act → Observe, tools, guardrails |
| 7 | 🔌 MCP & Connectors | Model Context Protocol, connectors (GitHub, Slack, …) |

## ✨ Features

- 🎭 Animated SVG mascot with moods (happy, thinking, excited, celebrating)
- 💬 Typewriter speech bubbles (click to skip ahead)
- 🧪 Hands-on visuals: a live toy tokenizer, a steppable agent loop, a fake
  Ollama terminal, a clickable MCP connector diagram, and more
- ❓ Quizzes with instant feedback — pass to unlock the next stage
- 💾 Progress saved in `localStorage` (close the tab, come back later)
- 🎉 Confetti + certificate when you finish everything
- 📱 Responsive — works on mobile too

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Built with [React](https://react.dev) + [Vite](https://vitejs.dev). No other
runtime dependencies — all animations are hand-rolled CSS/SVG.
