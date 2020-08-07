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

    const { username, password } = event.target;
    console.log(username.value)
    console.log(password.value)

    context.setLoading(true);
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        console.log(username.value)
        console.log(password.value)
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.user_id);
        context.handleLoginState(true);
        context.setLoading(false);
        props.history.push("/");
      })
      .catch((res) => {
        context.handleSetError(res.error);
        context.setLoading(false);
      });
  };

  return (
    <div className="login-bg">
      <form onSubmit={handleSubmitJwtAuth}>
        <div className="login-form">
          <h1>Log in</h1>
          {context.error && <p className="error">{context.error}</p>}
          <section className="form-section">
            <label className="input-title" htmlFor="username"><b>Username</b></label>
            <input className="underline-input" type="text" name="username" required />
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
    </div>
  );
}

