import { useState, useEffect } from "react";
import Chapter1 from "./chapters/Chapter1";
import Chapter2 from "./chapters/Chapter2";

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [navigationVisible, setNavigationVisible] = useState(true);

  // Define total slides for each chapter
  const chapterSlides = {
    1: 9,  // Chapter 1 has 9 slides
    2: 8   // Chapter 2 has 8 slides
  };

  const totalSlides = chapterSlides[currentChapter as keyof typeof chapterSlides];

  // Navigation functions
  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlideIndex(slideIndex);
    }
  };

  const toggleNavigationControls = () => {
    setNavigationVisible(!navigationVisible);
  };

  // Reset slide index when changing chapters
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [currentChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        toggleNavigationControls();
        return;
      }

      if (!navigationVisible && !['ArrowRight', 'ArrowLeft', ' ', 'Home', 'End'].includes(e.key)) {
        return;
      }

      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previousSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'Escape':
          e.preventDefault();
          setNavigationVisible(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, navigationVisible, totalSlides]);


  // Slide navigation component
  const SlideNavigation = () => (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4 bg-white/15 backdrop-blur-lg p-8 rounded-3xl border border-white/30 shadow-2xl z-50 min-w-20 transition-all duration-300 ${
      navigationVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={() => setCurrentChapter(1)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            currentChapter === 1
              ? 'bg-gradient-to-br from-indigo-900 to-teal-500 text-white shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title="Chapter 1: ML Basics"
        >
          <div className="text-center">
            <div>Chapter 1</div>
            <div className="text-xs opacity-80">ML Basics</div>
          </div>
        </button>
        
        {currentChapter === 1 && (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 9 }, (_, i) => (
              <button
                key={i}
                className={`w-auto h-auto px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 text-white text-xs font-semibold text-center min-w-8 ${
                  i === currentSlideIndex
                    ? 'bg-gradient-to-br from-indigo-900 to-teal-500 transform scale-110 shadow-lg'
                    : 'bg-white/30 hover:bg-white/50 hover:transform hover:scale-105'
                }`}
                onClick={() => goToSlide(i)}
                title={`Slide ${i + 1}`}
              >
                c1-{i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={() => setCurrentChapter(2)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            currentChapter === 2
              ? 'bg-gradient-to-br from-indigo-900 to-teal-500 text-white shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title="Chapter 2: SLMs"
        >
          <div className="text-center">
            <div>Chapter 2</div>
            <div className="text-xs opacity-80">SLMs</div>
          </div>
        </button>
        
        {currentChapter === 2 && (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                className={`w-auto h-auto px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 text-white text-xs font-semibold text-center min-w-8 ${
                  i === currentSlideIndex
                    ? 'bg-gradient-to-br from-indigo-900 to-teal-500 transform scale-110 shadow-lg'
                    : 'bg-white/30 hover:bg-white/50 hover:transform hover:scale-105'
                }`}
                onClick={() => goToSlide(i)}
                title={`Slide ${i + 1}`}
              >
                c2-{i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-white font-semibold text-xs text-center writing-mode-vertical-rl text-orientation-mixed bg-white/10 px-2 py-2 rounded-lg my-2">
        <span>{currentSlideIndex + 1}</span> / <span>{totalSlides}</span>
      </div>
    </div>
  );

  // Progress bar
  const ProgressBar = () => (
    <div 
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-900 to-teal-500 transition-all duration-300 z-50 ${
        navigationVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
    ></div>
  );

  return (
    <>
      <ProgressBar />
      <SlideNavigation />
      {currentChapter === 1 ? <Chapter1 currentSlide={currentSlideIndex} /> : <Chapter2 currentSlide={currentSlideIndex} />}
    </>
  );
}
