import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useCustomizationStore from '@/zustandStore/customizationStore';


jest.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = jest.fn();

describe('useCustomizationStore', () => {
  it('has an "locationSidebar" attribute and its value should be "left" as default', () => {
      expect(useCustomizationStore.getState().locationSidebar  ).toBe("left");
  });

  it('has a "widthSidebar" attribute and its value should exist as default', () => {
      expect(useCustomizationStore.getState().widthSidebar  ).toBeTruthy();
  });

  it('has a "showTextOnEdges" attribute and its value should be false as default', () => {
    expect(useCustomizationStore.getState().showTextOnEdges).toBe(false);
    
  });

  it('has a "sidebarVisible" attribute and its value should be true as default', () => {
    expect(useCustomizationStore.getState().sidebarVisible  ).toBe(true);
  });

  it('has a "navbarVisible" attribute and its value should be true as default', () => {
    expect(useCustomizationStore.getState().navbarVisible  ).toBe(true);
  });

  it('has a "toggleLocationSidebar" function to toggle the location of the sidebar', () => {
    expect(useCustomizationStore.getState().locationSidebar).toBe("left");

    useCustomizationStore.getState().toggleLocationSidebar()

    expect(useCustomizationStore.getState().locationSidebar).toBe("right");
    
    useCustomizationStore.getState().toggleLocationSidebar()

    expect(useCustomizationStore.getState().locationSidebar).toBe("left");
  });

  it('has a "toggleSidebarVisibility" function to toggle the visibility of the sidebar', () => {
    expect(useCustomizationStore.getState().sidebarVisible).toBe(true);

    useCustomizationStore.getState().toggleSidebarVisibility()

    expect(useCustomizationStore.getState().sidebarVisible).toBe(false);
  });

  it('has a "toggleNavbarVisibility" function to toggle the visibility of the navbar', () => {
    expect(useCustomizationStore.getState().navbarVisible).toBe(true);

    useCustomizationStore.getState().toggleNavbarVisibility()

    expect(useCustomizationStore.getState().navbarVisible).toBe(false);
  });

  describe("if locationSidebar is 'left'", () => {
    beforeEach(() => {
      useCustomizationStore.setState(
        {
          sidebarVisible: false,
          locationSidebar: "left"
        }
      )
    })
    
    it('has a "handleSidebarWidthChange" function to change the width of the sidebar', () => {
  
      useCustomizationStore.getState().handleSidebarWidthChange({clientX: 10} as React.DragEvent<HTMLDivElement>)
  
      expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
      expect(useCustomizationStore.getState().widthSidebar).toBe(10);
    });
  })
 

  describe("if locationSidebar is 'right'", () => {
    beforeEach(() => {
      useCustomizationStore.setState(
        {
          sidebarVisible: false,
          locationSidebar: "right"
        }
      )
    })
    
    it('has a "handleSidebarWidthChange" function to change the width of the sidebar', () => {
  
      useCustomizationStore.getState().handleSidebarWidthChange({clientX: 10} as React.DragEvent<HTMLDivElement>)
  
      expect(useCustomizationStore.getState().sidebarVisible).toBe(true);
      expect(useCustomizationStore.getState().widthSidebar).toBe(window.innerWidth - 10);
    });
  })

  it('has a "toggleTextMode" function to toggle the visibility of the edge names', () => {
    expect(useCustomizationStore.getState().showTextOnEdges).toBe(false);

    useCustomizationStore.getState().toggleTextMode()

    expect(useCustomizationStore.getState().showTextOnEdges).toBe(true);
  });

});