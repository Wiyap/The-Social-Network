import React, { useState, useEffect } from 'react'
import CreatePost from 'components/CreatePost';
import PostCard from 'components/PostCard/index.jsx';
import { useDispatch } from 'react-redux';
import { userRequest, requestFailed, requestSuccess } from '../../../redux/index.js'

const PostList = () => {
  const [postList, setPostList] = useState(null)
  const dispatch = useDispatch()

  const fetchPosts = () => {
    return (dispatch) => {
      dispatch(userRequest)
      fetch('http://localhost:1337/posts',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
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
      <CreatePost />
      {postList !== null ? postList.map(post => <PostCard post={post} key={post.id} />) : null}
    </>
  );
};

export default PostList;