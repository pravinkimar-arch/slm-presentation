import React, { useState, useEffect } from 'react';

const Ch1Slide8: React.FC = () => {
  const [filmstripPosition, setFilmstripPosition] = useState(0);
  const [, setExamplesProcessed] = useState(0);
  const [learningProgress, setLearningProgress] = useState(0);

  const totalFrames = 50;
  const baseCatImages = ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png'];
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ];

  const learningStages = [
    { name: 'Learning', accuracy: 0, message: 'Recognizing basic patterns...' },
    { name: 'Improving', accuracy: 25, message: 'Building feature recognition...' },
    { name: 'Optimizing', accuracy: 50, message: 'Fine-tuning algorithms...' },
    { name: 'Mastered', accuracy: 75, message: 'Pattern recognition complete!' }
  ];

  // Filmstrip animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFilmstripPosition(prev => {
        const newPosition = prev - 1;
        if (Math.abs(newPosition) >= 210 * totalFrames) {
          return 0;
        }
        return newPosition;
      });
      
      // Update learning progress every 20 frames
      if (Math.abs(filmstripPosition) % 20 === 0) {
        setExamplesProcessed(prev => prev + 1);
        const currentCatNumber = (Math.floor(Math.abs(filmstripPosition) / 210) % totalFrames) + 1;
        setLearningProgress(Math.min((currentCatNumber / totalFrames) * 100, 100));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [filmstripPosition, totalFrames]);

  // Generate filmstrip frames
  const generateFilmstripFrames = () => {
    const frames = [];
    for (let i = 0; i < totalFrames + 10; i++) {
      const frameNumber = (i % totalFrames) + 1;
      const catImageIndex = (i % baseCatImages.length);
      const gradientIndex = (i % gradients.length);
      
      frames.push(
        <div
          key={i}
          className="film-frame"
          style={{
            width: '200px',
            height: '220px',
            flexShrink: 0,
            marginRight: '10px',
            background: gradients[gradientIndex],
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}
        >
          <img 
            src={`/images/${baseCatImages[catImageIndex]}`} 
            alt={`Cat Example ${frameNumber}`}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }}
          />
          <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'white', textAlign: 'center' }}>
            Cat {frameNumber}
          </h4>
        </div>
      );
    }
    return frames;
  };

  const currentStage = learningStages.find(stage => learningProgress >= stage.accuracy) || learningStages[learningStages.length - 1];
  const nextStage = learningStages[learningStages.findIndex(stage => stage.accuracy > learningProgress)];
  const currentCatNumber = (Math.floor(Math.abs(filmstripPosition) / 210) % totalFrames) + 1;

  return (
    <div className="slide active">
      <div className="content-grid" style={{ gridTemplateColumns: '1fr', marginTop: '2rem', justifyContent: 'center', maxWidth: '80vw', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="comparison-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3><i className="fas fa-book-open"></i> Machine Learning Approach</h3>
          <p style={{ color: '#B0B0B0', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Instead of writing rules, we show the system thousands of examples - just like teaching a child by showing them picture books!
          </p>
          
          {/* Filmstrip Animation Container */}
          <div id="filmstripContainer" style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '300px', margin: '0 auto', background: '#1a1a1a', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }}>
            {/* Filmstrip Holes */}
            <div style={{ position: 'absolute', top: '10px', left: '0', right: '0', height: '20px', background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #333 8px, #333 12px)', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', height: '20px', background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #333 8px, #333 12px)', zIndex: 2 }}></div>
            
            {/* Filmstrip Frames */}
            <div id="filmstripFrames" style={{ position: 'absolute', top: '40px', left: '0', height: '220px', display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(${filmstripPosition}px)` }}>
              {generateFilmstripFrames()}
            </div>
          </div>
          
          {/* Learning Progress Indicator */}
          <div style={{ marginTop: '2rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
            <h4 style={{ color: '#20B2AA', margin: '0 0 1rem 0', textAlign: 'center', fontSize: '1.1rem' }}>
              <i className="fas fa-brain"></i> Learning Progress
            </h4>
            
            {/* Progress Bar */}
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', height: '20px', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
              <div id="learningProgressBar" style={{ background: 'linear-gradient(90deg, #4ECDC4 0%, #44A08D 50%, #20B2AA 100%)', height: '100%', width: `${learningProgress}%`, transition: 'width 0.3s ease', borderRadius: '10px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)', animation: 'shimmer 2s infinite' }}></div>
              </div>
            </div>
            
            {/* Learning Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div id="examplesSeen" style={{ color: '#4ECDC4', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{currentCatNumber}</div>
                <div style={{ color: '#B0B0B0', fontSize: '0.9rem' }}>Examples Seen</div>
              </div>
              <div>
                <div id="learningAccuracy" style={{ color: '#20B2AA', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{Math.round(Math.min((currentCatNumber / totalFrames) * 95, 95))}%</div>
                <div style={{ color: '#B0B0B0', fontSize: '0.9rem' }}>Accuracy</div>
              </div>
              <div>
                <div id="learningStage" style={{ color: '#FF6B6B', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{currentStage.name}</div>
                <div style={{ color: '#B0B0B0', fontSize: '0.9rem' }}>Stage</div>
              </div>
            </div>
            
            {/* Learning Status Text */}
            <div id="learningStatus" style={{ color: '#B0B0B0', textAlign: 'center', marginTop: '1rem', fontStyle: 'italic', fontSize: '0.95rem' }}>
              {nextStage ? `${currentStage.message} (${Math.round(Math.max(0, Math.min(100, ((currentCatNumber - (currentStage.accuracy * totalFrames / 100)) / ((nextStage.accuracy * totalFrames / 100) - (currentStage.accuracy * totalFrames / 100))) * 100)))}% to ${nextStage.name})` : currentStage.message}
            </div>
          </div>
          
          <p style={{ color: '#B0B0B0', marginTop: '1.5rem', fontStyle: 'italic' }}>
            Watch the system learn patterns as it processes more examples!
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

        .content-grid {
          display: grid;
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

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Ch1Slide8;
