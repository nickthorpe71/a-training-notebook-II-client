import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Day from './Day';
import { mount } from 'enzyme';

describe('<Day />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <Day />
      </BrowserRouter>,
    )
  })
})