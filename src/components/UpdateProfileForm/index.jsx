import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest, requestSuccess, requestFailed } from '../../redux/index.js'
import Cookies from 'js-cookie';

const UpdateProfileForm = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.error)
    
  const fetchUser = (data) => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch(`http://localhost:1337/users/me`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if(response.error){
            dispatch(requestFailed(response.message))
          }else{
            dispatch(requestSuccess())
          }
        })
    }
  }

  const editProfile = (e) => {
    e.preventDefault()
    
    const name = e.target.children[0].children[1].value
    const email = e.target.children[1].children[1].value
    const description = e.target.children[2].children[1].value
    
    const data = {
      username: name,
      email: email,
      description: description
    };

    dispatch(fetchUser(data))
  }

  const inputValue = () => {
    document.getElementById('updateForm').children[0].children[1].value = props.user.username
    document.getElementById('updateForm').children[1].children[1].value = props.user.email
    document.getElementById('updateForm').children[2].children[1].value = props.user.description
  }

  useEffect(() => {
    inputValue()
  })

  return (
    <>
      <h3>{error}</h3>
      <form id="updateForm" onSubmit={editProfile}>
        <div className="form-group">
          <label for="name">Name</label>
          <input id="name" className="form-control" type="text" placeholder='Username' aria-label="default input example" />
        </div>
        <div className="form-group">
          <label for="InputEmail">Email address</label>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder='Email' />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="description" className="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" placeholder='Description'></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default UpdateProfileForm;