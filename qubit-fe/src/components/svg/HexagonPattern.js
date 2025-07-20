import React from 'react';

const HexagonPattern = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hexagonPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path 
            d="M10,1 L19,6 L19,16 L10,21 L1,16 L1,6 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagonPattern)" />
    </svg>
  );
};

export default HexagonPattern;
