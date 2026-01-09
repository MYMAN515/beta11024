'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './HygieneKit.module.css'
import { IMAGES } from '../../../constants/images'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

interface HygieneItem {
  id: string
  emoji: string
  image?: string
  target: 'face' | 'body' | 'teeth' | 'hair'
}

const items: HygieneItem[] = [
  { id: 'soap', emoji: '🧼', target: 'body' },
  { id: 'toothbrush', emoji: '🪥', target: 'teeth' },
  { id: 'shampoo', emoji: '🧴', target: 'hair' },
  { id: 'deodorant', emoji: '🫧', image: IMAGES.puberty.deodorantUse, target: 'body' },
  { id: 'face-wash', emoji: '💧', target: 'face' },
  { id: 'comb', emoji: '🪮', target: 'hair' },
]

const targets = [
  { id: 'face', emoji: '😊', label: 'Face' },
  { id: 'body', emoji: '🧍', label: 'Body' },
  { id: 'teeth', emoji: '😁', label: 'Teeth' },
  { id: 'hair', emoji: '💇', label: 'Hair' },
]

export default function HygieneKit({ onBack, playSound }: Props) {
  const [placedItems, setPlacedItems] = useState<Record<string, string[]>>({
    face: [],
    body: [],
    teeth: [],
    hair: []
  })
  const [draggedItem, setDraggedItem] = useState<HygieneItem | null>(null)
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([])
  const [showDeodorantDemo, setShowDeodorantDemo] = useState(false)

  const handleDragStart = (item: HygieneItem) => {
    setDraggedItem(item)
    playSound?.('tap')
  }

  const handleDrop = (targetId: string) => {
    if (!draggedItem) return

    if (draggedItem.target === targetId) {
      playSound?.('success')
      setPlacedItems(prev => ({
        ...prev,
        [targetId]: [...prev[targetId as keyof typeof prev], draggedItem.id]
      }))
      
      // Show deodorant demo if that was placed
      if (draggedItem.id === 'deodorant') {
        setShowDeodorantDemo(true)
        setTimeout(() => setShowDeodorantDemo(false), 3000)
      }
      
      // Add sparkle effect
      const sparkle = {
        id: Date.now(),
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100
      }
      setSparkles(prev => [...prev, sparkle])
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id))
      }, 1000)
    } else {
      playSound?.('drop')
    }
    
    setDraggedItem(null)
  }

  const usedItems = Object.values(placedItems).flat()
  const availableItems = items.filter(item => !usedItems.includes(item.id))
  const allPlaced = availableItems.length === 0

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Character in center */}
      <div className={styles.characterArea}>
        <div className={styles.character}>
          {/* Character SVG */}
          <svg viewBox="0 0 200 300" className={styles.characterSvg}>
            <defs>
              <radialGradient id="skinGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffe4c9" />
                <stop offset="100%" stopColor="#fdd8b5" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Hair */}
            <ellipse cx="100" cy="55" rx="55" ry="50" fill="#5a4a42" filter="url(#glow)" />
            
            {/* Face */}
            <ellipse cx="100" cy="70" rx="45" ry="50" fill="url(#skinGrad)" />
            
            {/* Eyes */}
            <ellipse cx="80" cy="65" rx="8" ry="10" fill="white" />
            <ellipse cx="120" cy="65" rx="8" ry="10" fill="white" />
            <circle cx="80" cy="65" r="5" fill="#4a3728" />
            <circle cx="120" cy="65" r="5" fill="#4a3728" />
            <circle cx="78" cy="63" r="2" fill="white" />
            <circle cx="118" cy="63" r="2" fill="white" />
            
            {/* Smile */}
            <path d="M 80 95 Q 100 110 120 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Teeth showing */}
            <path d="M 85 95 L 85 100 L 115 100 L 115 95" fill="white" opacity="0.9" />
            
            {/* Cheeks */}
            <ellipse cx="60" cy="85" rx="10" ry="6" fill="#ffb6c1" opacity="0.5" />
            <ellipse cx="140" cy="85" rx="10" ry="6" fill="#ffb6c1" opacity="0.5" />
            
            {/* Body */}
            <rect x="60" y="115" width="80" height="100" rx="30" fill="#7eb8da" />
            
            {/* Arms */}
            <ellipse cx="45" cy="165" rx="15" ry="35" fill="url(#skinGrad)" />
            <ellipse cx="155" cy="165" rx="15" ry="35" fill="url(#skinGrad)" />
            
            {/* Sparkle when clean */}
            {usedItems.length > 2 && (
              <>
                <text x="150" y="50" fontSize="20" opacity="0.8">✨</text>
                <text x="40" y="60" fontSize="18" opacity="0.7">✨</text>
                <text x="160" y="130" fontSize="16" opacity="0.6">✨</text>
              </>
            )}
          </svg>
          
          {/* Sparkle effects */}
          {sparkles.map(sparkle => (
            <div 
              key={sparkle.id}
              className={styles.sparkle}
              style={{ left: sparkle.x, top: sparkle.y }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Drop targets */}
        <div className={styles.targets}>
          {targets.map(target => (
            <div
              key={target.id}
              className={`${styles.target} ${styles[`target_${target.id}`]} ${placedItems[target.id as keyof typeof placedItems].length > 0 ? styles.complete : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(target.id)}
            >
              <span className={styles.targetEmoji}>{target.emoji}</span>
              <div className={styles.placedItems}>
                {placedItems[target.id as keyof typeof placedItems].map(itemId => {
                  const item = items.find(i => i.id === itemId)
                  return item ? (
                    <span key={itemId} className={styles.placedItem}>{item.emoji}</span>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Draggable Items */}
      <div className={styles.itemsArea}>
        {availableItems.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.draggableItem} ${draggedItem?.id === item.id ? styles.dragging : ''}`}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragEnd={() => setDraggedItem(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {item.image ? (
              <div className={styles.itemImageWrapper}>
                <Image
                  src={item.image}
                  alt={item.id}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '25px' }}
                />
              </div>
            ) : (
              <span className={styles.itemEmoji}>{item.emoji}</span>
            )}
          </div>
        ))}
      </div>

      {/* Deodorant Demo Popup */}
      {showDeodorantDemo && (
        <div className={styles.demoPopup}>
          <Image
            src={IMAGES.puberty.deodorantUse}
            alt="Using deodorant"
            width={250}
            height={250}
            style={{ objectFit: 'contain', borderRadius: '30px' }}
          />
          <div className={styles.demoSparkles}>
            {[...Array(8)].map((_, i) => (
              <span 
                key={i}
                className={styles.demoSparkle}
                style={{ 
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                ✨
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Completion */}
      {allPlaced && (
        <div className={styles.celebration}>
          <div className={styles.celebrationEmoji}>🎉</div>
          <div className={styles.sparkleRain}>
            {[...Array(20)].map((_, i) => (
              <span 
                key={i}
                className={styles.rainSparkle}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ✨
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className={styles.progress}>
        {items.map((item, i) => (
          <div 
            key={i}
            className={`${styles.progressDot} ${usedItems.includes(item.id) ? styles.done : ''}`}
          >
            {usedItems.includes(item.id) ? '✓' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}
