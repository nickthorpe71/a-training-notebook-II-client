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

    context.setLoading(true);
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.user_id);
        context.setLoading(false);
        props.history.push("/");
      })
      .catch((res) => {
        context.handleSetError(res.error);
        context.setLoading(false);
      });
  };

  function checkUsername() {
    if (TokenService.getUsername())
      return TokenService.getUsername();
    return '';
  }

  return (
    <div className="login-bg">
      <form onSubmit={handleSubmitJwtAuth}>
        <div className="login-form">
          <h1>Log in</h1>
          {context.error && <p className="error">{context.error}</p>}
          <section className="form-section">
            <label className="input-title" htmlFor="username"><b>Username</b></label>
            <input className="underline-input" type="text" defaultValue={checkUsername()} name="username" required />
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
                onClick={() => context.handleSetError(false)}
              >Cancel
            </button>
            </Link>
          </section>
        </div>
      </form>
      <div className="test-user-creds">
        <p>Demo Credentials:</p>
        <p>username: testuser</p>
        <p>password: Test12345</p>
      </div>
    </div>
  );
}

