import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HelpView from './HelpView';
import { mount } from 'enzyme';

describe('<HelpView />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <HelpView />
      </BrowserRouter>,
    );
  });
});