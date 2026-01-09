'use client'

import { useState } from 'react'
import styles from './Zone.module.css'
import BodyChangeSlider from './activities/BodyChangeSlider'
import TimelineMatching from './activities/TimelineMatching'
import MoodTracker from './activities/MoodTracker'

interface Props {
  onBack: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

type Activity = 'slider' | 'timeline' | 'mood' | null
type Gender = 'boy' | 'girl' | null

export default function BodyFeelingsZone({ onBack, audioEnabled, playSound }: Props) {
  const [activity, setActivity] = useState<Activity>(null)
  const [gender, setGender] = useState<Gender>(null)

  const handleActivitySelect = (selected: Activity) => {
    playSound?.('tap')
    setActivity(selected)
  }

  const handleGenderSelect = (selected: Gender) => {
    playSound?.('tap')
    setGender(selected)
  }

  // Activity screens
  if (activity === 'slider' && gender) {
    return <BodyChangeSlider gender={gender} onBack={() => setActivity(null)} playSound={playSound} />
  }
  if (activity === 'timeline') {
    return <TimelineMatching onBack={() => setActivity(null)} playSound={playSound} />
  }
  if (activity === 'mood') {
    return <MoodTracker onBack={() => setActivity(null)} playSound={playSound} />
  }

  // Gender selection for slider
  if (activity === 'slider' && !gender) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setActivity(null)}>←</button>
        
        <div className={styles.genderSelection}>
          <button 
            className={`${styles.genderCard} ${styles.genderBoy}`}
            onClick={() => handleGenderSelect('boy')}
          >
            <div className={styles.genderIcon}>👦</div>
          </button>
          
          <button 
            className={`${styles.genderCard} ${styles.genderGirl}`}
            onClick={() => handleGenderSelect('girl')}
          >
            <div className={styles.genderIcon}>👧</div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>
      
      <div className={styles.activityGrid}>
        {/* Body Changes Slider */}
        <button 
          className={`${styles.activityCard} ${styles.activity1}`}
          onClick={() => handleActivitySelect('slider')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </linearGradient>
            </defs>
            {/* Person shape */}
            <ellipse cx="100" cy="50" rx="30" ry="35" fill="url(#bodyGrad)" />
            <rect x="75" y="80" width="50" height="70" rx="20" fill="url(#bodyGrad)" />
            {/* Height arrows */}
            <path d="M 160 140 L 160 50 L 150 65 M 160 50 L 170 65" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 40 60 L 40 150 L 30 135 M 40 150 L 50 135" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
          <span className={styles.activityLabel}>Body Changes</span>
        </button>

        {/* Timeline Matching */}
        <button 
          className={`${styles.activityCard} ${styles.activity2}`}
          onClick={() => handleActivitySelect('timeline')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Timeline */}
            <line x1="30" y1="100" x2="170" y2="100" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
            {/* Timeline points */}
            <circle cx="50" cy="100" r="15" fill="#fff" opacity="0.9">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="15" fill="#fff" opacity="0.9">
              <animate attributeName="r" values="15;18;15" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="100" r="15" fill="#fff" opacity="0.9">
              <animate attributeName="r" values="15;18;15" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            {/* Icons above */}
            <text x="50" y="60" textAnchor="middle" fontSize="28">👶</text>
            <text x="100" y="60" textAnchor="middle" fontSize="28">🧒</text>
            <text x="150" y="60" textAnchor="middle" fontSize="28">🧑</text>
          </svg>
          <span className={styles.activityLabel}>Growing Up</span>
        </button>

        {/* Mood Tracker */}
        <button 
          className={`${styles.activityCard} ${styles.activity3}`}
          onClick={() => handleActivitySelect('mood')}
        >
          <svg viewBox="0 0 200 200" className={styles.activityIcon}>
            {/* Emoji faces */}
            <circle cx="65" cy="90" r="40" fill="#fff" opacity="0.9" />
            <circle cx="135" cy="90" r="40" fill="#fff" opacity="0.9" />
            {/* Happy face */}
            <circle cx="55" cy="85" r="5" fill="#333" />
            <circle cx="75" cy="85" r="5" fill="#333" />
            <path d="M 50 100 Q 65 115 80 100" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Sad face */}
            <circle cx="125" cy="85" r="5" fill="#333" />
            <circle cx="145" cy="85" r="5" fill="#333" />
            <path d="M 120 110 Q 135 95 150 110" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Heart */}
            <path d="M 100 150 L 85 135 Q 75 120 90 120 Q 100 125 100 125 Q 100 125 110 120 Q 125 120 115 135 Z" fill="#ff6b6b" opacity="0.9">
              <animate attributeName="transform" type="scale" values="1;1.1;1" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
          <span className={styles.activityLabel}>Feelings</span>
        </button>
      </div>
    </div>
  )
}
