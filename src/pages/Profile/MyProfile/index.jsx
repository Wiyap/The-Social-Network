import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { userRequest, requestSuccess, requestFailed } from '../../../redux/index.js'
import Cookies from 'js-cookie';
import UpdateProfileForm from 'components/UpdateProfileForm/index.jsx';

const MyProfile = () => {
  const [myProfile, setMyPorfile] = useState(null)
  const dispatch = useDispatch()
  const nothing = {
    username: null,
    email: null,
    description: null
  }
    
  const fetchUser = () => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch('http://localhost:1337/users/me', {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          if(response.error){
            dispatch(requestFailed(response.message[0].messages[0].message))
          }else{
            dispatch(requestSuccess())
            setMyPorfile(response)
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
      <h1>My Profile</h1>
      <p>Username: {myProfile? myProfile.username : null}</p>
      <p>Description: {myProfile? myProfile.description : null}</p>
      <p>Email: {myProfile? myProfile.email : null}</p>
      <UpdateProfileForm user={myProfile ? myProfile : nothing}/>
    </div>
  );
};

export default MyProfile;