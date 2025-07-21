

import { useState, useEffect } from 'react';
import WavyBackground from './components/svg/WavyBackground';
import CirclePattern from './components/svg/CirclePattern';
import HexagonPattern from './components/svg/HexagonPattern';
import VideoIcon from './components/svg/VideoIcon';
import AIIcon from './components/svg/AIIcon';
import SuccessCheckmark from './components/svg/SuccessCheckmark';
import CurvedLines from './components/svg/CurvedLines';
import DiscordIcon from './components/svg/DiscordIcon';

function App() {
  // State for interactive effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Form states
  const [waitlistFormData, setWaitlistFormData] = useState({
    username: '',
    email: ''
  });
  const [betaFormData, setBetaFormData] = useState({
    username: '',
    email: ''
  });
  
  // UI states
  const [activeForm, setActiveForm] = useState(null); // null, 'waitlist', or 'beta'
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [isBetaSubmitting, setIsBetaSubmitting] = useState(false);
  const [waitlistSubmitStatus, setWaitlistSubmitStatus] = useState(null);
  const [betaSubmitStatus, setBetaSubmitStatus] = useState(null);
  const [showDiscordButton, setShowDiscordButton] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  
  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWaitlistChange = (e) => {
    const { name, value } = e.target;
    setWaitlistFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBetaChange = (e) => {
    const { name, value } = e.target;
    setBetaFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const add_to_waitlist = async (e) => {
    e.preventDefault();
    
    if (!waitlistFormData.username || !waitlistFormData.email) {
      setWaitlistSubmitStatus({
        success: false,
        message: 'Please fill in all fields'
      });
      return;
    }
    
    setIsWaitlistSubmitting(true);
    setWaitlistSubmitStatus(null);
    
    try {
      const response = await fetch("/api/add_waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: waitlistFormData.username,
          email: waitlistFormData.email,
        }),
      });
      
      const data = await response.json();
      console.log(data);
      
      setWaitlistSuccess(true);
      setWaitlistSubmitStatus({
        success: true,
        message: 'Successfully added to waitlist!'
      });
      
      // Clear form after successful submission
      setWaitlistFormData({ username: '', email: '' });
    } catch (error) {
      console.error(error);
      setWaitlistSubmitStatus({
        success: false,
        message: 'Failed to add to waitlist. Please try again.'
      });
    } finally {
      setIsWaitlistSubmitting(false);
    }
  };

  const add_beta_user = async (e) => {
    e.preventDefault();
    
    if (!betaFormData.username || !betaFormData.email) {
      setBetaSubmitStatus({
        success: false,
        message: 'Please fill in all fields'
      });
      return;
    }
    
    setIsBetaSubmitting(true);
    setBetaSubmitStatus(null);
    
    try {
      const response = await fetch("/api/add_waitlist", { // Using the same endpoint for now
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: betaFormData.username,
          email: betaFormData.email,
          isBeta: true // Adding a flag to differentiate beta users
        }),
      });
      
      const data = await response.json();
      console.log(data);
      
      setBetaSubmitStatus({
        success: true,
        message: 'Successfully registered as a beta user!'
      });
      
      // Show Discord button
      setShowDiscordButton(true);
      
      // Clear form after successful submission
      setBetaFormData({ username: '', email: '' });
    } catch (error) {
      console.error(error);
      setBetaSubmitStatus({
        success: false,
        message: 'Failed to register. Please try again.'
      });
    } finally {
      setIsBetaSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Purple Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(88, 28, 135, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.6) 0%, transparent 50%),
            linear-gradient(135deg, 
              #0f172a 0%, 
              #1e293b 15%, 
              #334155 30%, 
              #4c1d95 60%, 
              #6b21a8 80%, 
              #7c3aed 100%
            )
          `,
        }}
      />

      {/* Navigation Bar */}
      <nav className="relative z-50">
        <div className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/images/qubit-logo.png" alt="Qubit Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-white text-xl font-semibold">Qubit</span>
          </div>
          
          {/* Decorative SVG in nav */}
          <div className="hidden md:block">
            <CirclePattern className="w-24 h-24 text-purple-500/20" />
          </div>
        </div>
      </nav>

      {/* Decorative SVG elements */}
      {/* <div className="absolute top-40 left-10 opacity-20 hidden md:block">
        <HexagonPattern className="w-64 h-64 text-purple-400/30" />
      </div> */}
      <div className="absolute bottom-20 right-10 opacity-20">
        <CurvedLines className="w-64 h-64 text-blue-400/30" />
      </div>
      
      {/* Left 3D Laptop Element - now visible on all screens and in background */}
      <div
        className="absolute left-10 top-1/3 animate-float z-0"
        style={{
          transform: `translate3d(${mousePosition.x * 0.008}px, ${-mousePosition.y * 0.008}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="relative"
          style={{
            transform: "rotateX(10deg) rotateY(-15deg) rotateZ(-5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Laptop Main Body */}
          <div className="relative w-64 h-40" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 rounded-xl p-2"
              style={{
                background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                transform: "translateZ(8px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
              }}
            >
              {/* Screen Area */}
              <div
                className="absolute inset-1 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                }}
              >
                {/* Screen Content - Code Editor Look */}
                <div className="p-2 text-xs">
                  <div className="h-2 w-3/4 mb-1 rounded-sm bg-purple-500/30"></div>
                  <div className="h-2 w-1/2 mb-1 rounded-sm bg-pink-500/30"></div>
                  <div className="h-2 w-5/6 mb-1 rounded-sm bg-blue-500/30"></div>
                  <div className="h-2 w-2/3 mb-1 rounded-sm bg-purple-500/30"></div>
                  <div className="h-2 w-4/5 mb-1 rounded-sm bg-pink-500/30"></div>
                </div>
                
                {/* Screen Reflection */}
                <div
                  className="absolute inset-0 rounded-lg opacity-20"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Laptop Base/Bottom */}
            <div
              className="absolute w-full h-4 bottom-0 rounded-b-xl"
              style={{
                background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)",
                transform: "rotateX(-90deg) translateZ(4px)",
                transformOrigin: "bottom",
              }}
            />

            {/* Right Side */}
            <div
              className="absolute w-4 h-32 right-0 rounded-r-xl"
              style={{
                background: "linear-gradient(90deg, #64748b 0%, #475569 100%)",
                transform: "rotateY(90deg) translateZ(64px)",
                transformOrigin: "right",
              }}
            />

            {/* Left Side */}
            <div
              className="absolute w-4 h-32 left-0 rounded-l-xl"
              style={{
                background: "linear-gradient(270deg, #64748b 0%, #475569 100%)",
                transform: "rotateY(-90deg) translateZ(0px)",
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center px-4 absolute top-16 left-0 right-0 z-10">
        {/* Coming Soon Badge */}
        <div className="bg-purple-600/40 text-white text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm flex items-center">
          <span>Coming Soon</span>
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Hero Section with Card */}
        <div className="max-w-4xl mx-auto text-center mb-12 relative">
          {/* Additional glass shine effect - positioned outside and always visible */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl z-0"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl z-0"></div>
          
          {/* Glass effect container for hero text */}
          <div className="relative backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl mb-6 overflow-hidden bg-black/30">
            {/* Gradient background for glass effect */}
            <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom right, rgba(65, 35, 128, 0.6), rgba(93, 37, 158, 0.5))' }}></div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white relative z-10 p-4 md:p-14">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">10x</span> your post<br />
              production and<br />
              video editing process<br />
              with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 inline-flex items-center">Qubit</span>
            </h1>
          </div>
          
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
            Revolutionary AI-powered video editing platform launching soon. Be the first to experience the future of post-production.
          </p>
        
        {activeForm === null && (
          <div className="flex flex-wrap justify-center gap-4 mt-8 px-4 md:px-0">
            <button 
              onClick={() => setActiveForm('waitlist')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-6 rounded-full focus:outline-none transition-colors"
            >
              Join Waitlist
            </button>
            
            <button 
              onClick={() => setActiveForm('beta')}
              className="bg-transparent border border-purple-400 text-white py-2 px-6 rounded-full hover:bg-purple-800/30 focus:outline-none transition-colors"
            >
              Become Demo User
            </button>
          </div>
        )}
      </div>

      {/* Right 3D Video Interface - now visible on all screen sizes and in background */}
      <div
        className="absolute right-10 top-1/2 animate-float-delayed z-0"
        style={{
          transform: `translate3d(${-mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="relative hidden md:block"
          style={{
            transform: "rotateX(10deg) rotateY(15deg) rotateZ(8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Interface Panel */}
          <div className="relative w-64 h-40" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 rounded-2xl p-3"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                transform: "translateZ(8px)",
                boxShadow: "0 12px 24px rgba(139, 92, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)",
              }}
            >
              {/* Interface Header */}
              <div className="text-xs text-white/90 font-bold mb-2 tracking-wider">VIDEO TIMELINE</div>

              {/* Timeline Tracks */}
              <div className="space-y-1.5 mb-3">
                {[0.85, 0.65, 0.75].map((width, i) => (
                  <div
                    key={i}
                    className="relative h-3 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      width: `${width * 100}%`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                        width: `${Math.random() * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-2">
                {["PLAY", "PAUSE", "CUT"].map((label, i) => (
                  <div
                    key={i}
                    className="flex-1 h-6 rounded-md text-xs font-bold text-white/80 flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Panel */}
            <div
              className="absolute w-64 h-8 -bottom-2 left-0 rounded-xl p-2"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
                transform: "rotateX(-90deg) translateZ(8px)",
                transformOrigin: "top",
              }}
            >
              <div className="flex items-center justify-between text-xs text-white/90 font-bold">
                <span>DURATION: 02:34</span>
                <span>FPS: 60</span>
              </div>
            </div>
          </div>

          {/* Interface Shadow */}
          <div
            className="absolute -bottom-3 left-2 right-2 h-6 rounded-full opacity-30"
            style={{
              background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
              transform: "rotateX(90deg) translateZ(-10px)",
            }}
          />
        </div>
      </div>
      
      {/* Wavy background at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <WavyBackground className="w-full h-24 text-purple-900" />
      </div>
    </div>
      {activeForm === 'waitlist' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveForm(null)}></div>
          <div className="relative bg-gray-900 border border-purple-500/30 p-8 rounded-xl shadow-2xl shadow-purple-500/50 w-full max-w-md overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"></div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setActiveForm(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6 text-white relative z-10">Join Our Waitlist</h2>
        
        {waitlistSuccess ? (
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/30 mx-auto mb-6">
              <SuccessCheckmark className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
            <p className="text-gray-300 mb-6">You've been added to our waitlist. We'll notify you when we launch.</p>
            <button 
              onClick={() => setActiveForm(null)}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-6 rounded-md focus:outline-none transition-colors"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={add_to_waitlist} className="space-y-5 relative z-10">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={waitlistFormData.username}
                  onChange={handleWaitlistChange}
                  className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={waitlistFormData.email}
                  onChange={handleWaitlistChange}
                  className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isWaitlistSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWaitlistSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </button>
              </div>
            </form>
            
            {waitlistSubmitStatus && (
              <div className={`mt-4 p-3 rounded ${waitlistSubmitStatus.success ? 'bg-green-100/80 text-green-800' : 'bg-red-100/80 text-red-800'} relative z-10`}>
                {waitlistSubmitStatus.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    )}
    
    {activeForm === 'beta' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveForm(null)}></div>
          <div className="relative bg-gray-900 border border-purple-500/30 p-8 rounded-xl shadow-2xl shadow-purple-500/50 w-full max-w-md overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"></div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setActiveForm(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6 text-white relative z-10">Become a Demo User</h2>
          
          <form onSubmit={add_beta_user} className="space-y-5 relative z-10">
            <div>
              <label htmlFor="beta-username" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="beta-username"
                name="username"
                value={betaFormData.username}
                onChange={handleBetaChange}
                className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="beta-email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="beta-email"
                name="email"
                value={betaFormData.email}
                onChange={handleBetaChange}
                className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isBetaSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBetaSubmitting ? 'Submitting...' : 'Become a Demo User'}
              </button>
            </div>
          </form>
          
          {betaSubmitStatus && (
            <div className={`mt-4 p-3 rounded ${betaSubmitStatus.success ? 'bg-green-100/80 text-green-800' : 'bg-red-100/80 text-red-800'} relative z-10`}>
              {betaSubmitStatus.message}
            </div>
          )}
          
          {showDiscordButton && (
            <div className="mt-6 text-center relative z-10">
              <p className="mb-3 font-medium text-gray-300">Join our Discord community!</p>
              <a 
                href="https://discord.gg/bWncXKsB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <DiscordIcon className="w-5 h-5 mr-2" />
                Join Discord
              </a>
              <button 
                onClick={() => setActiveForm(null)}
                className="block w-full mt-3 text-center text-purple-400 hover:text-purple-300"
              >
                Return to Home
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
