import { ShowEdgeText } from '../ShowEdgeText';
import { render, screen } from "@testing-library/react";
import { EdgeTextProps } from 'reactflow';
import React from 'react';

jest.mock('reactflow',  () => ({
  EdgeText: ({
    x, 
    y, 
    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    labelBgBorderRadius,
  }: EdgeTextProps) => {
    
    return (
      <>
        x: {x}
        y: {y}
        label: {label}
        labelStyle: {JSON.stringify(labelStyle)}
        labelShowBg: {JSON.stringify(labelShowBg)}
        labelBgStyle: {JSON.stringify(labelBgStyle)}
        labelBgPadding: {JSON.stringify(labelBgPadding)}
        labelBgBorderRadius: {JSON.stringify(labelBgBorderRadius)}
      </>
    );
  },
}));

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <ShowEdgeText centerX={20} centerY={20} label="mockLabel" />
  );
});

describe('<ShowEdgeText />', () => {
  it("shows the label", () => {
    render(renderReadyComponent );
    
    expect(screen.getByText(/mockLabel/i)).toBeInTheDocument()
  })
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});