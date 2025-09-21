import React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CharacteristicsSlide, ArchitectureSlide, UseCasesSlide, ConfigurationSlide as ConfigSlide, ComparisonSlide as CompSlide } from "./SlideComponents";

/** * Interactive Animated Explainer — Small Language Models (SLMs)
 * - Single-file React component (TS-friendly JS)
 * - Uses Tailwind classes (no import needed in this canvas)
 * - Animates token flow and updates metrics based on controls
 * - Drop into any React app and it should work
 */

// ---------- Helpers ----------
const MB_PER_PARAM_FP16 = 2 / 1024; // ≈ 0.001953 MB per 1k params => ~0.001953 * 1000 = 1.953 MB per 1M params (approx)
const MB_PER_PARAM_INT4 = 0.5 / 1024; // 0.5 bytes/param → ~0.488 MB per 1M params

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

const DEVICE_PROFILES = {
  "Browser (Desktop WebGPU)": { speedMul: 1.0, memMul: 1.0 },
  "Mobile (WebGPU/Metal via PWA)": { speedMul: 0.55, memMul: 1.0 },
  "Server (GPU / A10+)": { speedMul: 3.2, memMul: 1.0 },
};

function prettyMB(x) {
  if (x < 1024) return `${x.toFixed(1)} MB`;
  return `${(x/1024).toFixed(2)} GB`;
}

function prettyNum(n) {
  return n.toLocaleString();
}

function useMetrics(paramsM, contextLen, quantBits, deviceKey) {
  const device = DEVICE_PROFILES[deviceKey];
  return useMemo(() => {
    const p = clamp(paramsM, 1, 2000); // 1M..2B
    // Approx weight size
    const weightMB = quantBits === 4 ? p * (MB_PER_PARAM_INT4 * 1_000) // per million params
      : p * (MB_PER_PARAM_FP16 * 1_000);
    // KV cache (very rough toy estimate): scales with context and model width (proxy: params)
    // We'll say each token adds ~0.0008 * params(M) MB
    const kvPerTokMB = 0.0008 * p;
    const kvTotalMB = kvPerTokMB * contextLen;
    // Enhanced throughput model: TPS inversely proportional to params AND context
    // baseTPS = k / (p * contextFactor); larger context = slower due to attention & memory
    const k = 2000; // toy constant for 50M → ~40 t/s on desktop, 250M → ~8 t/s
    const contextFactor = Math.max(1.0, 1.0 + (contextLen - 1024) / 4096); // penalty for large context
    const quantFactor = quantBits === 4 ? 1.15 : 1.0; // 4-bit is ~15% faster due to less memory bandwidth
    let baseTPS = k / (p * contextFactor); // tokens per second
    baseTPS *= device.speedMul * quantFactor;
    // First-token latency proxy (compile/graph warmup) more visible for larger models
    const ttfbMs = clamp(120 + p * 0.6, 80, 2200) / device.speedMul;
    // Estimated download (quantized if 4-bit)
    const downloadMB = weightMB; // pretend CDN serves quantized bundle
    // Memory footprint ~= weights (if not offloaded) + kv cache
    const memMB = weightMB + kvTotalMB;
    return {
      weightMB,
      kvTotalMB,
      memMB,
      baseTPS,
      ttfbMs,
      downloadMB,
    };
  }, [paramsM, contextLen, quantBits, deviceKey]);
}

function badgesForParams(p) {
  if (p <= 20) return ["On-device classify", "Regex+", "Smart autocomplete", "IoT edge"];
  if (p <= 60) return ["Mobile chat", "Intent+slots", "RAG lite", "Fast rewriter"];
  if (p <= 200) return ["Assistant (short ctx)", "Summarizer", "Code hints", "Multi-lingual lite"];
  if (p <= 600) return ["General chat", "Reasoning-lite", "RAG heavy", "Enterprise on-device"];
  return ["LLM territory", "Server heavy", "Long ctx", "Tool use"];
}

// ---------- Token Stream Animation ----------
function TokenStream({ speed, density = 8, label = "Data Flow" }) {
  const tokens = Array.from({ length: density }).map((_, i) => i);
  const duration = clamp(2.6 - speed, 0.6, 3.2); // faster when speed high
  return (
    <div className="relative h-14 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_5%,transparent_5%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_55%,transparent_55%)] bg-[length:24px_2px] bg-center" />
      <div className="absolute top-1 left-3 text-xs text-gray-300">{label}</div>
      {tokens.map((t) => (
        <motion.div key={t}
          className="absolute top-6 h-4 rounded-full px-2 text-[10px] leading-4 text-white shadow"
          style={{ background: "#06b6d4" }}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: [ -60, 620 ], opacity: [0, 1, 1, 0] }}
          transition={{ duration, ease: "easeInOut", repeat: Infinity, delay: t * (duration / tokens.length) }}
        >tok</motion.div>
      ))}
    </div>
  );
}

// ---------- Main Component ----------
export default function SLMExplainer() {
  const [paramsM, setParamsM] = useState(50); // million params
  const [contextLen, setContextLen] = useState(1024);
  const [device, setDevice] = useState("Browser (Desktop WebGPU)");
  const [quantBits, setQuantBits] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0); // presentation slides
  const [isPresenting, setIsPresenting] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const { weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB } = useMetrics(
    paramsM,
    contextLen,
    quantBits,
    device
  );

  const badges = badgesForParams(paramsM);

  const llmCompare = useMemo(() => {
    const p = 7000; // 7B reference
    const k = 2000;
    const tps = (k / p) * DEVICE_PROFILES[device].speedMul;
    const dlMB = p * (MB_PER_PARAM_INT4 * 1_000); // 4-bit
    return { tps, dlMB };
  }, [device]);

  const slides = [
    { 
      title: "Chapter 2: Small Language Models", 
      subtitle: "Journey into the World of Compact AI",
      icon: "🎯",
      theme: "chapter-intro"
    },
    { 
      title: "What are Small Language Models?", 
      subtitle: "Miniature Powerhouses of AI",
      icon: "🔬",
      theme: "what-are-slms"
    },
    { 
      title: "Why We Need SLMs", 
      subtitle: "The Key Benefits of Going Small",
      icon: "💡",
      theme: "why-slms"
    },
    { 
      title: "Characteristics of SLMs", 
      subtitle: "What Makes a Model 'Small'?",
      icon: "📐",
      theme: "characteristics"
    },
    { 
      title: "Model Configuration", 
      subtitle: "How Size Affects Everything",
      icon: "⚙️",
      theme: "configuration"
    },
    { 
      title: "SLM vs LLM", 
      subtitle: "David and Goliath of AI",
      icon: "⚖️",
      theme: "comparison"
    },
    { 
      title: "SLM Workflow & Key Components", 
      subtitle: "How Small Language Models Operate",
      icon: "⚙️",
      theme: "workflow"
    },
    { 
      title: "SLM Use Cases", 
      subtitle: "Real-World Applications",
      icon: "🚀",
      theme: "use-cases"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  
  // Keyboard controls
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'p' || e.key === 'P') setIsPresenting(!isPresenting);
      if (e.key === 'a' || e.key === 'A') setAutoPlay(!autoPlay);
      if (e.key === 'Escape') setIsPresenting(false);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPresenting, autoPlay]);

  // Auto-play functionality
  React.useEffect(() => {
    if (autoPlay && isPresenting) {
      const timer = setTimeout(nextSlide, 8000); // 8 seconds per slide
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isPresenting, currentSlide]);

  if (isPresenting) {
    return <PresentationMode 
      currentSlide={currentSlide}
      slides={slides}
      paramsM={paramsM}
      setParamsM={setParamsM}
      contextLen={contextLen}
      setContextLen={setContextLen}
      device={device}
      setDevice={setDevice}
      quantBits={quantBits}
      setQuantBits={setQuantBits}
      metrics={{ weightMB, kvTotalMB, memMB, baseTPS, ttfbMs, downloadMB }}
      badges={badges}
      llmCompare={llmCompare}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      autoPlay={autoPlay}
      setAutoPlay={setAutoPlay}
      setIsPresenting={setIsPresenting}
    />;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🧠
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Small Language Models
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            The Future of AI is Compact, Fast, and Personal
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setIsPresenting(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🎬 Start Presentation
            </motion.button>
            <motion.button
              onClick={() => setIsPresenting(true)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl border border-white/20"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              📊 Explore Dashboard
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Preview Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {slides.slice(1, 4).map((slide, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              whileHover={{ 
                scale: 1.05,
                y: -10,
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{slide.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
              <p className="text-gray-300">{slide.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Keyboard hints */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Press <kbd className="px-2 py-1 bg-white/10 rounded">P</kbd> to present • 
          <kbd className="px-2 py-1 bg-white/10 rounded mx-1">→</kbd> Next • 
          <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd> Previous
        </motion.div>
      </div>
    </div>
  );
}

// ---------- Presentation Mode Component ----------
function PresentationMode({ 
  currentSlide, 
  slides, 
  paramsM, 
  setParamsM, 
  contextLen, 
  setContextLen, 
  device, 
  setDevice, 
  quantBits, 
  setQuantBits, 
  metrics, 
  badges, 
  llmCompare, 
  nextSlide, 
  prevSlide, 
  autoPlay, 
  setAutoPlay, 
  setIsPresenting 
}) {
  const slide = slides[currentSlide];

  // Slide-specific background themes
  const getSlideTheme = (theme) => {
    const themes = {
      "chapter-intro": "from-slate-900 via-purple-900 to-blue-900",
      "what-are-slms": "from-blue-900 via-indigo-900 to-purple-900",
      "why-slms": "from-teal-900 via-emerald-900 to-green-900",
      "characteristics": "from-violet-900 via-purple-900 to-pink-900",
      "configuration": "from-cyan-900 via-blue-900 to-indigo-900",
      "comparison": "from-orange-900 via-red-900 to-rose-900",
      "workflow": "from-gray-900 via-slate-900 to-zinc-900",
      "use-cases": "from-green-900 via-teal-900 to-cyan-900"
    };
    return themes[theme] || themes["chapter-intro"];
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${getSlideTheme(slide.theme)}`}>
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.5
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Slide Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Slide Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
        <motion.button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-full backdrop-blur-sm border ${
            autoPlay ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-white/10 border-white/20 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          {autoPlay ? '⏸️ Pause' : '▶️ Auto'}
        </motion.button>
        <motion.button
          onClick={() => setIsPresenting(false)}
          className="px-4 py-2 rounded-full bg-red-500/20 border border-red-400 text-red-300 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          ✕ Exit
        </motion.button>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="flex-1 flex flex-col justify-center px-12"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotateY: -90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {currentSlide === 0 && <ChapterIntroSlide slide={slide} />}
            {currentSlide === 1 && <WhatAreSLMsSlide slide={slide} />}
            {currentSlide === 2 && <WhyWNeedSLMsSlide slide={slide} />}
            {currentSlide === 3 && <CharacteristicsSlide slide={slide} />}
            {currentSlide === 4 && <ConfigSlide slide={slide} paramsM={paramsM} setParamsM={setParamsM} contextLen={contextLen} setContextLen={setContextLen} device={device} setDevice={setDevice} quantBits={quantBits} setQuantBits={setQuantBits} metrics={metrics} />}
            {currentSlide === 5 && <CompSlide slide={slide} paramsM={paramsM} metrics={metrics} llmCompare={llmCompare} badges={badges} />}
            {currentSlide === 6 && <ArchitectureSlide slide={slide} />}
            {currentSlide === 7 && <UseCasesSlide slide={slide} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
          <motion.button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xl"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/30'}`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xl"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ---------- Individual Slide Components ----------
function IntroSlide({ slide }) {
  return (
    <div className="text-center max-w-6xl mx-auto">
      <motion.div
        className="text-9xl mb-8"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {slide.icon}
      </motion.div>
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {slide.title}
      </motion.h1>
      <motion.p
        className="text-2xl md:text-4xl text-gray-200 mb-12"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {slide.subtitle}
      </motion.p>
      <motion.div
        className="text-xl text-gray-400 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Compact • Fast • Private • Efficient</p>
        <p className="text-lg">The next generation of AI runs anywhere</p>
      </motion.div>
    </div>
  );
}

// 1. Chapter Intro - Creative animation depicting SLMs
function ChapterIntroSlide({ slide }) {
  // Create animated miniature models
  const miniModels = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 20,
    x: Math.random() * 80 - 40,
    y: Math.random() * 80 - 40,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <div className="relative text-center max-w-7xl mx-auto h-full flex flex-col justify-center">
      {/* Background animated neural network */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl">
          {/* Neural network connections */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={Math.random() * 800}
              y1={Math.random() * 600}
              x2={Math.random() * 800}
              y2={Math.random() * 600}
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ 
                duration: 3, 
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Central Large Brain transitioning to small ones */}
      <div className="relative z-10">
        <motion.div
          className="text-9xl mb-8 relative inline-block"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          🧠
          
          {/* Miniature brains floating around */}
          {miniModels.map((model) => (
            <motion.div
              key={model.id}
              className="absolute text-2xl"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ 
                x: 0, 
                y: 0,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: `${model.x}vh`,
                y: `${model.y}vh`,
                scale: 1,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: model.duration,
                delay: model.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧠
            </motion.div>
          ))}
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Chapter 2
          </span>
        </motion.h1>
        
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Small Language Models
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-3xl text-gray-200 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {slide.subtitle}
        </motion.p>

        {/* Animated feature highlights */}
        <motion.div
          className="flex justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {['Compact', 'Fast', 'Efficient'].map((feature, i) => (
            <motion.div
              key={feature}
              className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.2 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <span className="text-lg font-semibold text-cyan-300">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// 2. What are Small Language Models - Miniature of LLMs visualization
function WhatAreSLMsSlide({ slide }) {
  return (
    <div className="max-w-7xl mx-auto h-full flex items-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Visual comparison */}
        <div className="relative">
          {/* Large Language Model */}
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="relative z-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">🏢</div>
              <h3 className="text-2xl font-bold text-white">Large Language Model</h3>
              <p className="text-gray-300">7B+ Parameters</p>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-red-400">●</span> Massive compute required
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">●</span> Server infrastructure
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">●</span> High memory usage
              </div>
            </div>
          </motion.div>

          {/* Arrow showing miniaturization */}
          <motion.div
            className="absolute top-1/2 left-3/4 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <svg width="100" height="50" viewBox="0 0 100 50">
              <motion.path
                d="M 10 25 L 70 25 L 60 15 M 70 25 L 60 35"
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </svg>
          </motion.div>

          {/* Small Language Model */}
          <motion.div
            className="absolute bottom-0 right-0 bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm rounded-3xl p-6 border border-cyan-500/30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.5, duration: 1, type: "spring" }}
          >
            <div className="text-center mb-3">
              <div className="text-4xl mb-1">📱</div>
              <h3 className="text-xl font-bold text-white">Small Language Model</h3>
              <p className="text-gray-300 text-sm">&lt;1B Parameters</p>
            </div>
            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span> Runs on device
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span> Low power usage
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span> Privacy-first
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Definition and characteristics */}
        <motion.div
          className="space-y-6 flex flex-col justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-cyan-300 mb-3">Definition</h3>
            <p className="text-gray-200">
              Small Language Models (SLMs) are compact AI models with typically less than 1 billion parameters, 
              designed to run efficiently on edge devices while maintaining impressive capabilities.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-green-300 mb-3">The Miniaturization Magic</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <span className="text-2xl">🔬</span>
                <span className="text-gray-200">Distilled knowledge from larger models</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                <span className="text-2xl">⚡</span>
                <span className="text-gray-200">Optimized architectures for efficiency</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                <span className="text-2xl">🎯</span>
                <span className="text-gray-200">Task-specific fine-tuning</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// 3. Why We Need SLMs - Key benefits visualization
function WhyWNeedSLMsSlide({ slide }) {
  const benefits = [
    {
      icon: "🏃",
      title: "Speed",
      description: "Lightning-fast inference on any device",
      color: "from-blue-500 to-cyan-500",
      stats: "40-100 tok/s"
    },
    {
      icon: "🔒",
      title: "Privacy",
      description: "Your data never leaves your device",
      color: "from-purple-500 to-pink-500",
      stats: "100% Local"
    },
    {
      icon: "💰",
      title: "Cost-Effective",
      description: "No expensive cloud infrastructure",
      color: "from-green-500 to-emerald-500",
      stats: "$0 API costs"
    },
    {
      icon: "🔋",
      title: "Efficiency",
      description: "Low power consumption",
      color: "from-orange-500 to-red-500",
      stats: "10x less power"
    },
    {
      icon: "🌐",
      title: "Offline",
      description: "Works without internet connection",
      color: "from-indigo-500 to-blue-500",
      stats: "Always available"
    },
    {
      icon: "📱",
      title: "Portable",
      description: "Runs on phones, browsers, IoT",
      color: "from-pink-500 to-rose-500",
      stats: "Any device"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 h-full">
              <motion.div 
                className="text-5xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300 mb-4">{benefit.description}</p>
              <motion.div 
                className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${benefit.color} text-white font-bold`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {benefit.stats}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central connecting animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 600">
          {/* Animated connecting lines between benefits */}
          {benefits.map((_, i) => 
            benefits.slice(i + 1).map((_, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={`${(i % 3) * 333 + 166}`}
                y1={`${Math.floor(i / 3) * 300 + 150}`}
                x2={`${((i + j + 1) % 3) * 333 + 166}`}
                y2={`${Math.floor((i + j + 1) / 3) * 300 + 150}`}
                stroke="url(#benefitGradient)"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 3,
                  delay: 2 + (i + j) * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))
          )}
          <defs>
            <linearGradient id="benefitGradient">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

function ControlsSlide({ slide, paramsM, setParamsM, contextLen, setContextLen, device, setDevice, quantBits, setQuantBits }) {
  const metrics = useMetrics(paramsM, contextLen, quantBits, device);
  
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-8">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="xl:col-span-1 lg:col-span-1 space-y-6">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Model Size</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min={1} 
                  max={2000} 
                  value={paramsM}
                  onChange={(e) => setParamsM(parseInt(e.target.value))}
                  className="flex-1 h-3 bg-white/20 rounded-full appearance-none slider"
                />
                <div className="text-2xl font-bold text-cyan-300 min-w-20">{prettyNum(paramsM)}M</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[5, 50, 250, 600, 1000, 2000].map(p => (
                  <motion.button
                    key={p}
                    onClick={() => setParamsM(p)}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium ${
                      paramsM === p 
                        ? 'bg-cyan-500 border-cyan-400 text-white' 
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {p}M
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Context Length</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min={128} 
                  max={8192} 
                  step={128}
                  value={contextLen}
                  onChange={(e) => setContextLen(parseInt(e.target.value))}
                  className="flex-1 h-3 bg-white/20 rounded-full appearance-none slider"
                />
                <div className="text-2xl font-bold text-emerald-300 min-w-20">{prettyNum(contextLen)}</div>
              </div>
              <p className="text-gray-300 text-sm">Tokens of memory</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Deployment</h3>
            <div className="space-y-4">
              <select 
                value={device} 
                onChange={(e) => setDevice(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm"
              >
                {Object.keys(DEVICE_PROFILES).map(k => (
                  <option key={k} value={k} className="bg-gray-800">{k}</option>
                ))}
              </select>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input 
                    type="radio" 
                    name="quant" 
                    value={4} 
                    checked={quantBits === 4} 
                    onChange={() => setQuantBits(4)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">4-bit (Smaller)</span>
                </label>
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input 
                    type="radio" 
                    name="quant" 
                    value={16} 
                    checked={quantBits === 16} 
                    onChange={() => setQuantBits(16)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">16-bit (Quality)</span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Model Visualization */}
        <div className="xl:col-span-1 lg:col-span-1">
          <ModelVisualization 
            paramsM={paramsM}
            contextLen={contextLen}
            quantBits={quantBits}
            metrics={metrics}
          />
        </div>
        
        {/* Analytics Panel */}
        <div className="xl:col-span-1 lg:col-span-2 space-y-6">
          <MemoryBreakdown metrics={metrics} />
          <PerformanceGraph 
            paramsM={paramsM}
            metrics={metrics}
          />
        </div>
      </div>
    </div>
  );
}

function PerformanceSlide({ slide, metrics }) {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Speed", value: `${metrics.baseTPS.toFixed(1)} tok/s`, icon: "⚡", color: "from-yellow-400 to-orange-500", delay: 0.2 },
          { label: "Memory", value: prettyMB(metrics.memMB), icon: "💾", color: "from-blue-400 to-purple-500", delay: 0.4 },
          { label: "Download", value: prettyMB(metrics.downloadMB), icon: "📦", color: "from-green-400 to-teal-500", delay: 0.6 },
          { label: "Latency", value: `${Math.round(metrics.ttfbMs)}ms`, icon: "⏱️", color: "from-pink-400 to-red-500", delay: 0.8 }
        ].map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: metric.delay, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-5xl mb-4">{metric.icon}</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">{metric.label}</h3>
            <div className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
              {metric.value}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <TokenStream speed={clamp(metrics.baseTPS/12, 0.2, 2.2)} density={15} label="Live Token Generation" />
      </motion.div>
    </div>
  );
}

function ComparisonSlide({ slide, paramsM, metrics, llmCompare, badges }) {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <motion.div
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/30"
          initial={{ opacity: 0, x: -100, rotateY: 45 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          whileHover={{ scale: 1.02, rotateY: 5 }}
        >
          <div className="text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-3xl font-bold text-cyan-300 mb-4">Your SLM</h3>
            <div className="space-y-4 text-xl">
              <div>
                <span className="text-gray-300">Parameters:</span>
                <span className="ml-2 font-bold text-white">{prettyNum(paramsM)}M</span>
              </div>
              <div>
                <span className="text-gray-300">Speed:</span>
                <span className="ml-2 font-bold text-cyan-300">{metrics.baseTPS.toFixed(1)} tok/s</span>
              </div>
              <div>
                <span className="text-gray-300">Download:</span>
                <span className="ml-2 font-bold text-cyan-300">{prettyMB(metrics.downloadMB)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30"
          initial={{ opacity: 0, x: 100, rotateY: -45 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{ scale: 1.02, rotateY: -5 }}
        >
          <div className="text-center">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-3xl font-bold text-purple-300 mb-4">Large LLM</h3>
            <div className="space-y-4 text-xl">
              <div>
                <span className="text-gray-300">Parameters:</span>
                <span className="ml-2 font-bold text-white">7,000M</span>
              </div>
              <div>
                <span className="text-gray-300">Speed:</span>
                <span className="ml-2 font-bold text-purple-300">{llmCompare.tps.toFixed(1)} tok/s</span>
              </div>
              <div>
                <span className="text-gray-300">Download:</span>
                <span className="ml-2 font-bold text-purple-300">{prettyMB(llmCompare.dlMB)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6">Perfect For</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, i) => (
            <motion.span
              key={badge}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DashboardSlide({ slide, paramsM, contextLen, device, quantBits, metrics, badges }) {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-8">
        <div className="text-6xl mb-4">{slide.icon}</div>
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
        {[
          { title: "Model", value: `${prettyNum(paramsM)}M`, sub: "Parameters", icon: "🧠", color: "from-blue-400 to-cyan-400" },
          { title: "Context", value: prettyNum(contextLen), sub: "Tokens", icon: "📝", color: "from-green-400 to-emerald-400" },
          { title: "Device", value: device.split(' ')[0], sub: "Platform", icon: "💻", color: "from-purple-400 to-violet-400" },
          { title: "Quant", value: `${quantBits}-bit`, sub: "Precision", icon: "🔧", color: "from-orange-400 to-red-400" }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.value}
            </div>
            <div className="text-sm text-gray-400">{item.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Performance Overview</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">{metrics.baseTPS.toFixed(1)}</div>
            <div className="text-gray-300">Tokens/sec</div>
            <div className="text-sm text-gray-500">Generation Speed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{prettyMB(metrics.memMB)}</div>
            <div className="text-gray-300">Memory</div>
            <div className="text-sm text-gray-500">Working Set</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">{prettyMB(metrics.downloadMB)}</div>
            <div className="text-gray-300">Download</div>
            <div className="text-sm text-gray-500">Model Size</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">{Math.round(metrics.ttfbMs)}ms</div>
            <div className="text-gray-300">TTFT</div>
            <div className="text-sm text-gray-500">First Token</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Visualization Components ----------
function ModelVisualization({ paramsM, contextLen, quantBits, metrics }) {
  const maxParams = 2000;
  const maxContext = 8192;
  const maxBarHeight = 40; // Much smaller max height
  
  // Calculate heights as pixels with strict constraints
  const modelHeight = Math.min(maxBarHeight, Math.max(10, (paramsM / maxParams) * maxBarHeight));
  const contextHeight = Math.min(maxBarHeight, Math.max(10, (contextLen / maxContext) * maxBarHeight));
  const quantHeight = quantBits === 4 ? 15 : 30; // Much smaller heights
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">Model Configuration Impact</h3>
      
      {/* Visual representation of model size */}
      <div className="mb-6">
        <div className="flex items-end justify-center space-x-4 h-20 relative">
          {/* Model weights visual */}
          <div className="flex flex-col items-center h-full justify-end">
            <motion.div
              className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg w-16 flex items-end justify-center text-white text-xs font-bold relative shadow-lg"
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
          
          {/* Context memory visual */}
          <div className="flex flex-col items-center h-full justify-end">
            <motion.div
              className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg w-16 flex items-end justify-center text-white text-xs font-bold relative shadow-lg"
              style={{ maxHeight: '40px' }}
              initial={{ height: 10 }}
              animate={{ height: `${contextHeight}px` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="absolute bottom-1 text-center">💾</span>
            </motion.div>
            <div className="mt-2 text-xs text-gray-300 text-center">
              <div className="font-medium">Context</div>
              <div>{prettyNum(contextLen)}</div>
            </div>
          </div>
          
          {/* Quantization effect */}
          <div className="flex flex-col items-center h-full justify-end">
            <motion.div
              className={`rounded-t-lg w-16 flex items-end justify-center text-white text-xs font-bold relative shadow-lg ${
                quantBits === 4 ? 'bg-gradient-to-t from-purple-600 to-purple-400' : 'bg-gradient-to-t from-orange-600 to-orange-400'
              }`}
              style={{ maxHeight: '30px' }}
              initial={{ height: 10 }}
              animate={{ height: `${quantHeight}px` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <span className="absolute bottom-1 text-center">⚙️</span>
            </motion.div>
            <div className="mt-2 text-xs text-gray-300 text-center">
              <div className="font-medium">Precision</div>
              <div>{quantBits}-bit</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance metrics summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div 
          className="bg-white/5 rounded-lg p-3 border border-cyan-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-sm text-gray-400">Memory Usage</div>
          <div className="text-lg font-bold text-cyan-300">{prettyMB(metrics.memMB)}</div>
        </motion.div>
        <motion.div 
          className="bg-white/5 rounded-lg p-3 border border-emerald-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-sm text-gray-400">Download Size</div>
          <div className="text-lg font-bold text-emerald-300">{prettyMB(metrics.downloadMB)}</div>
        </motion.div>
      </div>
      
      {/* Impact indicator */}
      <div className="text-center">
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            paramsM > 1000 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
            paramsM > 500 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
            'bg-green-500/20 text-green-300 border border-green-500/30'
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {paramsM > 1000 ? '⚠️ Large Model' :
           paramsM > 500 ? '⚡ Medium Model' :
           '✅ Small Model'}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MemoryBreakdown({ metrics }) {
  const total = metrics.memMB;
  const weightsPercent = (metrics.weightMB / total) * 100;
  const kvPercent = (metrics.kvTotalMB / total) * 100;
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">Memory Breakdown</h3>
      
      {/* Memory bar visualization */}
      <div className="mb-4">
        <div className="h-8 bg-gray-700 rounded-full overflow-hidden flex">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold"
            initial={{ width: 0 }}
            animate={{ width: `${weightsPercent}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {weightsPercent > 20 && "Weights"}
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold"
            initial={{ width: 0 }}
            animate={{ width: `${kvPercent}%` }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {kvPercent > 20 && "KV Cache"}
          </motion.div>
        </div>
      </div>
      
      {/* Memory details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
            Model Weights
          </span>
          <span className="font-bold text-cyan-300">{prettyMB(metrics.weightMB)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
            KV Cache
          </span>
          <span className="font-bold text-emerald-300">{prettyMB(metrics.kvTotalMB)}</span>
        </div>
        <div className="border-t border-white/20 pt-2 flex justify-between items-center font-bold">
          <span className="text-white">Total Memory</span>
          <span className="text-white">{prettyMB(total)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function PerformanceGraph({ paramsM, metrics }) {
  const sizes = [5, 50, 100, 250, 500, 1000, 2000];
  const currentIndex = sizes.findIndex(size => size >= paramsM) || sizes.length - 1;
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">Performance vs Size</h3>
      
      {/* Simple graph visualization */}
      <div className="relative h-32 mb-4 bg-gray-800/30 rounded-lg p-2">
        <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
          {sizes.map((size, index) => {
            const isActive = index === currentIndex;
            const height = Math.min(80, Math.max(20, (2000 / size) * 0.02 * 80)); // More visible heights
            
            return (
              <motion.div
                key={size}
                className={`w-6 rounded-t-lg ${
                  isActive 
                    ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' 
                    : 'bg-gradient-to-t from-gray-600 to-gray-500'
                }`}
                style={{ height: `${height}px`, maxHeight: '80px' }}
                animate={{ 
                  height: `${height}px`,
                  scale: isActive ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </div>
        
        {/* Current position indicator */}
        <motion.div
          className="absolute bottom-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"
          style={{ 
            left: `${2 + (currentIndex / (sizes.length - 1)) * 92}%`,
            transform: 'translateX(-50%)'
          }}
          animate={{ 
            left: `${2 + (currentIndex / (sizes.length - 1)) * 92}%`
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400">{metrics.baseTPS.toFixed(1)} tok/s</div>
        <div className="text-sm text-gray-300">Current Performance</div>
      </div>
    </motion.div>
  );
}