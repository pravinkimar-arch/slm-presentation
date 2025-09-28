import React from 'react';

const Ch1Slide9: React.FC = () => {
  const runDemo = () => {
    const button = document.querySelector('.demo-button') as HTMLButtonElement;
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running Demo...';
    button.disabled = true;
    
    // Simulate demo process
    setTimeout(() => {
      // Animate through all steps
      const steps = document.querySelectorAll('.flow-step');
      steps.forEach((step, index) => {
        setTimeout(() => {
          // Reset all steps
          document.querySelectorAll('.flow-step').forEach(s => {
            (s as HTMLElement).style.transform = '';
            (s as HTMLElement).style.boxShadow = '0 4px 15px rgba(75, 0, 130, 0.4)';
          });
          
          // Animate current step
          (step as HTMLElement).style.transform = 'scale(1.1)';
          (step as HTMLElement).style.boxShadow = '0 8px 25px rgba(32, 178, 170, 0.5)';
        }, index * 800);
      });
      
      // Reset button
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
      }, steps.length * 800 + 1000);
    }, 1000);
  };

  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">Interactive Demo</h1>
        <p className="sub-slide-subtitle">See the Difference in Action</p>
      </div>

      <div className="script-section">
        <h3 className="script-title">Let's See It Work</h3>
        <p className="script-text">
          Now let's run through both approaches step by step to see how they differ in practice.
        </p>
        
        <div className="interactive-demo">
          <button className="demo-button" onClick={runDemo}>
            <i className="fas fa-play"></i> Run Interactive Demo
          </button>
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

        .interactive-demo {
          margin-top: 2rem;
          text-align: center;
        }

        .demo-button {
          background: linear-gradient(135deg, #4B0082, #20B2AA);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(75, 0, 130, 0.4);
        }

        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(32, 178, 170, 0.5);
        }

        .demo-button:active {
          transform: translateY(0);
        }

        .demo-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
      `}</style>
    </div>
  );
};

export default Ch1Slide9;
