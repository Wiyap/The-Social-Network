import React from 'react';
import { useDispatch } from 'react-redux';
import { userRequest, requestFailed, requestSuccess } from '../../redux/index.js';
import Cookies from 'js-cookie';

const DeletePost = (props) => {
  const dispatch = useDispatch()

  const deletePost = () => {
    return (dispatch) => {
      dispatch(userRequest())
      fetch(`http://localhost:1337/posts/${props.postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log('dada', response)
          if(response.error){
            dispatch(requestFailed(response.error))
          }else{
            dispatch(requestSuccess())
          }
        })
    }
  }

  const delPost = (e) => {
    dispatch(deletePost())
  }

  return (
    <button className="btn btn-danger" onClick={delPost}>Delete</button>
  );
};

export default DeletePost;