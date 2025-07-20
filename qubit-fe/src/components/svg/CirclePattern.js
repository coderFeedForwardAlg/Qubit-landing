import React from 'react';

const CirclePattern = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="40" cy="20" r="2" fill="currentColor" />
      <circle cx="60" cy="20" r="4" fill="currentColor" />
      <circle cx="80" cy="20" r="2" fill="currentColor" />
      
      <circle cx="20" cy="40" r="2" fill="currentColor" />
      <circle cx="40" cy="40" r="4" fill="currentColor" />
      <circle cx="60" cy="40" r="2" fill="currentColor" />
      <circle cx="80" cy="40" r="3" fill="currentColor" />
      
      <circle cx="20" cy="60" r="4" fill="currentColor" />
      <circle cx="40" cy="60" r="2" fill="currentColor" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
      <circle cx="80" cy="60" r="2" fill="currentColor" />
      
      <circle cx="20" cy="80" r="2" fill="currentColor" />
      <circle cx="40" cy="80" r="3" fill="currentColor" />
      <circle cx="60" cy="80" r="2" fill="currentColor" />
      <circle cx="80" cy="80" r="4" fill="currentColor" />
    </svg>
  );
};

export default CirclePattern;
