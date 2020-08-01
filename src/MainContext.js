import React, { Component } from 'react';
import TokenService from './services/token-service';
import WorkoutsApiService from './services/workouts-api-service';

const MainContext = React.createContext({})

export default MainContext;

export class MainProvider extends Component {
  state = {
    username: '',
    email: '',
    loggedIn: TokenService.hasAuthToken(),
    registered: TokenService.hasAuthToken(),
    error: null,
    selectedDate: new Date(),
    matchingWorkouts: [],
    editing: false,
  };

  handleSetError = (error) => {
    this.setState({ error });
  }

  saveUserInfo = (username, email) => {
    this.setState({ username, email });
  };

  handleLoginState = (isLoggedIn) => {
    this.setState({
      loggedIn: isLoggedIn,
    });
  };

  handleRegisteredState = (isRegistered) => {
    this.setState({
      registered: isRegistered,
    });
  };

  handleDayClick = (newDay) => {
    const { selectedDate } = this.state;

    const newFullDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(), //this will need to change to desired month if we want to allow month navigation
      newDay
    );

    const searchDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${newDay}`

    WorkoutsApiService.getWorkoutsByDate(searchDate)
      .then((res) => {
        this.setState({
          selectedDate: newFullDate,
          matchingWorkouts: res,
          editing: true,
        });
      })
  }

  render() {
    const value = {
      username: this.state.username,
      loggedIn: this.state.loggedIn,
      registered: this.state.registered,
      error: this.state.error,
      selectedDate: this.state.selectedDate,
      matchingWorkouts: this.state.matchingWorkouts,
      editing: this.state.matchingWorkouts,
      handleDayClick: this.handleDayClick,
      handleLoginState: this.handleLoginState,
      handleRegisteredState: this.handleRegisteredState,
      saveUserInfo: this.saveUserInfo,
    };
    return (
      <MainContext.Provider value={value}>
        {this.props.children}
      </MainContext.Provider>
    );
  }
}