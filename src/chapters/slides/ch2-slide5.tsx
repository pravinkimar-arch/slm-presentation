import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide5: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">Model Configuration</h1>
        <p className="slide-subtitle">How Size Affects Everything</p>
      </div>

      <div className="slide-content">
        <div className="config-container">
          <motion.div
            className="config-grid"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="config-item">
              <div className="config-icon">🧠</div>
              <h3>Architecture</h3>
              <p>Transformer-based with optimized layers</p>
            </div>
            <div className="config-item">
              <div className="config-icon">📚</div>
              <h3>Training Data</h3>
              <p>Curated, high-quality datasets</p>
            </div>
            <div className="config-item">
              <div className="config-icon">⚙️</div>
              <h3>Optimization</h3>
              <p>Quantization and pruning techniques</p>
            </div>
            <div className="config-item">
              <div className="config-icon">🎯</div>
              <h3>Fine-tuning</h3>
              <p>Task-specific adaptation</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .slide {
          display: none;
          animation: slideIn 0.5s ease-in-out;
        }
        
        .slide.active {
          display: block;
        }
        
        .slide-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .slide-title {
          font-size: 3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .slide-subtitle {
          font-size: 1.5rem;
          color: #a1a1aa;
          margin-bottom: 2rem;
        }
        
        .slide-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .config-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }
        
        .config-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 800px;
        }
        
        .config-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .config-item:hover {
          transform: translateY(-5px);
        }
        
        .config-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .config-item h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        
        .config-item p {
          color: #d1d5db;
          line-height: 1.6;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Ch2Slide5;
