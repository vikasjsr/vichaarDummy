import "./App.css";
import Post from "./component/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./component/PostDetail";
import Create from "./component/Create";
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create" element={<Create />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
