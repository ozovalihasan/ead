import { HasOneEdge } from '../HasOneEdge';
import { render, screen } from "@testing-library/react";
import { 
  HasAnyEdgePropsType,
} from '@/components'

jest.mock('@/components',  () => ({
  HasAnyEdge: (
    (
      {
        selected,
        ...rest
      }: HasAnyEdgePropsType 
    ) => (
      <>
        MockRemoveEdgeButton
        { Object.keys(rest).map((key) => `${key}: ${rest[key as keyof typeof rest]}`) }
        {selected ? "selected" : "not selected"}
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
        label={ "has one" }
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