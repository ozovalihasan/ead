import { availableColors, setColorVariants } from '@/helpers';
import { render, screen } from '@testing-library/react';
import { useCustomizationStore, checkLocalStorage, LocationSidebar } from '@/zustandStore/customizationStore';


jest.mock('@/helpers',  () => ({
  setColorVariants: jest.fn(),
  availableColors: ["mock color"]
}));

describe('checkLocalStorage', () => {
  describe('if localStorage is empty', () => {
    beforeAll(()=> {
      localStorage.clear()
    })

    it('updates necessary attributes', () => {
      checkLocalStorage()

      expect(JSON.parse(localStorage.locationSidebar as string)).toBe(LocationSidebar.Left);
      expect(JSON.parse(localStorage.widthSidebar as string)).toBeTruthy();
      expect(JSON.parse(localStorage.mainColor as string)).toBe(availableColors[0]);
      expect(JSON.parse(localStorage.darkModeActive as string)).toBe(false);
    });
  })

  describe('if attributes are defined previously', () => {
    beforeAll(()=> {
      localStorage.locationSidebar = JSON.stringify(LocationSidebar.Left)
      localStorage.widthSidebar = JSON.stringify(100)
      localStorage.mainColor = JSON.stringify("mock")
      localStorage.darkModeActive = JSON.stringify(true)
    })

    it('doesn"t change any attribute', () => {
      expect(JSON.parse(localStorage.locationSidebar as string)).toBe(LocationSidebar.Left);
      expect(JSON.parse(localStorage.widthSidebar as string)).toBe(100);
      expect(JSON.parse(localStorage.mainColor as string)).toBe("mock");
      expect(JSON.parse(localStorage.darkModeActive as string)).toBe(true);
    });

    describe('if dark mode is active', () => {
      it('updates the class list of the element "div#root"', () => {
        localStorage.darkModeActive = JSON.stringify(true)
        render(<div id="root">MockRoot</div>)
        
        expect(screen.getByText("MockRoot").classList).not.toContain("dark");

        checkLocalStorage()
        
        expect(screen.getByText("MockRoot").classList).toContain("dark");
      })
    })
  })
  
})

describe('useCustomizationStore', () => {
  describe('if it has been initialized for the first time', () => {
    it('has an "locationSidebar" attribute and its value should be updated by using the localStorage', () => {
      expect(useCustomizationStore.getState().locationSidebar).toBe(LocationSidebar.Left);
    });
  
    it('has a "widthSidebar" attribute and its value should be updated by using the localStorage', () => {
      expect(useCustomizationStore.getState().widthSidebar).toBeTruthy();
    });
  
    it('has a "showTextOnEdges" attribute and its value should be false as default', () => {
      expect(useCustomizationStore.getState().showTextOnEdges).toBe(false);
      
    });
  
    it('has a "sidebarVisible" attribute and its value should be true as default', () => {
      expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
    });
  
    it('has a "navbarVisible" attribute and its value should be true as default', () => {
      expect(useCustomizationStore.getState().navbarVisible).toBe(true);
    });

    it('has a "mainColor" attribute and its value should be updated by using the localStorage', () => {
      expect(useCustomizationStore.getState().mainColor).toBe(availableColors[0]);
    });
  
    it('has a "darkModeActive" attribute and its value should be updated by using the localStorage', () => {
      expect(useCustomizationStore.getState().darkModeActive ).toBe(false);
    });

  })
  
  describe("if the customization store has been initialized'", () => {
    afterEach(() => {
      localStorage.clear()
    })

    it('has a "changeMainColor" function to change the main color', () => {
      useCustomizationStore.getState().changeMainColor(availableColors[0])
  
      expect(setColorVariants).toHaveBeenCalledTimes(1);
      expect(useCustomizationStore.getState().mainColor).toBe(availableColors[0]);
    });
  
    it('has a "toggleLocationSidebar" function to toggle the location of the sidebar', () => {
      expect(useCustomizationStore.getState().locationSidebar).toBe(LocationSidebar.Left);
  
      useCustomizationStore.getState().toggleLocationSidebar()
  
      expect(useCustomizationStore.getState().locationSidebar).toBe(LocationSidebar.Right);
      expect(JSON.parse(localStorage.locationSidebar as string)).toBe(LocationSidebar.Right);
      
      useCustomizationStore.getState().toggleLocationSidebar()
  
      expect(useCustomizationStore.getState().locationSidebar).toBe(LocationSidebar.Left);
      expect(JSON.parse(localStorage.locationSidebar as string)).toBe(LocationSidebar.Left);
  
    });
  
    it('has a "toggleSidebarVisibility" function to toggle the visibility of the sidebar', () => {
      expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
  
      useCustomizationStore.getState().toggleSidebarVisibility()
      
      expect(useCustomizationStore.getState().sidebarVisible).toBe(false);

      useCustomizationStore.getState().toggleSidebarVisibility()

      expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
    });
  
    it('has a "toggleNavbarVisibility" function to toggle the visibility of the navbar', () => {
      expect(useCustomizationStore.getState().navbarVisible).toBe(true);
  
      useCustomizationStore.getState().toggleNavbarVisibility()
  
      expect(useCustomizationStore.getState().navbarVisible).toBe(false);

      useCustomizationStore.getState().toggleNavbarVisibility()
  
      expect(useCustomizationStore.getState().navbarVisible).toBe(true);
    });
  
    describe("if locationSidebar is 'left'", () => {
      beforeEach(() => {
        useCustomizationStore.setState(
          {
            sidebarVisible: false,
            locationSidebar: LocationSidebar.Left
          }
        )
      })
      
      it('has a "handleSidebarWidthChange" function to change the width of the sidebar', () => {
    
        useCustomizationStore.getState().handleSidebarWidthChange({clientX: 10} as React.DragEvent<HTMLDivElement>)
        
        expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
        expect(useCustomizationStore.getState().widthSidebar).toBe(10);
        expect(JSON.parse(localStorage.widthSidebar as string)).toBe(10);
      });
    })
   
  
    describe("if locationSidebar is 'right'", () => {
      beforeEach(() => {
        useCustomizationStore.setState(
          {
            sidebarVisible: false,
            locationSidebar: LocationSidebar.Right
          }
        )
      })
      
      it('has a "handleSidebarWidthChange" function to change the width of the sidebar', () => {
    
        useCustomizationStore.getState().handleSidebarWidthChange({clientX: 10} as React.DragEvent<HTMLDivElement>)
    
        expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
        expect(useCustomizationStore.getState().widthSidebar).toBe(window.innerWidth - 10);
        expect(JSON.parse(localStorage.widthSidebar as string)).toBe(window.innerWidth - 10);
  
      });
    })
  
    it('has a "toggleTextMode" function to toggle the visibility of the edge names', () => {
      expect(useCustomizationStore.getState().showTextOnEdges).toBe(false);
  
      useCustomizationStore.getState().toggleTextMode()
  
      expect(useCustomizationStore.getState().showTextOnEdges).toBe(true);
  
      useCustomizationStore.getState().toggleTextMode()
  
      expect(useCustomizationStore.getState().showTextOnEdges).toBe(false);
    });
  
    it('has a "toggleDarkMode" function to toggle the dark mode', () => {
      render(<div id="root">MockRoot</div>)

      localStorage.darkModeActive = JSON.stringify(false)
      
      expect(useCustomizationStore.getState().darkModeActive).toBe(false);
      expect(screen.getByText("MockRoot").classList).not.toContain("dark");
      expect(JSON.parse(localStorage.darkModeActive as string)).toBe(false);
  
      useCustomizationStore.getState().toggleDarkMode()
  
      expect(screen.getByText("MockRoot").classList).toContain("dark");
      expect(useCustomizationStore.getState().darkModeActive).toBe(true);
      expect(JSON.parse(localStorage.darkModeActive as string)).toBe(true);
  
      useCustomizationStore.getState().toggleDarkMode()
  
      expect(screen.getByText("MockRoot").classList).not.toContain("dark");
      expect(useCustomizationStore.getState().darkModeActive).toBe(false);
      expect(JSON.parse(localStorage.darkModeActive as string)).toBe(false);
    });

  })

});