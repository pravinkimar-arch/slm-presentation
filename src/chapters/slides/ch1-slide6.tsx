import React from 'react';

const Ch1Slide6: React.FC = () => {
  const highlightFeature = (element: HTMLElement) => {
    // Remove previous highlights
    document.querySelectorAll('.bullet-item').forEach(item => {
      (item as HTMLElement).style.borderLeftColor = 'transparent';
      (item as HTMLElement).style.background = 'rgba(245, 245, 245, 0.08)';
    });
    
    // Highlight current item
    element.style.borderLeftColor = '#20B2AA';
    element.style.background = 'rgba(245, 245, 245, 0.2)';
    
    // Add pulse animation
    element.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  };

  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">Key Differences</h1>
        <p className="sub-slide-subtitle">What Makes Them Different?</p>
      </div>

      <div className="bullet-points">
        <h3>Traditional vs Machine Learning</h3>
        <div className="bullet-item" onClick={(e) => highlightFeature(e.currentTarget)}>
          <i className="fas fa-cogs"></i>
          <span>Learns patterns from data instead of explicit coding</span>
        </div>
        <div className="bullet-item" onClick={(e) => highlightFeature(e.currentTarget)}>
          <i className="fas fa-chart-line"></i>
          <span>Improves with more data and experience</span>
        </div>
        <div className="bullet-item" onClick={(e) => highlightFeature(e.currentTarget)}>
          <i className="fas fa-robot"></i>
          <span>Discovers rules automatically</span>
        </div>
        <div className="bullet-item" onClick={(e) => highlightFeature(e.currentTarget)}>
          <i className="fas fa-lightbulb"></i>
          <span>Adapts to new patterns without reprogramming</span>
        </div>
      </div>

      <div className="script-section">
        <h3 className="script-title">The Simple Truth</h3>
        <p className="script-text">
          So the difference is simple: Traditional programming = humans define rules. Machine learning = the machine discovers rules from data.
        </p>
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

        .bullet-points {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          animation: slideInLeft 1s ease-out 0.6s both;
        }

        .bullet-points h3 {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(245, 245, 245, 0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          border-left: 4px solid transparent;
        }

        .bullet-item:hover {
          background: rgba(245, 245, 245, 0.2);
          transform: translateX(10px);
          border-left-color: #20B2AA;
        }

        .bullet-item i {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: #20B2AA;
          min-width: 30px;
        }

        .bullet-item span {
          color: white;
          font-size: 1.1rem;
          font-weight: 400;
        }

        .script-section {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          animation: slideInUp 1s ease-out 0.9s both;
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
      `}</style>
    </div>
  );
};

export default Ch1Slide6;
