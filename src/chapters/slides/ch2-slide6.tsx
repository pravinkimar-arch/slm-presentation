import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide6: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">SLM vs LLM</h1>
        <p className="slide-subtitle">David and Goliath of AI</p>
      </div>

      <div className="slide-content">
        <div className="comparison-container">
          <motion.div
            className="comparison-table"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="comparison-header">
              <div className="comparison-cell header">Feature</div>
              <div className="comparison-cell header slm">Small Language Model</div>
              <div className="comparison-cell header llm">Large Language Model</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Parameters</div>
              <div className="comparison-cell slm">1M - 10B</div>
              <div className="comparison-cell llm">100B+</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Memory</div>
              <div className="comparison-cell slm">1GB - 20GB</div>
              <div className="comparison-cell llm">100GB+</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Speed</div>
              <div className="comparison-cell slm">Fast</div>
              <div className="comparison-cell llm">Slow</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Cost</div>
              <div className="comparison-cell slm">Low</div>
              <div className="comparison-cell llm">High</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Deployment</div>
              <div className="comparison-cell slm">Local/Edge</div>
              <div className="comparison-cell llm">Cloud Only</div>
            </div>
            
            <div className="comparison-row">
              <div className="comparison-cell">Privacy</div>
              <div className="comparison-cell slm">High</div>
              <div className="comparison-cell llm">Low</div>
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
        
        .comparison-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }
        
        .comparison-table {
          width: 100%;
          max-width: 800px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .comparison-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .comparison-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .comparison-cell {
          padding: 1.5rem;
          color: white;
          font-weight: 500;
        }
        
        .comparison-cell.header {
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .comparison-cell.slm {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .comparison-cell.llm {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
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

export default Ch2Slide6;
