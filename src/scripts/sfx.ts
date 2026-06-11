/* ------------------------------------------------------------------ */
/* SFX — a synthesized UI sound layer. Every sound is generated with  */
/* the Web Audio API at runtime, so there are no audio assets to load */
/* (or license). Mirrors the motion.ts pattern: window/document        */
/* listeners bind once, while per-page DOM (the mute toggle) is        */
/* rebuilt on every astro:page-load since the body gets swapped.       */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'sfx-muted'
const INTERACTIVE = 'a, button, [role="button"], [data-cursor]'

let ctx: AudioContext | undefined
let master: GainNode | undefined
let listenersBound = false

/* localStorage throws in sandboxed iframes / strict privacy modes —
   fall back to an in-memory flag so the toggle still works for the session */
let mutedFallback = false

const isMuted = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return mutedFallback
  }
}

const setMuted = (muted: boolean) => {
  mutedFallback = muted
  try {
    localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
  } catch {
    /* in-memory fallback already set */
  }
  syncToggle()
}

/* Browsers keep an AudioContext suspended until a user gesture, so it
   is created lazily and resumed on the first pointerdown/keydown. */
function ensureCtx(): AudioContext | undefined {
  if (typeof AudioContext === 'undefined') return undefined
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

const ready = () => !isMuted() && ctx?.state === 'running' && master

/* ----------------------------- voices ----------------------------- */

function blip({
  freq,
  endFreq = freq,
  duration,
  gain,
  type = 'sine' as OscillatorType,
  delay = 0
}: {
  freq: number
  endFreq?: number
  duration: number
  gain: number
  type?: OscillatorType
  delay?: number
}) {
  if (!ready()) return
  const audio = ctx!
  const t = audio.currentTime + delay

  const osc = audio.createOscillator()
  const env = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (endFreq !== freq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration)

  env.gain.setValueAtTime(gain, t)
  env.gain.exponentialRampToValueAtTime(0.0001, t + duration)

  osc.connect(env).connect(master!)
  osc.start(t)
  osc.stop(t + duration)
}

function whoosh({ duration, gain }: { duration: number; gain: number }) {
  if (!ready()) return
  const audio = ctx!
  const t = audio.currentTime

  const buffer = audio.createBuffer(1, audio.sampleRate * duration, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

  const noise = audio.createBufferSource()
  noise.buffer = buffer

  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 0.9
  filter.frequency.setValueAtTime(300, t)
  filter.frequency.exponentialRampToValueAtTime(2400, t + duration * 0.55)
  filter.frequency.exponentialRampToValueAtTime(350, t + duration)

  const env = audio.createGain()
  env.gain.setValueAtTime(0.0001, t)
  env.gain.exponentialRampToValueAtTime(gain, t + duration * 0.3)
  env.gain.exponentialRampToValueAtTime(0.0001, t + duration)

  noise.connect(filter).connect(env).connect(master!)
  noise.start(t)
  noise.stop(t + duration)
}

const sfx = {
  /* feather-light tick when the cursor enters an interactive element */
  hover: () => blip({ freq: 1900, endFreq: 2300, duration: 0.045, gain: 0.045 }),
  /* soft mechanical thock on press */
  click: () => {
    blip({ freq: 950, endFreq: 620, duration: 0.07, gain: 0.12, type: 'triangle' })
    blip({ freq: 2800, duration: 0.02, gain: 0.05, type: 'square' })
  },
  /* airy sweep timed to the page glide transition */
  transition: () => whoosh({ duration: 0.55, gain: 0.16 }),
  /* two-note confirmation when sound is switched on */
  unmute: () => {
    blip({ freq: 660, duration: 0.09, gain: 0.09 })
    blip({ freq: 990, duration: 0.12, gain: 0.09, delay: 0.09 })
  }
}

/* ------------------------- mute toggle UI ------------------------- */

const ICON_ON =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
const ICON_OFF =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'

function syncToggle() {
  const button = document.getElementById('sfx-toggle')
  if (!button) return
  const muted = isMuted()
  button.innerHTML = muted ? ICON_OFF : ICON_ON
  button.setAttribute('aria-label', muted ? 'Unmute sound effects' : 'Mute sound effects')
  button.setAttribute('aria-pressed', String(!muted))
  button.dataset.muted = muted ? '1' : '0'
}

function buildToggle() {
  if (document.getElementById('sfx-toggle')) return

  const button = document.createElement('button')
  button.id = 'sfx-toggle'
  button.type = 'button'
  button.addEventListener('click', (event) => {
    // handled here in full — keep the generic click sound from doubling up
    event.stopPropagation()
    const muted = !isMuted()
    setMuted(muted)
    if (!muted) {
      ensureCtx()
      sfx.unmute()
    }
  })

  document.body.appendChild(button)
  syncToggle()
}

/* ---------------------------- wiring ------------------------------ */

function bindListeners() {
  if (listenersBound) return
  listenersBound = true

  // any first gesture unlocks audio
  const unlock = () => ensureCtx()
  window.addEventListener('pointerdown', unlock, { passive: true })
  window.addEventListener('keydown', unlock)

  // hover ticks — fine pointers only, once per element entered
  if (window.matchMedia('(pointer: fine)').matches) {
    let lastTarget: Element | null = null
    let lastAt = 0
    document.addEventListener('mouseover', (event) => {
      const target = (event.target as Element | null)?.closest?.(INTERACTIVE)
      if (!target || target === lastTarget) {
        if (!target) lastTarget = null
        return
      }
      lastTarget = target
      const now = performance.now()
      if (now - lastAt < 70) return
      lastAt = now
      sfx.hover()
    })
  }

  document.addEventListener('pointerdown', (event) => {
    const target = (event.target as Element | null)?.closest?.(INTERACTIVE)
    if (!target || target.id === 'sfx-toggle') return
    sfx.click()
  })

  // ride along with the page glide transition in motion.ts
  document.addEventListener('astro:before-preparation', () => sfx.transition())
}

document.addEventListener('astro:page-load', () => {
  bindListeners()
  buildToggle()
})

export {}
