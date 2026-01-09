'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

export default function ConfidenceActivity({ onClose, audioEnabled, playSound }: Props) {
  const [posture, setPosture] = useState<'slouch' | 'normal' | 'confident'>('normal')
  const [showShield, setShowShield] = useState(false)

  const changePosture = () => {
    playSound?.('tap')
    
    if (posture === 'normal') {
      setPosture('confident')
      setShowShield(true)
      playSound?.('success')
      setTimeout(() => setShowShield(false), 2000)
    } else if (posture === 'confident') {
      setPosture('slouch')
    } else {
      setPosture('normal')
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

        <div className={styles.confidenceContainer}>
          <div className={styles.mirrorReflection}>
            <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
              {/* Mirror frame */}
              <rect x="20" y="20" width="260" height="360" rx="20" fill="#b8946f" />
              <rect x="30" y="30" width="240" height="340" rx="15" fill="rgba(200, 230, 255, 0.2)" />
              
              {/* Reflection */}
              <g className={`${styles.reflection} ${styles[posture]}`}>
                {/* Head */}
                <ellipse 
                  cx="150" 
                  cy={posture === 'slouch' ? 140 : posture === 'confident' ? 110 : 125} 
                  rx="35" 
                  ry="40" 
                  fill="#fdd8b5" 
                />
                
                {/* Face */}
                <circle 
                  cx="142" 
                  cy={posture === 'slouch' ? 135 : posture === 'confident' ? 105 : 120} 
                  r="4" 
                  fill="#333" 
                />
                <circle 
                  cx="158" 
                  cy={posture === 'slouch' ? 135 : posture === 'confident' ? 105 : 120} 
                  r="4" 
                  fill="#333" 
                />
                
                {posture === 'slouch' ? (
                  <path 
                    d="M 135 155 Q 150 148 165 155" 
                    stroke="#333" 
                    strokeWidth="2" 
                    fill="none" 
                  />
                ) : posture === 'confident' ? (
                  <path 
                    d="M 135 128 Q 150 138 165 128" 
                    stroke="#333" 
                    strokeWidth="2.5" 
                    fill="none" 
                  />
                ) : (
                  <line 
                    x1="140" 
                    y1="140" 
                    x2="160" 
                    y2="140" 
                    stroke="#333" 
                    strokeWidth="2" 
                  />
                )}
                
                {/* Body */}
                <rect 
                  x="120" 
                  y={posture === 'slouch' ? 190 : posture === 'confident' ? 150 : 165} 
                  width="60" 
                  height="100" 
                  rx="15" 
                  fill="#b8d4f1"
                  transform={posture === 'slouch' ? 'rotate(5 150 200)' : 'rotate(0 150 200)'}
                />
                
                {/* Arms */}
                <rect 
                  x="95" 
                  y={posture === 'slouch' ? 200 : posture === 'confident' ? 160 : 175} 
                  width="18" 
                  height="60" 
                  rx="9" 
                  fill="#fdd8b5"
                  transform={posture === 'confident' ? 'rotate(-20 104 190)' : posture === 'slouch' ? 'rotate(15 104 230)' : 'rotate(0 104 205)'}
                />
                <rect 
                  x="187" 
                  y={posture === 'slouch' ? 200 : posture === 'confident' ? 160 : 175} 
                  width="18" 
                  height="60" 
                  rx="9" 
                  fill="#fdd8b5"
                  transform={posture === 'confident' ? 'rotate(20 196 190)' : posture === 'slouch' ? 'rotate(-15 196 230)' : 'rotate(0 196 205)'}
                />

                {/* Confident shield */}
                {showShield && posture === 'confident' && (
                  <g className={styles.shieldAppear}>
                    <path 
                      d="M 150 100 L 130 120 L 130 160 L 150 180 L 170 160 L 170 120 Z" 
                      fill="#ffd700" 
                      opacity="0.6"
                      stroke="#ffed4e"
                      strokeWidth="2"
                    />
                    <path 
                      d="M 145 140 L 150 150 L 160 130" 
                      stroke="#fff" 
                      strokeWidth="4" 
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </g>
            </svg>
          </div>

          <button
            className={styles.postureButton}
            onClick={changePosture}
            aria-label="Change posture"
          >
            <span className={styles.tapIcon}>👆</span>
          </button>
        </div>
      </div>
    </div>
  )
}
