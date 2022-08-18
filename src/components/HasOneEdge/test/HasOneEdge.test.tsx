import { HasOneEdge } from '../HasOneEdge';
import { render, screen } from "@testing-library/react";
import { 
  HasAnyEdgeType,
  HasAnyEdgeLabel
} from '@/components'


jest.mock('@/components',  () => ({
  HasAnyEdge: (
    (props: HasAnyEdgeType ) => (
      <>
        MockRemoveEdgeButton
        { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
      </>
    )
  ),
}))

let renderReadyComponent: JSX.Element;



beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <HasOneEdge
        id={"111"}
        source={"1"}
        target={"2"}
        sourceX={333}
        sourceY={444}
        targetX={555}
        targetY={666}
        style = {{}}
        label={HasAnyEdgeLabel.HasOne}
        selected={false}
      />
    </svg>
  );
});

describe('<HasOneEdge />', () => {

  it('renders HasAnyEdge component correctly', () => {
    render(renderReadyComponent );
      expect(screen.getByText(/MockRemoveEdgeButton/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});