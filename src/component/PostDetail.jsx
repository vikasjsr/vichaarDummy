import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {

  const navigate = useNavigate();

  const { postId } = useParams();

  const [post, setPost] = useState({});

  const fetchPostByPostId = async () => {
    const resp = await fetch(`http://localhost:5000/posts/${postId}`);
    const val = await resp.json();
    // console.log(val);
    setPost(val);
  };

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow); // Toggle the show state
  };

  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform an API call to update the post data on the server
    const updatedData = { ...post, body: inputValue }; // Assuming you want to update the "body" field with the input value
    try {
      const resp = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (resp.ok) {
        setPost(updatedData);
      } else {
        console.error("Failed to update post data");
      }
    } catch (error) {
      console.error("Error occurred while updating post:", error);
    }

    setInputValue("");
    toggleShow(); // Hide the input field after updating the data
  };

  const handleDelete = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
      });

      

      if (resp.ok) {
        // If the delete is successful, you can redirect the user to a different page, or handle it as you prefer.
        // In this example, we are simply displaying a message on successful deletion.
        navigate('/post');
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error occurred while deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPostByPostId();
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={toggleShow}>Click here to update your post</button>

      {show && (
        <>
          <div style={{ marginTop: "10px" }}>
            <form onSubmit={handleSubmit}>
              <input type="text" value={inputValue} onChange={handleInput} />
              <button type="submit"> update </button>
            </form>
          </div>
        </>
      )}

      <div>
        <button onClick={handleDelete}>Delete the post</button>
      </div>
    </div>
  );
};

export default PostDetail;
