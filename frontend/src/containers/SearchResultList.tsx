import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchPostState } from "../hooks/usePostsState";
import { PostType } from "../store/Post/postInterfaces";
import PostItem from "../components/PostItem";
import { getPostsAction } from "../store/Post/postAction";

function SearchResultList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const posts = useSearchPostState();

  const postList = posts.map((post: PostType) => {
    return (
      <PostItem
        key={post.id}
        id={post.id}
        thumbnail_image={post.thumbnail_image}
        title={post.title}
        author_name={post.author_name}
        author_id={post.author_id}
      />
    );
  });

  return (
    <div className="search-result-container">
      <div className="search-research">Routes</div>
      <div className="search-research-content">{postList}</div>
    </div>
  );
}

export default SearchResultList;
