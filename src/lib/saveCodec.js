// Export/import progress as a copy-pastable save code. Pure; node-testable.
import { normalize } from '../state/progressModel.js'

const PREFIX = 'AIADV2.'

function toB64(str) {
  const utf8 = encodeURIComponent(str)
  if (typeof btoa === 'function') return btoa(utf8)
  return Buffer.from(utf8, 'utf8').toString('base64')
}

function fromB64(b64) {
  const utf8 = typeof atob === 'function'
    ? atob(b64)
    : Buffer.from(b64, 'base64').toString('utf8')
  return decodeURIComponent(utf8)
}

export function encodeSave(state) {
  return PREFIX + toB64(JSON.stringify(state))
}

export function decodeSave(code) {
  const trimmed = String(code).trim()
  if (!trimmed.startsWith(PREFIX)) throw new Error('Not an AI Adventure save code')
  let parsed
  try {
    parsed = JSON.parse(fromB64(trimmed.slice(PREFIX.length)))
  } catch {
    throw new Error('Save code is corrupted')
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.player) {
    throw new Error('Save code is missing data')
  }
  return normalize(parsed)
}
