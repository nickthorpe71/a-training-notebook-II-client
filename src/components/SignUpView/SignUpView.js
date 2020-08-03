import React from 'react';
import './SignUpView.css';
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import MainContext from '../../MainContext'
import { Link } from 'react-router-dom';

export default class SignUpView extends React.Component {
  static contextType = MainContext;

  state = {
    error: null,
    loading: false,
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = e.target;

    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      email: email.value,
    })
      .then((user) => {
        username.value = "";
        password.value = "";
        email.value = "";
        this.context.handleRegisteredState(true);
        // this.handleLoginAfterRegister(username.value, password.value)
      })
      .catch((res) => {
        console.log(res.error)
        this.setState({ error: res.error });
      });
  };

  handleLoginAfterRegister = (username, password) => {
    AuthApiService.postLogin({
      username,
      password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push("/");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <form className="register-form" onSubmit={this.handleRegisterSubmit} >
        <div className="sign-up-form">
          <h1>Welcome to a training notebook!</h1>
          <p>Please fill in this form to create an account.</p>
          <section className="form-section">
            <label className="input-title" htmlFor="username"><b>Set a username</b></label>
            <input className="underline-input" type="text" name="username" required />
          </section>
          <section className="form-section">
            <label className="input-title" htmlFor="email"><b>What's your email?</b></label>
            <input className="underline-input" type="text" name="email" required />
          </section>
          <section className="form-section">
            <label className="input-title" htmlFor="password"><b>Password</b></label>
            <input className="underline-input" type="password" name="password" required />
          </section>
          {/* <section className="form-section">
            <label className="input-title" htmlFor="password-repeat"><b>Confirm</b></label>
            <input className="underline-input" type="password" name="password-repeat" required />
          </section> */}
          <p>By creating an account you agree to our <a href="https://app.termly.io/document/privacy-policy/f476937d-b4d9-4a9a-802d-31e0c1100d24">Terms Privacy</a>.</p>
          <section>
            <Link to='/landing'>
              <button
                type="button"
                className="unlit-button"
              >Cancel
              </button>
            </Link>
            <button type="submit" className="lit-button">Continue</button>
          </section>
        </div>
      </form>
    );
  }

}

