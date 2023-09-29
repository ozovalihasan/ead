import { AllHandlers } from '../AllHandlers';
import { render, screen } from "@testing-library/react";
import { useStore } from '@/zustandStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  useStore.setState({ 
    isConnectContinue: false,
    isMouseOnNode: true,
    mouseOnNodeId: "111"
  })
  
  renderReadyComponent = (
    <AllHandlers nodeId="111" />
  );
});

describe('<AllHandlers />', () => {
  it('renders three different handlers', () => {
    render(renderReadyComponent);

    expect(screen.getAllByText(/111/i).length).toBe(3);
    expect(screen.getByText(/has_one/i)).toBeInTheDocument();
    expect(screen.getByText(/MockHasOneHandle/i)).toBeInTheDocument();
    expect(screen.getByText(/has_many/i)).toBeInTheDocument();
    expect(screen.getByText(/MockHasManyHandle/i)).toBeInTheDocument();
    expect(screen.getByText(/through/i)).toBeInTheDocument();
    expect(screen.getByText(/MockThroughHandle/i)).toBeInTheDocument();
  });

  it('will be visible if the necessary conditions are satisfied', () => {
    render(renderReadyComponent);

    const mainElement = screen.getAllByText(/111/i)[0].parentNode as HTMLElement

    expect(mainElement.classList).toContain("opacity-100");
  });

  it('will be invisible if the necessary conditions are not satisfied', () => {
    useStore.setState({ 
      isConnectContinue: true,
    })
    
    render(renderReadyComponent);

    const mainElement = screen.getAllByText(/111/i)[0].parentNode as HTMLElement

    expect(mainElement.classList).toContain("opacity-0");
  });
  
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});