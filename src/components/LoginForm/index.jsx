import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userRequest, requestSuccess, requestFailed } from '../../redux/index.js'
import Cookies from 'js-cookie';

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(state => state.error)

  const fetchUser = (data) => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch('http://localhost:1337/auth/local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if(response.error){
            dispatch(requestFailed(response.message[0].messages[0].message))
          }else{
            dispatch(requestSuccess(response.jwt, response.user))
            Cookies.set('token-social', response.jwt);
            navigate('/')
          }
        })
    }
  }

  const loginUser = (e) => {
    e.preventDefault()
    const email = e.target.children[0].children[1].value
    const password = e.target.children[1].children[1].value
    const data = {
      identifier: email,
      password: password
    };
    dispatch(fetchUser(data))
  }
  
  
   
  return (
    <>
      <h3>{error}</h3>
      <form onSubmit={loginUser}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="passwordSignup">Password</label>
          <input type="password" className="form-control" id="passwordLogin" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;