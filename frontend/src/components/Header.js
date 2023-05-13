import React, { useEffect, useState } from 'react';
import headerLogo from '../images/mesto.svg';
import { Link, useLocation} from 'react-router-dom';

function Header({email, onClick}) {
  const [locationIs, setLocationIs] = useState({main: null, pathLink: '', text:''});

  const location = useLocation();
  const path = location.pathname;
  const {main, pathLink, text} = locationIs;

  useEffect(() => {
    path === '/' && setLocationIs({main: true, pathLink:'sign-out', text: "Выйти"})
    path === '/sign-up' && setLocationIs ({main: false, pathLink:'sign-in', text: "Войти"})
    path === '/sign-in' && setLocationIs ({main: false, pathLink:'sign-up', text: "Регистрация"})
  }, [location]);

  return (
    <header className="header">
      <img className="header__logo" alt="лого" src={headerLogo} />
        {main && (
          <div className='header__nav'>
            <p className='header__nav-email'>{email}</p>
            <Link to={pathLink} onClick={onClick} className='header__nav-link header__nav-link_exit'>{text}</Link>
          </div>
        )}
        {!main && (
          <div className='header__nav'>
            <Link to={pathLink} className='header__nav-link'>{text}</Link>
          </div>
        )}
    </header>
  )
};

export default Header;