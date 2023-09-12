import {  Navbar } from '../Navbar';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import useCustomizationStore from '@/zustandStore/customizationStore';
import saveJSON from "../saveJSON"

jest.mock('../saveJSON',  () => ({
  default: jest.fn()
}))


  

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    resetStore: jest.fn(),
    uploadStore: jest.fn()
  })

 
    
    
  renderReadyComponent = (
    <Navbar />
  );
});

describe('<Navbar />', () => {
  describe('it renders a button to show/hide the navbar', () => {
    it('has a arrow up icon if navbar is visible', () => {
      useCustomizationStore.setState({ 
        navbarVisible: true
      })

      render(renderReadyComponent );

      expect(screen.getByText(/MockUpArrow/i)).toBeInTheDocument();
    });

    it('has a arrow down icon if navbar is visible', () => {
      useCustomizationStore.setState({ 
        navbarVisible: false
      })

      render(renderReadyComponent );

      expect(screen.getByText(/MockAngleDown/i)).toBeInTheDocument();
    });

    it('calls the toggleNavbarVisibility function when it is clicked', () => {
      useCustomizationStore.setState({ 
        toggleNavbarVisibility: jest.fn()
      })

      render(renderReadyComponent );
      const { result } = renderHook(() => useCustomizationStore());

      const showHideNavbarButton = screen.getByTitle(/Click to show\/hide the navbar/i);
      expect(showHideNavbarButton).toBeInTheDocument();

      fireEvent.click(showHideNavbarButton);

      expect(result.current.toggleNavbarVisibility).toHaveBeenCalledTimes(1);
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });

  })
  
  
  describe('if navbar is visible', () => {
    beforeEach(() => {
      useCustomizationStore.setState({ 
        navbarVisible: true
      })
    });

    it('renders EADLogo component', () => {

      render(renderReadyComponent );

      expect(screen.getByText(/MockEADLogo/i)).toBeInTheDocument();
    });

    it('renders a button to download a EAD', () => {

      render(renderReadyComponent );

      const downloadButton = screen.getByRole("button", { name: "Download EAD" });
      expect(downloadButton).toBeInTheDocument();

      fireEvent.click(downloadButton);

      expect(saveJSON).toHaveBeenCalledTimes(1);
    });
    
    it('renders a button to upload a EAD', () => {

      render(renderReadyComponent );

      const { result } = renderHook(() => useStore());

      const uploadButton = screen.getByText("Upload EAD");

      expect(uploadButton).toBeInTheDocument();

      fireEvent.change(uploadButton.getElementsByTagName('input')[0], "");
      
      expect(result.current.uploadStore).toHaveBeenCalledTimes(1);
    });

    it('renders a button to download a EAD', () => {

      render(renderReadyComponent );

      const { result } = renderHook(() => useStore());

      const resetButton = screen.getByRole("button", { name: "Reset" });
      expect(resetButton).toBeInTheDocument();

      fireEvent.click(resetButton);

      expect(result.current.resetStore).toHaveBeenCalledTimes(1);
    });

    it('renders Settings component', () => {

      render(renderReadyComponent );

      const settingsElement = screen.getByText(/Settings/i)

      expect(settingsElement).toBeInTheDocument();
    });

    it('renders GithubLogo component as an anchor', () => {

      render(renderReadyComponent );

      const githubElement = screen.getByText(/MockGithubLogo/i)

      expect(githubElement).toBeInTheDocument();
      expect(githubElement.tagName).toEqual("A");
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  })  

  describe('if navbar is invisible', () => {


    beforeEach(() => {
      useCustomizationStore.setState({ 
        navbarVisible: false
      })
    });

    it('has a "hidden" class', () => {
      render(renderReadyComponent );

      const navElement = screen.getAllByText("")[0].getElementsByTagName('nav')[0]

      expect(navElement.classList).toContain("hidden");
    });


    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  })

});