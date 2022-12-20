import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary py-1 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>LiftoSphere</h1>
        </Link>

        <nav className="navbar navbar-inverser text-center">
          <div className="container-fluid">
              {Auth.loggedIn() ? (
              <>
              
                <Link to="/profile">User</Link>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>

            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
