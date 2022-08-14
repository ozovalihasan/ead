import {AngleDown} from './AngleDown';
import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import React from "react"


let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  renderReadyComponent = (
    <AngleDown></AngleDown>
  );
});

describe('<ListTrackedItems />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});