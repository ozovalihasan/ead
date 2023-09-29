import { handleMouseUpForSelect } from '../customSelectEvents';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

describe("customSelectEvents", () => {
    beforeEach(()=> {
      renderReadyComponent = (<select title="mock select" className="" id="root"> </select>)
    })
    
    describe("handleMouseUpForSelect", () => {
      it('toggles "hidden" class', () => {
  
        render( renderReadyComponent )
  
        const selectEl: HTMLSelectElement = screen.getByTitle(/mock select/)
  
        expect(selectEl.classList).not.toContain("hidden")
        
        handleMouseUpForSelect({current: selectEl})
  
        expect(selectEl.classList).toContain("hidden")
  
        handleMouseUpForSelect({current: selectEl})
  
        expect(selectEl.classList).not.toContain("hidden")
      })
    })
    
    describe("handleMouseLeaveForSelect", () => {
      it('adds "hidden" class', () => {
  
        render( renderReadyComponent )
  
        const selectEl: HTMLSelectElement = screen.getByTitle(/mock select/)
  
        expect(selectEl.classList).not.toContain("hidden")
        
        handleMouseUpForSelect({ current: selectEl })
  
        expect(selectEl.classList).toContain("hidden")
        
      })
    })

})
  