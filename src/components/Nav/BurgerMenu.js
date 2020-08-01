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
  };



  function renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/signup'>
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <Menu {...props}>
      <Link
        to='/'>
        Home
      </Link>

      {TokenService.hasAuthToken()
        ? renderLogoutLink()
        : renderLoginLink()}

      <Link
        to='/help'>
        Help
      </Link>
    </Menu>
  );
};