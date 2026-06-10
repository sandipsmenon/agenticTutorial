import { useMemo } from 'react'

const COLORS = ['#ffd166', '#ff7eb9', '#6c5ce7', '#00cec9', '#74b9ff', '#9be8a8']

// Lightweight CSS confetti — no dependencies.
export default function Confetti({ count = 80 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
        spin: Math.random() > 0.5 ? 1 : -1,
      })),
    [count],
  )
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.45,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--spin': p.spin,
          }}
        />
      ))}
    </div>
  )
}
