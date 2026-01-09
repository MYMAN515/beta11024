# 🗺️ App Structure Map

## Complete Application Architecture

```
Home Screen (HomeScreen.tsx)
├── 🔊 Audio Toggle (top-right)
├── ✨ Welcome Icon (animated)
└── 3 Zone Cards (grid layout)
    │
    ├─── 🎯 ZONE 1: Body & Feelings (Teal/Blue)
    │    │
    │    ├── Activity Menu (BodyFeelingsZone.tsx)
    │    │   ├── Growth Card
    │    │   ├── Match Card
    │    │   └── Feelings Card
    │    │
    │    └── Activities:
    │        │
    │        ├─── 1. Body Change Slider
    │        │    ├── Gender Selection (👦/👧)
    │        │    ├── Morphing Character (SVG)
    │        │    ├── Range Slider (0-100)
    │        │    └── Height Indicator Line
    │        │
    │        ├─── 2. Timeline Matching
    │        │    ├── Before Zone (👶)
    │        │    ├── After Zone (🧑)
    │        │    ├── 6 Draggable Cards
    │        │    └── Animated Arrow (→)
    │        │
    │        └─── 3. Mood Tracker
    │             ├── 5 Mood Buttons (😊😠😴😌😢)
    │             ├── Character Reactions
    │             └── Breathing Bubbles
    │
    ├─── 🧴 ZONE 2: Self-Care (Orange/Peach)
    │    │
    │    ├── Activity Menu (SelfCareZone.tsx)
    │    │   ├── Routine Card
    │    │   └── Hygiene Card
    │    │
    │    └── Activities:
    │        │
    │        ├─── 1. Daily Routine Builder
    │        │    ├── Timeline Drop Zone
    │        │    ├── 5 Routine Items (☀️🚿🧴👕🌙)
    │        │    ├── Drag & Drop System
    │        │    └── Completion Sparkle ✨
    │        │
    │        └─── 2. Hygiene Kit
    │             ├── Interactive Body (SVG)
    │             ├── 4 Drop Zones (hands/mouth/underarm/face)
    │             ├── 4 Hygiene Items (🧼🪥🧴🧻)
    │             ├── Sparkle Effects
    │             └── Completion Celebration
    │
    └─── 🌟 ZONE 3: Me & My Life (Purple)
         │
         ├── Activity Menu (MyLifeZone.tsx)
         │   ├── Mirror Card
         │   ├── I Like Card
         │   └── Health Card
         │
         └── Activities:
             │
             ├─── 1. Mirror Confidence
             │    ├── Beautiful Mirror Frame
             │    ├── Character Reflection
             │    ├── 3 Postures (slouch/normal/confident)
             │    ├── Golden Shield (confident)
             │    └── Tap Button (120px)
             │
             ├─── 2. What I Like About Me
             │    ├── Character Display (SVG)
             │    ├── 6 Trait Buttons (💪😊🧠❤️🎨⚡)
             │    ├── Floating Traits (orbit character)
             │    └── Central Glow Effect
             │
             └─── 3. Sleep & Nutrition
                  ├── Good Habits Card (left)
                  │   ├── Energetic Character
                  │   └── 😴 + 🥗
                  ├── VS Divider (center)
                  └── Poor Habits Card (right)
                      ├── Tired Character
                      └── 😪 + 🍟
```

---

## 📁 File Structure

```
app/
├── page.tsx                              # Entry point
├── layout.tsx                            # Root layout
├── globals.css                           # Global styles
│
└── components/
    ├── HomeScreen.tsx                    # Main home screen
    ├── HomeScreen.module.css
    ├── AudioManager.tsx                  # Sound system
    │
    └── zones/
        ├── Zone.module.css               # Shared zone styles
        │
        ├── BodyFeelingsZone.tsx          # Zone 1 menu
        ├── SelfCareZone.tsx              # Zone 2 menu
        ├── MyLifeZone.tsx                # Zone 3 menu
        │
        └── activities/
            │
            ├── BodyChangeSlider.tsx      # Activity 1.1
            ├── BodyChangeSlider.module.css
            │
            ├── TimelineMatching.tsx      # Activity 1.2
            ├── TimelineMatching.module.css
            │
            ├── MoodTracker.tsx           # Activity 1.3
            ├── MoodTracker.module.css
            │
            ├── RoutineBuilder.tsx        # Activity 2.1
            ├── RoutineBuilder.module.css
            │
            ├── HygieneKit.tsx            # Activity 2.2
            ├── HygieneKit.module.css
            │
            ├── MirrorConfidence.tsx      # Activity 3.1
            ├── MirrorConfidence.module.css
            │
            ├── WhatILike.tsx             # Activity 3.2
            ├── WhatILike.module.css
            │
            ├── SleepNutrition.tsx        # Activity 3.3
            └── SleepNutrition.module.css
```

---

## 🎨 Component Hierarchy

```
App
└── HomeScreen
    ├── AudioManager (ref-based)
    ├── Audio Toggle Button
    └── Zone Cards (3)
        │
        └── [Selected Zone]
            ├── Back Button
            ├── Activity Cards (2-3)
            └── [Selected Activity]
                ├── Back Button
                ├── Activity UI
                └── Interactive Elements
```

---

## 🔄 State Flow

```
User Action → Component State → Visual Feedback → Audio Feedback (optional)
                                       ↓
                              localStorage (progress)
```

---

## 🎵 Audio Events

```
Tap → 'tap' sound (800Hz)
Success → 'success' sound (chord)
Calm/Breathing → 'breath' sound (sine)
Sparkle → 'sparkle' sound (sweep)
Night → 'night' sound (ambient)
```

---

## 📊 Interaction Types

1. **Tap/Click**
   - Zone cards
   - Activity cards
   - Mood buttons
   - Trait buttons
   - Mirror tap
   - Choice cards

2. **Drag & Drop**
   - Timeline cards
   - Routine items
   - Hygiene items

3. **Slider**
   - Body growth slider

4. **Multiple Selection**
   - Trait buttons (toggle)

5. **Cycle/Toggle**
   - Mirror posture (3 states)

---

## 🎯 Navigation Paths

```
Home → Zone → Activity → Back → Activity Menu → Back → Home
  ↑_______________________________________________|
```

---

## 💾 Data Persistence

**localStorage keys:**
- None currently (stateless per session)
- Can easily add:
  - `visitedZones`
  - `completedActivities`
  - `selectedTraits`
  - `audioPreference`

---

## 🎨 Styling System

**CSS Modules** (scoped per component)
- No global conflicts
- Co-located with components
- Easy to maintain

**Common patterns:**
- `.container` - Full screen wrapper
- `.backBtn` - Top-left back button
- `.card` - Clickable cards
- `.grid` - Grid layouts
- `@keyframes` - Custom animations

---

## 🚀 Performance

- ✅ **Fast initial load** (~4s compile)
- ✅ **Instant navigation** (client-side)
- ✅ **Smooth animations** (GPU accelerated)
- ✅ **Small bundle** (no heavy deps)
- ✅ **Optimized SVG** (inline, no files)

---

## 📱 Responsive Design

**Breakpoints:**
- Desktop: 1200px+ (3-column grid)
- Tablet: 768px-1199px (2-column grid)
- Mobile: <768px (1-column stack)

**All touch targets:** 60px+ minimum

---

This is the complete architecture of the rebuilt app! 🎉
