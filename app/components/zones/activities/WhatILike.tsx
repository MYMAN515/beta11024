'use client'

import { useState } from 'react'
import styles from './WhatILike.module.css'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

const categories = [
  { 
    id: 'activities', 
    icon: '🎮', 
    items: ['⚽', '🎨', '📚', '🎵', '🎭', '🏊', '🚴', '🎸'] 
  },
  { 
    id: 'food', 
    icon: '🍕', 
    items: ['🍎', '🍕', '🍦', '🥗', '🍔', '🍿', '🥤', '🍩'] 
  },
  { 
    id: 'nature', 
    icon: '🌿', 
    items: ['🌸', '🐕', '🌈', '⭐', '🦋', '🌊', '🏔️', '🌙'] 
  },
]

export default function WhatILike({ onBack, playSound }: Props) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  const handleCategoryChange = (index: number) => {
    playSound?.('tap')
    setActiveCategory(index)
  }

  const handleItemClick = (item: string) => {
    playSound?.('sparkle')
    
    if (selectedItems.includes(item)) {
      setSelectedItems(prev => prev.filter(i => i !== item))
    } else {
      setSelectedItems(prev => [...prev, item])
      
      // Celebrate on 5 selections
      if (selectedItems.length === 4) {
        setTimeout(() => {
          setShowCelebration(true)
          playSound?.('complete')
          setTimeout(() => setShowCelebration(false), 3000)
        }, 300)
      }
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Category Tabs */}
      <div className={styles.categories}>
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${activeCategory === index ? styles.active : ''}`}
            onClick={() => handleCategoryChange(index)}
          >
            <span className={styles.catIcon}>{cat.icon}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className={styles.itemsGrid}>
        {categories[activeCategory].items.map((item, index) => (
          <button
            key={index}
            className={`${styles.itemCard} ${selectedItems.includes(item) ? styles.selected : ''}`}
            onClick={() => handleItemClick(item)}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className={styles.itemEmoji}>{item}</span>
            {selectedItems.includes(item) && (
              <div className={styles.heart}>❤️</div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Items Display */}
      <div className={styles.selectedArea}>
        <div className={styles.selectedLabel}>❤️</div>
        <div className={styles.selectedItems}>
          {selectedItems.map((item, index) => (
            <span 
              key={index} 
              className={styles.selectedItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
            </span>
          ))}
          {selectedItems.length === 0 && (
            <span className={styles.placeholder}>👆</span>
          )}
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <div className={styles.celebrationTitle}>🌟</div>
            <div className={styles.celebrationItems}>
              {selectedItems.slice(0, 5).map((item, i) => (
                <span 
                  key={i}
                  className={styles.celebrationItem}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.confetti}>
            {[...Array(30)].map((_, i) => (
              <span 
                key={i}
                className={styles.confettiPiece}
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff6b6b', '#ffd700', '#a8d5ba', '#c5a3ff', '#7eb8da'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
