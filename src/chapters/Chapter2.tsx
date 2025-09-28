import React from 'react';
import Ch2Slide1 from './slides/ch2-slide1';
import Ch2Slide2 from './slides/ch2-slide2';
import Ch2Slide3 from './slides/ch2-slide3';
import Ch2Slide4 from './slides/ch2-slide4';
import Ch2Slide5 from './slides/ch2-slide5';
import Ch2Slide6 from './slides/ch2-slide6';
import Ch2Slide7 from './slides/ch2-slide7';
import Ch2Slide8 from './slides/ch2-slide8';

interface Chapter2Props {
  currentSlide: number;
}

const Chapter2: React.FC<Chapter2Props> = ({ currentSlide }) => {

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <Ch2Slide1 />;
      case 1: return <Ch2Slide2 />;
      case 2: return <Ch2Slide3 />;
      case 3: return <Ch2Slide4 />;
      case 4: return <Ch2Slide5 />;
      case 5: return <Ch2Slide6 />;
      case 6: return <Ch2Slide7 />;
      case 7: return <Ch2Slide8 />;
      default: return <Ch2Slide1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
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

export default Chapter2;
