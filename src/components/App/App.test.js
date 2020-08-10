import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { mount } from 'enzyme';

describe('<App />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
});