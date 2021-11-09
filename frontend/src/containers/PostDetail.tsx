import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import "../styles/PostDetail.css";

function PostDetail() {
  interface String {
    id: string;
  }
  const dispatch = useDispatch();
  const { id } = useParams<String>();
  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);
  const post = usePostState();
  console.log(post);
  const withoutCar: boolean = post.availableWithoutCar;
  return (
    <div className="post-detail-header">
      <div className="header-image">
        <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg" />
      </div>
      <div className="header-content">
        <div className="header-top">
          <div className="post-folder-name">{post.folder_name}</div>
          <div className={`without-car-checkbox-${withoutCar}`}>
            Available without car!
          </div>
        </div>
        <div className="header-middle">
          <div className="post-title-name">{post.title}</div>
        </div>
        <div className="header-bottom">
          <div className="post-author">{post.author_name}</div>
          <div className="post-info-container">
            <div className="post-info info-button">{post.location}</div>
            <div className="post-info info-button">{post.days}일 코스</div>
            <div className="post-info info-button">{post.season}</div>
            <div className="post-info info-button">{post.theme}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
