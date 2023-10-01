import { ExpandToRight } from '../ExpandToRight';
import { render } from '@testing-library/react';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <ExpandToRight></ExpandToRight>
  );
});

describe('<ExpandToRight />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});