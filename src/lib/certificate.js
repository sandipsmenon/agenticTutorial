// Draws the completion certificate onto a canvas (downloadable as PNG).
export const CERT_W = 1600
export const CERT_H = 1130

export function drawCertificate(canvas, { name, levelTitle, xp, badgeCount, badgeTotal, stageEmojis, date }) {
  canvas.width = CERT_W
  canvas.height = CERT_H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // background
  const bg = ctx.createLinearGradient(0, 0, CERT_W, CERT_H)
  bg.addColorStop(0, '#fffdf4')
  bg.addColorStop(1, '#fff1c9')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, CERT_W, CERT_H)

  // confetti dots
  const colors = ['#ffd166', '#ff7eb9', '#6c5ce7', '#00cec9', '#74b9ff']
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = colors[i % colors.length] + '55'
    const x = (i * 397) % CERT_W
    const y = (i * 211) % CERT_H
    ctx.beginPath()
    ctx.arc(x, y, 5 + (i % 4) * 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // double border
  ctx.strokeStyle = '#ffd166'
  ctx.lineWidth = 14
  ctx.strokeRect(40, 40, CERT_W - 80, CERT_H - 80)
  ctx.strokeStyle = '#6c5ce7'
  ctx.lineWidth = 4
  ctx.strokeRect(64, 64, CERT_W - 128, CERT_H - 128)

  const center = CERT_W / 2
  ctx.textAlign = 'center'

  ctx.font = '90px sans-serif'
  ctx.fillText('🏆', center, 190)

  ctx.fillStyle = '#b8860b'
  ctx.font = 'bold 64px Georgia, serif'
  ctx.fillText('Certificate of AI Awesomeness', center, 290)

  ctx.fillStyle = '#6b67a3'
  ctx.font = '34px Georgia, serif'
  ctx.fillText('This certifies that', center, 370)

  ctx.fillStyle = '#5b51d8'
  ctx.font = 'bold 96px Georgia, serif'
  const displayName = (name || 'A Brave Adventurer').slice(0, 28)
  ctx.fillText(displayName, center, 490)
  // underline flourish
  ctx.strokeStyle = '#ff7eb9'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(center - 330, 520)
  ctx.quadraticCurveTo(center, 545, center + 330, 520)
  ctx.stroke()

  ctx.fillStyle = '#2d2a5e'
  ctx.font = '34px Georgia, serif'
  ctx.fillText('completed the AI Adventure — every stage, every quiz —', center, 600)
  ctx.fillText('and conquered the Final Gauntlet, earning the title', center, 650)

  ctx.fillStyle = '#e84393'
  ctx.font = 'bold 56px Georgia, serif'
  ctx.fillText(`“${levelTitle}”`, center, 740)

  ctx.font = '54px sans-serif'
  ctx.fillText(stageEmojis.join(' '), center, 840)

  ctx.fillStyle = '#6b67a3'
  ctx.font = '30px Georgia, serif'
  ctx.fillText(`${xp} XP earned  •  ${badgeCount}/${badgeTotal} badges unlocked`, center, 920)

  ctx.font = 'italic 28px Georgia, serif'
  ctx.fillText(date, center, 985)

  ctx.font = '26px Georgia, serif'
  ctx.fillText('— certified by Neuro the Robot 🤖 —', center, 1040)
}
