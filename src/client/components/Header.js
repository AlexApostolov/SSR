import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// To make use of the Header component in the "connect" function don't immediately export it but assign it
const Header = ({ auth }) => {
  console.log('My auth status is', auth);

  // Since we want the entire browser to render, and not navigate inside the app, use <a> not <Link>
  const authButton = auth ? (
    <a href="/api/logout">Log out</a>
  ) : (
    <a href="/api/auth/google">Log in</a>
  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          React SSR
        </Link>
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
};

// We just need the "auth" piece of state
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
