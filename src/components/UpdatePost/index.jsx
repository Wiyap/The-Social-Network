import React from 'react';


const UpdatePost = (props) => {
  const showUpdateForm = (e) => {
    const cardBody = document.getElementById(`post${props.post.id}`)
    const updateForm = document.getElementById(`form${props.post.id}`)
    const editBtn = document.getElementById(`btn${props.post.id}`)
    if(updateForm.classList.contains("d-none")){
      updateForm.classList.remove("d-none")
      cardBody.classList.add("d-none")
      editBtn.innerHTML = "Cancel"
    }else{
      updateForm.classList.add("d-none")
      cardBody.classList.remove("d-none")
      editBtn.innerHTML = "Edit"
    }
  }

  return (
    <button className="btn btn-primary" id={`btn${props.post.id}`}onClick={showUpdateForm}>Edit</button>
  );
};

export default UpdatePost;