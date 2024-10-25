import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-6">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Left side links */}
          <div className="space-x-8">
            <Link to ="/" className="text-white hover:text-white/70 transition-colors">About</Link>
            <Link to="/projects" className="text-white hover:text-white/70 transition-colors">Projects</Link>
          </div>
          
          {/* Right side social icons */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/AbdullahAlzariqi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-white/70 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/abdullah-alzariqi-487428213" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-white/70 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    );
  };

export default Navigation