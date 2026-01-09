'use client'

import { useState, useEffect } from 'react'
import styles from './MagicParticles.module.css'

interface Props {
  mousePos: { x: number; y: number }
  count: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  color: string
}

export default function MagicParticles({ mousePos, count }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ['#ffd700', '#ffec8b', '#fff8dc', '#ffefd5', '#ffe4b5']
    
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    
    setParticles(newParticles)
  }, [count])

  return (
    <div className={styles.particlesContainer}>
      {/* Background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
      
      {/* Mouse trail particles */}
      <div 
        className={styles.mouseGlow}
        style={{
          left: mousePos.x,
          top: mousePos.y
        }}
      >
        <div className={styles.glowCore} />
        <div className={styles.glowRing} />
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={styles.glowParticle}
            style={{
              animationDelay: `${i * 0.1}s`,
              transform: `rotate(${i * 60}deg)`
            }}
          />
        ))}
      </div>
    </div>
  )
}
