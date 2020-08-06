import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginView from './LoginView';
import { mount } from 'enzyme';

describe('<LoginView />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>,
    )
  })
})