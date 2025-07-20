import React from 'react';

const VideoIcon = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.29346 20 6.98278V6.01722C20 5.70654 19.8343 5.41719 19.5528 5.27639L15 3"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.5 5H5.5C4.11929 5 3 6.11929 3 7.5V16.5C3 17.8807 4.11929 19 5.5 19H13.5C14.8807 19 16 17.8807 16 16.5V7.5C16 6.11929 14.8807 5 13.5 5Z"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M11.5 10.5L9 12L11.5 13.5V10.5Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
    </svg>
  );
};

export default VideoIcon;
