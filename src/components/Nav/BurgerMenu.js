import React from 'react';
import Context from '../../MainContext';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import TokenService from '../../services/token-service';
import './BurgerMenu.css';

export default class BurgerMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      isMyMenuOpen: false
    };
  };

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
  };

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserId();
    this.context.handleSetError(null);
    this.closeMenu();
  };

  resetErrors = () => {
    this.context.handleSetError(null);
    this.closeMenu();
  };

  renderLogoutLink = () => {
    return (
      <Link
        className='bm-item'
        onClick={this.handleLogoutClick}
        to='/landing'>
        Logout
      </Link>
    );
  };

  renderHelpLink = () => {
    return (
      <Link
        className='bm-item'
        onClick={this.resetErrors}
        to='/help'>
        Help
      </Link>
    );
  };

  renderLoginLink = () => {
    return (
      <Link
        className='bm-item'
        onClick={this.resetErrors}
        to='/login'>
        Log in
      </Link>
    );
  };

  renderSignUpLink = () => {
    return (
      <Link
        className='bm-item'
        onClick={this.resetErrors}
        to='/signup'>
        Sign up
      </Link>
    );
  };

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

        {!TokenService.hasAuthToken()
          ? this.renderSignUpLink() : ''}

        {TokenService.hasAuthToken()
          ? this.renderHelpLink() : ''}
      </Menu>
    );
  }

};