import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import border from "../static/post_info_border.svg";
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
      <div className="header-content-left">
        <div className="header-top">
          <div className="post-folder-name">{post.folder_name}</div>
        </div>
        <div className="header-middle">
          <div className="post-title-name">{post.title}</div>
          <div className="post-info-container">
            <span className="post-info">{post.location}</span>
            <span className="post-info-border">
              <img src={border} />
            </span>
            <span className="post-info">{post.days}일 코스</span>
          </div>
        </div>
        <div className="header-bottom">
          <div className="post-author">{post.author_name}</div>
          <div className="post-tag-container">
            <span className="post-tag">{post.season}</span>
            <span className="post-tag">{post.theme}</span>
            <span className={`post-tag ${withoutCar}`}>뚜벅이 여행 가능</span>
          </div>
        </div>
      </div>
      <div className="header-content-right">
        <button className="add-cart-button">Add this route to Cart</button>
      </div>
    </div>
  );
}

export default PostDetail;
