import React, { useState, useEffect, useRef } from 'react';


import {PageIndicator, Navigation} from '../components'



const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const springTimeout = useRef(null);
  const threshold = 5;

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
          <div className="pages flex items-center h-screen min-w-screen">
            <div className="w-8 mr-[5px]" />
            <div className="page-1 row flex items-center justify-center h-screen min-w-screen -mt-20">
              <div className="col mx-9">
                <div className="font-Techfont text-[#FFFFFF] text-9xl">
                  Abdullah <br />Alzariqi
                </div>
                <div className="text-[#C6CDC8] text-3xl mt-4">
                  Builder, Engineer, Enthusiast
                </div>
              </div>
              <div className="col mx-24 w-[300px]">
                <img src="../public/picture.png" alt="Items" />
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="h-screen  flex flex-col items-center justify-center">
          <div className="h-screen  flex flex-col justify-center px-20 text-white">
  <h1 className="text-6xl mb-16 font-Techfont">Education</h1>
  
  <div className="flex gap-16">
    {/* Left Column - Education */}
    <div className="flex-1 space-y-12">
      <div>
        <h2 className="text-3xl  mb-4">Education</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold">Master of Science in Information Systems</h3>
            <p className="text-xl text-white/80">Middle East Technical University</p>
            <p className="text-lg text-white/60 mb-2">2022 - 2024</p>
           
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Bachelor of Engineering in Civil Engineering</h3>
            <p className="text-xl text-white/80">TED University</p>
            <p className="text-lg text-white/60 mb-2">2017 - 2022</p>
            
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 space-y-12">
      

      <div>
        <h2 className="text-3xl font-Techfontmb-4">Academic Achievements</h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>Highest Ranking Student in the Civil Engineering Cohort (2022)</li>
          <li>Published research paper on The increasing trends of utilizing drones in The Construction Industry</li>
        </ul>
      </div>
    </div>
  </div>
</div>
          </div>

          {/* Page 3 */}
          <div className="h-screen  flex flex-col justify-center px-20 text-white">
  <h1 className="text-6xl mb-16 font-Techfont">Experience & Skills</h1>
  
  <div className="flex gap-16">
    {/* Left Column - Work Experience */}
    <div className="flex-1 space-y-12">
      <div>
        <h2 className="text-3xl mb-4">Work Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold">Business Analyst & Consultant</h3>
            <p className="text-xl text-white/80">SESTEK</p>
            <p className="text-lg text-white/60 mb-2">2023 - Present</p>
            <p className="text-lg leading-relaxed">
            -Facilitating project delivery through comprehensive analysis of customer requirements, stakeholder management, and process optimization.<br/>

-Collaborating with cross-functional partners to execute projects and ensure successful implementation.
Maintaining client relationships post-delivery, conducting follow-ups to ensure satisfaction and identify improvement opportunities.<br/>

-Analyzing and presenting product enhancements to internal teams, driving continuous improvement and aligning solutions with business objectives.<br/>

-Developing and maintaining comprehensive project documentation, including BRDs, functional specifications, and process flow diagrams.<br/>

-Conducting gap analyses between current and desired business processes, proposing data-driven solutions to enhance operational effectiveness.<br/>
            </p>
          </div>
          <div>
        <h2 className="text-3xl mb-4">Interests</h2>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            <span className="font-semibold">Technical:</span> AI/ML, Distributed Systems, 
            Text Search
          </p>
          <p className="text-lg leading-relaxed">
            <span className="font-semibold">Personal:</span> A new thing Every Day :)
          </p>
        </div>
      </div>

          
        </div>
      </div>
    </div>

    {/* Right Column - Tech Stack & Interests */}
    <div className="flex-1 space-y-12">
      <div>
        <h2 className="text-3xl mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Languages</h3>
            <p className="text-white/80">Python, JavaScript, Go</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Frameworks</h3>
            <p className="text-white/80">React, Node.js</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Tools</h3>
            <p className="text-white/80">AWS, Postgre, Tableau</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Other</h3>
            <p className="text-white/80">System Design</p>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;