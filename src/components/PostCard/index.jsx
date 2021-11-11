import React from 'react';
import { Link } from 'react-router-dom';
import DeletePost from 'components/DeletePost';
import UpdatePost from 'components/UpdatePost';
import UpdatePostForm from 'components/UpdatePost/UpdatePostForm';

const PostCard = (props) => {
  return (
    <>
    <div className="card mt-3 offset-4 col-4" >
      <Link to={`/users/${props.post.user.id}`}> 
        <h5 className="card-header">{props.post.user.username}</h5> 
      </ Link>
      <div className="card-body" id={`post${props.post.id}`}>
        <p className="card-text">{props.post.text}</p>
        <p>{props.post.created_at}</p>
      </div>
      <UpdatePostForm post={props.post}/>
      <div class="card-footer">
        <DeletePost postId={props.post.id}/>
        <UpdatePost post={props.post}/>
      </div>
    </div>
    </>
  );
};

export default PostCard;