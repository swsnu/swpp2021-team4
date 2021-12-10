import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/PostItem.css";
import comment_icon from "../static/comment-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";
import defaultThumbnail from "../static/png/default-thumbnail.png";
import deleteIcon from "../static/delete-icon.svg"

interface PropType {
  id: number;
  thumbnail_image?: string;
  title: string;
  author_name: string;
  author_id: number;
  like_count: number;
  comment_count: number;
  is_shared: boolean;
  isPostInCart?: boolean;
  isMyPost?: boolean;
}

function PostItem(props: PropType) {
  return (
    <div className="postitem-container">
      <NavLink
        to={`/post/show/${props.id}/`}
      >
        <div className="title-container">
          <div className="title">
            {props.title}
          </div>
          {props.isPostInCart && (
            <button className="post-in-cart-delete">
              <img src={deleteIcon}></img>
            </button>
          )}
        </div>
        <div className="thumbnail">
          <img src={props.thumbnail_image ? props.thumbnail_image : defaultThumbnail} />
        </div>
      </NavLink>
      <div className="content">
        <div className="info">
          <div className="author">
            {props.isMyPost && props.is_shared && (
              <div className="author_badge">Shared</div>
            )}
            {props.isMyPost && !props.is_shared && (
              <div className="author_name"></div>
            )}
            {!props.isMyPost && (
              <NavLink to={`/user_info/${props.author_id}/`} className="author_name">
                {props.author_name}
              </NavLink>
            )}
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
