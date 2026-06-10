import RAGPipelineVisual from '../../components/visuals/RAGPipelineVisual.jsx'

export default {
  id: 'embeddings-rag',
  emoji: '🧭',
  title: 'Embeddings & RAG',
  color: '#16a085',
  steps: [
    {
      mood: 'explaining',
      text: "Here's a beautiful idea: what if MEANING had coordinates? Embeddings turn words and sentences into lists of numbers, placed so that similar meanings land close together. 'Puppy' sits near 'dog' — and far from 'spreadsheet'!",
    },
    {
      mood: 'happy',
      text: "Once meaning is geometry, finding 'similar text' is just measuring distance! That unlocks semantic search: ask in YOUR words, find documents that MEAN the same thing — even with zero matching keywords. (Try the Embedding Map in Neuro's Lab to feel it!)",
    },
    {
      mood: 'explaining',
      text: "Now the killer app: RAG — Retrieval-Augmented Generation. The model doesn't know your wiki, your notes, or today's prices. So we RETRIEVE the most similar documents and paste them into the prompt as evidence. Pick a question below and watch!",
      visual: RAGPipelineVisual,
    },
    {
      mood: 'thinking',
      text: "Why is this such a big deal? The model answers from REAL retrieved text — so it can cite sources, use private data it was never trained on, and stay up to date without retraining. Memory is fuzzy; retrieval is sharp!",
      visual: RAGPipelineVisual,
    },
  ],
  quiz: [
    {
      q: 'What do embeddings do?',
      options: [
        'Compress files to save disk space',
        'Turn text into coordinates where similar meanings are close together',
        'Encrypt messages',
        'Make text bold',
      ],
      answer: 1,
      explain: 'Meaning becomes geometry — closeness = similarity.',
    },
    {
      q: 'In RAG, what happens BEFORE the model writes its answer?',
      options: [
        'The model is retrained on your documents',
        'Relevant documents are retrieved and added to the prompt',
        'The internet is downloaded',
        'Nothing — RAG is just a bigger model',
      ],
      answer: 1,
      explain: 'Retrieve first, then generate — grounded in the retrieved evidence.',
    },
    {
      q: 'Why does semantic search find "How do I fix my bike?" when you search "repairing a bicycle"?',
      options: [
        'The words are spelled similarly',
        'Their embeddings are close, because the MEANINGS match',
        'Both contain the letter "i"',
        'Pure luck',
      ],
      answer: 1,
      explain: 'No shared keywords needed — embeddings capture meaning, not spelling.',
    },
  ],
}
