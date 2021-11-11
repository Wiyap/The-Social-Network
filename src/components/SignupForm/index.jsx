import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userRequest, connectionRequestSuccess, requestFailed } from '../../redux/index.js'
import Cookies from 'js-cookie';

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(state => state.error)
    
  const fetchUser = (data) => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch('http://localhost:1337/auth/local/register', {
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
            dispatch(connectionRequestSuccess(response.jwt, response.user))
            Cookies.set('token-social', response.jwt);
            navigate('/')
          }
        })
    }
  }

  const signupUser = (e) => {
    e.preventDefault()
    
    const name = e.target.children[0].children[1].value
    const email = e.target.children[1].children[1].value
    const password = e.target.children[2].children[1].value
    // const confirmationPassword = e.target.children[3].children[1].value
    
    const data = {
      username: name,
      email: email,
      password: password
    };

    dispatch(fetchUser(data))
  }

  return (
    <>
      <h3>{error}</h3>
      <form onSubmit={signupUser}>
        <div className="form-group">
          <label for="name">Name</label>
          <input id="name" className="form-control" type="text" placeholder="Name" aria-label="default input example" />
        </div>
        <div className="form-group">
          <label for="InputEmail">Email address</label>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="passwordSignup">Password</label>
          <input type="password" className="form-control" id="passwordSignup" placeholder="Password" />
        </div>
        <div className="form-group">
          <label for="passwordSignup">Confirmation password</label>
          <input type="password" className="form-control" id="passwordConfirmationSignup" placeholder="Confirmation password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default SignupForm;