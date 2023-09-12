import { memo } from "react";

export const CircleAndLine = memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200"
  >
    <circle
      fill="transparent"
      cx="100"
      cy="100"
      r="50"  
    />
    <path
      style={{strokeLinecap:"round"}} 
      d="M 100,50 V 0"
    />
    <path
      style={{strokeLinecap:"round"}} 
      d="M 100,150 V 180"
    />
  </svg>
))