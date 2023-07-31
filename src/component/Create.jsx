import React from "react";
import { useState } from "react";

const Create = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    userId: "",
    tags: "",
    reactions: "",
  });

  const { title, body } = inputValue;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
        console.error("Please fill in all the fields before creating the post.");
        return;
      }
    
    try {
      const resp = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });

      if (resp.ok) {
        
        const createdPost = await resp.json();
        console.log("New post created:", createdPost);
        
        setInputValue({
          title: "",
          body: "",
          userId: "",
          tags: "",
          reactions: "",
        });

      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error occurred while creating post:", error);
    }
  };

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <div style={{ marginTop: "10px" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleInput}
            placeholder="Enter post title"
          />
          <input
            type="text"
            value={body}
            name="body"
            onChange={handleInput}
            placeholder="Enter post body"
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
