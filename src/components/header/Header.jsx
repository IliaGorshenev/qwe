import Hamburger from 'hamburger-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import Button, { buttonVariants } from '../button/Button';
import classes from './header.module.scss';
import { useAuth } from '../../context/AuthContext'; // Add this import

const links = [
  { name: 'О нас', href: '' },
  { name: 'База кандидатов', href: '/candidates' },
  { name: 'Тарифы', href: '' },
];

function Header() {
  const [isOpen, setOpen] = useState(false);
  const width = useWindowWidth();
  const MOBILE = width < 767;
  const { isAuthenticated, logout } = useAuth(); // Add this line

  const handleSignOut = () => {
    logout();
    // You might want to redirect the user after logout
    // For example: navigate('/');
  };

  return (
    <header className={classes.header}>
      <div styles={{ overflow: 'hidden' }} className={classes.headerContainer}>
        <Link className={classes.logo} to="/">
          стартрикс ✨
        </Link>
        <nav className={classes.nav}>
          <ul>
            {links.length > 0
              ? links.map((link) => (
                  <li key={link.name}>
                    <Link className={classes.navLink} to={link.href}>
                      {link.name}
                    </Link>
                  </li>
                ))
              : 'Другие страницы недоступны'}
          </ul>
        </nav>
        <div className={classes.authorisation}>
          {!MOBILE && (
            <>
              {isAuthenticated ? (
                <Button variant={buttonVariants.SECONDARY} text={'Выйти'} onClick={handleSignOut} />
              ) : (
                <>
                  <Link to="/login">
                    <Button variant={buttonVariants.SECONDARY} text={'Войти'} />
                  </Link>
                  <Link to="/register">
                    <Button variant={buttonVariants.PRIMARY} text={'Регистрация'} />
                  </Link>
                </>
              )}
            </>
          )}
          {MOBILE && (
            <div style={{ zIndex: '10' }}>
              {' '}
              <Hamburger className={classes.burgerButton} duration={0.8} toggled={isOpen} toggle={setOpen}></Hamburger>
            </div>
          )}
          <div>
            {isOpen && (
              <div className={classes.mobileMenu}>
                <ul>
                  {isAuthenticated ? (
                    <li>
                      <Link to="/" onClick={handleSignOut}>Выйти</Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">Войти</Link>
                      </li>
                      <li>
                        <Link to="/register">Регистрация</Link>
                      </li>
                    </>
                  )}
                  {links.length > 0
                    ? links.map((link) => (
                        <li key={link.name}>
                          <Link className={classes.mobileNavLink} to={link.href}>
                            {link.name}
                          </Link>
                        </li>
                      ))
                    : 'Другие страницы недоступны'}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
