'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

type Feeling = 'happy' | 'calm' | 'worried' | 'excited'

export default function FeelingsActivity({ onClose, audioEnabled, playSound }: Props) {
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null)
  const [breathing, setBreathing] = useState(false)

  const feelings: { type: Feeling; emoji: string; color: string }[] = [
    { type: 'happy', emoji: '😊', color: '#ffd54f' },
    { type: 'calm', emoji: '😌', color: '#a8d5ba' },
    { type: 'worried', emoji: '😟', color: '#b8a8d5' },
    { type: 'excited', emoji: '😄', color: '#ffb6c1' }
  ]

  const handleFeelingClick = (feeling: Feeling) => {
    setSelectedFeeling(feeling)
    playSound?.('tap')
    
    if (feeling === 'calm' || feeling === 'worried') {
      setBreathing(true)
      playSound?.('breath')
      setTimeout(() => setBreathing(false), 4000)
    }
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

        <div className={styles.feelingsGrid}>
          {feelings.map(({ type, emoji, color }) => (
            <button
              key={type}
              className={`${styles.feelingButton} ${selectedFeeling === type ? styles.selected : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleFeelingClick(type)}
              aria-label={`Feeling ${type}`}
            >
              <span className={styles.feelingEmoji}>{emoji}</span>
            </button>
          ))}
        </div>

        {selectedFeeling && (
          <div className={styles.reactionContainer}>
            <div 
              className={`${styles.bodyReaction} ${styles[selectedFeeling]}`}
              style={{
                animation: breathing ? 'breathe 4s ease-in-out' : 'none'
              }}
            >
              <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="60" rx="45" ry="50" fill="#fdd8b5" />
                <rect x="70" y="110" width="60" height="90" rx="15" fill="#b8d4f1" />
                <rect x="50" y="120" width="18" height="60" rx="9" fill="#fdd8b5" />
                <rect x="132" y="120" width="18" height="60" rx="9" fill="#fdd8b5" />
                
                {selectedFeeling === 'happy' && (
                  <>
                    <circle cx="85" cy="55" r="4" fill="#333" />
                    <circle cx="115" cy="55" r="4" fill="#333" />
                    <path d="M 75 70 Q 100 85 125 70" stroke="#333" strokeWidth="3" fill="none" />
                  </>
                )}
                
                {selectedFeeling === 'calm' && (
                  <>
                    <line x1="80" y1="55" x2="90" y2="55" stroke="#333" strokeWidth="3" />
                    <line x1="110" y1="55" x2="120" y2="55" stroke="#333" strokeWidth="3" />
                    <line x1="85" y1="75" x2="115" y2="75" stroke="#333" strokeWidth="2" />
                  </>
                )}
                
                {selectedFeeling === 'worried' && (
                  <>
                    <circle cx="85" cy="55" r="5" fill="#333" />
                    <circle cx="115" cy="55" r="5" fill="#333" />
                    <path d="M 75 80 Q 100 70 125 80" stroke="#333" strokeWidth="2" fill="none" />
                  </>
                )}
                
                {selectedFeeling === 'excited' && (
                  <>
                    <circle cx="85" cy="55" r="6" fill="#333" />
                    <circle cx="115" cy="55" r="6" fill="#333" />
                    <ellipse cx="100" cy="75" rx="8" ry="10" fill="#ff6b6b" />
                  </>
                )}
              </svg>
            </div>

            {breathing && (
              <div className={styles.breathingBubbles}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.bubble}
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.8}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
