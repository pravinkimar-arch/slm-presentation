import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide3: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">Why We Need SLMs</h1>
        <p className="slide-subtitle">The Key Benefits of Going Small</p>
      </div>

      <div className="slide-content">
        <div className="benefits-grid">
          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="benefit-icon">⚡</div>
            <h3 className="benefit-title">Speed</h3>
            <p className="benefit-description">
              Lightning-fast inference with minimal latency for real-time applications
            </p>
          </motion.div>

          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="benefit-icon">💰</div>
            <h3 className="benefit-title">Cost-Effective</h3>
            <p className="benefit-description">
              Significantly lower computational costs and infrastructure requirements
            </p>
          </motion.div>

          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="benefit-icon">🔒</div>
            <h3 className="benefit-title">Privacy</h3>
            <p className="benefit-description">
              Run locally without sending data to external servers
            </p>
          </motion.div>

          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="benefit-icon">📱</div>
            <h3 className="benefit-title">Accessibility</h3>
            <p className="benefit-description">
              Deploy on mobile devices, edge computing, and consumer hardware
            </p>
          </motion.div>

          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="benefit-icon">🌱</div>
            <h3 className="benefit-title">Sustainability</h3>
            <p className="benefit-description">
              Lower energy consumption and carbon footprint
            </p>
          </motion.div>

          <motion.div
            className="benefit-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="benefit-icon">🎯</div>
            <h3 className="benefit-title">Specialization</h3>
            <p className="benefit-description">
              Fine-tuned for specific tasks and domains
            </p>
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
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .benefit-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .benefit-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        
        .benefit-description {
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

export default Ch2Slide3;
