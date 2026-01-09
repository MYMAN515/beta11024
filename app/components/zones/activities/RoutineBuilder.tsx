'use client'

import { useState } from 'react'
import styles from './RoutineBuilder.module.css'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

interface RoutineItem {
  id: string
  emoji: string
  timeOfDay: 'morning' | 'afternoon' | 'evening'
  order: number
}

const routineItems: RoutineItem[] = [
  { id: 'wake', emoji: '🌅', timeOfDay: 'morning', order: 1 },
  { id: 'brush', emoji: '🪥', timeOfDay: 'morning', order: 2 },
  { id: 'breakfast', emoji: '🥣', timeOfDay: 'morning', order: 3 },
  { id: 'school', emoji: '📚', timeOfDay: 'morning', order: 4 },
  { id: 'lunch', emoji: '🍽️', timeOfDay: 'afternoon', order: 1 },
  { id: 'play', emoji: '⚽', timeOfDay: 'afternoon', order: 2 },
  { id: 'homework', emoji: '✏️', timeOfDay: 'afternoon', order: 3 },
  { id: 'dinner', emoji: '🍝', timeOfDay: 'evening', order: 1 },
  { id: 'bath', emoji: '🛁', timeOfDay: 'evening', order: 2 },
  { id: 'sleep', emoji: '😴', timeOfDay: 'evening', order: 3 },
]

export default function RoutineBuilder({ onBack, playSound }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [activeTime, setActiveTime] = useState<'morning' | 'afternoon' | 'evening'>('morning')
  const [showComplete, setShowComplete] = useState(false)

  const currentItems = routineItems.filter(item => item.timeOfDay === activeTime)

  const handleItemClick = (id: string) => {
    playSound?.('tap')
    
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(i => i !== id))
    } else {
      setSelectedItems(prev => [...prev, id])
      playSound?.('sparkle')
    }
  }

  const handleTimeChange = (time: 'morning' | 'afternoon' | 'evening') => {
    playSound?.('tap')
    setActiveTime(time)
  }

  const handleComplete = () => {
    if (selectedItems.length >= 5) {
      playSound?.('complete')
      setShowComplete(true)
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Time of Day Selector */}
      <div className={styles.timeSelector}>
        <button 
          className={`${styles.timeBtn} ${activeTime === 'morning' ? styles.active : ''}`}
          onClick={() => handleTimeChange('morning')}
        >
          <span className={styles.timeEmoji}>🌅</span>
        </button>
        <button 
          className={`${styles.timeBtn} ${activeTime === 'afternoon' ? styles.active : ''}`}
          onClick={() => handleTimeChange('afternoon')}
        >
          <span className={styles.timeEmoji}>☀️</span>
        </button>
        <button 
          className={`${styles.timeBtn} ${activeTime === 'evening' ? styles.active : ''}`}
          onClick={() => handleTimeChange('evening')}
        >
          <span className={styles.timeEmoji}>🌙</span>
        </button>
      </div>

      {/* Routine Items Grid */}
      <div className={styles.routineGrid}>
        {currentItems.map((item, index) => (
          <button
            key={item.id}
            className={`${styles.routineItem} ${selectedItems.includes(item.id) ? styles.selected : ''}`}
            onClick={() => handleItemClick(item.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={styles.itemEmoji}>{item.emoji}</span>
            {selectedItems.includes(item.id) && (
              <div className={styles.checkmark}>✓</div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className={styles.progressArea}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${(selectedItems.length / 10) * 100}%` }}
          />
        </div>
        <div className={styles.progressIcons}>
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className={`${styles.progressDot} ${i < selectedItems.length ? styles.filled : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Complete Button */}
      {selectedItems.length >= 5 && (
        <button className={styles.completeBtn} onClick={handleComplete}>
          <span>🎉</span>
        </button>
      )}

      {/* Completion Celebration */}
      {showComplete && (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <div className={styles.celebrationEmoji}>🌟</div>
            <div className={styles.selectedRoutine}>
              {selectedItems.map(id => {
                const item = routineItems.find(i => i.id === id)
                return item ? (
                  <span key={id} className={styles.routineIcon}>{item.emoji}</span>
                ) : null
              })}
            </div>
          </div>
          <div className={styles.confetti}>
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className={styles.confettiPiece}
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ffd700', '#ff6b6b', '#a8d5ba', '#c5a3ff', '#7eb8da'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <button 
            className={styles.closeBtn}
            onClick={() => setShowComplete(false)}
          >
            ✓
          </button>
        </div>
      )}
    </div>
  )
}
