'use client'

import { useState } from 'react'
import styles from './Activity.module.css'

interface Props {
  onClose: () => void
  audioEnabled: boolean
  playSound?: (sound: string) => void
}

type Food = {
  id: string
  emoji: string
  type: 'healthy' | 'neutral'
  color: string
}

export default function FoodActivity({ onClose, audioEnabled, playSound }: Props) {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [bodyGlow, setBodyGlow] = useState(false)

  const foods: Food[] = [
    { id: 'apple', emoji: '🍎', type: 'healthy', color: '#ff6b6b' },
    { id: 'carrot', emoji: '🥕', type: 'healthy', color: '#ff9f43' },
    { id: 'broccoli', emoji: '🥦', type: 'healthy', color: '#26de81' },
    { id: 'water', emoji: '💧', type: 'healthy', color: '#54a0ff' },
    { id: 'bread', emoji: '🍞', type: 'neutral', color: '#f1c40f' },
    { id: 'cookie', emoji: '🍪', type: 'neutral', color: '#d4a574' }
  ]

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food)
    playSound?.('tap')

    if (food.type === 'healthy') {
      setBodyGlow(true)
      playSound?.('success')
      setTimeout(() => setBodyGlow(false), 2000)
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

        <div className={styles.foodContainer}>
          <div className={styles.foodGrid}>
            {foods.map((food) => (
              <button
                key={food.id}
                className={`${styles.foodButton} ${selectedFood?.id === food.id ? styles.selectedFood : ''}`}
                style={{ backgroundColor: food.color }}
                onClick={() => handleFoodClick(food)}
                aria-label={`Select ${food.id}`}
              >
                <span className={styles.foodEmoji}>{food.emoji}</span>
              </button>
            ))}
          </div>

          <div className={styles.bodyResponse}>
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
              <g className={bodyGlow ? styles.glowingBody : ''}>
                {/* Head */}
                <ellipse cx="100" cy="60" rx="40" ry="45" fill="#fdd8b5" />
                <circle cx="90" cy="55" r="4" fill="#333" />
                <circle cx="110" cy="55" r="4" fill="#333" />
                
                {/* Smile when healthy food */}
                {selectedFood?.type === 'healthy' ? (
                  <path d="M 80 70 Q 100 82 120 70" stroke="#333" strokeWidth="2.5" fill="none" />
                ) : (
                  <line x1="85" y1="75" x2="115" y2="75" stroke="#333" strokeWidth="2" />
                )}
                
                {/* Body */}
                <rect x="70" y="105" width="60" height="90" rx="15" fill="#b8d4f1" />
                
                {/* Stomach area with glow */}
                <ellipse 
                  cx="100" 
                  cy="130" 
                  rx="25" 
                  ry="30" 
                  fill={selectedFood ? selectedFood.color : 'transparent'}
                  opacity="0.3"
                  className={bodyGlow ? styles.pulsingStomach : ''}
                />
                
                {/* Arms */}
                <rect x="50" y="115" width="15" height="55" rx="8" fill="#fdd8b5" />
                <rect x="135" y="115" width="15" height="55" rx="8" fill="#fdd8b5" />
                
                {/* Legs */}
                <rect x="75" y="195" width="20" height="70" rx="10" fill="#4a5f7a" />
                <rect x="105" y="195" width="20" height="70" rx="10" fill="#4a5f7a" />

                {/* Energy stars when healthy */}
                {bodyGlow && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <circle
                        key={i}
                        cx={70 + Math.random() * 60}
                        cy={110 + Math.random() * 80}
                        r="3"
                        fill="#ffd700"
                        className={styles.energyStar}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </>
                )}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
