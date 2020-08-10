import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DayPreview from './DayPreview';
import { mount } from 'enzyme';
import MainContext from '../../../MainContext';

beforeEach(() => {
  jest.resetModules();
});

describe('<DayPreview />', () => {
  it('renders without crashing', () => {
    const contextValue = {
      selectedDate: new Date(),
      matchingWorkouts: [{
        id: 1,
        user_id: 1,
        title: 'A Workout',
        workout_start_time: new Date().getTime,
        workout_end_time: new Date().getTime,
        workout_date: new Date(),
        exercises: 'a string of exercises would be here'
      }],
    };
    mount(
      <BrowserRouter>
        <MainContext.Provider value={contextValue}>
          <DayPreview />
        </MainContext.Provider>
      </BrowserRouter>,
    );
  });
});