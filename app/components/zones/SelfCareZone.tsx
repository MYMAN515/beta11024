'use client'

import { useState } from 'react'
import styles from './Zone.module.css'
import RoutineBuilder from './activities/RoutineBuilder'
import HygieneKit from './activities/HygieneKit'
import SleepNutrition from './activities/SleepNutrition'

interface Props {
  onBack: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

type Activity = 'routine' | 'hygiene' | 'sleep' | null

export default function SelfCareZone({ onBack, audioEnabled, playSound }: Props) {
  const [activity, setActivity] = useState<Activity>(null)

  const handleActivitySelect = (selected: Activity) => {
    playSound?.('tap')
    setActivity(selected)
  }

  if (activity === 'routine') {
    return <RoutineBuilder onBack={() => setActivity(null)} playSound={playSound} />
  }
  if (activity === 'hygiene') {
    return <HygieneKit onBack={() => setActivity(null)} playSound={playSound} />
  }
  if (activity === 'sleep') {
    return <SleepNutrition onBack={() => setActivity(null)} playSound={playSound} />
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>
      
      <div className={styles.activityGrid}>
        {/* Daily Routine Builder */}
        <button 
          className={`${styles.activityCard} ${styles.activity1}`}
          onClick={() => handleActivitySelect('routine')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Clock */}
            <circle cx="100" cy="100" r="60" fill="#fff" opacity="0.95" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#ddd" strokeWidth="3" />
            {/* Clock hands */}
            <line x1="100" y1="100" x2="100" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="100" x2="130" y2="100" stroke="#666" strokeWidth="4" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
            </line>
            <circle cx="100" cy="100" r="6" fill="#333" />
            {/* Time icons */}
            <text x="100" y="45" textAnchor="middle" fontSize="18">☀️</text>
            <text x="145" y="105" textAnchor="middle" fontSize="18">🍽️</text>
            <text x="100" y="165" textAnchor="middle" fontSize="18">🌙</text>
            <text x="55" y="105" textAnchor="middle" fontSize="18">📚</text>
          </svg>
          <span className={styles.activityLabel}>My Day</span>
        </button>

        {/* Hygiene Kit */}
        <button 
          className={`${styles.activityCard} ${styles.activity2}`}
          onClick={() => handleActivitySelect('hygiene')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Bathroom items */}
            <rect x="45" y="60" width="40" height="80" rx="10" fill="#fff" opacity="0.95" />
            <rect x="50" y="110" width="30" height="25" rx="5" fill="#7eb8da" opacity="0.8" />
            {/* Toothbrush */}
            <rect x="115" y="50" width="15" height="100" rx="5" fill="#fff" opacity="0.95" />
            <ellipse cx="122" cy="50" rx="12" ry="15" fill="#a8d5ba" opacity="0.9" />
            {/* Sparkles */}
            <text x="155" y="75" fontSize="24" opacity="0.8">✨</text>
            <text x="35" y="50" fontSize="20" opacity="0.8">✨</text>
            <text x="145" y="145" fontSize="20" opacity="0.8">💧</text>
          </svg>
          <span className={styles.activityLabel}>Clean & Fresh</span>
        </button>

        {/* Sleep & Energy */}
        <button 
          className={`${styles.activityCard} ${styles.activity3}`}
          onClick={() => handleActivitySelect('sleep')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Bed */}
            <rect x="30" y="100" width="140" height="60" rx="10" fill="#fff" opacity="0.95" />
            <ellipse cx="70" cy="90" rx="30" ry="20" fill="#fff" opacity="0.9" />
            <ellipse cx="130" cy="90" rx="30" ry="20" fill="#fff" opacity="0.9" />
            {/* Sleeping face */}
            <circle cx="100" cy="120" r="25" fill="#fdd8b5" opacity="0.9" />
            <path d="M 90 115 L 98 115" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M 102 115 L 110 115" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="100" cy="128" rx="5" ry="3" fill="#ff6b6b" opacity="0.5" />
            {/* ZZZ */}
            <text x="140" y="50" fontSize="22" fill="#c5a3ff" fontWeight="bold">Z</text>
            <text x="155" y="35" fontSize="18" fill="#c5a3ff" fontWeight="bold" opacity="0.7">z</text>
            <text x="165" y="25" fontSize="14" fill="#c5a3ff" fontWeight="bold" opacity="0.5">z</text>
            {/* Moon */}
            <text x="40" y="50" fontSize="28">🌙</text>
          </svg>
          <span className={styles.activityLabel}>Rest & Energy</span>
        </button>
      </div>
    </div>
  )
}
