import React, { useState, useEffect, useRef } from 'react';


import {PageIndicator, Navigation,Carousel} from '../components'



const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const springTimeout = useRef(null);
  const threshold = 5;

  const images =[{
    description:"Pearls logo",
    imageUrl:"/items.jpg",
    title:"Pearls"
  },
{
    description:"Acumen logo",
    imageUrl:"/Group 1.png",
    title:"Acumen" 
}
]

const images2 =[

{
  description:"Acumen logo",
  imageUrl:"../public/Group 1.png",
  title:"Acumen" 
},{
  description:"Pearls logo",
  imageUrl:"../public/items.jpg",
  title:"Pearls"
}
]

  const handleWheel = (e) => {
    if (isTransitioning) return;

    setIsScrolling(true);
    setScrollAccumulator(prev => {
      const newValue = prev + e.deltaY;
      return Math.max(Math.min(newValue, threshold + 10), -(threshold + 10));
    });

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    if (Math.abs(scrollAccumulator) >= threshold) {
      setIsTransitioning(true);
      
      if (scrollAccumulator > 0 && currentPage < 3) {
        setCurrentPage(prev => prev + 1);
      } else if (scrollAccumulator < 0 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }

      setTimeout(() => {
        setScrollAccumulator(0);
        setIsTransitioning(false);
      }, 500);
    } else {
      if (springTimeout.current) clearTimeout(springTimeout.current);
      springTimeout.current = setTimeout(() => {
        setScrollAccumulator(0);
      }, 150);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [scrollAccumulator, isTransitioning, currentPage]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (springTimeout.current) clearTimeout(springTimeout.current);
    };
  }, []);

  const scrollProgress = Math.abs(scrollAccumulator) / threshold;

  return (
    <>
      <PageIndicator 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isScrolling={isScrolling}
        scrollProgress={scrollProgress}
        isTransitioning={isTransitioning}
      />
      
      <Navigation />
      
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden"
      >
        <div 
          className="transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateY(-${(currentPage - 1) * 100}vh)` }}
        >
          {/* Page 1 */}
          <div className="pages flex items-center h-screen w-screen">
      {/* Spacer or additional elements can be added here if necessary */}
      <div className="page-1 flex flex-row items-center justify-center h-screen w-screen -mt-20">
        {/* Left Column */}
        <div className="flex flex-col mx-9">
          <h1 className="font-Techfont text-white text-6xl md:text-9xl">
            Pearls
          </h1>
          <p className="text-[#C6CDC8] text-sm md:text-sm mt-4 max-w-[400px]">
          Our web content crawler and scraper is built for AI professionals, offering seamless content extraction, editing, and management. With AI-driven summarization, customizable chunking, real-time metrics, and robust API support, you can gather and process web content efficiently. Collaborate easily with user access control, export in multiple formats, and gain deeper insights with sentiment analysis and advanced data cleaning. Stay organized with automated content tagging, search, and filtering—all while adhering to ethical crawling standards.
<br></br><br></br>Boost your AI projects with smarter, faster, and flexible content management.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center mx-24 w-full max-w-md">
        <Carousel items={images} />
        </div>
      </div>
    </div>

          {/* Page 2 */}
          <div className="pages flex items-center h-screen w-screen">
      {/* Spacer or additional elements can be added here if necessary */}
      <div className="page-1 flex flex-row items-center justify-center h-screen w-screen -mt-20">
        {/* Left Column */}
        <div className="flex flex-col mx-9">
          <h1 className="font-Techfont text-white text-6xl md:text-9xl">
            acumen
          </h1>
          <p className="text-[#C6CDC8] text-sm md:text-sm mt-4 max-w-[400px]">
          Introducing your digital second brain: an AI-powered app that automatically organizes and secures your files from emails, uploads, and more. Effortlessly access, search, and inquire about your documents and notes—no manual uploads needed. Simplify your digital workspace, save time, and eliminate information overload with seamless syncing across all your devices.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center mx-24 w-full max-w-md">
        <Carousel items={images2} />
        </div>
      </div>
    </div>

          {/* Page 3 */}
          <div className="pages flex items-center h-screen w-screen">
      {/* Spacer or additional elements can be added here if necessary */}
      <div className="page-1 flex flex-row items-center justify-center h-screen w-screen -mt-20">
        {/* Left Column */}
        <div className="flex flex-col mx-9">
          <h1 className="font-Techfont text-white text-6xl md:text-9xl">
            Pearls
          </h1>
          <p className="text-[#C6CDC8] text-sm md:text-sm mt-4 max-w-[400px]">
          Our web content crawler and scraper is built for AI professionals, offering seamless content extraction, editing, and management. With AI-driven summarization, customizable chunking, real-time metrics, and robust API support, you can gather and process web content efficiently. Collaborate easily with user access control, export in multiple formats, and gain deeper insights with sentiment analysis and advanced data cleaning. Stay organized with automated content tagging, search, and filtering—all while adhering to ethical crawling standards.
<br></br><br></br>Boost your AI projects with smarter, faster, and flexible content management.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center mx-24 w-full max-w-md">
        <Carousel items={images} />
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default Projects;