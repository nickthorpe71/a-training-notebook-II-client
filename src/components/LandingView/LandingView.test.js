import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingView from './LandingView';
import { mount } from 'enzyme';

describe('<LandingView />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <LandingView />
      </BrowserRouter>,
    );
  });
});