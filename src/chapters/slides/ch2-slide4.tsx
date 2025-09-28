import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide4: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">Characteristics of SLMs</h1>
        <p className="slide-subtitle">What Makes a Model 'Small'?</p>
      </div>

      <div className="slide-content">
        <div className="characteristics-container">
          <div className="characteristics-grid">
            <motion.div
              className="characteristic-item"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="characteristic-icon">📏</div>
              <h3>Parameter Count</h3>
              <p>1M - 10B parameters</p>
            </motion.div>

            <motion.div
              className="characteristic-item"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="characteristic-icon">💾</div>
              <h3>Memory Usage</h3>
              <p>1GB - 20GB RAM</p>
            </motion.div>

            <motion.div
              className="characteristic-item"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="characteristic-icon">⚡</div>
              <h3>Inference Speed</h3>
              <p>10-100 tokens/sec</p>
            </motion.div>

            <motion.div
              className="characteristic-item"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="characteristic-icon">🎯</div>
              <h3>Task Focus</h3>
              <p>Specialized domains</p>
            </motion.div>
          </div>

          <motion.div
            className="size-comparison"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <h3 className="comparison-title">Size Comparison</h3>
            <div className="size-bars">
              <div className="size-bar small">
                <span className="bar-label">SLM</span>
                <div className="bar-fill" style={{ width: '20%' }}></div>
                <span className="bar-value">1-10B</span>
              </div>
              <div className="size-bar medium">
                <span className="bar-label">Medium</span>
                <div className="bar-fill" style={{ width: '50%' }}></div>
                <span className="bar-value">10-100B</span>
              </div>
              <div className="size-bar large">
                <span className="bar-label">LLM</span>
                <div className="bar-fill" style={{ width: '100%' }}></div>
                <span className="bar-value">100B+</span>
              </div>
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
        
        .characteristics-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .characteristics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .characteristic-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
        }
        
        .characteristic-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .characteristic-item h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .characteristic-item p {
          color: #d1d5db;
          font-size: 1.1rem;
        }
        
        .size-comparison {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          padding: 2rem;
        }
        
        .comparison-title {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .size-bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .size-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
        }
        
        .bar-label {
          min-width: 80px;
          color: white;
          font-weight: bold;
        }
        
        .bar-fill {
          height: 20px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          border-radius: 10px;
          transition: width 2s ease;
        }
        
        .bar-value {
          color: #d1d5db;
          font-weight: bold;
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

export default Ch2Slide4;
