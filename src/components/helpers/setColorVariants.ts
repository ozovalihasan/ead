
import colors from "tailwindcss/colors"

export const availableColors = ["neutral", "green", "sky", "red", "yellow", "pink", "orange", "emerald", "violet"] as const;
export type availableColorsType = typeof availableColors[number];

const setColorVariants = (color: availableColorsType) => {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const root = document.querySelector('div#root') as HTMLDivElement;

  localStorage.setItem("selected-color", color);
 
  const colorPalette = colors[color];

  Object.entries(colorPalette).forEach( ( [num, value] ) => {
    root.style.setProperty(`--first-${num}`, value);  
  });
}

export { setColorVariants }