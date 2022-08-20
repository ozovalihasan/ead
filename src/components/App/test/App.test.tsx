import {  App } from '../App';
import { render, screen } from "@testing-library/react";
import useCustomizationStore from '@/zustandStore/customizationStore';

jest.mock('react-flow-renderer',  () => ({
  Sidebar:(
    () => (
      <>
        MockEADLogo
      </>
    )
  ),
}))

jest.mock('@/components',  () => ({
  Sidebar: (
    () => (
      <>
        MockSidebar
      </>
    )
  ),
  Navbar: (
    () => (
      <>
        MockNavbar
      </>
    )
  ),
  SidebarHandle: (
    () => (
      <>
        MockSidebarHandle
      </>
    )
  ),
  MainReactFlow: (
    () => (
      <>
        MockMainReactFlow
      </>
    )
  ),

}))
  

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <App />
  );
});

describe('<App />', () => {

  describe('if the sidebar is at the left of the screen', () => {

    beforeEach(() => {
      useCustomizationStore.setState({ 
        locationSidebar: "left"
      })
    })
    
    it('has a "flex-row" class name ', () => {
      render(renderReadyComponent );
  
      expect(screen.getByText(/MockSidebar/i).classList).toContain("flex-row");
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  
  })

  describe('if the sidebar is at the right of the screen', () => {

    beforeEach(() => {
      useCustomizationStore.setState({ 
        locationSidebar: "right"
      })
    })

    it('has "flex-row-reverse" class name if the sidebar is at the right of the screen', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockSidebar/i).classList).toContain("flex-row-reverse");
    });
    

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  
  })
  
  it('renders different components', () => {

    render(renderReadyComponent );

    expect(screen.getByText(/MockSidebar/i)).toBeInTheDocument();
    expect(screen.getByText(/MockNavbar/i)).toBeInTheDocument();
    expect(screen.getByText(/MockSidebarHandle/i)).toBeInTheDocument();
    expect(screen.getByText(/MockMainReactFlow/i)).toBeInTheDocument();
  });

  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});