import React from 'react';
import  { Link } from 'react-router-dom'
import { checkAuth } from 'components/PrivateRoute';
import SignoutButton from 'components/SignoutButton';

const Navbar = () => {
  const auth = checkAuth()
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">The Social Network</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!auth ?
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link active">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">Login</Link>
                </li>
              </> :
              <SignoutButton />
            }
            <li className="nav-item">
              <Link to="/profile" className="nav-link active">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link active">Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
