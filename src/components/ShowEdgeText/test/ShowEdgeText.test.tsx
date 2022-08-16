import { ShowEdgeText, ShowEdgeTextType } from '../ShowEdgeText';
import { render, screen, act, renderHook, fireEvent } from "@testing-library/react";
import useCustomizationStore from "@/zustandStore/customizationStore";
import { EdgeTextProps } from 'react-flow-renderer';
import React from 'react';



jest.mock('react-flow-renderer',  () => ({
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
    <ShowEdgeText centerX={20} centerY={20} label="Mock Label" />
  );
});

describe('<ShowEdgeText />', () => {
  describe('if showTextOnEdges is true', () => {

    it('renders correctly', () => {
      
      useCustomizationStore.setState({ 
        showTextOnEdges: true 
      })

      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  })

  describe('if showTextOnEdges is false', () => {

    it('renders correctly', () => {
      
      useCustomizationStore.setState({ 
        showTextOnEdges: false 
      })

      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  })

});