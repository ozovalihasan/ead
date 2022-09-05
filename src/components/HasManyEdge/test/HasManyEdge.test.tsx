import { HasManyEdge } from '../HasManyEdge';
import { render, screen } from "@testing-library/react";
import { 
  HasAnyEdgePropsType,
} from '@/components'


jest.mock('@/components',  () => ({
  HasAnyEdge: (
    (
      {
        id,
        source,
        target,
        sourceX,
        sourceY,
        targetX,
        targetY,
        label,
        selected,
      }: HasAnyEdgePropsType 
    ) => (
      <>
        MockHasAnyEdge
        id: {id}
        source: {source}
        target: {target}
        sourceX: {sourceX}
        sourceY: {sourceY}
        targetX: {targetX}
        targetY: {targetY}
        label: {label}
        {selected ? "selected" : "not selected"}
      </>
    )
  ),
}))

let renderReadyComponent: JSX.Element;



beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <HasManyEdge
        id={"111"}
        source={"1"}
        target={"2"}
        sourceX={333}
        sourceY={444}
        targetX={555}
        targetY={666}
        label={"has many"}
        selected={false}
      />
    </svg>
  );
});

describe('<HasManyEdge />', () => {

  it('renders HasAnyEdge component correctly', () => {
    render(renderReadyComponent );
      expect(screen.getByText(/MockHasAnyEdge/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});