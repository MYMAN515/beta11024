'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './BodyExplorerGame.module.css'
import FeelingsActivity from './activities/FeelingsActivity'
import SweatActivity from './activities/SweatActivity'
import GrowthActivity from './activities/GrowthActivity'
import FoodActivity from './activities/FoodActivity'
import SleepActivity from './activities/SleepActivity'
import ConfidenceActivity from './activities/ConfidenceActivity'
import AudioManager from './AudioManager'

type Activity = 'feelings' | 'sweat' | 'growth' | 'food' | 'sleep' | 'confidence' | null

export default function BodyExplorerGame() {
  const [currentActivity, setCurrentActivity] = useState<Activity>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [visitedZones, setVisitedZones] = useState<Set<string>>(new Set())
  const audioManagerRef = useRef<{ playSound: (sound: string) => void } | null>(null)

  useEffect(() => {
    // Load visited zones from localStorage
    const saved = localStorage.getItem('visitedZones')
    if (saved) {
      setVisitedZones(new Set(JSON.parse(saved)))
    }
  }, [])

  const handleZoneClick = (zone: Activity) => {
    if (audioEnabled && audioManagerRef.current) {
      audioManagerRef.current.playSound('tap')
    }
    setCurrentActivity(zone)
    
    if (zone) {
      const newVisited = new Set(visitedZones).add(zone)
      setVisitedZones(newVisited)
      localStorage.setItem('visitedZones', JSON.stringify([...newVisited]))
    }
  }

  const closeActivity = () => {
    if (audioEnabled && audioManagerRef.current) {
      audioManagerRef.current.playSound('tap')
    }
    setCurrentActivity(null)
  }

  return (
    <div className={styles.gameContainer}>
      <AudioManager 
        ref={audioManagerRef}
        enabled={audioEnabled}
      />
      
      {/* Audio Toggle */}
      <button
        className={styles.audioToggle}
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-label={audioEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>

      {/* Main Game View */}
      {!currentActivity && (
        <div className={styles.roomContainer}>
          {/* Background elements */}
          <div className={styles.room}>
            <div className={styles.floor}></div>
            <div className={styles.wall}></div>
            
            {/* Bed */}
            <div 
              className={`${styles.bed} ${hoveredZone === 'sleep' ? styles.glowing : ''}`}
              onClick={() => handleZoneClick('sleep')}
              onMouseEnter={() => setHoveredZone('sleep')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore sleep and rest"
              tabIndex={0}
            >
              <div className={styles.bedFrame}></div>
              <div className={styles.pillow}></div>
            </div>

            {/* Mirror */}
            <div 
              className={`${styles.mirror} ${hoveredZone === 'confidence' ? styles.glowing : ''}`}
              onClick={() => handleZoneClick('confidence')}
              onMouseEnter={() => setHoveredZone('confidence')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore confidence"
              tabIndex={0}
            >
              <div className={styles.mirrorFrame}></div>
              <div className={styles.mirrorGlass}></div>
            </div>
          </div>

          {/* Body Character (POV perspective) */}
          <svg className={styles.bodySvg} viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            {/* Head zone */}
            <g 
              className={`${styles.interactiveZone} ${hoveredZone === 'feelings' ? styles.zoneGlow : ''}`}
              onClick={() => handleZoneClick('feelings')}
              onMouseEnter={() => setHoveredZone('feelings')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore feelings"
              tabIndex={0}
            >
              <circle cx="200" cy="80" r="50" fill="#fdd8b5" />
              <circle cx="185" cy="75" r="5" fill="#333" />
              <circle cx="215" cy="75" r="5" fill="#333" />
              <path d="M 180 95 Q 200 105 220 95" stroke="#333" strokeWidth="2" fill="none" />
              {visitedZones.has('feelings') && (
                <circle cx="230" cy="60" r="4" fill="#a8d5ba" opacity="0.6" />
              )}
            </g>

            {/* Torso */}
            <rect x="160" y="130" width="80" height="120" rx="15" fill="#b8d4f1" />
            
            {/* Growth zone (body) */}
            <g 
              className={`${styles.interactiveZone} ${hoveredZone === 'growth' ? styles.zoneGlow : ''}`}
              onClick={() => handleZoneClick('growth')}
              onMouseEnter={() => setHoveredZone('growth')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore body changes"
              tabIndex={0}
            >
              <rect x="165" y="140" width="70" height="50" rx="8" fill="transparent" />
              {visitedZones.has('growth') && (
                <circle cx="230" cy="165" r="4" fill="#a8d5ba" opacity="0.6" />
              )}
            </g>

            {/* Sweat zone (underarm) */}
            <g 
              className={`${styles.interactiveZone} ${hoveredZone === 'sweat' ? styles.zoneGlow : ''}`}
              onClick={() => handleZoneClick('sweat')}
              onMouseEnter={() => setHoveredZone('sweat')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore hygiene"
              tabIndex={0}
            >
              <ellipse cx="145" cy="150" rx="15" ry="20" fill="#fdd8b5" />
              {visitedZones.has('sweat') && (
                <circle cx="155" cy="145" r="4" fill="#a8d5ba" opacity="0.6" />
              )}
            </g>

            {/* Food zone (stomach) */}
            <g 
              className={`${styles.interactiveZone} ${hoveredZone === 'food' ? styles.zoneGlow : ''}`}
              onClick={() => handleZoneClick('food')}
              onMouseEnter={() => setHoveredZone('food')}
              onMouseLeave={() => setHoveredZone(null)}
              role="button"
              aria-label="Explore food and energy"
              tabIndex={0}
            >
              <ellipse cx="200" cy="210" rx="30" ry="25" fill="transparent" />
              {visitedZones.has('food') && (
                <circle cx="225" cy="200" r="4" fill="#a8d5ba" opacity="0.6" />
              )}
            </g>

            {/* Arms */}
            <rect x="120" y="140" width="25" height="80" rx="12" fill="#fdd8b5" />
            <rect x="255" y="140" width="25" height="80" rx="12" fill="#fdd8b5" />

            {/* Legs */}
            <rect x="165" y="250" width="30" height="100" rx="15" fill="#4a5f7a" />
            <rect x="205" y="250" width="30" height="100" rx="15" fill="#4a5f7a" />
          </svg>
        </div>
      )}

      {/* Activities */}
      {currentActivity === 'feelings' && (
        <FeelingsActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
      {currentActivity === 'sweat' && (
        <SweatActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
      {currentActivity === 'growth' && (
        <GrowthActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
      {currentActivity === 'food' && (
        <FoodActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
      {currentActivity === 'sleep' && (
        <SleepActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
      {currentActivity === 'confidence' && (
        <ConfidenceActivity onClose={closeActivity} audioEnabled={audioEnabled} playSound={(s) => audioManagerRef.current?.playSound(s)} />
      )}
    </div>
  )
}
