// import { State } from '@/zustandStore/store';
import { setColorVariants } from '../setColorVariants';
import { render } from "@testing-library/react";


jest.mock('tailwindcss/colors',  () => ({
  default: {
    sky: {
      50: "#111",
      100: "#222"
    }
  }
}));

let renderReadyComponent: JSX.Element;
const localStorageMock = {  
  getItem: jest.fn(),
  setItem: jest.fn()
};
describe("setColorVariants function", () => {
  beforeAll(()=> {

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
     
    renderReadyComponent = (<div id="root"> </div>)
  })
  
  it('updates the localstorage', () => {

    render(
      renderReadyComponent
    )    
    setColorVariants("sky")
    expect(localStorageMock.setItem).toBeCalledWith('selected-color', "sky")
  });
  

  it('adds variables by using values imported from TailwindCSS', () => {

    render(
      renderReadyComponent
    )    
    
    setColorVariants("sky")
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const root = document.querySelector('div#root') as HTMLDivElement;
    
    expect(root.style.getPropertyValue("--first-50")).toBe("#111")
    expect(root.style.getPropertyValue("--first-100")).toBe("#222")
  });
  
})
  