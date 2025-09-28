import React from 'react';

const Ch1Slide2: React.FC = () => {
  const animateStep = (element: HTMLElement) => {
    // Reset all steps
    document.querySelectorAll('.flow-step').forEach(step => {
      (step as HTMLElement).style.transform = '';
      (step as HTMLElement).style.boxShadow = '0 4px 15px rgba(75, 0, 130, 0.4)';
    });
    
    // Animate current step
    element.style.transform = 'scale(1.1)';
    element.style.boxShadow = '0 8px 25px rgba(32, 178, 170, 0.5)';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      margin-top: -50px;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">Traditional Programming</h1>
        <p className="sub-slide-subtitle">Rules + Data → Output</p>
      </div>

      <div className="cartoon-container">
        <div className="cartoon-box">
          <div className="developer-avatar">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="cartoon-title">Developer</div>
          <div className="cartoon-description">Writes explicit rules</div>
        </div>

        <div className="cartoon-box">
          <i className="fas fa-envelope-open-text cartoon-icon">
            <span className="dropping-letter">✉</span>
          </i>
          <div className="cartoon-title">Email Data</div>
          <div className="cartoon-description">Input to analyze</div>
        </div>

        <div className="cartoon-box">
          <i className="fas fa-shield-alt cartoon-icon"></i>
          <div className="cartoon-title">Spam Filter</div>
          <div className="cartoon-description">Applies rules</div>
        </div>
      </div>

      <div className="rule-flow">
        <div className="rule-step" onClick={(e) => animateStep(e.currentTarget)}>
          <i className="fas fa-envelope"></i>
          <span>Email</span>
        </div>
        <i className="fas fa-arrow-right rule-arrow"></i>
        <div className="rule-step check-rules" onClick={(e) => animateStep(e.currentTarget)}>
          <div className="message-stack">
            <i className="fas fa-envelope message-icon message-1"></i>
            <i className="fas fa-envelope message-icon message-2"></i>
            <i className="fas fa-envelope message-icon message-3"></i>
          </div>
          <i className="fas fa-search lens-icon"></i>
          <span>Check Rules</span>
        </div>
        <i className="fas fa-arrow-right rule-arrow"></i>
        <div className="rule-step spam-not-spam" onClick={(e) => animateStep(e.currentTarget)}>
          <i className="fas fa-check-circle spam-icon"></i>
          <i className="fas fa-times-circle not-spam-icon"></i>
          <span>Spam/Not Spam</span>
        </div>
      </div>

      <div className="script-section">
        <h3 className="script-title">How It Works</h3>
        <p className="script-text">
          In traditional programming, a developer writes rules explicitly. The system follows these predefined rules to process data and produce output.
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

        .cartoon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .cartoon-box {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          text-align: center;
          min-width: 200px;
          transition: all 0.3s ease;
        }

        .cartoon-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(75, 0, 130, 0.3);
        }

        .cartoon-box:hover .cartoon-icon {
          transform: scale(1.2) rotate(360deg);
          color: #F5F5F5;
          text-shadow: 0 0 20px rgba(32, 178, 170, 0.8);
        }

        .cartoon-box:hover .developer-avatar {
          transform: scale(1.2);
          box-shadow: 0 8px 25px rgba(32, 178, 170, 0.6);
          animation: none;
        }

        .cartoon-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          display: block;
          color: #20B2AA;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .cartoon-icon.fa-envelope-open-text::before {
          content: '\f2b6';
          position: relative;
        }

        .cartoon-icon.fa-envelope-open-text::after {
          content: '✉';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: #FF6B6B;
          z-index: 1;
          animation: letterPulse 2s ease-in-out infinite;
        }

        .cartoon-icon.fa-envelope-open-text {
          position: relative;
        }

        .dropping-letter {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.8rem;
          color: #FF6B6B;
          animation: letterDrop 3s ease-in-out infinite;
          z-index: 2;
        }

        .cartoon-title {
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .cartoon-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .developer-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #4B0082, #20B2AA);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2.5rem;
          color: white;
          box-shadow: 0 4px 15px rgba(75, 0, 130, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .developer-avatar:hover {
          transform: scale(1.2);
          box-shadow: 0 8px 25px rgba(32, 178, 170, 0.6);
          animation: none;
        }

        .rule-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .rule-step {
          background: linear-gradient(135deg, #4B0082, #20B2AA);
          color: white;
          padding: 2rem 2.5rem;
          border-radius: 15px;
          text-align: center;
          min-width: 220px;
          min-height: 160px;
          box-shadow: 0 4px 15px rgba(75, 0, 130, 0.4);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .rule-step:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(32, 178, 170, 0.5);
        }

        .rule-step:hover i {
          transform: scale(1.2) rotate(360deg);
          color: #F5F5F5;
          text-shadow: 0 0 15px rgba(32, 178, 170, 0.8);
        }

        .rule-step i {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
          transition: all 0.3s ease;
        }

        .spam-not-spam {
          position: relative;
        }

        .spam-icon {
          color: #4CAF50;
          position: absolute;
          top: 25%;
          left: 45%;
          transform: translate(-50%, -50%);
          animation: spamIconShow 4s ease-in-out infinite;
        }

        .not-spam-icon {
          color: #F44336;
          position: absolute;
          top: 25%;
          left: 45%;
          transform: translate(-50%, -50%);
          animation: notSpamIconShow 4s ease-in-out infinite;
        }

        .spam-not-spam span {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .check-rules {
          position: relative;
          overflow: visible;
        }

        .message-stack {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .message-icon {
          position: absolute;
          font-size: 1.2rem;
          color: rgba(32, 178, 170, 0.6);
          animation: messagePulse 3s ease-in-out infinite;
        }

        .message-1 {
          top: -15px;
          left: -20px;
          animation-delay: 0s;
        }

        .message-2 {
          top: -5px;
          left: 0px;
          animation-delay: 1s;
        }

        .message-3 {
          top: 5px;
          left: 20px;
          animation-delay: 2s;
        }

        .lens-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          font-size: 2rem;
          color: #20B2AA;
          animation: lensScan 3s ease-in-out infinite;
        }

        .check-rules span {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .rule-step span {
          font-size: 1.2rem;
          font-weight: 500;
          display: block;
        }

        .rule-arrow {
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

        @keyframes letterPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 0.8;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1); 
            opacity: 1;
          }
        }

        @keyframes letterDrop {
          0% { 
            transform: translateX(-50%) translateY(-30px) scale(1); 
            opacity: 1;
          }
          20% { 
            transform: translateX(-50%) translateY(0px) scale(1.1); 
            opacity: 1;
          }
          25% { 
            transform: translateX(-50%) translateY(8px) scale(0.8); 
            opacity: 0.7;
          }
          30% { 
            transform: translateX(-50%) translateY(15px) scale(0.6); 
            opacity: 0.5;
          }
          35% { 
            transform: translateX(-50%) translateY(22px) scale(0.4); 
            opacity: 0.3;
          }
          40%, 100% { 
            transform: translateX(-50%) translateY(30px) scale(0.2); 
            opacity: 0;
          }
        }

        @keyframes spamIconShow {
          0%, 40% { 
            opacity: 1; 
            transform: scale(1);
          }
          50%, 100% { 
            opacity: 0; 
            transform: scale(0.8);
          }
        }

        @keyframes notSpamIconShow {
          0%, 40% { 
            opacity: 0; 
            transform: scale(0.8);
          }
          50%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        @keyframes messagePulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1);
          }
        }

        @keyframes lensScan {
          0% { 
            transform: translate(-50%, -50%) translate(-30px, -25px) scale(1); 
          }
          33% { 
            transform: translate(-50%, -50%) translate(0px, -15px) scale(1.1); 
          }
          66% { 
            transform: translate(-50%, -50%) translate(30px, 15px) scale(1.1); 
          }
          100% { 
            transform: translate(-50%, -50%) translate(-30px, -25px) scale(1); 
          }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .rule-flow {
            flex-direction: column;
          }
          
          .rule-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Ch1Slide2;
