import React from 'react';
import './SignUpView.css';
import AuthApiService from '../../services/auth-api-service';
import MainContext from '../../MainContext';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class SignUpView extends React.Component {
  static contextType = MainContext;

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = e.target;

    this.context.setLoading(true);
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      email: email.value,
    })
      .then((user) => {
        this.context.setLoading(false);
        this.handleLoginAfterRegister(username.value, password.value);
      })
      .catch((res) => {
        this.context.handleSetError(res.error);
        this.context.setLoading(false);
      });
  };

  handleLoginAfterRegister = (username, password) => {
    this.props.history.push("/login");
  };

  checkUsername = () => {
    if (TokenService.getUsername())
      return TokenService.getUsername();
    return '';
  };

  checkEmail = () => {
    if (TokenService.getEmail())
      return TokenService.getEmail();
    return '';
  };

  render() {
    return (
      <div className="signup-bg">
        <form className="register-form" onSubmit={this.handleRegisterSubmit} >
          <div className="sign-up-form">
            <h1>Welcome to a training notebook!</h1>
            <p>Please fill in this form to create an account.</p>
            <section className="form-section">
              <label className="input-title" htmlFor="username"><b>Set a username</b></label>
              <input className="underline-input" type="text" name="username" defaultValue={this.checkUsername()} required />
            </section>
            <section className="form-section">
              <label className="input-title" htmlFor="email"><b>What's your email?</b></label>
              <input className="underline-input" type="text" name="email" defaultValue={this.checkEmail()} required />
            </section>
            <section className="form-section">
              <label className="input-title" htmlFor="password"><b>Password</b></label>
              <input className="underline-input" type="password" name="password" required />
            </section>
            {this.context.error && <p className="error">{this.context.error}</p>}
            <p>By creating an account you agree to our <a href="https://app.termly.io/document/privacy-policy/f476937d-b4d9-4a9a-802d-31e0c1100d24">Terms Privacy</a>.</p>
            <section>
              <Link to='/landing'>
                <button
                  type="button"
                  className="unlit-button"
                  onClick={() => this.context.handleSetError(false)}
                >Cancel
              </button>
              </Link>
              <button type="submit" className="lit-button">Continue</button>
            </section>
          </div>
        </form>
      </div>
    );
  }

}

