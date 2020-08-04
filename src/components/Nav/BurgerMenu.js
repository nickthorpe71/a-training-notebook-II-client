import React, { useContext } from 'react';
import Context from '../../MainContext';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import TokenService from '../../services/token-service'
import './BurgerMenu.css';

export default function BurgerMenu(props) {

  const context = useContext(Context);

  function renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          className='bm-item'
          onClick={handleLogoutClick}
          to='/landing'>
          Logout
        </Link>
      </div>
    )
  }

  function handleLogoutClick() {
    TokenService.clearAuthToken();
    TokenService.clearUserId();
    context.handleLoginState(false);
    context.handleRegisteredState(false);
    context.handleSetError(null);
  };

  function resetErrors() {
    context.handleSetError(null);
  }

  function renderLoginLink() {
    return (
      <div className='Header__not-logged-in remove-margin'>
        <div>
          <Link
            className='bm-item'
            onClick={resetErrors}
            to='/login'>
            Log in
          </Link>
        </div>
        <div>
          <Link
            className='bm-item'
            onClick={resetErrors}
            to='/signup'>
            Sign up
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Menu {...props}>
      <Link
        onClick={handleLogoutClick}
        to='/'>
        Home
      </Link>

      {TokenService.hasAuthToken()
        ? renderLogoutLink()
        : renderLoginLink()}

      <Link
        onClick={resetErrors}
        to='/help'>
        Help
      </Link>
    </Menu>
  );
};