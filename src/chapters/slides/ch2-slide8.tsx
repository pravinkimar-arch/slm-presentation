import React from 'react';
import { motion } from 'framer-motion';

const Ch2Slide8: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="slide-title">SLM Use Cases</h1>
        <p className="slide-subtitle">Real-World Applications</p>
      </div>

      <div className="slide-content">
        <div className="use-cases-container">
          <motion.div
            className="use-cases-grid"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="use-case-card">
              <div className="use-case-icon">📱</div>
              <h3>Mobile Apps</h3>
              <p>On-device AI for smartphones and tablets</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🏠</div>
              <h3>Smart Home</h3>
              <p>Local voice assistants and automation</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🏥</div>
              <h3>Healthcare</h3>
              <p>Medical diagnosis and patient monitoring</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🎓</div>
              <h3>Education</h3>
              <p>Personalized learning and tutoring</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🏭</div>
              <h3>Industrial IoT</h3>
              <p>Edge computing for manufacturing</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🚗</div>
              <h3>Autonomous Vehicles</h3>
              <p>Real-time decision making</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🔒</div>
              <h3>Privacy-Critical</h3>
              <p>Secure communication and data processing</p>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🌐</div>
              <h3>Edge Computing</h3>
              <p>Distributed AI at the network edge</p>
            </div>
          </motion.div>

          <motion.div
            className="conclusion"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="conclusion-title">The Future is Small</h3>
            <p className="conclusion-text">
              Small Language Models represent the democratization of AI, 
              bringing powerful capabilities to everyday devices and applications.
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
        
        .use-cases-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .use-case-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .use-case-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .use-case-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .use-case-card h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        
        .use-case-card p {
          color: #d1d5db;
          line-height: 1.6;
        }
        
        .conclusion {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          padding: 3rem;
          margin-top: 2rem;
        }
        
        .conclusion-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .conclusion-text {
          font-size: 1.3rem;
          color: #d1d5db;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
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

export default Ch2Slide8;
