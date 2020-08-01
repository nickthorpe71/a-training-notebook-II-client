import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../MainContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './LoginView.css';

export default function LoginView(props) {

  const context = useContext(Context);

  function handleSubmitJwtAuth(event) {
    event.preventDefault();

    const { email, password } = event.target;

    console.log(email.value, password.value);

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        console.log(res);
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.user_id);
        context.saveUserInfo(res.username, res.email);
        context.handleLoginState(true);
        props.history.push("/");
      })
      .catch((res) => {
        // context(res.error);
      });
  };

  return (
    <form onSubmit={handleSubmitJwtAuth}>
      <div className="login-form">
        <h1>Log in</h1>
        <section className="form-section">
          <label className="input-title" htmlFor="email"><b>Email</b></label>
          <input className="underline-input" type="text" name="email" required />
        </section>
        <section className="form-section">
          <label className="input-title" htmlFor="password"><b>Password</b></label>
          <input className="underline-input" type="password" name="password" required />
        </section>
        <section>
          <button type="submit" className="lit-button">Login</button>
          <Link to='/landing'>
            <button
              type="button"
              className="unlit-button"
            >Cancel
            </button>
          </Link>
        </section>
      </div>
    </form>
  );
}

