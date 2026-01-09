'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './BodyChangeSlider.module.css'
import { IMAGES } from '../../../constants/images'

interface Props {
  gender: 'boy' | 'girl'
  onBack: () => void
  playSound?: (sound: string) => void
}

export default function BodyChangeSlider({ gender, onBack, playSound }: Props) {
  const [stage, setStage] = useState(0)
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([])
  const [showingInfo, setShowingInfo] = useState<string | null>(null)

  const growthImage = gender === 'boy' 
    ? IMAGES.puberty.heightGrowthMale 
    : IMAGES.puberty.heightGrowthFemale

  // Play sound when stage changes significantly
  useEffect(() => {
    if (stage > 0 && stage % 25 === 0) {
      playSound?.('sparkle')
    }
  }, [Math.floor(stage / 25)])

  const handleSliderChange = (value: number) => {
    setStage(value)
    // Add sparkle effect
    if (Math.random() > 0.85) {
      const newSparkle = {
        id: Date.now(),
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 60
      }
      setSparkles(prev => [...prev.slice(-5), newSparkle])
    }
  }

  const toggleInfo = (type: string) => {
    playSound?.('tap')
    setShowingInfo(showingInfo === type ? null : type)
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Growth Stage Image */}
      <div className={styles.growthDisplay}>
        <div className={styles.imageFrame}>
          <Image
            src={growthImage}
            alt="Growth stages"
            fill
            style={{ objectFit: 'contain' }}
            className={styles.growthImage}
            priority
          />
          
          {/* Progress overlay */}
          <div 
            className={styles.progressOverlay}
            style={{ width: `${100 - stage}%` }}
          />
          
          {/* Stage indicator */}
          <div 
            className={styles.stageIndicator}
            style={{ left: `${stage}%` }}
          >
            <span className={styles.indicatorArrow}>👇</span>
          </div>
          
          {/* Floating sparkles */}
          {sparkles.map(sparkle => (
            <div 
              key={sparkle.id}
              className={styles.sparkle}
              style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            >
              ✨
            </div>
          ))}
        </div>
        
        {/* Stage Labels */}
        <div className={styles.stageLabels}>
          <span className={styles.stageLabel}>👶</span>
          <span className={styles.stageLabel}>🧒</span>
          <span className={styles.stageLabel}>🧑</span>
        </div>
      </div>

      {/* Info Buttons for body changes */}
      <div className={styles.infoButtons}>
        <button 
          className={`${styles.infoBtn} ${showingInfo === 'height' ? styles.active : ''}`}
          onClick={() => toggleInfo('height')}
        >
          <span className={styles.infoBtnIcon}>📏</span>
        </button>
        <button 
          className={`${styles.infoBtn} ${showingInfo === 'hair' ? styles.active : ''}`}
          onClick={() => toggleInfo('hair')}
        >
          <span className={styles.infoBtnIcon}>✂️</span>
        </button>
        {gender === 'boy' && (
          <button 
            className={`${styles.infoBtn} ${showingInfo === 'voice' ? styles.active : ''}`}
            onClick={() => toggleInfo('voice')}
          >
            <span className={styles.infoBtnIcon}>🎤</span>
          </button>
        )}
        <button 
          className={`${styles.infoBtn} ${showingInfo === 'hygiene' ? styles.active : ''}`}
          onClick={() => toggleInfo('hygiene')}
        >
          <span className={styles.infoBtnIcon}>🧼</span>
        </button>
      </div>

      {/* Info Popup */}
      {showingInfo && (
        <div className={styles.infoPopup}>
          {showingInfo === 'height' && (
            <div className={styles.infoContent}>
              <span className={styles.infoEmoji}>📏</span>
            </div>
          )}
          {showingInfo === 'hair' && (
            <div className={styles.infoContent}>
              {gender === 'boy' && IMAGES.puberty.bodyHairMale && (
                <Image
                  src={IMAGES.puberty.bodyHairMale}
                  alt="Body hair"
                  width={180}
                  height={180}
                  style={{ objectFit: 'contain', borderRadius: '20px' }}
                />
              )}
              {gender === 'girl' && (
                <span className={styles.infoEmoji}>✂️</span>
              )}
            </div>
          )}
          {showingInfo === 'voice' && (
            <div className={styles.infoContent}>
              <span className={styles.infoEmoji}>🎤</span>
              <div className={styles.voiceWaves}>
                <span className={styles.wave}>〰️</span>
                <span className={styles.wave}>〰️</span>
              </div>
            </div>
          )}
          {showingInfo === 'hygiene' && (
            <div className={styles.infoContent}>
              <Image
                src={IMAGES.puberty.deodorantUse}
                alt="Hygiene"
                width={180}
                height={180}
                style={{ objectFit: 'contain', borderRadius: '20px' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Slider Area */}
      <div className={styles.sliderArea}>
        <div className={styles.sliderLabel}>
          <span>👶</span>
        </div>
        
        <div className={styles.sliderTrack}>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={stage}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className={styles.slider}
            aria-label="Growth slider"
          />
          <div 
            className={styles.sliderFill}
            style={{ width: `${stage}%` }}
          />
        </div>
        
        <div className={styles.sliderLabel}>
          <span>🧑</span>
        </div>
      </div>

      {/* Stage indicator text */}
      <div className={styles.stageText}>
        {stage < 33 && '👶'}
        {stage >= 33 && stage < 66 && '🧒'}
        {stage >= 66 && '🧑'}
      </div>

      {/* Helper */}
      <div className={styles.helper}>
        <div className={styles.helperBubble}>
          {stage > 50 ? '✨' : '👆'}
        </div>
      </div>
    </div>
  )
}
