import React from 'react';
import { Ghost, Home, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#64786B] flex items-center justify-center p-4">
      <div className="text-center">
        {/* Ghost Animation */}
        <div className="flex justify-center mb-8 animate-bounce">
          <Ghost className="w-24 h-24 text-white" />
        </div>
        
        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-white mb-4 tracking-wider">
          4<span className="inline-block animate-spin">0</span>4
        </h1>
        
        {/* Messages */}
        <div className="space-y-4 mb-8">
          <p className="text-2xl text-white/90 font-medium">
            Oops! Page Not Found
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Map className="w-5 h-5" />
            <p>Looks like you've wandered into uncharted territory</p>
          </div>
        </div>
        
        {/* Button */}
        <Link 
        to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#64786B] rounded-full
                     font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                     active:translate-y-0"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;