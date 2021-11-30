import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/PostItem.css";
import comment_icon from "../static/comment-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";

interface PropType {
  id: number;
  thumbnail_image?: string;
  title: string;
  author_name: string;
  author_id: number;
  like_count: number;
  comment_count: number;
  is_shared: boolean;
}

function PostItem(props: PropType) {
  return (
    <div className="postitem-container">
      <div className="title-container">
        <NavLink
          to={`/post/${props.id}/`}
          className="nav-mypage-btn nav-btn-font title"
        >
          {props.title}
        </NavLink>
      </div>
      <div className="thumbnail">
        <NavLink to={`/post/${props.id}/`}>
          <img src={props.thumbnail_image} />
        </NavLink>
      </div>
      <div className="content">
        <div className="info">
          <div className="author">
            <NavLink to={`/user_info/${props.author_id}/`} className="author_name">
              {props.author_name}
            </NavLink>
          </div>
          {props.is_shared && (
            <div className="counts">
              <img className="post-like-icon unliked" src={unlike_icon} />
              {props.like_count}
              <img className="post-comment-icon" src={comment_icon} />
              {props.comment_count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
