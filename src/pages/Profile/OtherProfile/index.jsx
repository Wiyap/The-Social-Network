import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { userRequest, requestSuccess, requestFailed } from '../../../redux/index.js'
import Cookies from 'js-cookie';
import UserPostList from 'pages/Posts/UserPostsList/index.jsx';

const OtherProfile = () => {
  const [otherProfile, setOtherProfile] = useState(null)
  const { userSlug } = useParams()
  const dispatch = useDispatch()
    
  const fetchUser = () => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch(`http://localhost:1337/users/${userSlug}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          if(response.error){
            dispatch(requestFailed(response.message))
          }else{
            dispatch(requestSuccess())
            setOtherProfile(response)
          }
        })
    }
  }

  useEffect(() => {
    dispatch(fetchUser())
  },
  []
  )

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {otherProfile? otherProfile.username : null}</p>
      <p>Description: {otherProfile? otherProfile.description : null}</p>
      <p>Email: {otherProfile? otherProfile.email : null}</p>
      <UserPostList />
    </div>
  );
};

export default OtherProfile;