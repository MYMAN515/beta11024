'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './MoodTracker.module.css'
import { EMOTION_DATA } from '../../../constants/images'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

export default function MoodTracker({ onBack, playSound }: Props) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [particles, setParticles] = useState<{id: number, x: number, y: number, emoji: string}[]>([])

  const handleMoodSelect = (index: number) => {
    playSound?.('tap')
    setSelectedMood(index)
    setShowCelebration(true)
    
    // Create particle explosion
    const mood = EMOTION_DATA[index]
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 60,
      emoji: mood.particles
    }))
    setParticles(newParticles)
    
    setTimeout(() => playSound?.('success'), 300)
    setTimeout(() => {
      setShowCelebration(false)
      setParticles([])
    }, 2500)
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>
      
      {/* Floating question */}
      <div className={styles.header}>
        <div className={styles.questionEmoji}>🤔</div>
        <div className={styles.questionGlow} />
      </div>

      {/* Emotion Grid with REAL IMAGES */}
      <div className={styles.moodGrid}>
        {EMOTION_DATA.slice(0, 8).map((mood, index) => (
          <button
            key={mood.id}
            className={`${styles.moodCard} ${selectedMood === index ? styles.selected : ''}`}
            style={{ 
              '--mood-color': mood.color,
              animationDelay: `${index * 0.08}s`
            } as React.CSSProperties}
            onClick={() => handleMoodSelect(index)}
          >
            {/* Real emotion image */}
            <div className={styles.imageWrapper}>
              <Image
                src={mood.image}
                alt={mood.id}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.emotionImage}
              />
              {/* Overlay gradient for better visual */}
              <div className={styles.imageOverlay} />
            </div>
            
            {/* Particle icon */}
            <div className={styles.particleIcon}>{mood.particles}</div>
            
            {/* Selection ring */}
            {selectedMood === index && (
              <div className={styles.selectionRing}>
                {[...Array(8)].map((_, i) => (
                  <span 
                    key={i} 
                    className={styles.ringParticle}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${i * 45}deg) translateX(90px)`
                    }}
                  >
                    {mood.particles}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* More emotions toggle */}
      <div className={styles.moreEmotions}>
        {EMOTION_DATA.slice(8).map((mood, index) => (
          <button
            key={mood.id}
            className={`${styles.smallMoodCard} ${selectedMood === index + 8 ? styles.selected : ''}`}
            style={{ '--mood-color': mood.color } as React.CSSProperties}
            onClick={() => handleMoodSelect(index + 8)}
          >
            <div className={styles.smallImageWrapper}>
              <Image
                src={mood.image}
                alt={mood.id}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.emotionImage}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Celebration overlay */}
      {showCelebration && selectedMood !== null && (
        <div className={styles.celebration}>
          <div className={styles.celebrationImage}>
            <Image
              src={EMOTION_DATA[selectedMood].image}
              alt="Selected mood"
              width={250}
              height={250}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <div className={styles.celebrationGlow} style={{ background: EMOTION_DATA[selectedMood].color }} />
          </div>
          
          {/* Flying particles */}
          <div className={styles.particleContainer}>
            {particles.map(particle => (
              <span 
                key={particle.id}
                className={styles.flyingParticle}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
              >
                {particle.emoji}
              </span>
            ))}
          </div>
          
          {/* Sparkle effect */}
          <div className={styles.sparkleRain}>
            {[...Array(20)].map((_, i) => (
              <span 
                key={i}
                className={styles.sparkle}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`
                }}
              >
                ✨
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Helper indicator */}
      <div className={styles.helper}>
        <div className={styles.helperBubble}>
          {selectedMood !== null ? '❤️' : '👆'}
        </div>
      </div>
    </div>
  )
}
