import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignUpView from './SignUpView';
import { mount } from 'enzyme';

describe('<SignUpView />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <SignUpView />
      </BrowserRouter>,
    )
  })
})