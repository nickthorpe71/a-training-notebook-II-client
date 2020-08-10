import React from 'react';
import Context from '../../MainContext';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import TokenService from '../../services/token-service'
import './BurgerMenu.css';

export default class BurgerMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      isMyMenuOpen: false
    };
  }

  static contextType = Context;

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.state.isMyMenuOpen === false) {
      return;
    }
    const node = ReactDOM.findDOMNode(this);
    let target = e.target;

    while (target && target.parentNode) {
      if (target === node) {
        return;
      }

      target = target.parentNode;
    }

    this.setState({ isMyMenuOpen: false });
  };

  isMenuOpen = state => {
    if (state.isOpen === this.state.isMyMenuOpen) return;
    this.setState({ isMyMenuOpen: state.isOpen });
  };

  closeMenu = () => {
    this.setState({ isMyMenuOpen: false });
  }

  renderLogoutLink = () => {
    return (
      <div className='Header__logged-in remove-margin'>
        <Link
          className='bm-item'
          onClick={this.handleLogoutClick}
          to='/landing'>
          Logout
        </Link>
      </div>
    )
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserId();
    this.context.handleLoginState(false);
    this.context.handleRegisteredState(false);
    this.context.handleSetError(null);
    this.closeMenu();
  };

  resetErrors = () => {
    this.context.handleSetError(null);
    this.closeMenu();
  }

  renderLoginLink = () => {
    return (
      <div className='Header__not-logged-in remove-margin'>
        <div>
          <Link
            className='bm-item'
            onClick={this.resetErrors}
            to='/login'>
            Log in
          </Link>
        </div>
        <div>
          <Link
            className='bm-item'
            onClick={this.resetErrors}
            to='/signup'>
            Sign up
          </Link>
        </div>
      </div>
    )
  }
  render() {
    return (
      <Menu
        isOpen={this.state.isMyMenuOpen}
        onStateChange={this.isMenuOpen}
        right
      >
        <Link
          onClick={this.closeMenu}
          to='/'>
          Home
        </Link>

        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}

        <Link
          onClick={this.resetErrors}
          to='/help'>
          Help
        </Link>
      </Menu>
    );
  }

};