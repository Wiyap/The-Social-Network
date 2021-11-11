import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { userRequest, requestFailed, requestSuccess } from '../../../redux/index.js';
import Cookies from 'js-cookie';
import PostCard from 'components/PostCard'

const UserPostList = () => {
  const [postList, setPostList] = useState(null)
  const userId = useParams().userSlug
  const dispatch = useDispatch()

  const fetchPosts = () => {
    return (dispatch) => {
      dispatch(userRequest)
      fetch(`http://localhost:1337/posts?user.id=${userId}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token-social')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log('userpost', response)
        if(response.error){
          requestFailed(response.error)
        }else{
          requestSuccess()
          setPostList(response)
        }
      })
    }
  }

  useEffect(() => {
    dispatch(fetchPosts())
  },
  []
  )

  return (
    <>
      {postList !== null ? postList.map(post => <PostCard post = {post} key={post.id} />) : null}
    </>
  );
};

export default UserPostList;