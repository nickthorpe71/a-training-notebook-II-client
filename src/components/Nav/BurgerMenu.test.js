import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import { mount } from 'enzyme';

describe('<BurgerMenu />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>,
    );
  });
});