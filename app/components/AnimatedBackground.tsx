'use client'

import { useEffect, useState } from 'react'
import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  const [sunPosition, setSunPosition] = useState(30)

  // Slow sun movement
  useEffect(() => {
    const interval = setInterval(() => {
      setSunPosition(prev => {
        const newPos = prev + 0.1
        return newPos > 100 ? 0 : newPos
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.background}>
      {/* Sun */}
      <div 
        className={styles.sun}
        style={{
          left: `${sunPosition}%`,
          top: `${10 + Math.sin(sunPosition * 0.03) * 5}%`
        }}
      >
        <div className={styles.sunCore} />
        <div className={styles.sunRays}>
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={styles.sunRay}
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
        <div className={styles.sunGlow} />
      </div>

      {/* Rainbow (subtle) */}
      <div className={styles.rainbow}>
        <div className={styles.rainbowArc} style={{ background: 'rgba(255, 99, 71, 0.15)' }} />
        <div className={styles.rainbowArc} style={{ background: 'rgba(255, 165, 0, 0.12)', transform: 'scale(0.95)' }} />
        <div className={styles.rainbowArc} style={{ background: 'rgba(255, 255, 0, 0.1)', transform: 'scale(0.9)' }} />
        <div className={styles.rainbowArc} style={{ background: 'rgba(0, 255, 0, 0.08)', transform: 'scale(0.85)' }} />
        <div className={styles.rainbowArc} style={{ background: 'rgba(0, 191, 255, 0.06)', transform: 'scale(0.8)' }} />
        <div className={styles.rainbowArc} style={{ background: 'rgba(138, 43, 226, 0.04)', transform: 'scale(0.75)' }} />
      </div>

      {/* Distant Mountains */}
      <div className={styles.mountains}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className={styles.mountainsSvg}>
          <path 
            d="M0,200 L0,150 L100,100 L200,140 L350,60 L450,130 L550,90 L700,110 L800,70 L900,120 L1000,80 L1100,130 L1200,100 L1200,200 Z"
            fill="rgba(100, 130, 160, 0.15)"
          />
          <path 
            d="M0,200 L0,160 L150,120 L300,150 L400,100 L500,140 L650,90 L750,130 L850,110 L950,90 L1050,140 L1200,110 L1200,200 Z"
            fill="rgba(120, 150, 180, 0.12)"
          />
        </svg>
      </div>

      {/* Shooting Star (occasional) */}
      <div className={styles.shootingStar} />
    </div>
  )
}
