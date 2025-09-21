# Extension Examples: Step-by-Step Tutorials

## 🎯 Overview
This guide provides practical examples of how to extend the SLM Explainer project. Each example includes complete code and explanations.

## 📚 Table of Contents
1. [Adding a New Metric](#1-adding-a-new-metric)
2. [Creating a New Slide](#2-creating-a-new-slide)
3. [Building a New Visualization](#3-building-a-new-visualization)
4. [Adding Interactive Controls](#4-adding-interactive-controls)
5. [Creating Custom Animations](#5-creating-custom-animations)
6. [Adding Themes](#6-adding-themes)

---

## 1. Adding a New Metric

### Goal: Add "Training Time" estimation

#### Step 1: Update the `useMetrics` hook
```typescript
// In SLMExplainer.tsx, modify the useMetrics function
function useMetrics(paramsM, contextLen, quantBits, deviceKey) {
  const device = DEVICE_PROFILES[deviceKey];
  return useMemo(() => {
    // ... existing calculations

    // NEW: Training time estimation (toy model)
    const trainingHours = Math.log(p) * 24; // Logarithmic relationship
    const trainingCost = trainingHours * (device.speedMul === 3.2 ? 5 : 1); // $5/hour for server, $1 for others

    return { 
      weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB,
      trainingHours, trainingCost // NEW metrics
    };
  }, [paramsM, contextLen, quantBits, deviceKey]);
}
```

#### Step 2: Display the new metric
```typescript
// In PerformanceSlide or DashboardSlide, add new metric cards
<AnimatedMetric 
  label="Training Time" 
  value={`${Math.round(metrics.trainingHours)}h`} 
  delay={0.4} 
/>
<AnimatedMetric 
  label="Training Cost" 
  value={`$${metrics.trainingCost.toFixed(0)}`} 
  delay={0.5} 
/>
```

#### Step 3: Add to visualization
```typescript
// In DashboardSlide, add to the performance overview
<div className="text-center">
  <div className="text-4xl font-bold text-orange-400">{Math.round(metrics.trainingHours)}h</div>
  <div className="text-gray-300">Training</div>
  <div className="text-sm text-gray-500">Estimated Hours</div>
</div>
```

---

## 2. Creating a New Slide

### Goal: Add a "Deployment Options" slide

#### Step 1: Add to slides array
```typescript
// In SLMExplainer.tsx, add to the slides array
const slides = [
  // ... existing slides
  {
    title: "Deployment Options",
    subtitle: "Where to Run Your Model",
    icon: "🚀",
    theme: "deployment"
  }
];
```

#### Step 2: Add theme
```typescript
// In PresentationMode, add to getSlideTheme function
const getSlideTheme = (theme) => {
  const themes = {
    intro: "from-purple-900 via-blue-900 to-indigo-900",
    controls: "from-cyan-900 via-teal-900 to-blue-900",
    performance: "from-emerald-900 via-green-900 to-teal-900",
    comparison: "from-orange-900 via-red-900 to-pink-900",
    dashboard: "from-indigo-900 via-purple-900 to-violet-900",
    deployment: "from-rose-900 via-pink-900 to-red-900" // NEW theme
  };
  return themes[theme] || themes.intro;
};
```

#### Step 3: Create the slide component
```typescript
// Add this function after other slide components
function DeploymentSlide({ slide, device, metrics }) {
  const deploymentOptions = [
    {
      name: "Browser (WebGPU)",
      icon: "🌐",
      pros: ["No server costs", "Privacy-first", "Instant access"],
      cons: ["Limited by device", "Slower inference"],
      speed: metrics.baseTPS,
      cost: "$0/month"
    },
    {
      name: "Edge Server",
      icon: "📱",
      pros: ["Better performance", "Still private", "Offline capable"],
      cons: ["Setup required", "Hardware costs"],
      speed: metrics.baseTPS * 2,
      cost: "$50-200/month"
    },
    {
      name: "Cloud GPU",
      icon: "☁️",
      pros: ["Highest performance", "Scalable", "Managed"],
      cons: ["Ongoing costs", "Network latency"],
      speed: metrics.baseTPS * 3.2,
      cost: "$100-500/month"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {deploymentOptions.map((option, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            {/* Option header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{option.icon}</div>
              <h3 className="text-xl font-bold text-white">{option.name}</h3>
            </div>

            {/* Performance metrics */}
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-green-400">{option.speed.toFixed(1)} tok/s</div>
              <div className="text-lg font-bold text-blue-400">{option.cost}</div>
            </div>

            {/* Pros and cons */}
            <div className="space-y-4">
              <div>
                <h4 className="text-green-300 font-semibold mb-2">✅ Pros</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {option.pros.map((pro, i) => (
                    <li key={i}>• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-red-300 font-semibold mb-2">❌ Cons</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {option.cons.map((con, i) => (
                    <li key={i}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

#### Step 4: Add to PresentationMode
```typescript
// In PresentationMode, add the conditional rendering
{currentSlide === 5 && <DeploymentSlide slide={slide} device={device} metrics={metrics} />}
```

---

## 3. Building a New Visualization

### Goal: Create a "Model Architecture" visualization

#### Step 1: Create the component
```typescript
function ModelArchitecture({ paramsM, contextLen }) {
  // Calculate layers based on model size
  const numLayers = Math.ceil(Math.log2(paramsM)) + 8; // Rough estimate
  const attentionHeads = Math.min(32, Math.max(4, Math.ceil(paramsM / 50))); // 4-32 heads
  const hiddenSize = Math.ceil(Math.sqrt(paramsM * 1000000) / 10) * 10; // Round to nearest 10

  const layers = Array.from({ length: Math.min(12, numLayers) }, (_, i) => ({
    id: i,
    type: i === 0 ? 'embedding' : i === numLayers - 1 ? 'output' : 'transformer',
    name: i === 0 ? 'Token Embedding' : i === numLayers - 1 ? 'Output Layer' : `Layer ${i}`
  }));

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-xl font-bold text-white mb-6">Model Architecture</h3>

      {/* Architecture stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{numLayers}</div>
          <div className="text-sm text-gray-400">Layers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{attentionHeads}</div>
          <div className="text-sm text-gray-400">Attention Heads</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{hiddenSize}</div>
          <div className="text-sm text-gray-400">Hidden Size</div>
        </div>
      </div>

      {/* Visual architecture */}
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className={`h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium ${
              layer.type === 'embedding' ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
              layer.type === 'output' ? 'bg-gradient-to-r from-purple-600 to-purple-500' :
              'bg-gradient-to-r from-gray-600 to-gray-500'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            {layer.name}
            {layer.type === 'transformer' && (
              <span className="ml-2 text-xs opacity-75">
                ({attentionHeads} heads)
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Context window visualization */}
      <div className="mt-6">
        <div className="text-sm text-gray-400 mb-2">Context Window: {contextLen} tokens</div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (contextLen / 8192) * 100)}%` }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
```

#### Step 2: Add to ControlsSlide
```typescript
// In ControlsSlide, add to the analytics panel
<div className="xl:col-span-1 lg:col-span-2 space-y-6">
  <MemoryBreakdown metrics={metrics} />
  <PerformanceGraph paramsM={paramsM} metrics={metrics} />
  <ModelArchitecture paramsM={paramsM} contextLen={contextLen} /> {/* NEW */}
</div>
```

---

## 4. Adding Interactive Controls

### Goal: Add a "Temperature" control for model creativity

#### Step 1: Add state
```typescript
// In SLMExplainer main component, add new state
const [temperature, setTemperature] = useState(0.7);
```

#### Step 2: Create control component
```typescript
function TemperatureControl({ temperature, setTemperature }) {
  const getTemperatureDescription = (temp) => {
    if (temp < 0.3) return "Very Conservative - Predictable outputs";
    if (temp < 0.7) return "Balanced - Good mix of creativity and consistency";
    if (temp < 1.0) return "Creative - More varied outputs";
    return "Very Creative - Highly unpredictable outputs";
  };

  const getTemperatureColor = (temp) => {
    if (temp < 0.3) return "text-blue-400";
    if (temp < 0.7) return "text-green-400";
    if (temp < 1.0) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">🌡️ Temperature</h3>
      
      <div className="space-y-4">
        {/* Slider */}
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0.1}
            max={1.5}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="flex-1 h-3 bg-white/20 rounded-full appearance-none slider"
          />
          <div className={`text-2xl font-bold min-w-20 ${getTemperatureColor(temperature)}`}>
            {temperature.toFixed(1)}
          </div>
        </div>

        {/* Visual indicator */}
        <div className="relative h-6 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 w-4 h-full bg-white rounded-full border-2 border-gray-800"
            animate={{ left: `${((temperature - 0.1) / 1.4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Description */}
        <p className={`text-sm ${getTemperatureColor(temperature)}`}>
          {getTemperatureDescription(temperature)}
        </p>

        {/* Preset buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Conservative", value: 0.2 },
            { label: "Balanced", value: 0.7 },
            { label: "Creative", value: 1.0 },
            { label: "Wild", value: 1.3 }
          ].map(preset => (
            <motion.button
              key={preset.label}
              onClick={() => setTemperature(preset.value)}
              className={`py-2 px-3 rounded-xl border text-xs font-medium ${
                Math.abs(temperature - preset.value) < 0.05
                  ? 'bg-purple-500 border-purple-400 text-white'
                  : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

#### Step 3: Add to ControlsSlide
```typescript
// In ControlsSlide controls panel, add the new control
<div className="xl:col-span-1 lg:col-span-1 space-y-6">
  {/* Existing controls */}
  <TemperatureControl temperature={temperature} setTemperature={setTemperature} />
</div>
```

#### Step 4: Update metrics to use temperature
```typescript
// In useMetrics, factor in temperature
const creativityFactor = 1 + (temperature - 0.7) * 0.1; // Slight performance impact
baseTPS *= creativityFactor;
```

---

## 5. Creating Custom Animations

### Goal: Add a "Neural Network" animation

#### Step 1: Create the animation component
```typescript
function NeuralNetworkAnimation({ isActive = true, complexity = 3 }) {
  const nodes = useMemo(() => {
    const layers = [4, 6, 6, 3]; // Input, hidden1, hidden2, output
    return layers.map((nodeCount, layerIndex) =>
      Array.from({ length: nodeCount }, (_, nodeIndex) => ({
        id: `${layerIndex}-${nodeIndex}`,
        layer: layerIndex,
        index: nodeIndex,
        x: (layerIndex / (layers.length - 1)) * 300,
        y: (nodeIndex / (nodeCount - 1)) * 200,
        active: Math.random() > 0.3
      }))
    ).flat();
  }, []);

  const connections = useMemo(() => {
    const conns = [];
    for (let layer = 0; layer < 3; layer++) {
      const currentLayer = nodes.filter(n => n.layer === layer);
      const nextLayer = nodes.filter(n => n.layer === layer + 1);
      
      currentLayer.forEach(from => {
        nextLayer.forEach(to => {
          conns.push({
            id: `${from.id}-${to.id}`,
            from,
            to,
            strength: Math.random()
          });
        });
      });
    }
    return conns;
  }, [nodes]);

  return (
    <div className="relative w-80 h-52 mx-auto">
      <svg className="absolute inset-0 w-full h-full">
        {/* Connections */}
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke={`rgba(59, 130, 246, ${conn.strength * 0.6})`}
            strokeWidth={conn.strength * 2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isActive ? 1 : 0,
              opacity: isActive ? conn.strength : 0
            }}
            transition={{ 
              duration: 1.5,
              delay: Math.random() * 0.5,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 1
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className={`absolute w-4 h-4 rounded-full border-2 ${
            node.active 
              ? 'bg-blue-500 border-blue-300' 
              : 'bg-gray-600 border-gray-500'
          }`}
          style={{
            left: node.x - 8,
            top: node.y - 8
          }}
          animate={{
            scale: isActive && node.active ? [1, 1.3, 1] : 1,
            boxShadow: isActive && node.active 
              ? ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0)"]
              : "0 0 0px rgba(59, 130, 246, 0)"
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Layer labels */}
      <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400">
        <span>Input</span>
        <span>Hidden</span>
        <span>Hidden</span>
        <span>Output</span>
      </div>
    </div>
  );
}
```

#### Step 2: Add to IntroSlide
```typescript
function IntroSlide({ slide }) {
  return (
    <div className="text-center text-white">
      {/* Existing content */}
      
      {/* Add neural network animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12"
      >
        <NeuralNetworkAnimation isActive={true} />
        <p className="text-lg text-gray-300 mt-4">
          Watch the neural network process information
        </p>
      </motion.div>
    </div>
  );
}
```

---

## 6. Adding Themes

### Goal: Add a dark/light theme toggle

#### Step 1: Create theme context
```typescript
// Add at the top of SLMExplainer.tsx
const ThemeContext = React.createContext();

// Theme configuration
const themes = {
  dark: {
    bg: "from-slate-900 via-purple-900 to-slate-900",
    cardBg: "bg-white/10",
    cardBorder: "border-white/20",
    text: "text-white",
    textSecondary: "text-gray-300",
    accent: "text-cyan-400"
  },
  light: {
    bg: "from-blue-50 via-purple-50 to-pink-50",
    cardBg: "bg-white/80",
    cardBorder: "border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    accent: "text-blue-600"
  }
};
```

#### Step 2: Add theme state
```typescript
// In SLMExplainer main component
const [currentTheme, setCurrentTheme] = useState('dark');
const theme = themes[currentTheme];
```

#### Step 3: Create theme toggle
```typescript
function ThemeToggle({ currentTheme, setCurrentTheme }) {
  return (
    <motion.button
      onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className={`fixed top-6 left-6 z-50 p-3 rounded-full ${
        currentTheme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-900/10 text-gray-900'
      } backdrop-blur-sm border ${
        currentTheme === 'dark' ? 'border-white/20' : 'border-gray-200'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  );
}
```

#### Step 4: Apply theme throughout components
```typescript
// Update card components to use theme
function ThemedCard({ children, title, theme }) {
  return (
    <motion.div
      className={`rounded-3xl p-6 border ${theme.cardBg} ${theme.cardBorder} backdrop-blur-sm`}
      whileHover={{ scale: 1.02 }}
    >
      <h3 className={`text-xl font-bold mb-4 ${theme.text}`}>{title}</h3>
      <div className={theme.text}>
        {children}
      </div>
    </motion.div>
  );
}
```

#### Step 5: Update main background
```typescript
// In main component render
<div className={`relative w-full min-h-screen bg-gradient-to-br ${theme.bg}`}>
  <ThemeToggle currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
  {/* Rest of content */}
</div>
```

---

## 🎯 Testing Your Extensions

### 1. Local Development
```bash
npm run dev
# Navigate to http://localhost:5173
```

### 2. Check Console for Errors
- Open browser dev tools (F12)
- Look for red errors in console
- Fix TypeScript errors in your IDE

### 3. Test Responsiveness
- Test on different screen sizes
- Use browser dev tools device emulation
- Check mobile layout

### 4. Performance Testing
- Check smooth animations
- Ensure no lag when changing values
- Monitor memory usage for complex visualizations

---

## 🚀 Next Steps

1. **Start with Simple Extensions**: Begin with adding new metrics or text changes
2. **Practice Animation Patterns**: Copy existing animation code and modify it
3. **Build Component Library**: Create reusable components for common patterns
4. **Add Data Sources**: Connect to real APIs or data files
5. **Implement User Preferences**: Save settings to localStorage
6. **Add Accessibility**: Ensure keyboard navigation and screen reader support

Remember: Every complex feature starts as a simple component. Build incrementally and test frequently!
