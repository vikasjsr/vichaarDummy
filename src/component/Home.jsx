import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/post");
  }, []);

  return <div>redirecting to the post....</div>;
};

export default Home;
