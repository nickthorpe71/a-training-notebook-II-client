import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Weekday from './Weekday';
import { mount } from 'enzyme';

describe('<Weekday />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <Weekday />
      </BrowserRouter>,
    )
  })
})