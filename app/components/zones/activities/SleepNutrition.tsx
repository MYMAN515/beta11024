'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './SleepNutrition.module.css'
import { IMAGES } from '../../../constants/images'

interface Props {
  onBack: () => void
  playSound?: (sound: string) => void
}

type Tab = 'food' | 'sleep'
type FoodChoice = 'healthy' | 'junk' | null

export default function SleepNutrition({ onBack, playSound }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('food')
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [choice, setChoice] = useState<FoodChoice>(null)
  const [showResult, setShowResult] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [sleepStage, setSleepStage] = useState(0)

  const foodRounds = [
    { healthy: IMAGES.food.healthyPlate, junk: IMAGES.food.junkFoodCute, answer: 'healthy' },
    { healthy: IMAGES.food.vegetableStickers, junk: IMAGES.food.snacks, answer: 'healthy' },
    { healthy: IMAGES.food.healthyGirl, junk: IMAGES.food.junkFoodCute, answer: 'healthy' },
  ]

  const handleFoodChoice = (chosen: FoodChoice) => {
    if (choice) return
    
    playSound?.('tap')
    setChoice(chosen)
    
    const isCorrect = chosen === foodRounds[currentRound].answer
    if (isCorrect) {
      setScore(prev => prev + 1)
      setTimeout(() => playSound?.('success'), 200)
    } else {
      playSound?.('drop')
    }
    
    setTimeout(() => {
      setShowResult(true)
      setTimeout(() => {
        if (currentRound < foodRounds.length - 1) {
          setCurrentRound(prev => prev + 1)
          setChoice(null)
          setShowResult(false)
        } else {
          setShowFinal(true)
          playSound?.('complete')
        }
      }, 1500)
    }, 500)
  }

  const handleSleepProgress = () => {
    playSound?.('tap')
    if (sleepStage < 3) {
      setSleepStage(prev => prev + 1)
      playSound?.('sparkle')
    }
  }

  const restart = () => {
    playSound?.('tap')
    setCurrentRound(0)
    setScore(0)
    setChoice(null)
    setShowResult(false)
    setShowFinal(false)
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>←</button>

      {/* Tab Switcher */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'food' ? styles.active : ''}`}
          onClick={() => { setActiveTab('food'); playSound?.('tap') }}
        >
          <span className={styles.tabIcon}>🍎</span>
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'sleep' ? styles.active : ''}`}
          onClick={() => { setActiveTab('sleep'); playSound?.('tap') }}
        >
          <span className={styles.tabIcon}>😴</span>
        </button>
      </div>

      {/* Food Game */}
      {activeTab === 'food' && !showFinal && (
        <div className={styles.foodGame}>
          {/* Progress */}
          <div className={styles.progress}>
            {foodRounds.map((_, i) => (
              <div 
                key={i}
                className={`${styles.progressDot} ${i < currentRound ? styles.done : ''} ${i === currentRound ? styles.current : ''}`}
              />
            ))}
          </div>

          {/* Question Indicator */}
          <div className={styles.questionIndicator}>
            <span className={styles.thumbsUp}>👍</span>
          </div>

          {/* Food Choices */}
          <div className={styles.foodChoices}>
            {/* Healthy Choice */}
            <button 
              className={`${styles.foodCard} ${styles.healthyCard} 
                ${choice === 'healthy' ? styles.selected : ''} 
                ${showResult && choice === 'healthy' ? styles.correct : ''}
                ${choice && choice !== 'healthy' ? styles.dimmed : ''}`}
              onClick={() => handleFoodChoice('healthy')}
              disabled={choice !== null}
            >
              <div className={styles.foodImageWrapper}>
                <Image
                  src={foodRounds[currentRound].healthy}
                  alt="Healthy food"
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.foodImage}
                />
              </div>
              <div className={styles.cardGlow} />
              {showResult && choice === 'healthy' && (
                <div className={styles.checkmark}>✓</div>
              )}
            </button>

            {/* VS */}
            <div className={styles.vsIndicator}>
              <span>⚡</span>
            </div>

            {/* Junk Choice */}
            <button 
              className={`${styles.foodCard} ${styles.junkCard} 
                ${choice === 'junk' ? styles.selected : ''} 
                ${showResult && choice === 'junk' ? styles.wrong : ''}
                ${choice && choice !== 'junk' ? styles.dimmed : ''}`}
              onClick={() => handleFoodChoice('junk')}
              disabled={choice !== null}
            >
              <div className={styles.foodImageWrapper}>
                <Image
                  src={foodRounds[currentRound].junk}
                  alt="Junk food"
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.foodImage}
                />
              </div>
              <div className={styles.cardGlow} />
              {showResult && choice === 'junk' && (
                <div className={styles.wrongMark}>✗</div>
              )}
            </button>
          </div>

          {/* Score Display */}
          <div className={styles.scoreDisplay}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`${styles.star} ${i < score ? styles.earned : ''}`}>
                {i < score ? '⭐' : '☆'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Final Result */}
      {activeTab === 'food' && showFinal && (
        <div className={styles.finalResult}>
          <div className={styles.resultImage}>
            <Image
              src={score >= 2 ? IMAGES.food.healthyGirl : IMAGES.food.boyEating}
              alt="Result"
              width={280}
              height={280}
              style={{ objectFit: 'cover', borderRadius: '40px' }}
            />
          </div>
          <div className={styles.resultStars}>
            {[...Array(3)].map((_, i) => (
              <span 
                key={i} 
                className={`${styles.resultStar} ${i < score ? styles.earned : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {i < score ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <button className={styles.restartBtn} onClick={restart}>🔄</button>
          
          {/* Confetti */}
          {score >= 2 && (
            <div className={styles.confetti}>
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i}
                  className={styles.confettiPiece}
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: ['#ffd700', '#ff6b6b', '#a8d5ba', '#7eb8da'][i % 4],
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sleep Section */}
      {activeTab === 'sleep' && (
        <div className={styles.sleepSection}>
          {/* Moon and stars background */}
          <div className={styles.nightSky}>
            <div className={styles.moon}>🌙</div>
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className={styles.nightStar}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                ⭐
              </div>
            ))}
          </div>

          {/* Sleep images based on stage */}
          <button 
            className={styles.sleepImageBtn}
            onClick={handleSleepProgress}
          >
            <div className={styles.sleepImageWrapper}>
              <Image
                src={sleepStage >= 2 ? IMAGES.sleep.childSleeping : IMAGES.sleep.boySleeping}
                alt="Sleeping"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.sleepImage}
              />
              
              {/* ZZZ overlay */}
              <div className={styles.zzzOverlay}>
                {sleepStage > 0 && <span className={styles.zzz} style={{ animationDelay: '0s' }}>Z</span>}
                {sleepStage > 1 && <span className={styles.zzz} style={{ animationDelay: '0.3s' }}>z</span>}
                {sleepStage > 2 && <span className={styles.zzz} style={{ animationDelay: '0.6s' }}>z</span>}
              </div>
            </div>
          </button>

          {/* Sleep progress */}
          <div className={styles.sleepProgress}>
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className={`${styles.sleepDot} ${i <= sleepStage ? styles.asleep : ''}`}
              >
                {i <= sleepStage ? '😴' : '👀'}
              </div>
            ))}
          </div>

          {/* Helper text */}
          <div className={styles.sleepHelper}>
            {sleepStage < 3 ? '👆' : '✨'}
          </div>
        </div>
      )}
    </div>
  )
}
