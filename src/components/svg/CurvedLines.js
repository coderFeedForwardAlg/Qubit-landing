import React from 'react';

const CurvedLines = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M10,30 Q30,5 50,30 T90,30" 
        stroke="currentColor" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        opacity="0.5"
      />
      <path 
        d="M10,50 Q30,25 50,50 T90,50" 
        stroke="currentColor" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        opacity="0.5"
      />
      <path 
        d="M10,70 Q30,45 50,70 T90,70" 
        stroke="currentColor" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
};

export default CurvedLines;
