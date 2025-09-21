# Code Walkthrough: SLMExplainer.tsx

## 🎯 File Overview
This is a deep dive into the main `SLMExplainer.tsx` file (1100+ lines). Understanding this file is key to extending the project.

## 📋 File Structure

### 1. Imports and Constants (Lines 1-15)
```typescript
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Constants for calculations
const MB_PER_PARAM_FP16 = 2 / 1024;    // Memory per parameter (16-bit)
const MB_PER_PARAM_INT4 = 0.5 / 1024;  // Memory per parameter (4-bit)
```

**What this does:**
- Imports React hooks for state management
- Imports Framer Motion for animations
- Defines memory constants for calculations

### 2. Helper Functions (Lines 16-35)
```typescript
function clamp(n, lo, hi) { 
  return Math.max(lo, Math.min(hi, n)); 
}

const DEVICE_PROFILES = {
  "Browser (Desktop WebGPU)": { speedMul: 1.0, memMul: 1.0 },
  "Mobile (WebGPU/Metal via PWA)": { speedMul: 0.55, memMul: 1.0 },
  "Server (GPU / A10+)": { speedMul: 3.2, memMul: 1.0 },
};

function prettyMB(x) { 
  if (x < 1024) return `${x.toFixed(1)} MB`; 
  return `${(x/1024).toFixed(2)} GB`; 
}
```

**What this does:**
- `clamp()`: Ensures numbers stay within bounds
- `DEVICE_PROFILES`: Performance multipliers for different devices
- `prettyMB()`: Formats memory sizes (MB vs GB)

### 3. Custom Hook: useMetrics (Lines 36-65)
```typescript
function useMetrics(paramsM, contextLen, quantBits, deviceKey) {
  const device = DEVICE_PROFILES[deviceKey];
  return useMemo(() => {
    const p = clamp(paramsM, 1, 2000);
    
    // Calculate model weight size
    const weightMB = quantBits === 4 
      ? p * (MB_PER_PARAM_INT4 * 1_000)
      : p * (MB_PER_PARAM_FP16 * 1_000);
    
    // Calculate KV cache memory
    const kvPerTokMB = 0.0008 * p;
    const kvTotalMB = kvPerTokMB * contextLen;
    
    // Calculate performance metrics
    const contextFactor = Math.max(1.0, 1.0 + (contextLen - 1024) / 4096);
    const quantFactor = quantBits === 4 ? 1.15 : 1.0;
    let baseTPS = 2000 / (p * contextFactor);
    baseTPS *= device.speedMul * quantFactor;
    
    // Calculate other metrics...
    return { weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB };
  }, [paramsM, contextLen, quantBits, deviceKey]);
}
```

**What this does:**
- **Custom React Hook**: Calculates performance metrics
- **useMemo**: Only recalculates when inputs change (performance optimization)
- **Mathematical Models**: Estimates memory, speed, and latency
- **Returns Object**: All calculated metrics for use in components

### 4. Badge Generation (Lines 66-72)
```typescript
function badgesForParams(p) {
  if (p <= 20) return ["On-device classify", "Regex+", "Smart autocomplete", "IoT edge"];
  if (p <= 60) return ["Mobile chat", "Intent+slots", "RAG lite", "Fast rewriter"];
  // ... more categories
  return ["LLM territory", "Server heavy", "Long ctx", "Tool use"];
}
```

**What this does:**
- **Pure Function**: Takes model size, returns use case badges
- **Conditional Logic**: Different categories based on model size
- **UI Helper**: Provides user-friendly descriptions

### 5. Animation Component: TokenStream (Lines 73-95)
```typescript
function TokenStream({ speed, density = 8, label = "Data Flow" }) {
  const tokens = Array.from({ length: density }).map((_, i) => i);
  const duration = clamp(2.6 - speed, 0.6, 3.2);
  
  return (
    <div className="relative h-14 w-full overflow-hidden rounded-2xl border bg-white/60">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(...)]" />
      
      {/* Animated tokens */}
      {tokens.map((t) => (
        <motion.div 
          key={t} 
          className="absolute top-6 h-4 rounded-full px-2 text-[10px] leading-4 text-white shadow"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: [-60, 620], opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration, 
            ease: "easeInOut", 
            repeat: Infinity, 
            delay: t * (duration / tokens.length) 
          }}
        >
          tok
        </motion.div>
      ))}
    </div>
  );
}
```

**What this does:**
- **Functional Component**: Shows animated tokens flowing across screen
- **Array.map()**: Creates multiple animated elements
- **Framer Motion**: Animates tokens from left to right
- **Staggered Animation**: Each token starts with a delay
- **Props**: Configurable speed, density, and label

### 6. Main Component: SLMExplainer (Lines 96-180)
```typescript
export default function SLMExplainer() {
  // State management
  const [paramsM, setParamsM] = useState(50);
  const [contextLen, setContextLen] = useState(1024);
  const [device, setDevice] = useState("Browser (Desktop WebGPU)");
  const [quantBits, setQuantBits] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [zoomedCard, setZoomedCard] = useState(null);

  // Computed values
  const { weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB } = useMetrics(
    paramsM, contextLen, quantBits, device
  );
  const badges = badgesForParams(paramsM);
  const llmCompare = useMemo(() => {
    // Calculate 7B model comparison
  }, [device]);

  // Slide configuration
  const slides = [
    {
      title: "Welcome to Small Language Models",
      subtitle: "The Future of AI at Your Fingertips",
      icon: "🧠",
      theme: "intro"
    },
    // ... more slides
  ];

  // Navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
```

**What this does:**
- **Component State**: All the interactive values (sliders, toggles, etc.)
- **Computed Values**: Uses custom hook to calculate metrics
- **Slide Configuration**: Array of slide objects with metadata
- **Navigation Logic**: Functions to move between slides

### 7. Event Handlers (Lines 181-210)
```typescript
// Keyboard controls
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'p' || e.key === 'P') setIsPresenting(!isPresenting);
    if (e.key === 'a' || e.key === 'A') setAutoPlay(!autoPlay);
    if (e.key === 'Escape') setIsPresenting(false);
  };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [isPresenting, autoPlay, nextSlide, prevSlide]);

// Auto-play functionality
useEffect(() => {
  if (autoPlay && isPresenting) {
    const timer = setTimeout(nextSlide, 8000);
    return () => clearTimeout(timer);
  }
}, [autoPlay, isPresenting, currentSlide, nextSlide]);
```

**What this does:**
- **useEffect Hook**: Manages side effects (event listeners, timers)
- **Event Listener**: Handles keyboard navigation
- **Cleanup Function**: Removes listeners when component unmounts
- **Auto-play Timer**: Automatically advances slides
- **Dependencies Array**: Controls when effects re-run

### 8. Conditional Rendering (Lines 211-280)
```typescript
if (isPresenting) {
  return <PresentationMode
    currentSlide={currentSlide}
    slides={slides}
    paramsM={paramsM}
    setParamsM={setParamsM}
    // ... all other props
  />;
}

return (
  <div className="relative w-full min-h-screen overflow-hidden">
    {/* Landing page content */}
  </div>
);
```

**What this does:**
- **Conditional Rendering**: Shows different UI based on state
- **Props Passing**: Passes state and setters to child components
- **Component Composition**: Breaks down complex UI into manageable pieces

### 9. PresentationMode Component (Lines 350-450)
```typescript
function PresentationMode({ currentSlide, slides, paramsM, setParamsM, ... }) {
  const slide = slides[currentSlide];

  const getSlideTheme = (theme) => {
    const themes = {
      intro: "from-purple-900 via-blue-900 to-indigo-900",
      controls: "from-cyan-900 via-teal-900 to-blue-900",
      // ... more themes
    };
    return themes[theme] || themes.intro;
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${getSlideTheme(slide.theme)}`}>
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Slide content with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 1.2, rotateY: -90 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Conditional slide rendering */}
          {currentSlide === 0 && <IntroSlide slide={slide} />}
          {currentSlide === 1 && <ControlsSlide slide={slide} {...controlProps} />}
          {/* ... more slides */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

**What this does:**
- **Theme System**: Dynamic backgrounds based on slide theme
- **Particle Animation**: Creates animated background elements
- **AnimatePresence**: Handles enter/exit animations between slides
- **3D Transitions**: Uses rotateY for depth effect
- **Conditional Slide Rendering**: Shows different slide components

### 10. Slide Components (Lines 500-900)

#### IntroSlide Example:
```typescript
function IntroSlide({ slide }) {
  return (
    <div className="text-center text-white">
      <motion.div
        className="text-9xl mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {slide.icon}
      </motion.div>
      
      <motion.h2
        className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        {slide.title}
      </motion.h2>
    </div>
  );
}
```

**What this does:**
- **Slide Component Pattern**: Reusable structure for all slides
- **Staggered Animations**: Elements animate in sequence
- **Gradient Text**: Uses Tailwind gradient utilities
- **Motion Props**: Consistent animation patterns

#### ControlsSlide (Most Complex):
```typescript
function ControlsSlide({ slide, paramsM, setParamsM, contextLen, setContextLen, ... }) {
  const metrics = useMetrics(paramsM, contextLen, quantBits, device);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Slide header */}
      <motion.div className="text-center mb-8">...</motion.div>

      {/* Three-column layout */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {/* Column 1: Controls */}
        <div className="xl:col-span-1 lg:col-span-1 space-y-6">
          {/* Model Size Control */}
          <motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Model Size</h3>
            <input
              type="range"
              min={1}
              max={2000}
              value={paramsM}
              onChange={(e) => setParamsM(parseInt(e.target.value))}
              className="flex-1 h-3 bg-white/20 rounded-full appearance-none slider"
            />
            {/* Preset buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[5, 50, 250, 600, 1000, 2000].map(p => (
                <motion.button
                  key={p}
                  onClick={() => setParamsM(p)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium ${
                    paramsM === p ? 'bg-cyan-500 border-cyan-400' : 'bg-white/10 border-white/20'
                  }`}
                >
                  {p}M
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Context Length Control */}
          {/* Deployment Controls */}
        </div>

        {/* Column 2: Model Visualization */}
        <div className="xl:col-span-1 lg:col-span-1">
          <ModelVisualization paramsM={paramsM} contextLen={contextLen} quantBits={quantBits} metrics={metrics} />
        </div>

        {/* Column 3: Analytics */}
        <div className="xl:col-span-1 lg:col-span-2 space-y-6">
          <MemoryBreakdown metrics={metrics} />
          <PerformanceGraph paramsM={paramsM} metrics={metrics} />
        </div>
      </div>
    </div>
  );
}
```

**What this does:**
- **Complex Layout**: Three-column responsive grid
- **Form Controls**: Range inputs, buttons, radio buttons
- **State Updates**: Direct state setters passed as props
- **Visualization Integration**: Embeds chart components
- **Conditional Styling**: Dynamic classes based on state

### 11. Visualization Components (Lines 900-1100)

#### ModelVisualization:
```typescript
function ModelVisualization({ paramsM, contextLen, quantBits, metrics }) {
  const maxParams = 2000;
  const maxContext = 8192;
  const maxBarHeight = 40;

  // Calculate heights with constraints
  const modelHeight = Math.min(maxBarHeight, Math.max(10, (paramsM / maxParams) * maxBarHeight));
  const contextHeight = Math.min(maxBarHeight, Math.max(10, (contextLen / maxContext) * maxBarHeight));
  const quantHeight = quantBits === 4 ? 15 : 25;

  return (
    <motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Model Configuration Impact</h3>

      {/* Bar chart visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-center space-x-4 h-20 relative">
          {/* Model bar */}
          <div className="flex flex-col items-center h-full justify-end">
            <motion.div
              className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg w-16"
              style={{ maxHeight: '40px' }}
              initial={{ height: 10 }}
              animate={{ height: `${modelHeight}px` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="absolute bottom-1 text-center">📊</span>
            </motion.div>
            <div className="mt-2 text-xs text-gray-300 text-center">
              <div className="font-medium">Model</div>
              <div>{prettyNum(paramsM)}M</div>
            </div>
          </div>

          {/* Context bar */}
          {/* Quantization bar */}
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div className="bg-white/5 rounded-lg p-3 border border-cyan-500/20" whileHover={{ scale: 1.02 }}>
          <div className="text-sm text-gray-400">Memory Usage</div>
          <div className="text-lg font-bold text-cyan-300">{prettyMB(metrics.memMB)}</div>
        </motion.div>
        {/* More metric cards */}
      </div>
    </motion.div>
  );
}
```

**What this does:**
- **Data Visualization**: Converts numbers to visual bars
- **Proportional Heights**: Bars scale based on values
- **Animation**: Smooth height transitions with Framer Motion
- **Responsive Design**: Adjusts to different screen sizes
- **Interactive Elements**: Hover effects on metric cards

## 🎯 Key Patterns to Remember

### 1. Component Composition
```typescript
// Main component orchestrates everything
function MainComponent() {
  const [state, setState] = useState();
  return <ChildComponent state={state} onUpdate={setState} />;
}

// Child components handle specific functionality
function ChildComponent({ state, onUpdate }) {
  return <input value={state} onChange={e => onUpdate(e.target.value)} />;
}
```

### 2. Animation Patterns
```typescript
// Entrance animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Hover effects
whileHover={{ scale: 1.05 }}

// List animations with stagger
transition={{ delay: index * 0.1 }}
```

### 3. Responsive Design
```typescript
// Mobile-first approach
className="text-base md:text-xl lg:text-2xl"  // Text gets larger on bigger screens
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // More columns on larger screens
```

### 4. State Management
```typescript
// Keep state close to where it's used
// Pass state down, callbacks up
// Use custom hooks for complex logic
```

This structure makes the code maintainable and easy to extend. Each component has a single responsibility and the data flows predictably through the application.
