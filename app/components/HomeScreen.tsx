'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './HomeScreen.module.css'
import LivingIsland from './LivingIsland'
import MagicParticles from './MagicParticles'
import GuideCharacter from './GuideCharacter'
import AnimatedBackground from './AnimatedBackground'
import BodyFeelingsZone from './zones/BodyFeelingsZone'
import SelfCareZone from './zones/SelfCareZone'
import MyLifeZone from './zones/MyLifeZone'
import AudioManager from './AudioManager'

type Zone = 'body' | 'care' | 'life' | null

export default function HomeScreen() {
  const [activeZone, setActiveZone] = useState<Zone>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const audioManagerRef = useRef<{ playSound: (sound: string) => void } | null>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleZoneClick = (zone: Zone) => {
    setIsTransitioning(true)
    audioManagerRef.current?.playSound('magic')
    
    setTimeout(() => {
      setActiveZone(zone)
      setIsTransitioning(false)
    }, 800)
  }

  const handleBack = () => {
    setIsTransitioning(true)
    audioManagerRef.current?.playSound('tap')
    
    setTimeout(() => {
      setActiveZone(null)
      setIsTransitioning(false)
    }, 600)
  }

  // Zone screens
  if (activeZone === 'body') return <BodyFeelingsZone onBack={handleBack} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
  if (activeZone === 'care') return <SelfCareZone onBack={handleBack} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
  if (activeZone === 'life') return <MyLifeZone onBack={handleBack} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />

  return (
    <div 
      className={styles.aliveWorld}
      onMouseMove={handleMouseMove}
    >
      <AudioManager ref={audioManagerRef} enabled={audioEnabled} />
      
      {/* Animated Sky Background */}
      <AnimatedBackground />
      
      {/* Magic Particles following mouse */}
      <MagicParticles mousePos={mousePos} count={30} />
      
      {/* Floating Clouds */}
      <div className={styles.cloudsLayer}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={styles.cloud}
            style={{
              left: `${-20 + i * 25}%`,
              top: `${10 + (i % 3) * 15}%`,
              animationDelay: `${i * 8}s`,
              animationDuration: `${40 + i * 10}s`,
              transform: `scale(${0.6 + i * 0.2})`
            }}
          />
        ))}
      </div>

      {/* Flying Birds */}
      <div className={styles.birdsLayer}>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className={styles.bird}
            style={{
              animationDelay: `${i * 5}s`,
              top: `${15 + i * 10}%`
            }}
          >
            🐦
          </div>
        ))}
      </div>

      {/* Audio Toggle */}
      <button 
        className={styles.audioToggle}
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-label="Toggle sound"
      >
        <span className={styles.audioIcon}>{audioEnabled ? '🔊' : '🔇'}</span>
        <div className={styles.audioRipple} />
      </button>

      {/* Welcome Sparkle */}
      <div className={styles.welcomeArea}>
        <div className={styles.welcomeEmoji}>✨</div>
        <div className={styles.welcomeGlow} />
      </div>

      {/* Living Islands Container */}
      <div className={styles.islandsContainer}>
        {/* Island 1: Body & Feelings */}
        <LivingIsland
          theme="forest"
          title="Body"
          subtitle="& Feelings"
          emoji="🌳"
          color="#a8d5ba"
          hasSmoke={true}
          onClick={() => handleZoneClick('body')}
          playSound={() => audioManagerRef.current?.playSound('hover')}
        />

        {/* Island 2: Self-Care */}
        <LivingIsland
          theme="beach"
          title="Self-Care"
          emoji="🏖️"
          color="#ffd89b"
          hasWaves={true}
          onClick={() => handleZoneClick('care')}
          playSound={() => audioManagerRef.current?.playSound('hover')}
        />

        {/* Island 3: Me & My Life */}
        <LivingIsland
          theme="mountain"
          title="Me"
          subtitle="& My Life"
          emoji="⛰️"
          color="#c5a3ff"
          hasSnow={true}
          onClick={() => handleZoneClick('life')}
          playSound={() => audioManagerRef.current?.playSound('hover')}
        />
      </div>

      {/* Floating Guide Character */}
      <GuideCharacter mousePos={mousePos} />

      {/* Butterflies */}
      <div className={styles.butterfliesLayer}>
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={styles.butterfly}
            style={{
              animationDelay: `${i * 4}s`,
              animationDuration: `${15 + i * 3}s`
            }}
          >
            🦋
          </div>
        ))}
      </div>

      {/* Ground with animated grass */}
      <div className={styles.ground}>
        <div className={styles.grassLayer}>
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className={styles.grass}
              style={{
                left: `${i * 2}%`,
                animationDelay: `${Math.random() * 2}s`,
                height: `${20 + Math.random() * 30}px`
              }}
            />
          ))}
        </div>
        
        {/* Flowers */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={styles.flower}
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {['🌸', '🌺', '🌼', '🌷'][i % 4]}
          </div>
        ))}
      </div>

      {/* Magic Transition Overlay */}
      {isTransitioning && (
        <div className={styles.magicTransition}>
          <div className={styles.portalCircle} />
          <div className={styles.transitionFlash} />
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={styles.transitionStar}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
