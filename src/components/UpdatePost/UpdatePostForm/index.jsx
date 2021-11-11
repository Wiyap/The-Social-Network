import React from 'react';

const UpdatePostForm = (props) => {
  return (
    <>
      <form onSubmit={""} className="d-none" id={`form${props.post.id}`}>
        <textarea class="form-control" rows="3" placeholder='Description'></textarea>
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </>
  );
};

export default UpdatePostForm;