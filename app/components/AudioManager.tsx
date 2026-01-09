'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

export type AudioManagerHandle = {
  playSound: (sound: string) => void
}

interface AudioManagerProps {
  enabled: boolean
}

const AudioManager = forwardRef<AudioManagerHandle, AudioManagerProps>(
  ({ enabled }, ref) => {
    const audioContextRef = useRef<AudioContext | null>(null)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        audioContextRef.current =
          new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }, [])

    const playSound = (sound: string) => {
      if (!enabled || !audioContextRef.current) return

      const ctx = audioContextRef.current
      const now = ctx.currentTime

      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      switch (sound) {
        case 'tap': {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(600, now)
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.1)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
          osc.start(now)
          osc.stop(now + 0.15)
          break
        }

        case 'hover': {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(800, now)
          osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
          osc.start(now)
          osc.stop(now + 0.1)
          break
        }

        case 'magic': {
          const osc1 = ctx.createOscillator()
          const osc2 = ctx.createOscillator()
          const gain = ctx.createGain()

          osc1.type = 'sine'
          osc2.type = 'triangle'
          osc1.connect(gain)
          osc2.connect(gain)
          gain.connect(ctx.destination)

          osc1.frequency.setValueAtTime(300, now)
          osc1.frequency.exponentialRampToValueAtTime(1500, now + 0.4)
          osc2.frequency.setValueAtTime(450, now)
          osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.5)

          gain.gain.setValueAtTime(0.08, now)
          gain.gain.linearRampToValueAtTime(0.12, now + 0.2)
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6)

          osc1.start(now)
          osc2.start(now)
          osc1.stop(now + 0.6)
          osc2.stop(now + 0.6)
          break
        }

        case 'success': {
          const notes = [523, 659, 784, 1047]
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.setValueAtTime(freq, now + i * 0.1)
            gain.gain.setValueAtTime(0.1, now + i * 0.1)
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4)
            osc.start(now + i * 0.1)
            osc.stop(now + i * 0.1 + 0.4)
          })
          break
        }
      }
    }

    useImperativeHandle(ref, () => ({ playSound }), [enabled])

    return null
  }
)

AudioManager.displayName = 'AudioManager'
export default AudioManager
