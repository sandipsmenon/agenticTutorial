import MultimodalVisual from '../../components/visuals/MultimodalVisual.jsx'

export default {
  id: 'multimodal',
  emoji: '🎨',
  title: 'Multimodal AI',
  color: '#d63031',
  steps: [
    {
      mood: 'excited',
      text: "Final stage, adventurer! So far we've talked text — but modern AI can SEE images, HEAR audio, and READ documents, all at once. These are called multimodal models. One brain, many senses!",
    },
    {
      mood: 'explaining',
      text: "The secret is beautifully familiar: EVERYTHING becomes tokens. Images get sliced into patches → tokens. Audio becomes chunks → tokens. The same next-token brain processes them all together. Try the modality mixer below!",
      visual: MultimodalVisual,
    },
    {
      mood: 'happy',
      text: "That's why one model can describe your photo, transcribe your voice note, read a chart, and answer in fluent text — or even generate images and speech back. Different senses in, different media out, one shared brain in the middle!",
      visual: MultimodalVisual,
    },
    {
      mood: 'proud',
      text: "And… that's every concept in the adventure! AI → LLMs → tokens → training → local models → agents → MCP → prompting → RAG → safety → fine-tuning → multimodal. One last quiz, then the FINAL GAUNTLET awaits at the castle. I believe in you! 🏰",
    },
  ],
  quiz: [
    {
      q: 'What makes a model "multimodal"?',
      options: [
        'It runs on multiple computers',
        'It can work with multiple kinds of input/output: images, audio, text…',
        'It has multiple personalities',
        'It speaks multiple languages',
      ],
      answer: 1,
      explain: 'Multiple modalities = multiple senses: vision, hearing, text and more.',
    },
    {
      q: 'How does one model handle images AND text together?',
      options: [
        'It secretly contains two separate models',
        'Both are converted into tokens that the same network processes',
        'Images are emailed to a human helper',
        'It can\'t — that\'s science fiction',
      ],
      answer: 1,
      explain: 'Images become patch tokens, text becomes text tokens — one brain processes both.',
    },
    {
      q: 'Which task needs a multimodal model?',
      options: [
        'Summarizing an essay',
        'Translating French to English',
        '"What\'s funny about this photo?"',
        'Writing a poem about cats',
      ],
      answer: 2,
      explain: 'Understanding a photo requires vision + language — multimodal territory!',
    },
  ],
}
