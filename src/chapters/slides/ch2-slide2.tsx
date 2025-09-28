import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide2: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">What are Small Language Models?</h1>
        <p className="slide-subtitle">Miniature Powerhouses of AI</p>
      </div>

      <div className="slide-content">
        <div className="content-grid">
          <div className="text-content">
            <motion.div
              className="icon-large"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              🔬
            </motion.div>
            
            <motion.h2
              className="section-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Definition
            </motion.h2>
            
            <motion.p
              className="description"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Small Language Models (SLMs) are AI models with fewer than 10 billion parameters, 
              designed to be efficient, fast, and deployable on consumer hardware.
            </motion.p>

            <motion.div
              className="features-list"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Fast inference</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💾</span>
                <span>Low memory usage</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Privacy-focused</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>Mobile-friendly</span>
              </div>
            </motion.div>
          </div>

          <div className="visual-content">
            <motion.div
              className="model-comparison"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="model-box large-model">
                <div className="model-label">Large Model</div>
                <div className="model-size">100B+ params</div>
                <div className="model-icon">🏢</div>
              </div>
              
              <div className="arrow">→</div>
              
              <div className="model-box small-model">
                <div className="model-label">Small Model</div>
                <div className="model-size">1-10B params</div>
                <div className="model-icon">🏠</div>
              </div>
            </motion.div>
          </div>
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
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 60vh;
        }
        
        .text-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .icon-large {
          font-size: 4rem;
          text-align: center;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        
        .description {
          font-size: 1.2rem;
          color: #d1d5db;
          line-height: 1.6;
        }
        
        .features-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
        }
        
        .feature-icon {
          font-size: 1.5rem;
        }
        
        .visual-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .model-comparison {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .model-box {
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          min-width: 150px;
        }
        
        .large-model {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .small-model {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .model-label {
          color: white;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .model-size {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .model-icon {
          font-size: 2rem;
        }
        
        .arrow {
          font-size: 2rem;
          color: #06b6d4;
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
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .features-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Ch2Slide2;
