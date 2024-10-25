import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const Carousel = ({ 
items 
//     {
//       title: "First Slide",
//       description: "This is the first slide of the carousel",
//       imageUrl: "/api/placeholder/800/400"
//     },
//     {
//       title: "Second Slide",
//       description: "This is the second slide of the carousel",
//       imageUrl: "/api/placeholder/800/400"
//     },
//     {
//       title: "Third Slide",
//       description: "This is the third slide of the carousel",
//       imageUrl: "/api/placeholder/800/400"
//     }
  ,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') previousSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
    if (loadedImages.size + 1 === items.length) {
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
    setTouchStart(null);
  };

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  );

  // Navigation button component
  const NavButton = ({ direction, onClick, children }) => (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-4' : 'right-4'}
        p-3 rounded-full
        bg-white/30 backdrop-blur-sm
        hover:bg-white/50 hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 ease-out
        group
      `}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
    >
      {children}
      <span className={`
        absolute top-1/2 -translate-y-1/2
        ${direction === 'left' ? 'right-full mr-2' : 'left-full ml-2'}
        bg-black/75 text-white text-sm px-2 py-1 rounded
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        whitespace-nowrap
      `}>
        {direction === 'left' ? 'Previous' : 'Next'}
      </span>
    </button>
  );

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg group"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            <div className="relative aspect-video">
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`
                  w-full h-full object-cover
                  transition-opacity duration-300
                  ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}
                `}
                onLoad={() => handleImageLoad(index)}
              />
              <div className="
                absolute bottom-0 left-0 right-0 
                bg-gradient-to-t from-black/70 to-transparent 
                p-6 transform translate-y-2 opacity-90
                group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-300
              ">
                <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <NavButton direction="left" onClick={previousSlide}>
            <ChevronLeft className="w-6 h-6 text-[#1E1E1E]" />
          </NavButton>
          <NavButton direction="right" onClick={nextSlide}>
            <ChevronRight className="w-6 h-6 text-text-[#1E1E1E]" />
          </NavButton>
        </>
      )}

      {showDots && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                w-2 h-2 rounded-full
                transition-all duration-300
                hover:scale-125
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                active:scale-90
                ${index === currentIndex 
                  ? 'bg-white w-4 scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Autoplay indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className={`
          w-2 h-2 rounded-full
          ${isAutoPlaying ? 'bg-green-400' : 'bg-white/50'}
          transition-colors duration-300
        `} />
        <span className="text-white text-sm bg-black/50 px-2 py-1 rounded-full">
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </span>
      </div>
    </div>
  );
};

export default Carousel;