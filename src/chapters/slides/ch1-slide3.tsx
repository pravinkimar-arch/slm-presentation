import React from 'react';

const Ch1Slide3: React.FC = () => {
  return (
    <div className="slide active">
      <div className="slide-header">
        <h1 className="sub-slide-title">Spam Email Example</h1>
        <p className="sub-slide-subtitle">Real-World Rule-Based Detection</p>
      </div>

      <div className="email-example">
        <div className="email-header">
          <i className="fas fa-envelope"></i>
          Spam Email Example
        </div>
        <div className="email-content">
          <strong>Subject:</strong> "Win a FREE lottery prize! Claim your money now!"<br/><br/>
          <strong>Spam Keywords Detected:</strong>
          <div className="spam-keywords">
            <span className="keyword-tag">lottery</span>
            <span className="keyword-tag">free money</span>
            <span className="keyword-tag">win</span>
          </div>
        </div>
      </div>

      <div className="code-block">
        <div className="code-line">
          <span className="code-keyword">if</span> (email.subject.<span className="code-keyword">contains</span>(<span className="code-string">&quot;lottery&quot;</span>) ||
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;email.subject.<span className="code-keyword">contains</span>(<span className="code-string">&quot;free money&quot;</span>)) {`{`}
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Mark as spam</span>
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;email.isSpam = <span className="code-keyword">true</span>;
        </div>
        <div className="code-line">
          {`}`}
        </div>
      </div>

      <div className="script-section">
        <h3 className="script-title">Rule-Based Detection</h3>
        <p className="script-text">
          The system checks for specific keywords like 'lottery' or 'free money' in the email subject. If found, it automatically marks the email as spam.
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

        .email-example {
          background: rgba(245, 245, 245, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          margin: 2rem 0;
          border: 1px solid rgba(245, 245, 245, 0.2);
        }

        .email-header {
          color: #20B2AA;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .email-content {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          line-height: 1.6;
        }

        .spam-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1rem 0;
          justify-content: center;
        }

        .keyword-tag {
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          animation: bounce 2s infinite;
        }

        .keyword-tag:nth-child(2) {
          animation-delay: 0.2s;
        }

        .keyword-tag:nth-child(3) {
          animation-delay: 0.4s;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          padding: 1.5rem;
          margin: 1rem 0;
          border-left: 4px solid #20B2AA;
          font-family: 'Courier New', monospace;
          color: #20B2AA;
          font-size: 0.9rem;
          line-height: 1.6;
          overflow-x: auto;
        }

        .code-line {
          margin: 0.3rem 0;
        }

        .code-keyword {
          color: #ff6b6b;
          font-weight: 600;
        }

        .code-string {
          color: #feca57;
        }

        .code-comment {
          color: #a4b0be;
          font-style: italic;
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Ch1Slide3;
