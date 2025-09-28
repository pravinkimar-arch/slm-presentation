import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide7: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">SLM Workflow & Key Components</h1>
        <p className="slide-subtitle">How Small Language Models Operate</p>
      </div>

      <div className="slide-content">
        <div className="workflow-container">
          <motion.div
            className="workflow-steps"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Input Processing</h3>
                <p>Tokenize and encode user input</p>
              </div>
            </div>
            
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Context Understanding</h3>
                <p>Analyze context and intent</p>
              </div>
            </div>
            
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Generation</h3>
                <p>Generate response tokens</p>
              </div>
            </div>
            
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Output</h3>
                <p>Decode and return response</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="components-grid"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="component-item">
              <div className="component-icon">🧠</div>
              <h3>Transformer</h3>
              <p>Core architecture</p>
            </div>
            <div className="component-item">
              <div className="component-icon">📚</div>
              <h3>Embeddings</h3>
              <p>Word representations</p>
            </div>
            <div className="component-item">
              <div className="component-icon">⚡</div>
              <h3>Attention</h3>
              <p>Focus mechanism</p>
            </div>
            <div className="component-item">
              <div className="component-icon">🎯</div>
              <h3>Output Layer</h3>
              <p>Prediction head</p>
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
        
        .workflow-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .workflow-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .workflow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          min-width: 200px;
          text-align: center;
        }
        
        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        
        .step-content h3 {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .step-content p {
          color: #d1d5db;
          font-size: 0.9rem;
        }
        
        .workflow-arrow {
          font-size: 2rem;
          color: #06b6d4;
          font-weight: bold;
        }
        
        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .component-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .component-item:hover {
          transform: translateY(-5px);
        }
        
        .component-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .component-item h3 {
          font-size: 1.3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .component-item p {
          color: #d1d5db;
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
          .workflow-steps {
            flex-direction: column;
          }
          
          .workflow-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Ch2Slide7;
