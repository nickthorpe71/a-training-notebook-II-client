import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainView from './MainView';
import { mount } from 'enzyme';
import MainContext from '../../MainContext';

beforeEach(() => {
  jest.resetModules();
});

describe('<MainView />', () => {
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
      dateDots: {},
      changeSelectedDate: () => { },
      determineWorkoutDots: () => { },
      changeSelectedMonth: () => { },
      changeSelectedYear: () => { },
      setLoading: () => { },
      handleSetError: () => { },
      handleDayClick: () => { },
      handleLoginState: () => { },
      handleRegisteredState: () => { },
      saveUserInfo: () => { },
    };
    mount(
      <BrowserRouter>
        <MainContext.Provider value={contextValue}>
          <MainView />
        </MainContext.Provider>
      </BrowserRouter>,
    );
  });
});