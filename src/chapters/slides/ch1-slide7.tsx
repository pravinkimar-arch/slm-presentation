import React from 'react';

const Ch1Slide7: React.FC = () => {
  const showAnimalImage = (animal: string) => {
    const imageDisplay = document.getElementById('animalImageDisplay');
    if (!imageDisplay) return;
    
    const imageSrc = animal === 'cat' ? '/images/cat.png' : '/images/dog.png';
    const animalName = animal === 'cat' ? 'Cat' : 'Dog';
    
    imageDisplay.innerHTML = `
      <div style="text-align: center;">
        <div style="color: #20B2AA; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.8rem;">
          <i class="fas fa-${animal === 'cat' ? 'cat' : 'dog'}"></i> ${animalName} Example
        </div>
        <img src="${imageSrc}" alt="${animalName}" style="width: 100%; max-height: 50vh; border-radius: 15px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);">
      </div>
    `;
  };

  return (
    <div className="slide active">
      <div className="content-grid" style={{ gridTemplateColumns: '70% 30%', gap: '2rem', marginTop: '0', alignItems: 'start', justifyContent: 'center', maxWidth: '90vw', marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Left side: Image Display Area */}
        <div className="comparison-card" style={{ padding: '1.5rem' }}>
          <h3><i className="fas fa-code"></i> Traditional Programming Approach</h3>
          <div className="script-section">
            {/* Dynamic Image Display Area */}
            <div id="animalImageDisplay" style={{ textAlign: 'center', margin: '0.5rem 0', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}>
                Click a rule on the right to see the example
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Explicit Rules */}
        <div className="comparison-card" style={{ padding: '1.5rem' }}>
          <h3><i className="fas fa-list-check"></i> Explicit Rules</h3>
          <div style={{ color: 'white', lineHeight: '1.8' }}>
            <div 
              style={{ 
                marginBottom: '0.8rem', 
                padding: '0.5rem', 
                background: 'rgba(255, 107, 107, 0.1)', 
                borderRadius: '8px', 
                borderLeft: '3px solid #FF6B6B', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease' 
              }} 
              onClick={() => showAnimalImage('cat')}
              onMouseOver={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255, 107, 107, 0.2)'}
              onMouseOut={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255, 107, 107, 0.1)'}
            >
              <i className="fas fa-cat" style={{ color: '#FF6B6B', marginRight: '0.5rem' }}></i>
              <strong>If it has whiskers and meows, it's a cat.</strong>
            </div>
            <div 
              style={{ 
                padding: '0.5rem', 
                background: 'rgba(78, 205, 196, 0.1)', 
                borderRadius: '8px', 
                borderLeft: '3px solid #4ECDC4', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease' 
              }} 
              onClick={() => showAnimalImage('dog')}
              onMouseOver={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(78, 205, 196, 0.2)'}
              onMouseOut={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(78, 205, 196, 0.1)'}
            >
              <i className="fas fa-dog" style={{ color: '#4ECDC4', marginRight: '0.5rem' }}></i>
              <strong>If it has a wagging tail and barks, it's a dog.</strong>
            </div>
          </div>
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

        .script-section {
          background: rgba(245, 245, 245, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(245, 245, 245, 0.3);
          box-shadow: 0 8px 32px rgba(75, 0, 130, 0.2);
          animation: slideInUp 1s ease-out 0.9s both;
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

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Ch1Slide7;
