'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

export default function GrowthActivity({ onClose, audioEnabled, playSound }: Props) {
  const [growthStage, setGrowthStage] = useState(0)

  const stages = [
    { height: 140, label: '' },
    { height: 170, label: '' },
    { height: 200, label: '' }
  ]

  const handleSwipe = (direction: 'left' | 'right') => {
    playSound?.('tap')
    if (direction === 'right' && growthStage < stages.length - 1) {
      setGrowthStage(growthStage + 1)
    } else if (direction === 'left' && growthStage > 0) {
      setGrowthStage(growthStage - 1)
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

        <div className={styles.growthContainer}>
          <div className={styles.growthStages}>
            <svg 
              viewBox="0 0 300 500" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: `${stages[growthStage].height}px` }}
              className={styles.growthBody}
            >
              {/* Head */}
              <ellipse cx="150" cy="60" rx="40" ry="45" fill="#fdd8b5" />
              <circle cx="140" cy="55" r="4" fill="#333" />
              <circle cx="160" cy="55" r="4" fill="#333" />
              <path d="M 135 70 Q 150 78 165 70" stroke="#333" strokeWidth="2" fill="none" />
              
              {/* Body */}
              <rect 
                x="120" 
                y="105" 
                width={60 + growthStage * 5} 
                height={90 + growthStage * 15} 
                rx="15" 
                fill="#b8d4f1" 
              />
              
              {/* Arms */}
              <rect 
                x="90" 
                y="115" 
                width="22" 
                height={60 + growthStage * 10} 
                rx="11" 
                fill="#fdd8b5" 
              />
              <rect 
                x={188 + growthStage * 5} 
                y="115" 
                width="22" 
                height={60 + growthStage * 10} 
                rx="11" 
                fill="#fdd8b5" 
              />
              
              {/* Legs */}
              <rect 
                x="130" 
                y={195 + growthStage * 15} 
                width="25" 
                height={80 + growthStage * 20} 
                rx="12" 
                fill="#4a5f7a" 
              />
              <rect 
                x="155" 
                y={195 + growthStage * 15} 
                width="25" 
                height={80 + growthStage * 20} 
                rx="12" 
                fill="#4a5f7a" 
              />

              {/* Growth lines (subtle indicators) */}
              {growthStage > 0 && (
                <g opacity="0.3">
                  <line x1="100" y1={160 + growthStage * 15} x2="200" y2={160 + growthStage * 15} 
                    stroke="#a8d5ba" strokeWidth="2" strokeDasharray="4,4" />
                </g>
              )}
            </svg>
          </div>

          <div className={styles.navigationButtons}>
            <button
              className={styles.navButton}
              onClick={() => handleSwipe('left')}
              disabled={growthStage === 0}
              aria-label="Previous stage"
            >
              ←
            </button>
            
            <div className={styles.stageDots}>
              {stages.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === growthStage ? styles.activeDot : ''}`}
                />
              ))}
            </div>
            
            <button
              className={styles.navButton}
              onClick={() => handleSwipe('right')}
              disabled={growthStage === stages.length - 1}
              aria-label="Next stage"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
