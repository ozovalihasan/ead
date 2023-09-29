import { setColorVariants } from '../setColorVariants';
import { render } from "@testing-library/react";

jest.mock('tailwindcss/colors',  () => ({
  default: {
    sky: {
      50: "#111",
      100: "#222"
    },
    green: {
      50: "#333",
      100: "#444"
    }
  }
}));

let renderReadyComponent: JSX.Element;
const localStorageMock = {  
  getItem: jest.fn().mockReturnValue(10),
  setItem: jest.fn()
};

describe("setColorVariants function", () => {
  describe("", () => {
    beforeAll(()=> {
   

      renderReadyComponent = (<div id="root"> </div>)
    })
    
    it('updates the localStorage', () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
      });
      
      render(
        renderReadyComponent
      )    
      setColorVariants("sky")
      expect(localStorageMock.setItem).toBeCalledWith("mainColor", "\"sky\"" )
    });
    

    it('adds variables by using values imported from TailwindCSS', () => {

      render(
        renderReadyComponent
      )    

      setColorVariants("green")
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const root = document.querySelector('div#root') as HTMLDivElement;
      
      expect(root.style.getPropertyValue("--first-50")).toBe("#333")
      expect(root.style.getPropertyValue("--first-100")).toBe("#444")
    });
  
  })  
  describe("if any color is not provided", () => {

  
    describe("if the localStorage.mainColor has a value", ()=> {
      it('gets the color from the localStorage', () => {

        localStorageMock.getItem = jest.fn().mockReturnValue(JSON.stringify("green"))
        
        render( renderReadyComponent )    
  
        setColorVariants()
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        const root = document.querySelector('div#root') as HTMLDivElement;
        
        expect(root.style.getPropertyValue("--first-50")).toBe("#333")
        expect(root.style.getPropertyValue("--first-100")).toBe("#444")
        expect(localStorageMock.getItem).toBeCalledWith("mainColor" )
      });
  
      describe("If the color on the localStorage is not usable", () => {
  
        it('sets the color and update the localStorage', () => {
  
          localStorageMock.getItem = jest.fn().mockReturnValue(JSON.stringify("nonIncludedColor"))
          
          render( renderReadyComponent )    
  
          setColorVariants()
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          const root = document.querySelector('div#root') as HTMLDivElement;
          
          expect(root.style.getPropertyValue("--first-50")).toBe("#111")
          expect(root.style.getPropertyValue("--first-100")).toBe("#222")
          expect(localStorageMock.setItem).toBeCalledWith("mainColor", "\"green\"")
        });
      })
    })

    describe("if the localStorage.mainColor doesn't have a value", ()=> {
      it('sets the color and update the localStorage', () => {
  
        localStorageMock.getItem = jest.fn().mockReturnValue(null)
        
        render( renderReadyComponent )    

        setColorVariants()
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        const root = document.querySelector('div#root') as HTMLDivElement;
        
        expect(root.style.getPropertyValue("--first-50")).toBe("#111")
        expect(root.style.getPropertyValue("--first-100")).toBe("#222")
        expect(localStorageMock.setItem).toBeCalledWith("mainColor", "\"green\"")
      });
    })
  })
})
  