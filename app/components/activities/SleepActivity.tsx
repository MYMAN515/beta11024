'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

export default function SleepActivity({ onClose, audioEnabled, playSound }: Props) {
  const [sleeping, setSleeping] = useState(false)
  const [waking, setWaking] = useState(false)

  const handleSleep = () => {
    if (sleeping) return
    
    setSleeping(true)
    playSound?.('night')

    setTimeout(() => {
      setWaking(true)
      playSound?.('success')
      
      setTimeout(() => {
        setSleeping(false)
        setWaking(false)
      }, 2000)
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

        <div className={`${styles.sleepContainer} ${sleeping ? styles.nightTime : ''}`}>
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            {/* Bed */}
            <rect x="100" y="150" width="200" height="80" rx="10" fill="#8b7355" />
            <rect x="110" y="155" width="180" height="60" rx="8" fill="#c8b5a0" />
            
            {/* Pillow */}
            <ellipse cx="200" cy="165" rx="40" ry="20" fill="#f0e8f0" />
            
            {/* Body lying down */}
            <g className={sleeping ? styles.sleepingBody : ''}>
              {/* Head on pillow */}
              <ellipse cx="200" cy="165" rx="25" ry="28" fill="#fdd8b5" />
              
              {sleeping ? (
                <>
                  {/* Closed eyes */}
                  <line x1="190" y1="162" x2="198" y2="162" stroke="#333" strokeWidth="2" />
                  <line x1="202" y1="162" x2="210" y2="162" stroke="#333" strokeWidth="2" />
                  
                  {/* Sleeping Z's */}
                  {!waking && (
                    <g className={styles.sleepingZ}>
                      <text x="230" y="140" fontSize="20" fill="#7eb8da" opacity="0.7">Z</text>
                      <text x="245" y="125" fontSize="16" fill="#7eb8da" opacity="0.5">z</text>
                      <text x="255" y="115" fontSize="12" fill="#7eb8da" opacity="0.3">z</text>
                    </g>
                  )}
                </>
              ) : (
                <>
                  {/* Open eyes */}
                  <circle cx="194" cy="162" r="3" fill="#333" />
                  <circle cx="206" cy="162" r="3" fill="#333" />
                  <path d="M 190 175 Q 200 180 210 175" stroke="#333" strokeWidth="1.5" fill="none" />
                </>
              )}
              
              {/* Body under blanket */}
              <ellipse cx="220" cy="195" rx="60" ry="25" fill="#b8d4f1" opacity="0.9" />
            </g>

            {/* Stars when sleeping */}
            {sleeping && !waking && (
              <g className={styles.stars}>
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + i * 40}
                    cy={30 + (i % 2) * 20}
                    r="2"
                    fill="#ffd700"
                    opacity="0.6"
                    className={styles.twinkleStar}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </g>
            )}

            {/* Wake up glow */}
            {waking && (
              <g className={styles.wakeGlow}>
                <circle cx="200" cy="165" r="60" fill="#ffd700" opacity="0.2" />
                <circle cx="200" cy="165" r="80" fill="#ffd700" opacity="0.1" />
              </g>
            )}

            {/* Moon */}
            {sleeping && (
              <circle cx="350" cy="50" r="25" fill="#f0e8d0" opacity="0.8" />
            )}
          </svg>

          {!sleeping && (
            <button
              className={styles.sleepButton}
              onClick={handleSleep}
              aria-label="Go to sleep"
            >
              <span className={styles.sleepEmoji}>😴</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
