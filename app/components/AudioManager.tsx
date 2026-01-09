'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

interface AudioManagerProps {
  enabled: boolean
}

const AudioManager = forwardRef<{ playSound: (sound: string) => void }, AudioManagerProps>(
  ({ enabled }, ref) => {
    const audioContextRef = useRef<AudioContext | null>(null)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }, [])

    const playSound = (sound: string) => {
      if (!enabled || !audioContextRef.current) return

      const ctx = audioContextRef.current
      const now = ctx.currentTime

      // Resume context if suspended
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      switch (sound) {
        case 'tap':
          // Soft tap sound
          const tapOsc = ctx.createOscillator()
          const tapGain = ctx.createGain()
          tapOsc.connect(tapGain)
          tapGain.connect(ctx.destination)
          tapOsc.frequency.setValueAtTime(600, now)
          tapOsc.frequency.exponentialRampToValueAtTime(400, now + 0.1)
          tapGain.gain.setValueAtTime(0.08, now)
          tapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
          tapOsc.start(now)
          tapOsc.stop(now + 0.15)
          break

        case 'hover':
          // Gentle hover sound
          const hoverOsc = ctx.createOscillator()
          const hoverGain = ctx.createGain()
          hoverOsc.type = 'sine'
          hoverOsc.connect(hoverGain)
          hoverGain.connect(ctx.destination)
          hoverOsc.frequency.setValueAtTime(800, now)
          hoverOsc.frequency.exponentialRampToValueAtTime(1000, now + 0.08)
          hoverGain.gain.setValueAtTime(0.05, now)
          hoverGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
          hoverOsc.start(now)
          hoverOsc.stop(now + 0.1)
          break

        case 'success':
          // Magical success chime (arpeggio)
          const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
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

        case 'magic':
          // Magical portal/transition sound
          const magicOsc = ctx.createOscillator()
          const magicOsc2 = ctx.createOscillator()
          const magicGain = ctx.createGain()
          magicOsc.type = 'sine'
          magicOsc2.type = 'triangle'
          magicOsc.connect(magicGain)
          magicOsc2.connect(magicGain)
          magicGain.connect(ctx.destination)
          
          magicOsc.frequency.setValueAtTime(300, now)
          magicOsc.frequency.exponentialRampToValueAtTime(1500, now + 0.4)
          magicOsc2.frequency.setValueAtTime(450, now)
          magicOsc2.frequency.exponentialRampToValueAtTime(1200, now + 0.5)
          
          magicGain.gain.setValueAtTime(0.08, now)
          magicGain.gain.linearRampToValueAtTime(0.12, now + 0.2)
          magicGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6)
          
          magicOsc.start(now)
          magicOsc2.start(now)
          magicOsc.stop(now + 0.6)
          magicOsc2.stop(now + 0.6)
          break

        case 'breath':
          // Gentle breathing sound
          const breathOsc = ctx.createOscillator()
          const breathGain = ctx.createGain()
          breathOsc.type = 'sine'
          breathOsc.connect(breathGain)
          breathGain.connect(ctx.destination)
          breathOsc.frequency.setValueAtTime(200, now)
          breathGain.gain.setValueAtTime(0.04, now)
          breathGain.gain.linearRampToValueAtTime(0.07, now + 1.5)
          breathGain.gain.linearRampToValueAtTime(0.04, now + 3)
          breathOsc.start(now)
          breathOsc.stop(now + 3)
          break

        case 'sparkle':
          // Sparkle/chime
          const sparkleOsc = ctx.createOscillator()
          const sparkleGain = ctx.createGain()
          sparkleOsc.type = 'sine'
          sparkleOsc.connect(sparkleGain)
          sparkleGain.connect(ctx.destination)
          sparkleOsc.frequency.setValueAtTime(2000, now)
          sparkleOsc.frequency.exponentialRampToValueAtTime(3000, now + 0.1)
          sparkleGain.gain.setValueAtTime(0.08, now)
          sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
          sparkleOsc.start(now)
          sparkleOsc.stop(now + 0.2)
          break

        case 'drop':
          // Item drop sound
          const dropOsc = ctx.createOscillator()
          const dropGain = ctx.createGain()
          dropOsc.type = 'sine'
          dropOsc.connect(dropGain)
          dropGain.connect(ctx.destination)
          dropOsc.frequency.setValueAtTime(400, now)
          dropOsc.frequency.exponentialRampToValueAtTime(200, now + 0.15)
          dropGain.gain.setValueAtTime(0.1, now)
          dropGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
          dropOsc.start(now)
          dropOsc.stop(now + 0.2)
          break

        case 'complete':
          // Level complete fanfare
          const fanfareNotes = [523, 659, 784, 659, 784, 1047]
          fanfareNotes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = i < 4 ? 'sine' : 'triangle'
            osc.connect(gain)
            gain.connect(ctx.destination)
            const delay = i < 4 ? i * 0.08 : (i - 4) * 0.15 + 0.4
            osc.frequency.setValueAtTime(freq, now + delay)
            gain.gain.setValueAtTime(i >= 4 ? 0.15 : 0.1, now + delay)
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.5)
            osc.start(now + delay)
            osc.stop(now + delay + 0.5)
          })
          break
      }
    }

    useImperativeHandle(ref, () => ({
      playSound
    }))

    return null
  }
)

AudioManager.displayName = 'AudioManager'

export default AudioManager
