import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignoutButton = () => {
  const destroySessions = (e) => {
    Cookies.remove('token-social')
  }
  return (
    <Link to="/" onClick={destroySessions} className="nav-link active">Logout</Link>
  );
};

export default SignoutButton;