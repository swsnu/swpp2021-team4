import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import "../styles/PostDetail.css";

function PostDetail() {
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);
  const post = usePostState();
  const withoutCar: boolean = post.availableWithoutCar;
  return (
    <div className="post-detail-header">
      <div className="header-top">
        <div className="post-folder-name">Folder Name</div>
        <div className={`without-car-checkbox-${withoutCar}`}>
          Available without car!
        </div>
      </div>
      <div className="header-middle">
        <div className="post-title-name">{post.title}</div>
        <div className="post-info-container">
          <div className="post-info info-button">GyeonJu</div>
          <div className="post-info info-button">{post.days}</div>
          <div className="post-info info-button">{post.season}</div>
          <div className="post-info info-button">{post.theme}</div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
