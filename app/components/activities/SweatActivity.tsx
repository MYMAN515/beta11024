'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

export default function SweatActivity({ onClose, audioEnabled, playSound }: Props) {
  const [sweatLevel, setSweatLevel] = useState(3)
  const [deodorantUsed, setDeodorantUsed] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const useDeodorant = () => {
    setDeodorantUsed(true)
    setSweatLevel(0)
    playSound?.('sparkle')

    // Create sparkle effect
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: 40 + (Math.random() - 0.5) * 30
    }))
    setSparkles(newSparkles)

    setTimeout(() => {
      setSparkles([])
      setDeodorantUsed(false)
      setSweatLevel(3)
    }, 3000)
  }

  return (
    <div className={styles.activityOverlay}>
      <div className={styles.activityContainer}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.sweatContainer}>
          <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            {/* Body outline */}
            <ellipse cx="150" cy="100" rx="50" ry="55" fill="#fdd8b5" />
            <rect x="110" y="150" width="80" height="120" rx="18" fill="#b8d4f1" />
            <ellipse cx="95" cy="180" rx="20" ry="30" fill="#fdd8b5" className={styles.underarm} />
            
            {/* Sweat drops */}
            {sweatLevel > 0 && (
              <>
                {[...Array(sweatLevel)].map((_, i) => (
                  <g key={i}>
                    <ellipse
                      cx={85 + Math.random() * 20}
                      cy={170 + i * 15}
                      rx="4"
                      ry="6"
                      fill="#7eb8da"
                      opacity="0.6"
                      className={styles.sweatDrop}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  </g>
                ))}
              </>
            )}

            {/* Sparkles when clean */}
            {sparkles.map((sparkle) => (
              <g key={sparkle.id}>
                <circle
                  cx={`${sparkle.x}%`}
                  cy={`${sparkle.y}%`}
                  r="3"
                  fill="#ffd700"
                  className={styles.sparkle}
                />
                <line
                  x1={`${sparkle.x}%`}
                  y1={`${sparkle.y - 2}%`}
                  x2={`${sparkle.x}%`}
                  y2={`${sparkle.y + 2}%`}
                  stroke="#ffd700"
                  strokeWidth="1"
                  className={styles.sparkle}
                />
                <line
                  x1={`${sparkle.x - 2}%`}
                  y1={`${sparkle.y}%`}
                  x2={`${sparkle.x + 2}%`}
                  y2={`${sparkle.y}%`}
                  stroke="#ffd700"
                  strokeWidth="1"
                  className={styles.sparkle}
                />
              </g>
            ))}
          </svg>

          <button
            className={styles.deodorantButton}
            onClick={useDeodorant}
            disabled={deodorantUsed}
            aria-label="Use deodorant"
          >
            <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
              <rect x="25" y="20" width="30" height="80" rx="5" fill="#e8f5e8" />
              <rect x="25" y="15" width="30" height="10" rx="3" fill="#c8e6c8" />
              <circle cx="40" cy="50" r="8" fill="#a8d5a8" />
              <line x1="40" y1="45" x2="40" y2="55" stroke="#fff" strokeWidth="2" />
              <line x1="35" y1="50" x2="45" y2="50" stroke="#fff" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
