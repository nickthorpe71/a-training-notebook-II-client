import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import MainView from '../../components/MainView/MainView';
import WorkoutView from '../../components/WorkoutView/WorkoutView';
import SignUpView from '../../components/SignUpView/SignUpView';
import LoginView from '../../components/LoginView/LoginView';
import LandingView from '../../components/LandingView/LandingView';
import HelpView from '../../components/HelpView/HelpView';
import BurgerMenu from '../../components/Nav/BurgerMenu';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <Link to='/'>
            <h1 className="logo">a training notebook</h1>
          </Link>
          <BurgerMenu right={true} />
        </header>
        <main className="view">
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <PrivateRoute
            exact
            path="/"
            component={MainView} />
          <PublicOnlyRoute
            exact
            path="/signup"
            component={SignUpView} />
          <PublicOnlyRoute
            exact
            path="/login"
            component={LoginView} />
          <PrivateRoute
            path="/workout/:workoutId"
            component={WorkoutView} />
          <PublicOnlyRoute
            exact
            path="/landing"
            component={LandingView} />
          <PrivateRoute
            exact
            path="/help"
            component={HelpView} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
