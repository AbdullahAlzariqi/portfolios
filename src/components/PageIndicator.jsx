import React from 'react'

const PageIndicator = ({ currentPage, setCurrentPage, isScrolling, scrollProgress, isTransitioning }) => {
    return (
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
        {[1, 2, 3].map((pageNum) => (
          <div
            key={pageNum}
            onClick={() => !isTransitioning && setCurrentPage(pageNum)}
            className={`group relative w-[5px] h-10 rounded-full cursor-pointer
              ${isScrolling ? 'after:absolute after:inset-0 after:animate-glow after:bg-white/20' : ''}`}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            <div
              className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ease-out
                ${currentPage === pageNum ? 'scale-y-100' : 'scale-y-0'}`}
              style={{ transformOrigin: scrollProgress > 0 ? 'top' : 'bottom' }}
            />
          </div>
        ))}
      </div>
    );
  };
export default PageIndicator