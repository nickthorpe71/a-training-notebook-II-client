import React, { Component } from 'react';
import TokenService from './services/token-service';
import WorkoutsApiService from './services/workouts-api-service';
import { Icon } from '@iconify/react';
import circleFill from '@iconify/icons-bi/circle-fill';

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
    loading: false,
    dateDots: {}
  };

  changeSelectedYear = (newYear) => {
    const { selectedDate } = this.state;

    const newFullDate = new Date(
      newYear,
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    this.determineWorkoutDotsCall(newFullDate.getMonth() + 1, newYear)
      .then(dateDots => {
        this.setState({
          dateDots,
          selectedDate: newFullDate,
          loading: false
        })
      });
  }

  changeSelectedMonth = (newMonth) => {
    const { selectedDate } = this.state;

    const newFullDate = new Date(
      selectedDate.getFullYear(),
      newMonth,
      selectedDate.getDate()
    );

    this.determineWorkoutDotsCall(newFullDate.getMonth() + 1, selectedDate.getFullYear())
      .then(dateDots => {
        this.setState({
          dateDots,
          selectedDate: newFullDate,
          loading: false
        })
      });
  }

  changeSelectedDate = (date) => {
    const searchDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    WorkoutsApiService.getWorkoutsByDate(searchDate)
      .then((res) => {
        this.setState({
          selectedDate: date,
          matchingWorkouts: res,
          editing: true,
          loading: false
        });
      })
  }

  setLoading = (loading) => {
    this.setState({ loading });
  }

  handleSetError = (error) => {
    this.setState({ error, loading: false });
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
      selectedDate.getMonth(),
      newDay
    );

    const searchDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${newDay}`

    WorkoutsApiService.getWorkoutsByDate(searchDate)
      .then((res) => {
        this.setState({
          selectedDate: newFullDate,
          matchingWorkouts: res,
          editing: true,
          loading: false
        });
      })
  }

  renderLoading = () => {
    return (
      <div className="loading-container">
        <h1 className="loading-text">one moment...</h1>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  renderMain = (value) => {
    return (
      < MainContext.Provider value={value} >
        {this.props.children}
      </MainContext.Provider >
    )
  }

  checkIfLoading = () => {
    return this.state.loading;
  }

  determineWorkoutDotsCall = (searchMonth, searchYear) => {
    let dateDots = {}

    return WorkoutsApiService.getWorkoutsByMonth(String(searchMonth).padStart(2, '0'), searchYear)
      .then(res => {
        if (!res) {
          return
        }

        let count = res.length;
        for (let i = 0; i < count; i++) {
          const workoutDay = String(res[i].workout_date.slice(8, 10)).padStart(2, '0')
          dateDots[workoutDay] = <Icon color={'aqua'} icon={circleFill} />
        }
        for (let i = 1; i <= 31; i++) {
          const iKey = String(i).padStart(2, '0');
          if (!(iKey in dateDots)) {
            dateDots[iKey] = <Icon color={'transparent'} icon={circleFill} />;
          }
        }
        return dateDots;
      });
  }

  determineWorkoutDots = () => {
    const searchMonth = this.state.selectedDate.getMonth() + 1;
    const searchYear = this.state.selectedDate.getFullYear();

    this.determineWorkoutDotsCall(searchMonth, searchYear).then(dateDots => {
      this.setState({ dateDots })
    });
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
      dateDots: this.state.dateDots,
      changeSelectedDate: this.changeSelectedDate,
      determineWorkoutDots: this.determineWorkoutDots,
      changeSelectedMonth: this.changeSelectedMonth,
      changeSelectedYear: this.changeSelectedYear,
      setLoading: this.setLoading,
      handleSetError: this.handleSetError,
      handleDayClick: this.handleDayClick,
      handleLoginState: this.handleLoginState,
      handleRegisteredState: this.handleRegisteredState,
      saveUserInfo: this.saveUserInfo,
    };
    return (
      <div>
        {
          this.checkIfLoading()
            ? this.renderLoading()
            : this.renderMain(value)
        }
      </div>
    );
  }
}