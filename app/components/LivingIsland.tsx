'use client'

import { useState } from 'react'
import styles from './LivingIsland.module.css'

interface Props {
  theme: 'forest' | 'beach' | 'mountain'
  title: string
  subtitle?: string
  emoji: string
  color: string
  hasSmoke?: boolean
  hasWaves?: boolean
  hasSnow?: boolean
  onClick: () => void
  playSound?: () => void
}

export default function LivingIsland({
  theme,
  title,
  subtitle,
  emoji,
  color,
  hasSmoke,
  hasWaves,
  hasSnow,
  onClick,
  playSound
}: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSoundText, setShowSoundText] = useState(false)

  return (
    <button
      className={`${styles.island} ${styles[theme]}`}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
        playSound?.()
        setShowSoundText(true)
        setTimeout(() => setShowSoundText(false), 600)
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--island-color': color } as React.CSSProperties}
    >
      {/* Floating Platform */}
      <div className={styles.platform}>
        <div className={styles.platformTop} />
        <div className={styles.platformSide} />
        <div className={styles.platformShadow} />
      </div>

      {/* Hut */}
      <div className={styles.hut}>
        <div className={styles.hutRoof} />
        <div className={styles.hutBody}>
          {/* Glowing Windows */}
          <div className={styles.window} />
          <div className={styles.window} />
          {/* Door */}
          <div className={styles.door} />
        </div>
        
        {/* Chimney with Smoke */}
        {hasSmoke && (
          <div className={styles.chimney}>
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className={styles.smoke}
                style={{ animationDelay: `${i * 0.8}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Theme Decorations */}
      {theme === 'forest' && (
        <div className={styles.trees}>
          <div className={styles.tree} style={{ left: '10%' }}>🌲</div>
          <div className={styles.tree} style={{ left: '80%' }}>🌳</div>
        </div>
      )}

      {theme === 'beach' && hasWaves && (
        <div className={styles.waves}>
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className={styles.wave}
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <div className={styles.palm}>🌴</div>
        </div>
      )}

      {theme === 'mountain' && hasSnow && (
        <div className={styles.snowflakes}>
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={styles.snowflake}
              style={{ 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              ❄️
            </div>
          ))}
          <div className={styles.flag}>🚩</div>
        </div>
      )}

      {/* Theme Emoji */}
      <div className={styles.themeEmoji}>{emoji}</div>

      {/* Title */}
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>

      {/* Hover Glow */}
      {isHovered && (
        <div className={styles.hoverGlow}>
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={styles.sparkle}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Island Float Shadow */}
      <div className={styles.floatShadow} />
      
      {/* Funny Sound Effect Text! */}
      {showSoundText && (
        <div className={styles.soundEffect}>
          {['*BOING!*', '*WOOSH!*', '*DING!*', '*SPARKLE!*'][Math.floor(Math.random() * 4)]}
        </div>
      )}
      
      {/* Hover creates funny bouncing emojis */}
      {isHovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={styles.bouncyEmoji}
              style={{
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 0.15}s`
              }}
            >
              {['😄', '🎉', '⭐', '💫'][i % 4]}
            </div>
          ))}
        </>
      )}
    </button>
  )
}
