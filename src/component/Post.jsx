import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const API = "http://localhost:5000/posts";

  const [post, setPost] = useState([]);

  const fetchData = async () => {
    const resp = await fetch(API);
    const val = await resp.json();
    setPost(val);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {post.map((ele) => {
        
        return (
          <div key={ele.id}>
            <p>
              {ele.body.slice(0, 50) +"..."}
              <Link to={`/post/${ele.id}`}>Read More</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
