import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest, requestSuccess, requestFailed } from '../../redux';
import Cookies from 'js-cookie';

const CreatePost = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)

  const sendPost = (data) => {
    return (dispatch) => {
      dispatch(userRequest)
      fetch('http://localhost:1337/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          if(response.error){
            requestFailed(response.error)
          } else {
            requestSuccess()
          }
        })
    }
  }


  const createPost = (e) => {
    e.preventDefault()
    const post = document.getElementById('PostContent').value
    console.log(userId)
    console.log(post)
    const data = {
      text: post,
      user: 1
    }
    dispatch(sendPost(data))
  }

  return (
    <form onSubmit={createPost} className="offset-3 col-6">
      <div class="mb-3">
        <label for="PostContent" class="form-label">Write a new Post:</label>
        <textarea class="form-control" id="PostContent" rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Send post</button>
    </form>
  );
};

export default CreatePost;