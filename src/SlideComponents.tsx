import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mermaid from "mermaid";

// Helper function
function prettyMB(x) {
  if (x < 1024) return `${x.toFixed(1)} MB`;
  return `${(x/1024).toFixed(2)} GB`;
}

// 4. Characteristics of SLMs
export function CharacteristicsSlide({ slide }) {
  const characteristics = [
    {
      category: "Size",
      icon: "📏",
      items: [
        { label: "Parameters", value: "< 1B", highlight: true },
        { label: "Download Size", value: "50MB - 2GB" },
        { label: "Memory Usage", value: "< 4GB RAM" }
      ]
    },
    {
      category: "Performance",
      icon: "⚡",
      items: [
        { label: "Inference Speed", value: "Real-time", highlight: true },
        { label: "First Token", value: "< 200ms" },
        { label: "Throughput", value: "40-100 tok/s" }
      ]
    },
    {
      category: "Deployment",
      icon: "🚀",
      items: [
        { label: "Platform", value: "Edge devices", highlight: true },
        { label: "Requirements", value: "CPU/Mobile GPU" },
        { label: "Connectivity", value: "Offline capable" }
      ]
    },
    {
      category: "Capabilities",
      icon: "🎯",
      items: [
        { label: "Tasks", value: "Specialized", highlight: true },
        { label: "Context", value: "1K-8K tokens" },
        { label: "Languages", value: "Multilingual" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        className="text-center mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characteristics.map((char, index) => (
          <motion.div
            key={char.category}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="text-center mb-4">
              <motion.div 
                className="text-4xl mb-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {char.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white">{char.category}</h3>
            </div>
            
            <div className="space-y-3">
              {char.items.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`flex justify-between items-center p-2 rounded-lg ${
                    item.highlight ? 'bg-white/10 border border-cyan-500/50' : ''
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + i * 0.1 }}
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <span className={`font-semibold ${
                    item.highlight ? 'text-cyan-300' : 'text-white'
                  }`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive size comparison */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-gray-400 mb-4">Model Size Comparison</p>
        <div className="flex justify-center items-end gap-4">
          <motion.div
            className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
            style={{ width: '80px', height: '200px' }}
            initial={{ height: 0 }}
            animate={{ height: '200px' }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="text-white text-center pt-2">
              <div className="text-xs">LLM</div>
              <div className="text-sm font-bold">7B+</div>
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg"
            style={{ width: '80px', height: '40px' }}
            initial={{ height: 0 }}
            animate={{ height: '40px' }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            <div className="text-white text-center pt-2">
              <div className="text-xs">SLM</div>
              <div className="text-sm font-bold">&lt;1B</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// 7. SLM Workflow & Key Components - Custom SVG implementation (most reliable)
export function ArchitectureSlide({ slide }) {
  const components = [
    { id: 'td', title: 'Training Data', icon: '📊', x: 180, y: 180, cluster: 'training', width: 220, height: 100 },
    { id: 'ta', title: 'Transformer Architecture', icon: '🔄', x: 180, y: 450, cluster: 'training', width: 220, height: 120 },
    { id: 'ft', title: 'Fine-Tuning', icon: '🎯', x: 660, y: 170, cluster: 'finetuning', width: 200, height: 100 },
    { id: 'ed', title: 'External Data', icon: '🌐', x: 960, y: 170, cluster: 'finetuning', width: 200, height: 100 },
    { id: 'slm', title: 'Small\nLanguage Model', icon: '🧠', x: 660, y: 450, cluster: 'core', width: 280, height: 130 },
    { id: 'mobile', title: 'Mobile / App', icon: '📱', x: 1080, y: 445, cluster: 'deployment', width: 240, height: 100 }
  ];

  const connections = [
    { from: 'td', to: 'ta', label: '', color: '#06b6d4', delay: 1 },
    { from: 'ta', to: 'slm', label: 'Training Small\nLanguage Model', color: '#8b5cf6', delay: 1.5 },
    { from: 'ed', to: 'ft', label: '', color: '#06b6d4', delay: 2 },
    { from: 'ft', to: 'slm', label: 'Fine-tuned for\nspecific task', color: '#8b5cf6', delay: 2.5 },
    { from: 'mobile', to: 'slm', label: 'User Prompt', color: '#10b981', delay: 3, bidirectional: true },
    { from: 'slm', to: 'mobile', label: 'SLM Response', color: '#f59e0b', delay: 3.5 }
  ];

  const getComponent = (id) => components.find(c => c.id === id);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        className="text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      {/* Custom SVG Workflow Diagram */}
      <motion.div 
        className="h-[620px] bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg viewBox="0 0 1280 520" className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
            </marker>
            <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker id="arrowhead-orange" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
          </defs>

          {/* Cluster frames with more space */}
          <motion.rect
            x="50" y="70" width="280" height="480" rx="28"
            fill="rgba(59, 130, 246, 0.08)" stroke="#06b6d4" strokeWidth="2" strokeDasharray="10,5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <motion.text x="55" y="50" fill="#06b6d4" fontSize="22" fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🏗️ Transformer Architecture
          </motion.text>

          <motion.rect
            x="450" y="70" width="760" height="200" rx="28"
            fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="10,5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.text x="750" y="50" fill="#8b5cf6" fontSize="22" fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            🎯 Fine-Tuning
          </motion.text>

          {/* Connection lines with better spacing */}
          {connections.map((conn, index) => {
            const from = getComponent(conn.from);
            const to = getComponent(conn.to);
            if (!from || !to) return null;

          // Calculate clean connection points based on box size
          let x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y;
          const fromRight = from.x + from.width / 2;
          const fromLeft = from.x - from.width / 2;
          const fromBottom = from.y + from.height / 2;
          const toRight = to.x + to.width / 2;
          const toLeft = to.x - to.width / 2;
          const toTop = to.y - to.height / 2;

          if (conn.from === 'td' && conn.to === 'ta') {
            // Vertical: Training Data -> Transformer
            x1 = from.x; y1 = fromBottom;
            x2 = to.x; y2 = toTop;
          } else if (conn.from === 'ed' && conn.to === 'ft') {
            // Horizontal: External Data -> Fine-Tuning
            x1 = fromLeft; y1 = from.y;
            x2 = toRight; y2 = to.y;
          } else if (conn.from === 'ta' && conn.to === 'slm') {
            // Horizontal: Transformer -> SLM
            x1 = fromRight; y1 = from.y;
            x2 = toLeft; y2 = to.y;
          } else if (conn.from === 'ft' && conn.to === 'slm') {
            // Vertical/diagonal: Fine-Tuning -> SLM
            x1 = from.x; y1 = fromBottom;
            x2 = to.x; y2 = toTop;
          } else if (conn.from === 'mobile' && conn.to === 'slm') {
            // Horizontal: Mobile -> SLM (User Prompt) — keep perfectly parallel using midline
            const yMid = (from.y + to.y) / 2;
            x1 = fromLeft; y1 = yMid - 14;
            x2 = toRight; y2 = yMid - 14;
          } else if (conn.from === 'slm' && conn.to === 'mobile') {
            // Horizontal: SLM -> Mobile (Response) — arrowhead at Mobile side, parallel to above
            const yMid = (from.y + to.y) / 2;
            x1 = fromRight; y1 = yMid + 14;
            x2 = toLeft; y2 = yMid + 14;
          }

            const markerId = conn.color === '#8b5cf6' ? 'arrowhead-purple' :
                           conn.color === '#10b981' ? 'arrowhead-green' :
                           conn.color === '#f59e0b' ? 'arrowhead-orange' : 'arrowhead';

            return (
              <g key={index}>
                <motion.line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={conn.color}
                  strokeWidth="2.5"
                  markerEnd={`url(#${markerId})`}
                  strokeDasharray={conn.bidirectional ? "6,3" : "none"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ delay: conn.delay, duration: 1.2, ease: "easeInOut" }}
                />
                {conn.label && (
                  <motion.text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2 + (
                      (conn.from === 'mobile' && conn.to === 'slm') ? -18 :
                      (conn.from === 'slm' && conn.to === 'mobile') ? 18 :
                      (conn.from === 'ta' && conn.to === 'slm') ? -22 :
                      -15
                    )}
                    textAnchor="middle" fill={conn.color}
                    fontSize="11" fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: conn.delay + 0.6 }}
                  >
                    {conn.label.split('\n').map((line, i) => (
                      <tspan key={i} x={(x1 + x2) / 2} dy={i === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* Components with better spacing */}
          {components.map((comp, index) => (
            <g key={comp.id}>
              <motion.rect
                x={comp.x - comp.width/2} y={comp.y - comp.height/2} 
                width={comp.width} height={comp.height} rx="15"
                fill={comp.cluster === 'training' ? 'rgba(59, 130, 246, 0.3)' :
                      comp.cluster === 'finetuning' ? 'rgba(139, 92, 246, 0.3)' :
                      comp.cluster === 'core' ? 'rgba(6, 182, 212, 0.4)' :
                      'rgba(16, 185, 129, 0.3)'}
                stroke={comp.cluster === 'training' ? '#06b6d4' :
                        comp.cluster === 'finetuning' ? '#8b5cf6' :
                        comp.cluster === 'core' ? '#06b6d4' :
                        '#10b981'}
                strokeWidth={comp.cluster === 'core' ? "3" : "2"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 + 1, duration: 0.6, type: "spring" }}
              />
              <motion.text
                x={comp.x} y={comp.y - 8}
                textAnchor="middle" fill="white"
                fontSize="20" fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 1.2 }}
              >
                {comp.icon}
              </motion.text>
              <motion.text
                x={comp.x} y={comp.y + 16}
                textAnchor="middle" fill="white"
                fontSize={comp.id === 'td' ? 16 : 16} fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 1.4 }}
              >
                {comp.title.split('\n').map((line, i) => (
                  <tspan key={i} x={comp.x} dy={i === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </motion.text>
            </g>
          ))}

          {/* Animated particles following the exact arrow paths for all connections */}
          {connections.map((conn, index) => {
            const from = getComponent(conn.from);
            const to = getComponent(conn.to);
            if (!from || !to) return null;

            // Derive start/end matching the line routing (including vertical nudges)
            let startX = from.x, startY = from.y, endX = to.x, endY = to.y;
            const fromRight = from.x + from.width / 2;
            const fromLeft = from.x - from.width / 2;
            const fromBottom = from.y + from.height / 2;
            const toRight = to.x + to.width / 2;
            const toLeft = to.x - to.width / 2;
            const toTop = to.y - to.height / 2;

            if (conn.from === 'td' && conn.to === 'ta') {
              // Vertical: bottom of TD to top of TA, nudge outside boxes
              startX = from.x; startY = fromBottom + 4;
              endX = to.x; endY = toTop - 4;
            } else if (conn.from === 'ed' && conn.to === 'ft') {
              // Horizontal: left of ED to right of FT, nudge outside boxes
              startX = fromLeft - 4; startY = from.y;
              endX = toRight + 4; endY = to.y;
            } else if (conn.from === 'ta' && conn.to === 'slm') {
              // Horizontal: right of TA to left of SLM, nudge outside boxes
              startX = fromRight + 4; startY = from.y;
              endX = toLeft - 4; endY = to.y;
            } else if (conn.from === 'ft' && conn.to === 'slm') {
              // Vertical: bottom of FT to top of SLM, nudge outside boxes
              startX = from.x; startY = fromBottom + 4;
              endX = to.x; endY = toTop - 4;
            } else if (conn.from === 'mobile' && conn.to === 'slm') {
              // Particle path: Mobile -> SLM at midline - 14, nudged outside boxes
              const yMid = (from.y + to.y) / 2;
              startX = fromLeft - 4; startY = yMid - 14;
              endX = toRight + 4; endY = yMid - 14;
            } else if (conn.from === 'slm' && conn.to === 'mobile') {
              // Particle path: SLM -> Mobile at midline + 14, nudged outside boxes
              const yMid = (from.y + to.y) / 2;
              startX = fromRight + 4; startY = yMid + 14;
              endX = toLeft - 4; endY = yMid + 14;
            }

            const duration = conn.from === 'mobile' || conn.to === 'mobile' ? 2.0 : 2.5;

            return (
              <motion.circle
                key={`particle-${index}`}
                r="6" fill={conn.color} opacity="0.85"
                initial={{ cx: startX, cy: startY, opacity: 0 }}
                animate={{
                  cx: [startX, endX],
                  cy: [startY, endY],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  delay: conn.delay + 0.5,
                  duration,
                  repeat: Infinity,
                  repeatDelay: 1.0,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Key Components Summary */}
      <motion.div
        className="mt-6 grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <h3 className="text-lg font-bold text-cyan-300 mb-2">🏗️ Training Phase</h3>
          <ul className="text-gray-200 text-sm space-y-1">
            <li>• Large-scale pre-training</li>
            <li>• Knowledge distillation</li>
            <li>• Architecture optimization</li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <h3 className="text-lg font-bold text-green-300 mb-2">🎯 Fine-tuning Phase</h3>
          <ul className="text-gray-200 text-sm space-y-1">
            <li>• Task-specific adaptation</li>
            <li>• Domain expertise injection</li>
            <li>• Performance optimization</li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <h3 className="text-lg font-bold text-purple-300 mb-2">🚀 Deployment Phase</h3>
          <ul className="text-gray-200 text-sm space-y-1">
            <li>• Edge device optimization</li>
            <li>• Real-time inference</li>
            <li>• User interaction</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// 8. Use Cases - Animated illustrations
export function UseCasesSlide({ slide }) {
  const useCases = [
    {
      title: "Smart Assistants",
      icon: "🤖",
      description: "Personal AI assistants on mobile devices",
      animation: "float",
      examples: ["Voice commands", "Smart replies", "Task automation"]
    },
    {
      title: "Code Completion",
      icon: "💻",
      description: "Real-time code suggestions in IDEs",
      animation: "pulse",
      examples: ["Autocomplete", "Bug detection", "Refactoring"]
    },
    {
      title: "Document Processing",
      icon: "📄",
      description: "Summarization and analysis on-device",
      animation: "bounce",
      examples: ["Summarization", "Classification", "Extraction"]
    },
    {
      title: "IoT & Edge",
      icon: "🏭",
      description: "Smart sensors and edge computing",
      animation: "rotate",
      examples: ["Anomaly detection", "Predictive maintenance", "Quality control"]
    },
    {
      title: "Healthcare",
      icon: "🏥",
      description: "Private medical data analysis",
      animation: "scale",
      examples: ["Symptom checker", "Medical transcription", "Patient monitoring"]
    },
    {
      title: "Education",
      icon: "🎓",
      description: "Personalized learning assistants",
      animation: "slide",
      examples: ["Tutoring", "Quiz generation", "Language learning"]
    }
  ];

  const getAnimation = (type) => {
    switch(type) {
      case 'float':
        return { y: [-10, 10, -10], transition: { duration: 3, repeat: Infinity } };
      case 'pulse':
        return { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } };
      case 'bounce':
        return { y: [0, -20, 0], transition: { duration: 1.5, repeat: Infinity } };
      case 'rotate':
        return { rotate: [0, 360], transition: { duration: 20, repeat: Infinity, ease: "linear" } };
      case 'scale':
        return { scale: [1, 1.05, 1], opacity: [1, 0.8, 1], transition: { duration: 2.5, repeat: Infinity } };
      case 'slide':
        return { x: [-5, 5, -5], transition: { duration: 3, repeat: Infinity } };
      default:
        return {};
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        className="text-center mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <motion.div
            key={useCase.title}
            className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 40%, #10b981 0%, transparent 50%)",
                  "radial-gradient(circle at 60% 80%, #f59e0b 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Animated border pulse */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2"
              animate={{
                borderColor: [
                  "rgba(6, 182, 212, 0.3)",
                  "rgba(139, 92, 246, 0.3)", 
                  "rgba(16, 185, 129, 0.3)",
                  "rgba(245, 158, 11, 0.3)",
                  "rgba(6, 182, 212, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div 
                className="text-5xl mb-4"
                animate={getAnimation(useCase.animation)}
              >
                {useCase.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-300 mb-4">{useCase.description}</p>
              
              <div className="space-y-2">
                {useCase.examples.map((example, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + i * 0.1 }}
                  >
                    <span className="text-cyan-400">▸</span>
                    {example}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated particles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * 300, 
                  y: Math.random() * 200,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 300,
                  y: Math.random() * 200,
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-gray-400">
          SLMs are revolutionizing how we interact with AI - making it personal, private, and powerful
        </p>
      </motion.div>
    </div>
  );
}

// Rename ControlsSlide to ConfigurationSlide
export function ConfigurationSlide({ slide, paramsM, setParamsM, contextLen, setContextLen, device, setDevice, quantBits, setQuantBits, metrics }) {
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
                <div className="text-2xl font-bold text-cyan-300 min-w-20">{paramsM}M</div>
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
                <div className="text-2xl font-bold text-emerald-300 min-w-20">{contextLen}</div>
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
                <option value="Browser (Desktop WebGPU)" className="bg-gray-800">Browser (Desktop WebGPU)</option>
                <option value="Mobile (WebGPU/Metal via PWA)" className="bg-gray-800">Mobile (WebGPU/Metal via PWA)</option>
                <option value="Server (GPU / A10+)" className="bg-gray-800">Server (GPU / A10+)</option>
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

        {/* Visualization Panel */}
        <div className="xl:col-span-2 lg:col-span-1 space-y-6">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Impact on Performance</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold text-yellow-400"
                  key={metrics.baseTPS}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {metrics.baseTPS.toFixed(1)}
                </motion.div>
                <p className="text-gray-300">Tokens/sec</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold text-green-400"
                  key={metrics.memMB}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {metrics.memMB < 1024 ? `${metrics.memMB.toFixed(0)}MB` : `${(metrics.memMB/1024).toFixed(1)}GB`}
                </motion.div>
                <p className="text-gray-300">Memory</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold text-blue-400"
                  key={metrics.downloadMB}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {metrics.downloadMB < 1024 ? `${metrics.downloadMB.toFixed(0)}MB` : `${(metrics.downloadMB/1024).toFixed(1)}GB`}
                </motion.div>
                <p className="text-gray-300">Download</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold text-purple-400"
                  key={metrics.ttfbMs}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {Math.round(metrics.ttfbMs)}ms
                </motion.div>
                <p className="text-gray-300">First Token</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Configuration Summary</h3>
            <p className="text-gray-300">
              Your {paramsM}M parameter model with {contextLen} token context window 
              {quantBits === 4 ? ' (4-bit quantized)' : ' (16-bit precision)'} will:
            </p>
            <ul className="mt-4 space-y-2 text-gray-200">
              <motion.li className="flex items-start gap-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.3 }}>
                <span className="text-green-400">✓</span>
                Process approximately {metrics.baseTPS.toFixed(1)} tokens per second
              </motion.li>
              <motion.li className="flex items-start gap-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.4 }}>
                <span className="text-green-400">✓</span>
                Require {metrics.memMB < 1024 ? `${metrics.memMB.toFixed(0)} MB` : `${(metrics.memMB/1024).toFixed(1)} GB`} of memory
              </motion.li>
              <motion.li className="flex items-start gap-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5 }}>
                <span className="text-green-400">✓</span>
                Download size of {metrics.downloadMB < 1024 ? `${metrics.downloadMB.toFixed(0)} MB` : `${(metrics.downloadMB/1024).toFixed(1)} GB`}
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 6. SLM vs LLM Comparison - Enhanced with animations
export function ComparisonSlide({ slide, paramsM, metrics, llmCompare, badges }) {
  const comparisonData = [
    {
      category: "Model Size",
      slm: `${paramsM}M params`,
      llm: "7B+ params",
      slmColor: "text-cyan-400",
      llmColor: "text-purple-400",
      slmBar: (paramsM / 7000) * 100,
      llmBar: 100
    },
    {
      category: "Speed",
      slm: `${metrics.baseTPS.toFixed(1)} tok/s`,
      llm: `${llmCompare.tps.toFixed(1)} tok/s`,
      slmColor: "text-green-400",
      llmColor: "text-red-400",
      slmBar: (metrics.baseTPS / Math.max(metrics.baseTPS, llmCompare.tps)) * 100,
      llmBar: (llmCompare.tps / Math.max(metrics.baseTPS, llmCompare.tps)) * 100
    },
    {
      category: "Download Size",
      slm: prettyMB(metrics.downloadMB),
      llm: prettyMB(llmCompare.dlMB),
      slmColor: "text-emerald-400",
      llmColor: "text-orange-400",
      slmBar: (metrics.downloadMB / llmCompare.dlMB) * 100,
      llmBar: 100
    },
    {
      category: "Memory Usage",
      slm: prettyMB(metrics.memMB),
      llm: "32GB+",
      slmColor: "text-blue-400",
      llmColor: "text-pink-400",
      slmBar: (metrics.memMB / 32768) * 100,
      llmBar: 100
    },
    {
      category: "Deployment",
      slm: "Edge/Browser",
      llm: "Cloud/Server",
      slmColor: "text-teal-400",
      llmColor: "text-indigo-400",
      slmBar: 0,
      llmBar: 0,
      noBar: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        className="text-center mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
        <p className="text-2xl text-gray-300">{slide.subtitle}</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Visual Comparison */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
              {/* David (SLM) */}
              <motion.circle
                cx="100"
                cy="200"
                r="40"
                fill="#06b6d4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              />
              <motion.text
                x="100"
                y="210"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                SLM
              </motion.text>
              
              {/* Goliath (LLM) */}
              <motion.circle
                cx="300"
                cy="200"
                r="120"
                fill="#8b5cf6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              />
              <motion.text
                x="300"
                y="210"
                textAnchor="middle"
                fill="white"
                fontSize="40"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                LLM
              </motion.text>

              {/* VS indicator */}
              <motion.text
                x="200"
                y="200"
                textAnchor="middle"
                fill="#fff"
                fontSize="30"
                fontWeight="bold"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                VS
              </motion.text>
            </svg>
          </motion.div>

          {/* Comparison bars */}
          <div className="relative z-10 space-y-6 pt-8">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                </div>
                
                {!item.noBar ? (
                  <div className="relative">
                    {/* SLM Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-300">SLM</span>
                        <span className={`font-bold ${item.slmColor}`}>{item.slm}</span>
                      </div>
                      <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-cyan-500 to-cyan-400`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.slmBar}%` }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                        />
                      </div>
                    </div>
                    
                    {/* LLM Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-300">LLM</span>
                        <span className={`font-bold ${item.llmColor}`}>{item.llm}</span>
                      </div>
                      <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-purple-500 to-purple-400`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.llmBar}%` }}
                          transition={{ delay: 0.7 + index * 0.2, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="bg-cyan-500/20 border border-cyan-400 rounded-xl p-3 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`font-bold ${item.slmColor}`}>{item.slm}</span>
                    </motion.div>
                    <motion.div
                      className="bg-purple-500/20 border border-purple-400 rounded-xl p-3 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`font-bold ${item.llmColor}`}>{item.llm}</span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">SLM Advantages</h3>
            <div className="space-y-3">
              {[
                { icon: "⚡", text: "Lightning-fast inference speed" },
                { icon: "🔒", text: "Complete privacy - runs locally" },
                { icon: "💰", text: "Zero API costs" },
                { icon: "📱", text: "Works on mobile & edge devices" },
                { icon: "🌐", text: "No internet required" }
              ].map((advantage, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  <span className="text-2xl">{advantage.icon}</span>
                  <span className="text-gray-200">{advantage.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">LLM Advantages</h3>
            <div className="space-y-3">
              {[
                { icon: "🧠", text: "Superior general knowledge" },
                { icon: "📚", text: "Complex reasoning abilities" },
                { icon: "🎨", text: "Creative content generation" },
                { icon: "🌍", text: "Broad language understanding" },
                { icon: "🔧", text: "Multi-task capabilities" }
              ].map((advantage, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 + i * 0.1 }}
                >
                  <span className="text-2xl">{advantage.icon}</span>
                  <span className="text-gray-200">{advantage.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-6 border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <p className="text-center text-white font-semibold">
              Choose SLMs for speed, privacy, and edge deployment.
              Choose LLMs for complex tasks and general intelligence.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
