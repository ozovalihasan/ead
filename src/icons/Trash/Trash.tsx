import { memo } from "react";

export const Trash = memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200"
    className="fill-transparent stroke-first-400 dark:stroke-first-500"
  >
    <path 
      style={{strokeLinecap:"round", strokeLinejoin:"round"}} 
      d="M 35,50 50,180 H 150 L 165,50"
    />
    <path 
      style={{strokeLinecap:"round", strokeLinejoin:"round"}} 
      d="m 20,50 160,0"
    />
    <path 
      style={{strokeLinecap:"round", strokeLinejoin:"round"}} 
      d="M 70,40 80,20 h 40 l 10,20"
    />
  </svg>
))