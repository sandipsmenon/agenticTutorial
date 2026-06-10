# 🤖 AI Adventure — Learn AI with Neuro!

An interactive, cartoon-style adventure that teaches how AI really works — hosted
by **Neuro**, an animated robot guide. 12 quiz-gated stages, 5 hands-on labs
(including a **real AI model running in your browser**), XP, badges, a boss
gauntlet, and a downloadable certificate. 🏆

## 🗺️ The 12 Stages

| # | Stage | What you learn |
|---|-------|----------------|
| 1 | 🧠 What is AI? | AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI |
| 2 | 🐘 LLMs & SLMs | Next-token prediction, large vs small models, parameters |
| 3 | ✂️ Tokens | Interactive tokenizer, context windows, per-token pricing |
| 4 | 🏋️ Training a Model | Pre-training, loss curves, fine-tuning, RLHF |
| 5 | 💻 Run It Locally | Ollama demo terminal, quantization, privacy trade-offs |
| 6 | 🤖 Agents & the Loop | Think → Act → Observe, tools, guardrails |
| 7 | 🔌 MCP & Connectors | Model Context Protocol, connectors (GitHub, Slack, …) |
| 8 | 🪄 Prompt Engineering | Roles, context, few-shot examples, output formats |
| 9 | 🧭 Embeddings & RAG | Meaning as geometry, semantic search, grounded answers |
| 10 | 🛟 Hallucinations & Safety | Spot-the-hallucination game, verification habits |
| 11 | ⚖️ Fine-tuning vs RAG | Skills vs facts — sort real scenarios |
| 12 | 🎨 Multimodal AI | Images, audio and text — everything becomes tokens |

…then face **🏰 The Final Gauntlet**: 10 reshuffling questions drawn from
everything, pass at 8/10 to earn your certificate.

## 🧪 Neuro's AI Lab (always unlocked)

- **⚡ Live Model Lab** — downloads a *real* small language model
  (Qwen 2.5 0.5B or Llama 3.2 1B, quantized) via [WebLLM](https://github.com/mlc-ai/web-llm)
  and runs it **entirely in your browser** on WebGPU. Streaming chat, temperature
  & top-p sliders, model unload button. No WebGPU? Meet **Pico**, the simulated
  fallback model — same chat, pretend brain.
- **🧫 Neural Playground** — train an actual neural network (hand-rolled
  backprop!) on blobs/XOR/circles/spirals; watch the decision boundary and loss
  curve evolve live; click to add your own data points; Deep mode adds a layer.
- **🌡️ Sampling Playground** — temperature and top-p sliders reshape real
  softmax probabilities; sample silly sentences at T=2, boring ones at T=0.1.
- **🗺️ Embedding Map** — 40 words placed by meaning; click for nearest
  neighbors; toggle the famous parallel king→queen / man→woman arrows.
- **🛠️ Agent Sandbox** — equip an agent with the right tools and watch its
  Think→Act→Observe loop succeed (or hilariously fail) at three missions.

## 🎮 Gamification

- ⚡ **XP & 8 levels** — Curious Spark → AI Adventurer Supreme; bonus XP for
  first-try quiz answers
- 🏅 **12 badges** — from First Steps to the all-badge **Legend**
- 🔊 **Synthesized sound effects** — WebAudio chimes/fanfares, zero audio files,
  mutable
- 📜 **Personalized certificate** — type your name, download as PNG
- 💾 **Progress** auto-saves to localStorage (v1 saves migrate automatically);
  export/import via save codes in Settings

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Built with [React](https://react.dev) + [Vite](https://vitejs.dev). The only
runtime deps are react, react-dom and `@mlc-ai/web-llm` (lazy-loaded only when
you open the Live Model Lab — the main bundle stays light). All animations are
hand-rolled CSS/SVG; all lab math (backprop, softmax, sampling) is dependency-free
JS in `src/lib/`.

> **Note:** the Live Model Lab's real-model path needs a WebGPU-capable browser
> (Chrome/Edge on a reasonably modern machine) and downloads ~420 MB once
> (cached afterwards). Everything else works everywhere, fully offline-friendly.
