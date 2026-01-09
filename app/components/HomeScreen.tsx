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
import AudioManager, { AudioManagerHandle } from './AudioManager'

type Zone = 'body' | 'care' | 'life' | null

export default function HomeScreen() {
  const [activeZone, setActiveZone] = useState<Zone>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [showFunnyEmoji, setShowFunnyEmoji] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [sunMood, setSunMood] = useState<'happy' | 'excited' | 'winking'>('happy')
const audioManagerRef = useRef<AudioManagerHandle | null>(null)
  
  // Random sun mood changes
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('happy' | 'excited' | 'winking')[] = ['happy', 'excited', 'winking']
      setSunMood(moods[Math.floor(Math.random() * moods.length)])
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    
    // Random funny emoji appears following mouse
    if (Math.random() > 0.98) {
      setShowFunnyEmoji(true)
      setTimeout(() => setShowFunnyEmoji(false), 800)
    }
  }
  
  // Easter egg: clicking welcomeArea activates PARTY MODE!
  const handleWelcomeClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickCount >= 4) {
      setPartyMode(true)
      setRainbowMode(true)
      audioManagerRef.current?.playSound('magic')
      setTimeout(() => {
        setPartyMode(false)
        setRainbowMode(false)
        setClickCount(0)
      }, 10000)
    }
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
      
      {/* FUNNY SUN with Face! */}
      <div className={styles.happySun}>
        <div className={styles.sunBody}>
          {sunMood === 'happy' && <div className={styles.sunFaceHappy}>😊</div>}
          {sunMood === 'excited' && <div className={styles.sunFaceExcited}>😄</div>}
          {sunMood === 'winking' && <div className={styles.sunFaceWinking}>😉</div>}
        </div>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className={styles.sunRay}
            style={{
              transform: `rotate(${i * 30}deg) translateY(-70px)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Magic Particles following mouse */}
      <MagicParticles mousePos={mousePos} count={30} />
      
      {/* Floating Clouds (some with silly faces!) */}
      <div className={styles.cloudsLayer}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={`${styles.cloud} ${i === 2 || i === 4 ? styles.sillyCloud : ''}`}
            style={{
              left: `${-20 + i * 25}%`,
              top: `${10 + (i % 3) * 15}%`,
              animationDelay: `${i * 8}s`,
              animationDuration: `${40 + i * 10}s`,
              transform: `scale(${0.6 + i * 0.2})`
            }}
          >
            {(i === 2 || i === 4) && (
              <div className={styles.cloudFace}>😊</div>
            )}
          </div>
        ))}
      </div>

      {/* Flying Birds (Sometimes they're SILLY!) */}
      <div className={styles.birdsLayer}>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className={`${styles.bird} ${i % 2 === 0 ? styles.sillyBird : ''}`}
            style={{
              animationDelay: `${i * 5}s`,
              top: `${15 + i * 10}%`
            }}
          >
            {i % 2 === 0 ? '🦆' : '🐦'}
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

      {/* Welcome Sparkle with PARTY MODE! */}
      <div className={styles.welcomeArea} onClick={handleWelcomeClick}>
        <div className={`${styles.welcomeEmoji} ${partyMode ? styles.partyMode : ''}`}>
          {partyMode ? '🎉' : '✨'}
        </div>
        <div className={`${styles.welcomeGlow} ${rainbowMode ? styles.rainbow : ''}`} />
        {partyMode && (
          <div className={styles.partyText}>PARTY MODE ACTIVATED! 🎊</div>
        )}
      </div>
      
      {/* Funny mouse follower emoji */}
      {showFunnyEmoji && (
        <div 
          className={styles.funnyEmoji}
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          {['😜', '🤪', '😝', '🥳', '🤗', '🎈'][Math.floor(Math.random() * 6)]}
        </div>
      )}

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

      {/* Butterflies (last one is EXTRA silly!) */}
      <div className={styles.butterfliesLayer}>
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={`${styles.butterfly} ${i === 2 ? styles.crazyButterfly : ''}`}
            style={{
              animationDelay: `${i * 4}s`,
              animationDuration: `${15 + i * 3}s`
            }}
          >
            {i === 2 ? '🦄' : '🦋'}
          </div>
        ))}
      </div>

      {/* Ground with animated grass and SURPRISE CRITTERS! */}
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
        
        {/* Surprise critters popping up! */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={styles.critter}
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 3}s`
            }}
          >
            {['🐸', '🐌', '🦔'][i % 3]}
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
