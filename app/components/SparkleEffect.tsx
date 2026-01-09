'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styles from './SparkleEffect.module.css'

interface Sparkle {
  id: string
  x: number
  y: number
  size: number
  color: string
  rotation: number
  delay: number
}

interface SparkleEffectProps {
  isActive: boolean
  intensity?: 'low' | 'medium' | 'high' | 'celebration'
  colors?: string[]
  style?: React.CSSProperties
  children?: React.ReactNode
}

const DEFAULT_COLORS = [
  '#FFD700', // Gold
  '#FF6B9D', // Pink
  '#00D9FF', // Cyan
  '#A855F7', // Purple
  '#10B981', // Emerald
  '#F59E0B', // Amber
]

const CELEBRATION_COLORS = [
  '#FF0080', // Hot pink
  '#00FFFF', // Cyan
  '#FFD700', // Gold
  '#FF4500', // Orange red
  '#7B68EE', // Purple
  '#00FF7F', // Spring green
]

export default function SparkleEffect({ 
  isActive, 
  intensity = 'medium',
  colors = DEFAULT_COLORS,
  style,
  children 
}: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const getSparkleCount = useCallback(() => {
    switch (intensity) {
      case 'low': return 8
      case 'medium': return 15
      case 'high': return 25
      case 'celebration': return 50
      default: return 15
    }
  }, [intensity])

  const generateSparkle = useCallback((): Sparkle => {
    const sparkleColors = intensity === 'celebration' ? CELEBRATION_COLORS : colors
    return {
      id: `${Date.now()}-${Math.random()}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: intensity === 'celebration' ? 8 + Math.random() * 12 : 4 + Math.random() * 8,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }
  }, [colors, intensity])

  useEffect(() => {
    if (!isActive) {
      setSparkles([])
      return
    }

    // Generate initial sparkles
    const initialSparkles = Array.from({ length: getSparkleCount() }, generateSparkle)
    setSparkles(initialSparkles)

    // Continuously generate new sparkles for celebration mode
    if (intensity === 'celebration') {
      const interval = setInterval(() => {
        setSparkles(prev => {
          const newSparkles = Array.from({ length: 5 }, generateSparkle)
          return [...prev.slice(-45), ...newSparkles]
        })
      }, 200)

      return () => clearInterval(interval)
    }

    // Clean up sparkles after animation
    const timeout = setTimeout(() => {
      if (intensity !== 'celebration') {
        setSparkles([])
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isActive, intensity, generateSparkle, getSparkleCount])

  return (
    <div className={styles.sparkleContainer} style={style}>
      {children}
      {isActive && sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className={`${styles.sparkle} ${intensity === 'celebration' ? styles.celebration : ''}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            transform: `rotate(${sparkle.rotation}deg)`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
        />
      ))}
    </div>
  )
}

// Hook for triggering sparkles on interaction
export function useSparkle() {
  const [isSparkleActive, setIsSparkleActive] = useState(false)

  const triggerSparkle = useCallback((duration = 1000) => {
    setIsSparkleActive(true)
    setTimeout(() => setIsSparkleActive(false), duration)
  }, [])

  return { isSparkleActive, triggerSparkle }
}

// Celebration confetti burst component
export function CelebrationBurst({ isActive, onComplete }: { isActive: boolean, onComplete?: () => void }) {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50,
      angle: Math.random() * 360,
      velocity: 5 + Math.random() * 10,
      color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    }))
    setParticles(newParticles)

    const timeout = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isActive, onComplete])

  return (
    <div className={styles.celebrationContainer}>
      {particles.map(p => (
        <div
          key={p.id}
          className={`${styles.confetti} ${p.shape === 'circle' ? styles.circle : styles.square}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            '--angle': `${p.angle}deg`,
            '--velocity': p.velocity,
            transform: `rotate(${p.rotation}deg)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
