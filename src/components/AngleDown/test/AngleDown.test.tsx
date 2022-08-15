import {AngleDown} from '../AngleDown';
import { render } from '@testing-library/react';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <AngleDown></AngleDown>
  );
});

describe('<AngleDown />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});