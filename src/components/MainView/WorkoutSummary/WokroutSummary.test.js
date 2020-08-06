import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WorkoutSummary from './WorkoutSummary';
import { mount } from 'enzyme';

describe('<WorkoutSummary />', () => {
  it('renders without crashing', () => {
    mount(
      <BrowserRouter>
        <WorkoutSummary />
      </BrowserRouter>,
    )
  })
})