import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PostDetail from "../containers/PostDetail";

function PostDetailPage() {
  return (
    <>
      <NavBar />
      <PostDetail />
      <Footer />
    </>
  );
}

export default PostDetailPage;
