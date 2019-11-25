import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../actions';

const Header = ({ auth, signout }) => {
  const authButton = auth ? (
    <button onClick={() => signout()}>Logout</button>
  ) : (
    <Link to="/login">Login</Link>
  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Time Entry App</Link>
        <ul className="right">
          {auth && (
            <li><Link to="/entries">Entries</Link></li>
          )}
          {auth && (
            <li><Link to="/create">Create Entry</Link></li>
          )}
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signout })(Header);
