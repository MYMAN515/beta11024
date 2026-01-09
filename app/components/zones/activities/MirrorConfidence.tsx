'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './MirrorConfidence.module.css'
import { IMAGES, CONFIDENCE_DATA } from '../../../constants/images'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

export default function MirrorConfidence({ onBack, playSound }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([])
  const [totalAffirmations, setTotalAffirmations] = useState(0)

  const handleNextImage = () => {
    if (isTransitioning) return
    
    playSound?.('sparkle')
    setIsTransitioning(true)
    setTotalAffirmations(prev => prev + 1)
    
    // Add sparkles
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40
    }))
    setSparkles(newSparkles)
    
    setTimeout(() => {
      setCurrentImage(prev => (prev + 1) % CONFIDENCE_DATA.length)
      setIsTransitioning(false)
      setSparkles([])
      playSound?.('success')
    }, 600)
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Floating sparkles background */}
      <div className={styles.bgSparkles}>
        {[...Array(20)].map((_, i) => (
          <span 
            key={i}
            className={styles.bgSparkle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            ✨
          </span>
        ))}
      </div>

      {/* Mirror Frame */}
      <div className={styles.mirrorFrame}>
        <div className={styles.mirrorGlass}>
          {/* Current confidence image */}
          <button 
            className={`${styles.imageContainer} ${isTransitioning ? styles.transitioning : ''}`}
            onClick={handleNextImage}
          >
            <Image
              src={CONFIDENCE_DATA[currentImage].image}
              alt="You are amazing"
              fill
              style={{ objectFit: 'cover' }}
              className={styles.confidenceImage}
              priority
            />
            
            {/* Glow overlay */}
            <div className={styles.imageGlow} />
            
            {/* Sparkle effects */}
            {sparkles.map(sparkle => (
              <div 
                key={sparkle.id}
                className={styles.sparkle}
                style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
              >
                ✨
              </div>
            ))}
          </button>
          
          {/* Mirror shine effect */}
          <div className={styles.mirrorShine} />
        </div>
        
        {/* Decorative frame elements */}
        <div className={styles.frameCorner} style={{ top: 0, left: 0 }}>✦</div>
        <div className={styles.frameCorner} style={{ top: 0, right: 0 }}>✦</div>
        <div className={styles.frameCorner} style={{ bottom: 0, left: 0 }}>✦</div>
        <div className={styles.frameCorner} style={{ bottom: 0, right: 0 }}>✦</div>
      </div>

      {/* Current affirmation message */}
      <div className={styles.affirmationMessage}>
        <span className={styles.messageEmoji}>
          {CONFIDENCE_DATA[currentImage].message}
        </span>
      </div>

      {/* Affirmation cards carousel */}
      <div className={styles.carouselDots}>
        {CONFIDENCE_DATA.map((_, i) => (
          <div 
            key={i}
            className={`${styles.dot} ${i === currentImage ? styles.activeDot : ''}`}
          />
        ))}
      </div>

      {/* Progress hearts */}
      <div className={styles.progressHearts}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`${styles.progressHeart} ${i < totalAffirmations ? styles.filled : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {i < totalAffirmations ? '❤️' : '🤍'}
          </div>
        ))}
      </div>

      {/* Helper */}
      <div className={styles.helper}>
        <div className={styles.helperBubble}>
          {totalAffirmations > 0 ? '⭐' : '👆'}
        </div>
      </div>

      {/* Celebration when all seen */}
      {totalAffirmations >= 6 && (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <span className={styles.celebrationEmoji}>🌟</span>
            <div className={styles.celebrationStars}>
              {[...Array(12)].map((_, i) => (
                <span 
                  key={i}
                  className={styles.celebrationStar}
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
    </div>
  )
}
