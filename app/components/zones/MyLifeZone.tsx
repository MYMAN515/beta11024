'use client'

import { useState } from 'react'
import styles from './Zone.module.css'
import MirrorConfidence from './activities/MirrorConfidence'
import WhatILike from './activities/WhatILike'

interface Props {
  onBack: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

type Activity = 'mirror' | 'like' | null

export default function MyLifeZone({ onBack, audioEnabled, playSound }: Props) {
  const [activity, setActivity] = useState<Activity>(null)

  const handleActivitySelect = (selected: Activity) => {
    playSound?.('tap')
    setActivity(selected)
  }

  if (activity === 'mirror') {
    return <MirrorConfidence onBack={() => setActivity(null)} playSound={playSound} />
  }
  if (activity === 'like') {
    return <WhatILike onBack={() => setActivity(null)} playSound={playSound} />
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>
      
      <div className={styles.activityGrid}>
        {/* Mirror Confidence */}
        <button 
          className={`${styles.activityCard} ${styles.activity1}`}
          onClick={() => handleActivitySelect('mirror')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Mirror frame */}
            <ellipse cx="100" cy="100" rx="65" ry="75" fill="#fff" opacity="0.95" />
            <ellipse cx="100" cy="100" rx="55" ry="65" fill="none" stroke="#ffd700" strokeWidth="6" />
            {/* Reflection */}
            <circle cx="100" cy="80" r="25" fill="#fdd8b5" opacity="0.9" />
            <circle cx="92" cy="75" r="4" fill="#333" />
            <circle cx="108" cy="75" r="4" fill="#333" />
            <path d="M 90 90 Q 100 100 110 90" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Sparkles */}
            <text x="150" y="50" fontSize="24">✨</text>
            <text x="40" y="60" fontSize="20">⭐</text>
            <text x="155" y="140" fontSize="18">💫</text>
            {/* Heart */}
            <text x="100" y="165" fontSize="26" textAnchor="middle">❤️</text>
          </svg>
          <span className={styles.activityLabel}>I Am Special</span>
        </button>

        {/* What I Like */}
        <button 
          className={`${styles.activityCard} ${styles.activity2}`}
          onClick={() => handleActivitySelect('like')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Star burst */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line 
                key={i}
                x1="100" 
                y1="100" 
                x2={100 + Math.cos(i * Math.PI / 3) * 70}
                y2={100 + Math.sin(i * Math.PI / 3) * 70}
                stroke="#fff" 
                strokeWidth="4" 
                opacity="0.5"
                strokeLinecap="round"
              />
            ))}
            {/* Central heart */}
            <circle cx="100" cy="100" r="45" fill="#fff" opacity="0.95" />
            <path 
              d="M 100 120 L 80 100 Q 70 85 85 85 Q 100 90 100 90 Q 100 90 115 85 Q 130 85 120 100 Z" 
              fill="#ff6b6b" 
              opacity="0.9"
            >
              <animate attributeName="transform" type="scale" values="1;1.1;1" dur="1.5s" repeatCount="indefinite" />
            </path>
            {/* Floating likes */}
            <text x="55" y="55" fontSize="22">⭐</text>
            <text x="135" y="55" fontSize="22">🎨</text>
            <text x="45" y="150" fontSize="22">🎵</text>
            <text x="145" y="150" fontSize="22">🌟</text>
          </svg>
          <span className={styles.activityLabel}>What I Love</span>
        </button>
      </div>
    </div>
  )
}
