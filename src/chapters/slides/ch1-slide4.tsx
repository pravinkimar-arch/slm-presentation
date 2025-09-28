import React from 'react';

const Ch1Slide4: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">The Traditional Way</h1>
        <p className="sub-slide-subtitle">Explicit Rule Writing</p>
      </div>

      <div className="cartoon-container">
        <div className="cartoon-box">
          <div className="developer-avatar">
            <i className="fas fa-code"></i>
          </div>
          <div className="cartoon-title">Developer Writes</div>
          <div className="cartoon-description">Explicit if-then rules</div>
        </div>

        <div className="cartoon-box">
          <i className="fas fa-list-check cartoon-icon"></i>
          <div className="cartoon-title">Rule List</div>
          <div className="cartoon-description">Predefined conditions</div>
        </div>

        <div className="cartoon-box">
          <i className="fas fa-cogs cartoon-icon"></i>
          <div className="cartoon-title">System Applies</div>
          <div className="cartoon-description">Rules to every email</div>
        </div>
      </div>

      <div className="script-section">
        <h3 className="script-title">The Traditional Approach</h3>
        <p className="script-text">
          In traditional programming, a developer writes rules explicitly. For example, if you wanted to detect spam emails, you'd write a set of rules like: if the subject has 'lottery' or 'free money,' mark it as spam.
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
      `}</style>
    </div>
  );
};

export default Ch1Slide4;
