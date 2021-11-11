import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const checkAuth = () => {
  if(Cookies.get('token-social')){
    console.log('token', Cookies.get('token-social'))
    return true
  }else{
    console.log('token', Cookies.get('token-social'))
    return false
  }
}

const PrivateRoute = () => {
    const auth = checkAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute



// OLD WAY
// export default PrivateRoute;
    
    // const PrivateRoute = ({ component: Component, ...rest }) => {
    //   return(<Route {...rest} render={props => (
    //     checkAuth() ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect to={{ pathname: '/login' }} />
    //     )
    //   )} />)
    //   };
    
    // export default PrivateRoute;