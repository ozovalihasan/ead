import { memo } from "react";

export const PlusSign = memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200"
  >
    <path 
      style={{strokeLinecap:"round"}} 
      d="M 20,100 H 180 M 100,20 V 180"
    />
  </svg>
))