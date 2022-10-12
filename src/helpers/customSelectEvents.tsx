export const handleMouseUpForSelect = (el: React.MutableRefObject<HTMLSelectElement | null>) => {
  el.current!.classList.toggle("hidden")
}

export const handleMouseLeaveForSelect = (el: React.MutableRefObject<HTMLSelectElement | null>) => {
  el.current!.classList.add("hidden")
}