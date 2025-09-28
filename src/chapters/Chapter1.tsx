import React from 'react';
import Ch1Slide1 from './slides/ch1-slide1';
import Ch1Slide2 from './slides/ch1-slide2';
import Ch1Slide3 from './slides/ch1-slide3';
import Ch1Slide4 from './slides/ch1-slide4';
import Ch1Slide5 from './slides/ch1-slide5';
import Ch1Slide6 from './slides/ch1-slide6';
import Ch1Slide7 from './slides/ch1-slide7';
import Ch1Slide8 from './slides/ch1-slide8';
import Ch1Slide9 from './slides/ch1-slide9';

interface Chapter1Props {
  currentSlide: number;
}

const Chapter1: React.FC<Chapter1Props> = ({ currentSlide }) => {

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <Ch1Slide1 />;
      case 1: return <Ch1Slide2 />;
      case 2: return <Ch1Slide3 />;
      case 3: return <Ch1Slide4 />;
      case 4: return <Ch1Slide5 />;
      case 5: return <Ch1Slide6 />;
      case 6: return <Ch1Slide7 />;
      case 7: return <Ch1Slide8 />;
      case 8: return <Ch1Slide9 />;
      default: return <Ch1Slide1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-500 overflow-x-hidden">
      {/* Floating Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute w-20 h-20 bg-white/15 rounded-full top-1/5 left-1/12 animate-float"></div>
        <div className="absolute w-30 h-30 bg-white/15 rounded-full top-3/5 right-1/6 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-15 h-15 bg-white/15 rounded-full bottom-1/5 left-1/5 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8 min-h-screen relative">
        {renderSlide()}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Chapter1;