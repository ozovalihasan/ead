
import colors from "tailwindcss/colors"

export const availableColors = ["sky", "neutral", "green", "red", "yellow", "pink", "orange", "emerald", "violet"] as const;
export type availableColorsType = typeof availableColors[number];

const setColorVariants = (color?: availableColorsType) => {
  if (color) {
    localStorage.setItem("mainColor", JSON.stringify(color))
  } else {
    
    if (localStorage.getItem("mainColor")) {
      const colorFromLocalStorage = JSON.parse(localStorage.getItem("mainColor")!) as string
      if ( availableColors.includes( colorFromLocalStorage as availableColorsType) ) {
        color = colorFromLocalStorage as availableColorsType
      } else {
        color = availableColors[0]
        localStorage.setItem("mainColor", JSON.stringify(color))
      }
    } else {
      color = availableColors[0]
      localStorage.setItem("mainColor", JSON.stringify(color))
    }
  }

  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const root = document.querySelector('div#root') as HTMLDivElement;

  const colorPalette = colors[color];

  Object.entries(colorPalette).forEach( ( [num, value] ) => {
    root.style.setProperty(`--first-${num}`, value);  
  });
}

export { setColorVariants }