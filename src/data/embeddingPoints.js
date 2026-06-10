// ~40 words with hand-placed 2D "embedding" coordinates (0–100 space).
// Clustered by meaning, plus the classic king/queen-man/woman parallel pair.
export const EMBED_CLUSTERS = [
  { name: 'Animals', color: '#fd9644' },
  { name: 'Food', color: '#00b894' },
  { name: 'Vehicles', color: '#0984e3' },
  { name: 'Feelings', color: '#e84393' },
  { name: 'Technology', color: '#6c5ce7' },
  { name: 'Weather', color: '#00cec9' },
  { name: 'People', color: '#a55eea' },
]

export const EMBED_WORDS = [
  // animals (top-left)
  { w: 'cat', x: 14, y: 20, c: 0 }, { w: 'dog', x: 20, y: 16, c: 0 },
  { w: 'puppy', x: 24, y: 19, c: 0 }, { w: 'kitten', x: 17, y: 25, c: 0 },
  { w: 'lion', x: 9, y: 14, c: 0 }, { w: 'bird', x: 26, y: 11, c: 0 },
  // food (top-right)
  { w: 'pizza', x: 78, y: 14, c: 1 }, { w: 'burger', x: 84, y: 18, c: 1 },
  { w: 'sushi', x: 73, y: 20, c: 1 }, { w: 'cake', x: 88, y: 12, c: 1 },
  { w: 'apple', x: 80, y: 25, c: 1 }, { w: 'noodles', x: 70, y: 12, c: 1 },
  // vehicles (bottom-left)
  { w: 'car', x: 13, y: 78, c: 2 }, { w: 'truck', x: 18, y: 84, c: 2 },
  { w: 'bicycle', x: 24, y: 74, c: 2 }, { w: 'train', x: 9, y: 86, c: 2 },
  { w: 'rocket', x: 22, y: 90, c: 2 }, { w: 'boat', x: 7, y: 71, c: 2 },
  // feelings (bottom-right)
  { w: 'happy', x: 80, y: 76, c: 3 }, { w: 'joyful', x: 86, y: 73, c: 3 },
  { w: 'sad', x: 76, y: 86, c: 3 }, { w: 'angry', x: 84, y: 90, c: 3 },
  { w: 'excited', x: 90, y: 79, c: 3 }, { w: 'calm', x: 73, y: 80, c: 3 },
  // tech (center)
  { w: 'robot', x: 48, y: 48, c: 4 }, { w: 'computer', x: 54, y: 44, c: 4 },
  { w: 'AI', x: 51, y: 52, c: 4 }, { w: 'internet', x: 57, y: 50, c: 4 },
  { w: 'phone', x: 44, y: 53, c: 4 }, { w: 'code', x: 47, y: 41, c: 4 },
  // weather (top-center)
  { w: 'rain', x: 44, y: 12, c: 5 }, { w: 'sunny', x: 52, y: 9, c: 5 },
  { w: 'storm', x: 40, y: 17, c: 5 }, { w: 'snow', x: 49, y: 18, c: 5 },
  { w: 'cloudy', x: 56, y: 14, c: 5 },
  // people — the famous parallel arrows: man→woman ≈ king→queen
  { w: 'man', x: 36, y: 64, c: 6 }, { w: 'woman', x: 46, y: 64, c: 6 },
  { w: 'king', x: 36, y: 74, c: 6 }, { w: 'queen', x: 46, y: 74, c: 6 },
  { w: 'child', x: 41, y: 59, c: 6 },
]

export const ANALOGY_ARROWS = [
  { from: 'man', to: 'woman' },
  { from: 'king', to: 'queen' },
]
