import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { loadState, reduce, V2_KEY } from './progressModel.js'
import { levelForXp } from '../data/levels.js'
import { sound } from '../lib/sound.js'

const ProgressContext = createContext(null)

let effectId = 0

export function ProgressProvider({ children }) {
  const [state, setState] = useState(() => loadState(window.localStorage))
  // transient UI effects (xp toasts, badge unlocks, level-ups) consumed by HUD components
  const [effects, setEffects] = useState([])
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    try {
      window.localStorage.setItem(V2_KEY, JSON.stringify(state))
    } catch { /* storage full/blocked — keep playing */ }
  }, [state])

  useEffect(() => {
    sound.setMuted(!state.settings.soundOn)
  }, [state.settings.soundOn])

  const dispatch = useCallback((action) => {
    const { state: next, effects: fx } = reduce(stateRef.current, action)
    stateRef.current = next
    setState(next)
    if (fx.length) {
      setEffects((q) => [...q, ...fx.map((f) => ({ ...f, id: ++effectId }))])
      for (const f of fx) {
        if (f.type === 'xp') sound.play('xp', next.stats.streak)
        if (f.type === 'levelup') sound.play('levelup')
        if (f.type === 'badge') sound.play('badge')
      }
    }
    return fx
  }, [])

  const removeEffect = useCallback((id) => {
    setEffects((q) => q.filter((e) => e.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      state,
      dispatch,
      effects,
      removeEffect,
      level: levelForXp(state.player.xp),
    }),
    [state, dispatch, effects, removeEffect],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}
