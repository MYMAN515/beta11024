'use client'

import { useState, useRef } from 'react'
import styles from './TimelineMatching.module.css'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

interface TimelineItem {
  id: string
  stage: 'child' | 'teen' | 'adult'
  emoji: string
  placed: boolean
}

const items: TimelineItem[] = [
  { id: 'acne', stage: 'teen', emoji: '🔴', placed: false },
  { id: 'growth', stage: 'teen', emoji: '📏', placed: false },
  { id: 'voice', stage: 'teen', emoji: '🎤', placed: false },
  { id: 'hair', stage: 'teen', emoji: '✂️', placed: false },
  { id: 'toy', stage: 'child', emoji: '🧸', placed: false },
  { id: 'job', stage: 'adult', emoji: '💼', placed: false },
]

export default function TimelineMatching({ onBack, playSound }: Props) {
  const [gameItems, setGameItems] = useState(items)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [correctPlacements, setCorrectPlacements] = useState<string[]>([])
  const dragItemRef = useRef<HTMLDivElement | null>(null)

  const handleDragStart = (id: string, e: React.DragEvent | React.TouchEvent) => {
    setDraggedItem(id)
    playSound?.('tap')
  }

  const handleDrop = (targetStage: 'child' | 'teen' | 'adult') => {
    if (!draggedItem) return

    const item = gameItems.find(i => i.id === draggedItem)
    if (!item) return

    if (item.stage === targetStage) {
      // Correct placement
      playSound?.('success')
      setCorrectPlacements(prev => [...prev, draggedItem])
      setGameItems(prev => 
        prev.map(i => i.id === draggedItem ? { ...i, placed: true } : i)
      )
      
      // Check if all items are placed
      const newPlaced = gameItems.filter(i => i.placed || i.id === draggedItem)
      if (newPlaced.length === gameItems.length) {
        setCompleted(true)
        setTimeout(() => playSound?.('complete'), 500)
      }
    } else {
      // Wrong placement - shake effect handled by CSS
      playSound?.('drop')
    }
    
    setDraggedItem(null)
  }

  const unplacedItems = gameItems.filter(i => !i.placed)

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Timeline */}
      <div className={styles.timeline}>
        {/* Timeline Line */}
        <div className={styles.timelineLine}>
          <div className={styles.lineProgress} style={{ width: `${(correctPlacements.length / gameItems.length) * 100}%` }} />
        </div>

        {/* Timeline Stages */}
        <div 
          className={`${styles.stage} ${styles.stageChild}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('child')}
        >
          <div className={styles.stageIcon}>👶</div>
          <div className={styles.stageDropzone}>
            {gameItems.filter(i => i.placed && i.stage === 'child').map(item => (
              <span key={item.id} className={styles.placedItem}>{item.emoji}</span>
            ))}
          </div>
        </div>

        <div 
          className={`${styles.stage} ${styles.stageTeen}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('teen')}
        >
          <div className={styles.stageIcon}>🧒</div>
          <div className={styles.stageDropzone}>
            {gameItems.filter(i => i.placed && i.stage === 'teen').map(item => (
              <span key={item.id} className={styles.placedItem}>{item.emoji}</span>
            ))}
          </div>
        </div>

        <div 
          className={`${styles.stage} ${styles.stageAdult}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('adult')}
        >
          <div className={styles.stageIcon}>🧑</div>
          <div className={styles.stageDropzone}>
            {gameItems.filter(i => i.placed && i.stage === 'adult').map(item => (
              <span key={item.id} className={styles.placedItem}>{item.emoji}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Items to drag */}
      <div className={styles.itemsArea}>
        {unplacedItems.map((item) => (
          <div
            key={item.id}
            ref={dragItemRef}
            className={`${styles.draggableItem} ${draggedItem === item.id ? styles.dragging : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(item.id, e)}
            onDragEnd={() => setDraggedItem(null)}
          >
            <span className={styles.itemEmoji}>{item.emoji}</span>
          </div>
        ))}
      </div>

      {/* Completion celebration */}
      {completed && (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <div className={styles.trophy}>🏆</div>
            <div className={styles.stars}>
              {[...Array(12)].map((_, i) => (
                <span 
                  key={i}
                  className={styles.star}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className={styles.progress}>
        {gameItems.map((item, i) => (
          <div 
            key={i}
            className={`${styles.progressDot} ${item.placed ? styles.progressComplete : ''}`}
          >
            {item.placed && '✓'}
          </div>
        ))}
      </div>
    </div>
  )
}
