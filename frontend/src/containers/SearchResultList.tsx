import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePostsState } from "../hooks/usePostsState";
import { PostType } from "../store/Post/postInterfaces";
import PostItem from "../components/PostItem"
import { getPostsAction } from "../store/Post/postAction";

function SearchResultList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch])

  const posts = usePostsState();

  const postList = posts.map((post: PostType) => {
    return <PostItem
      key={post.id}
      id={post.id}
      thumbnail_image={post.thumbnail_image}
      title={post.title}
      author_name={post.author_name}
      author_id={post.author_id}
    />;
  });

  return (
    <div className="search-result-container">
      SearchResultList container
      {postList}
    </div>);
}

export default SearchResultList;
