'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './GuideCharacter.module.css'

interface Props {
  mousePos: { x: number; y: number }
}

export default function GuideCharacter({ mousePos }: Props) {
  const [position, setPosition] = useState({ x: 100, y: 200 })
  const [blinking, setBlinking] = useState(false)
  const [mood, setMood] = useState<'happy' | 'excited' | 'curious' | 'silly' | 'dancing' | 'laughing'>('happy')
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [spinning, setSpinning] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const [showText, setShowText] = useState(false)
  const [funnyText, setFunnyText] = useState('')
  const characterRef = useRef<HTMLDivElement>(null)

  // Random blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 150)
    }, Math.random() * 4000 + 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Eye follows mouse
  useEffect(() => {
    if (characterRef.current) {
      const rect = characterRef.current.getBoundingClientRect()
      const charX = rect.left + rect.width / 2
      const charY = rect.top + rect.height / 3
      
      const dx = mousePos.x - charX
      const dy = mousePos.y - charY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 0) {
        const maxOffset = 4
        setEyeOffset({
          x: (dx / distance) * Math.min(maxOffset, distance / 50),
          y: (dy / distance) * Math.min(maxOffset, distance / 50)
        })
      }
    }
  }, [mousePos])

  // Random mood changes with HILARIOUS variety
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('happy' | 'excited' | 'curious' | 'silly' | 'dancing' | 'laughing')[] = 
        ['happy', 'excited', 'curious', 'silly', 'dancing', 'laughing']
      const newMood = moods[Math.floor(Math.random() * moods.length)]
      setMood(newMood)
      
      // Random silly actions
      if (Math.random() > 0.7) {
        setSpinning(true)
        setTimeout(() => setSpinning(false), 1000)
      }
      if (Math.random() > 0.8) {
        setBouncing(true)
        setTimeout(() => setBouncing(false), 2000)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Random funny text bubbles
  useEffect(() => {
    const funnyPhrases = [
      "WHEEE! 🎉",
      "I'm rubber, you're glue! 😜",
      "Did someone say PIZZA?! 🍕",
      "BOOP! 👆",
      "*happy wiggle* 🎵",
      "I can FLY?! 🚀",
      "Oops! My bad! 😅",
      "YOLO! ✨",
      "Time to boogie! 💃",
      "Hehe! Gotcha! 🤪"
    ]
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setFunnyText(funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)])
        setShowText(true)
        setTimeout(() => setShowText(false), 2500)
      }
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // Float around
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setPosition(prev => ({
        x: 80 + Math.random() * 50,
        y: 150 + Math.random() * 100
      }))
    }, 8000)
    
    return () => clearInterval(floatInterval)
  }, [])

  return (
    <div 
      ref={characterRef}
      className={`${styles.character} ${styles[mood]} ${spinning ? styles.spinning : ''} ${bouncing ? styles.bouncing : ''}`}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {/* Funny text bubble */}
      {showText && (
        <div className={styles.textBubble}>
          {funnyText}
          <div className={styles.bubbleTail} />
        </div>
      )}
      {/* Body */}
      <svg viewBox="0 0 120 150" className={styles.characterSvg}>
        {/* Glow effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <radialGradient id="bodyGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffd89b" />
            <stop offset="100%" stopColor="#ffb88c" />
          </radialGradient>
        </defs>

        {/* Head */}
        <ellipse 
          cx="60" 
          cy="50" 
          rx="40" 
          ry="42" 
          fill="url(#bodyGradient)"
          filter="url(#glow)"
        >
          <animate 
            attributeName="ry"
            values="42;44;42"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
        
        {/* Cheeks */}
        <circle cx="30" cy="60" r="8" fill="#ffb6c1" opacity="0.5" />
        <circle cx="90" cy="60" r="8" fill="#ffb6c1" opacity="0.5" />
        
        {/* Eyes */}
        {blinking ? (
          <>
            <line x1="40" y1="48" x2="52" y2="48" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="48" x2="80" y2="48" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <circle cx="46" cy="48" r="10" fill="white" />
            <circle 
              cx={46 + eyeOffset.x} 
              cy={48 + eyeOffset.y} 
              r="5" 
              fill="#333"
            />
            <circle 
              cx={44 + eyeOffset.x * 0.5} 
              cy={46 + eyeOffset.y * 0.5} 
              r="2" 
              fill="white" 
            />
            
            {/* Right Eye */}
            <circle cx="74" cy="48" r="10" fill="white" />
            <circle 
              cx={74 + eyeOffset.x} 
              cy={48 + eyeOffset.y} 
              r="5" 
              fill="#333"
            />
            <circle 
              cx={72 + eyeOffset.x * 0.5} 
              cy={46 + eyeOffset.y * 0.5} 
              r="2" 
              fill="white" 
            />
          </>
        )}
        
        {/* Eyebrows */}
        {mood === 'curious' && (
          <>
            <path d="M 38 35 Q 46 30 54 35" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 66 35 Q 74 30 82 35" stroke="#333" strokeWidth="2" fill="none" />
          </>
        )}
        
        {/* Mouth */}
        {mood === 'happy' && (
          <path 
            d="M 45 68 Q 60 80 75 68" 
            stroke="#333" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          >
            <animate 
              attributeName="d"
              values="M 45 68 Q 60 80 75 68; M 45 68 Q 60 85 75 68; M 45 68 Q 60 80 75 68"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        )}
        {mood === 'excited' && (
          <ellipse cx="60" cy="72" rx="12" ry="10" fill="#ff6b6b" opacity="0.8">
            <animate 
              attributeName="ry"
              values="10;12;10"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </ellipse>
        )}
        {mood === 'curious' && (
          <ellipse cx="60" cy="70" rx="8" ry="10" fill="#333" opacity="0.8" />
        )}
        {mood === 'silly' && (
          <path 
            d="M 40 65 Q 50 75 60 65 Q 70 75 80 65" 
            stroke="#333" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          >
            <animate 
              attributeName="d"
              values="M 40 65 Q 50 75 60 65 Q 70 75 80 65; M 40 75 Q 50 65 60 75 Q 70 65 80 75; M 40 65 Q 50 75 60 65 Q 70 75 80 65"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
        )}
        {mood === 'dancing' && (
          <>
            <path d="M 45 70 L 55 70" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M 65 70 L 75 70" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        {mood === 'laughing' && (
          <>
            <path d="M 40 68 Q 60 85 80 68" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="50" y="80" fontSize="20" fill="#333">HA</text>
          </>
        )}

        {/* Arms */}
        <ellipse 
          cx="15" 
          cy="90" 
          rx="12" 
          ry="18" 
          fill="url(#bodyGradient)"
          transform={mood === 'excited' ? 'rotate(-30 15 90)' : 'rotate(0 15 90)'}
        >
          {mood === 'excited' && (
            <animateTransform 
              attributeName="transform"
              type="rotate"
              values="-30 15 90; -40 15 90; -30 15 90"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
        <ellipse 
          cx="105" 
          cy="90" 
          rx="12" 
          ry="18" 
          fill="url(#bodyGradient)"
          transform={mood === 'excited' ? 'rotate(30 105 90)' : 'rotate(0 105 90)'}
        >
          {mood === 'excited' && (
            <animateTransform 
              attributeName="transform"
              type="rotate"
              values="30 105 90; 40 105 90; 30 105 90"
              dur="0.5s"
              repeatCount="indefinite"
              additive="sum"
            />
          )}
        </ellipse>
        
        {/* Body */}
        <ellipse 
          cx="60" 
          cy="110" 
          rx="30" 
          ry="35" 
          fill="url(#bodyGradient)"
        >
          <animate 
            attributeName="ry"
            values="35;37;35"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
        
        {/* Feet */}
        <ellipse cx="40" cy="140" rx="15" ry="8" fill="url(#bodyGradient)" />
        <ellipse cx="80" cy="140" rx="15" ry="8" fill="url(#bodyGradient)" />
      </svg>

      {/* Floating Hearts when excited */}
      {mood === 'excited' && (
        <div className={styles.hearts}>
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              className={styles.heart}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* Question mark when curious */}
      {mood === 'curious' && (
        <div className={styles.questionMark}>❓</div>
      )}
    </div>
  )
}
