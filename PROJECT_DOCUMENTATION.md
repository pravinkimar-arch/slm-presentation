# SLM Explainer Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Concepts](#core-concepts)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Styling System](#styling-system)
8. [Animation System](#animation-system)
9. [Code Patterns](#code-patterns)
10. [Extension Guide](#extension-guide)

## 🎯 Project Overview

This is an **interactive presentation app** that explains Small Language Models (SLMs). It's built as a single-page React application that transforms complex AI concepts into visual, interactive demonstrations.

### Key Features:
- **Interactive Controls**: Sliders and inputs to adjust model parameters
- **Real-time Calculations**: Performance metrics update dynamically
- **Presentation Mode**: Full-screen cinematic slides with animations
- **Visual Demonstrations**: Charts, bars, and animations showing model behavior
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠 Technology Stack

### Core Technologies:
- **React 18**: UI library for building components
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Development Tools:
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Node.js**: Runtime environment

## 📁 Project Structure

```
slm-explainer/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── App.tsx           # Main app component (simple wrapper)
│   ├── SLMExplainer.tsx  # Main application logic (1100+ lines)
│   ├── main.tsx          # React app entry point
│   └── index.css         # Global CSS and Tailwind imports
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🧩 Core Concepts

### 1. Small Language Models (SLMs)
The app demonstrates:
- **Model Size**: Number of parameters (1M to 2B+)
- **Context Length**: How many tokens the model can remember
- **Quantization**: 4-bit vs 16-bit precision
- **Performance Trade-offs**: Speed vs quality vs memory

### 2. Performance Calculations
The app uses mathematical models to estimate:
- **Tokens per second**: `k / (params * contextFactor * quantFactor)`
- **Memory usage**: Model weights + KV cache
- **Download size**: Compressed model size
- **First token latency**: Time to generate first token

## 🏗 Component Architecture

### Main Component Structure:
```typescript
SLMExplainer (Main Component)
├── Landing Page (when !isPresenting)
│   ├── Hero Section
│   ├── Feature Preview Cards
│   └── Navigation Controls
└── PresentationMode (when isPresenting)
    ├── Slide Components
    │   ├── IntroSlide
    │   ├── ControlsSlide
    │   │   ├── ModelVisualization
    │   │   ├── MemoryBreakdown
    │   │   └── PerformanceGraph
    │   ├── PerformanceSlide
    │   ├── ComparisonSlide
    │   └── DashboardSlide
    ├── Navigation Controls
    └── Progress Indicators
```

### Component Types:

#### 1. **Container Components**
- `SLMExplainer`: Main app logic and state
- `PresentationMode`: Handles slide navigation and themes

#### 2. **UI Components**
- `ZoomableCard`: Reusable card with hover effects
- `AnimatedMetric`: Displays animated numbers
- `TokenStream`: Shows flowing token animation

#### 3. **Visualization Components**
- `ModelVisualization`: Interactive bar chart
- `MemoryBreakdown`: Memory usage visualization
- `PerformanceGraph`: Performance vs size chart

#### 4. **Slide Components**
Each slide is a separate component that receives props and renders specific content.

## 🎛 State Management

### React useState Hooks:
```typescript
const [paramsM, setParamsM] = useState(50);           // Model parameters (millions)
const [contextLen, setContextLen] = useState(1024);   // Context window size
const [device, setDevice] = useState("Browser...");   // Deployment target
const [quantBits, setQuantBits] = useState(4);        // Quantization bits
const [currentSlide, setCurrentSlide] = useState(0);  // Presentation slide index
const [isPresenting, setIsPresenting] = useState(false); // Presentation mode
const [autoPlay, setAutoPlay] = useState(false);      // Auto-advance slides
```

### Computed State (useMemo):
```typescript
const metrics = useMetrics(paramsM, contextLen, quantBits, device);
const badges = badgesForParams(paramsM);
const llmCompare = useMemo(() => { /* 7B model comparison */ }, [device]);
```

### Side Effects (useEffect):
```typescript
// Keyboard controls
useEffect(() => {
  const handleKeyPress = (e) => { /* keyboard navigation */ };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [dependencies]);

// Auto-play timer
useEffect(() => {
  if (autoPlay && isPresenting) {
    const timer = setTimeout(nextSlide, 8000);
    return () => clearTimeout(timer);
  }
}, [autoPlay, isPresenting, currentSlide]);
```

## 🎨 Styling System

### Tailwind CSS Utilities:

#### Layout Classes:
```css
grid grid-cols-3    /* CSS Grid with 3 columns */
flex items-center   /* Flexbox with centered items */
absolute top-0      /* Absolute positioning */
w-full h-screen     /* Full width and height */
```

#### Responsive Design:
```css
md:text-4xl        /* Large text on medium+ screens */
lg:grid-cols-2      /* 2 columns on large+ screens */
xl:col-span-1       /* Span 1 column on extra large screens */
```

#### Visual Effects:
```css
bg-gradient-to-r from-cyan-500 to-blue-600  /* Gradient background */
backdrop-blur-sm                             /* Blur effect */
shadow-2xl                                   /* Large shadow */
rounded-3xl                                  /* Large border radius */
```

#### Colors and Transparency:
```css
bg-white/10         /* White background with 10% opacity */
text-cyan-300       /* Cyan text color */
border-white/20     /* White border with 20% opacity */
```

## ✨ Animation System

### Framer Motion Concepts:

#### Basic Animation:
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}     // Starting state
  animate={{ opacity: 1, y: 0 }}      // End state
  transition={{ duration: 0.8 }}      // Animation timing
>
```

#### Hover Animations:
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}        // Scale up on hover
  whileTap={{ scale: 0.95 }}          // Scale down on click
>
```

#### List Animations:
```typescript
<AnimatePresence mode="wait">          // Wait for exit before enter
  <motion.div
    key={currentSlide}                 // Unique key for transitions
    exit={{ opacity: 0, rotateY: -90 }} // 3D rotation exit
  >
```

#### Staggered Animations:
```typescript
transition={{ delay: index * 0.1 }}   // Delay based on array index
```

## 🔧 Code Patterns

### 1. **Helper Functions**
```typescript
// Pure functions for calculations
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function prettyMB(x) { return x < 1024 ? `${x.toFixed(1)} MB` : `${(x/1024).toFixed(2)} GB`; }
```

### 2. **Custom Hooks**
```typescript
function useMetrics(paramsM, contextLen, quantBits, deviceKey) {
  return useMemo(() => {
    // Expensive calculations here
    return { weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB };
  }, [paramsM, contextLen, quantBits, deviceKey]);
}
```

### 3. **Configuration Objects**
```typescript
const DEVICE_PROFILES = {
  "Browser (Desktop WebGPU)": { speedMul: 1.0, memMul: 1.0 },
  "Mobile (WebGPU/Metal via PWA)": { speedMul: 0.55, memMul: 1.0 },
  "Server (GPU / A10+)": { speedMul: 3.2, memMul: 1.0 },
};
```

### 4. **Conditional Rendering**
```typescript
{isPresenting ? (
  <PresentationMode {...props} />
) : (
  <LandingPage />
)}
```

### 5. **Array Mapping for UI**
```typescript
{slides.map((slide, index) => (
  <SlideComponent key={index} slide={slide} />
))}
```

## 🚀 Extension Guide

### Adding New Slides:

#### 1. **Update the slides array:**
```typescript
const slides = [
  // ... existing slides
  {
    title: "My New Slide",
    subtitle: "Custom Content",
    icon: "🎯",
    theme: "custom"
  }
];
```

#### 2. **Create the slide component:**
```typescript
function MyNewSlide({ slide, customProps }) {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>
      
      {/* Your custom content here */}
    </div>
  );
}
```

#### 3. **Add to PresentationMode:**
```typescript
{currentSlide === 5 && <MyNewSlide slide={slide} customProps={customProps} />}
```

### Adding New Visualizations:

#### 1. **Create the component:**
```typescript
function MyVisualization({ data, metrics }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">My Visualization</h3>
      
      {/* Your visualization logic here */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg p-3"
            whileHover={{ scale: 1.05 }}
          >
            {item.value}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```

### Adding New Controls:

#### 1. **Add state:**
```typescript
const [myParameter, setMyParameter] = useState(defaultValue);
```

#### 2. **Create input component:**
```typescript
<motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
  <h3 className="text-xl font-bold text-white mb-4">My Parameter</h3>
  <input
    type="range"
    min={0}
    max={100}
    value={myParameter}
    onChange={(e) => setMyParameter(parseInt(e.target.value))}
    className="w-full h-3 bg-white/20 rounded-full appearance-none slider"
  />
  <div className="text-2xl font-bold text-cyan-300">{myParameter}</div>
</motion.div>
```

### Adding New Metrics:

#### 1. **Update useMetrics hook:**
```typescript
function useMetrics(paramsM, contextLen, quantBits, deviceKey, myParameter) {
  return useMemo(() => {
    // ... existing calculations
    const myNewMetric = calculateMyMetric(paramsM, myParameter);
    
    return { 
      // ... existing metrics
      myNewMetric 
    };
  }, [paramsM, contextLen, quantBits, deviceKey, myParameter]);
}
```

### Common Patterns for Extensions:

#### 1. **Animated Numbers:**
```typescript
<motion.div
  className="text-4xl font-bold text-yellow-400"
  key={value} // Re-animate when value changes
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
>
  {value.toFixed(1)}
</motion.div>
```

#### 2. **Progress Bars:**
```typescript
<div className="h-4 bg-gray-700 rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-green-500 to-blue-500"
    initial={{ width: 0 }}
    animate={{ width: `${percentage}%` }}
    transition={{ duration: 1 }}
  />
</div>
```

#### 3. **Card Grids:**
```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <motion.div
      key={index}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Card content */}
    </motion.div>
  ))}
</div>
```

## 📚 Learning Resources

### TypeScript:
- **Basic Types**: `string`, `number`, `boolean`, `array[]`, `object`
- **Interfaces**: Define object shapes
- **Hooks**: `useState<Type>()`, `useEffect()`, `useMemo<Type>()`

### React Patterns:
- **Props**: `{ prop1, prop2 }: { prop1: string, prop2: number }`
- **State**: `const [value, setValue] = useState(initial)`
- **Effects**: `useEffect(() => {}, [dependencies])`

### Tailwind Classes:
- **Layout**: `flex`, `grid`, `absolute`, `relative`
- **Sizing**: `w-`, `h-`, `p-`, `m-`
- **Colors**: `bg-`, `text-`, `border-`
- **Effects**: `shadow-`, `rounded-`, `opacity-`

### Framer Motion:
- **Components**: `motion.div`, `motion.button`
- **Props**: `initial`, `animate`, `exit`, `transition`
- **Gestures**: `whileHover`, `whileTap`, `drag`

## 🎯 Next Steps

1. **Start Small**: Modify existing text or colors
2. **Add Simple Animations**: Try changing `initial` and `animate` values
3. **Create New Cards**: Copy existing card patterns
4. **Add New Metrics**: Extend the calculation functions
5. **Build New Slides**: Follow the slide component patterns

Remember: This codebase follows React best practices with TypeScript for type safety, Tailwind for styling, and Framer Motion for animations. Each component is designed to be reusable and extendable.
