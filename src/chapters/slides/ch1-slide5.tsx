import React from 'react';

const Ch1Slide5: React.FC = () => {
  const animateStep = (element: HTMLElement) => {
    // Reset all steps
    document.querySelectorAll('.flow-step').forEach(step => {
      (step as HTMLElement).style.transform = '';
      (step as HTMLElement).style.boxShadow = '0 4px 15px rgba(75, 0, 130, 0.4)';
    });
    
    // Animate current step
    element.style.transform = 'scale(1.1)';
    element.style.boxShadow = '0 8px 25px rgba(32, 178, 170, 0.5)';
  };

  const highlightCard = (element: HTMLElement) => {
    // Remove previous highlights
    document.querySelectorAll('.comparison-card').forEach(card => {
      (card as HTMLElement).style.border = '1px solid rgba(245, 245, 245, 0.3)';
      (card as HTMLElement).style.transform = '';
    });
    
    // Highlight current card
    element.style.border = '2px solid #20B2AA';
    element.style.transform = 'translateY(-5px)';
    
    // Add pulse animation
    element.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  };

  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">Machine Learning</h1>
        <p className="sub-slide-subtitle">Data + Output → Learns Rules</p>
      </div>

      <div className="content-grid">
        <div className="comparison-card" onClick={(e) => highlightCard(e.currentTarget)}>
          <h3>How It Works</h3>
          <div className="flow-diagram">
            <div className="flow-step" onClick={(e) => animateStep(e.currentTarget)}>
              <i className="fas fa-database"></i>
              <span>Input Data</span>
            </div>
            <div className="arrow">+</div>
            <div className="flow-step" onClick={(e) => animateStep(e.currentTarget)}>
              <i className="fas fa-target"></i>
              <span>Expected Output</span>
            </div>
            <div className="arrow">→</div>
            <div className="flow-step" onClick={(e) => animateStep(e.currentTarget)}>
              <i className="fas fa-brain"></i>
              <span>Algorithm learns Rules</span>
            </div>
            <div className="arrow">→</div>
            <div className="flow-step" onClick={(e) => animateStep(e.currentTarget)}>
              <i className="fas fa-crystal-ball"></i>
              <span>Predictions</span>
            </div>
          </div>
        </div>

        <div className="script-section">
          <h3 className="script-title">The ML Way</h3>
          <p className="script-text">
            But in machine learning, instead of writing rules, you feed the system examples of emails labeled spam or not spam, and the algorithm figures out the rules on its own.
          </p>
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
          animation: slideInDown 1s ease-out;
        }

        .sub-slide-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #F5F5F5, #20B2AA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
        }

        .sub-slide-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
          text-align: center;
          margin-bottom: 2rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        .comparison-card {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          animation: slideInUp 1s ease-out 0.3s both;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .comparison-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(75, 0, 130, 0.3);
        }

        .comparison-card h3 {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
        }

        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .flow-step {
          background: linear-gradient(135deg, #4B0082, #20B2AA);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 15px;
          text-align: center;
          min-width: 200px;
          box-shadow: 0 4px 15px rgba(75, 0, 130, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .flow-step:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(32, 178, 170, 0.5);
        }

        .flow-step:hover i {
          transform: scale(1.2) rotate(360deg);
          color: #F5F5F5;
          text-shadow: 0 0 15px rgba(32, 178, 170, 0.8);
        }

        .flow-step i {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
          transition: all 0.3s ease;
        }

        .flow-step span {
          font-size: 0.9rem;
          font-weight: 500;
          display: block;
        }

        .arrow {
          color: white;
          font-size: 2rem;
          animation: pulse 2s infinite;
        }

        .script-section {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          animation: slideInLeft 1s ease-out 0.6s both;
        }

        .script-title {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .script-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          line-height: 1.8;
          text-align: center;
          font-style: italic;
          position: relative;
          margin-bottom: 2rem;
        }

        .script-text::before {
          content: '"';
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.3);
          position: absolute;
          top: -20px;
          left: -20px;
          font-family: serif;
        }

        .script-text::after {
          content: '"';
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.3);
          position: absolute;
          bottom: -40px;
          right: -20px;
          font-family: serif;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .flow-diagram {
            flex-direction: column;
          }
          
          .arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Ch1Slide5;
