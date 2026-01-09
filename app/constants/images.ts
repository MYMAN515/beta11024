// All game images organized by category

export const IMAGES = {
  // Food & Nutrition
  food: {
    healthyGirl: '/images/1dfe618f9e292ea130ef1fe95067d67b.jpg',
    boyEating: '/images/3e8d166c0b097476fe2960fee4c8269c.jpg',
    vegetableStickers: '/images/5b6a07949f03f5e67ed3a1b98ded2755.jpg',
    healthyPlate: '/images/beacab0300882784e1d97eb56393125f.jpg',
    snacks: '/images/9775da3c2a4161a31f942e557f542796.jpg',
    junkFoodCute: '/images/f88f9062a3edc3cf74bcd2184269aa0d.jpg',
    boyMealtime: '/images/fe8a316ac3d16987fa5bf71283d3154c.jpg',
  },

  // Sleep & Rest
  sleep: {
    boySleeping: '/images/9be86e95b8871a4e5f1609045f9dcd62.jpg',
    childSleeping: '/images/c1e10dec70d2ac1abc48cc0f70b5d25a.jpg',
  },

  // Self-Care & Puberty
  puberty: {
    deodorantUse: '/images/DeodarantUse.jpg',
    armpitHair: '/images/armpitHair.gif',
    bodyHairMale: '/images/bodyHairMale.jpeg',
    heightGrowthFemale: '/images/HeightGrowthCartoonFemale.jpeg',
    heightGrowthMale: '/images/HeightGrowthCartoonMale.jpg',
    breastDevelopment: '/images/puberty-breastFemale.jpg',
    breastDevelopmentCropped: '/images/puberty-breastFemaleCropped.jpg',
    chestMale: '/images/puberty-chestMale.jpg',
    timelapseGrowth: '/images/Timelapse Growth Age 14 to Age 16 Short.gif',
  },

  // Exercise
  exercise: {
    exerciseGif: '/images/Exercise gif.gif',
  },

  // Visual Effects
  effects: {
    sparkles: '/images/Sparkles.webp',
  },

  // Confidence & Self-Esteem
  confidence: {
    boyMirror: '/images/IMG-20260108-WA0001.jpg',
    girlClapping: '/images/IMG-20260108-WA0002.jpg',
    boySuperhero: '/images/IMG-20260108-WA0004.jpg',
    boyTrophy: '/images/IMG-20260108-WA0005.jpg',
    girlDoctor: '/images/IMG-20260108-WA0006.jpg',
    girlCape: '/images/IMG-20260108-WA0007.jpg',
    girlWinning: '/images/IMG-20260108-WA0008.jpg',
    girlHeart: '/images/IMG-20260108-WA0010.jpg',
  },

  // Affirmations
  affirmations: {
    fourCards: '/images/IMG-20260108-WA0011.jpg',
    posters: '/images/IMG-20260108-WA0012.jpg',
    feelingsBoard: '/images/IMG-20260108-WA0013.jpg',
  },

  // Individual Emotion Cards
  emotions: {
    calm: '/images/Screenshot_20260108_233722_Gallery.jpg',
    angry: '/images/Screenshot_20260108_233740_Gallery.jpg',
    sleepy: '/images/Screenshot_20260108_233759_Gallery.jpg',
    sad: '/images/Screenshot_20260108_233823_Gallery.jpg',
    happy: '/images/Screenshot_20260108_233847_Gallery.jpg',
    worried: '/images/Screenshot_20260108_233904_Gallery.jpg',
    shy: '/images/Screenshot_20260108_233926_Gallery.jpg',
    tired: '/images/Screenshot_20260108_233946_Gallery.jpg',
    shocked: '/images/Screenshot_20260108_234007_Gallery.jpg',
    proud: '/images/Screenshot_20260108_234027_Gallery.jpg',
    hurt: '/images/Screenshot_20260108_234050_Gallery.jpg',
    afraid: '/images/Screenshot_20260108_234108_Gallery.jpg',
  },

  // Woman Expressions
  womanExpressions: {
    happy: '/images/woman happy.jpg',
    excited: '/images/woman excited.jpg',
    angry: '/images/woman angry.jpg',
    sad: '/images/woman sad.jpg',
    shy: '/images/woman shy.jpg',
    surprised: '/images/woman surprised.jpg',
    grid: '/images/woman-different-facial-expressions_1308-26808.avif',
  },
}

// Emotion data with images
export const EMOTION_DATA = [
  { id: 'happy', image: IMAGES.emotions.happy, color: '#FFD700', particles: '✨' },
  { id: 'sad', image: IMAGES.emotions.sad, color: '#7eb8da', particles: '💧' },
  { id: 'angry', image: IMAGES.emotions.angry, color: '#ff6b6b', particles: '💢' },
  { id: 'worried', image: IMAGES.emotions.worried, color: '#c5a3ff', particles: '💭' },
  { id: 'tired', image: IMAGES.emotions.tired, color: '#a8d5ba', particles: '💤' },
  { id: 'proud', image: IMAGES.emotions.proud, color: '#ffb6c1', particles: '⭐' },
  { id: 'calm', image: IMAGES.emotions.calm, color: '#87ceeb', particles: '🌸' },
  { id: 'shy', image: IMAGES.emotions.shy, color: '#ffa07a', particles: '🌺' },
  { id: 'afraid', image: IMAGES.emotions.afraid, color: '#dda0dd', particles: '😰' },
  { id: 'shocked', image: IMAGES.emotions.shocked, color: '#f0e68c', particles: '⚡' },
  { id: 'hurt', image: IMAGES.emotions.hurt, color: '#e6e6fa', particles: '💔' },
  { id: 'sleepy', image: IMAGES.emotions.sleepy, color: '#b0c4de', particles: '😴' },
]

// Food categories
export const FOOD_DATA = {
  healthy: [
    { id: 'vegetables', image: IMAGES.food.vegetableStickers, label: '🥬' },
    { id: 'healthyPlate', image: IMAGES.food.healthyPlate, label: '🍽️' },
    { id: 'healthyGirl', image: IMAGES.food.healthyGirl, label: '🥗' },
  ],
  unhealthy: [
    { id: 'junk', image: IMAGES.food.junkFoodCute, label: '🍔' },
    { id: 'snacks', image: IMAGES.food.snacks, label: '🍫' },
  ],
}

// Confidence images for mirror activity
export const CONFIDENCE_DATA = [
  { id: 'superhero', image: IMAGES.confidence.boySuperhero, message: '⭐' },
  { id: 'trophy', image: IMAGES.confidence.boyTrophy, message: '🏆' },
  { id: 'doctor', image: IMAGES.confidence.girlDoctor, message: '👩‍⚕️' },
  { id: 'winner', image: IMAGES.confidence.girlWinning, message: '🥇' },
  { id: 'cape', image: IMAGES.confidence.girlCape, message: '💪' },
  { id: 'heart', image: IMAGES.confidence.girlHeart, message: '❤️' },
]

// Growth stages for timeline
export const GROWTH_DATA = {
  male: IMAGES.puberty.heightGrowthMale,
  female: IMAGES.puberty.heightGrowthFemale,
  timelapse: IMAGES.puberty.timelapseGrowth,
}

// Hygiene items
export const HYGIENE_DATA = [
  { id: 'deodorant', image: IMAGES.puberty.deodorantUse, target: 'body' },
]
