import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WorkoutView from './WorkoutView';
import { mount } from 'enzyme';

describe('<WorkoutView />', () => {
  it('renders without crashing', () => {
    const match = { params: { workout_id: 1 } };
    mount(
      <BrowserRouter>
        <WorkoutView match={match} />
      </BrowserRouter>,
    );
  });
});