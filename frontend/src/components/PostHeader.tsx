import React from "react";
import { NavLink } from "react-router-dom";
import border from "../static/post_info_border.svg";
import comment_icon from "../static/comment-icon.svg";
import like_icon from "../static/like-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";
import edit_btn from "../static/edit-icon.svg";
import delete_btn from "../static/delete-icon.svg";
import "../styles/components/PostHeader.css";
import created_at_icon from "../static/created-at-icon.svg";
import { HeaderPostType } from "../store/Post/postInterfaces";

interface PropType {
  loggedUserId: number;
  post: HeaderPostType;
  isPostDetail: boolean;
  onClickPostShareButton?: () => void;
  onClickAddPostCartButton?: () => void;
  onClickPostLikeButton?: () => void;
}

function PostHeader(props: PropType) {
  const isAuthenticated = props.loggedUserId !== 0;

  const postSeason = () => {
    if (props.post.season === "spr") return "Spring";
    else if (props.post.season === "sum") return "Summer";
    else if (props.post.season === "aut") return "Autumn";
    else if (props.post.season === "win") return "Winter";
  };

  const postTheme = () => {
    if (props.post.theme === "friends") return "친구와 함께!";
    else if (props.post.theme === "family") return "가족과 함께!";
    else if (props.post.theme === "lover") return "연인과 함께!";
    else if (props.post.theme === "alone") return "나홀로 여행!";
  };

  return (
    <div className="post-header">
      <div className="header-image">
        <img src={props.post.thumbnail_image ? props.post.thumbnail_image : "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg"} />
      </div>
      <div className="header-content-left">
        <div className="header-top">
          <div className="post-folder-name">
            {props.isPostDetail &&
              props.loggedUserId == props.post.author_id &&
              props.post.folder_name}
          </div>
        </div>
        <div className="header-middle">
          <div className="post-title-name">
            {props.isPostDetail ? (
              props.post.title
            ) : (
              <NavLink to={`/post/${props.post.id}/`}>
                {props.post.title}
              </NavLink>
            )}
          </div>
          <div className="post-info-container">
            <span className="post-info">{props.post.location}</span>
            <span className="post-info-border">
              <img src={border} />
            </span>
            <span className="post-info">{props.post.days}일 코스</span>
          </div>
        </div>
        <div className="header-bottom">
          <div className="post-author">
            <NavLink to={`/user_info/${props.post.author_id}/`}>
              {props.post.author_name}
            </NavLink>
          </div>
          <div className="post-tag-container">
            {props.post.season && (
              <span className="post-tag filled season">{postSeason()}</span>
            )}
            {!props.post.season && (
              <span className="post-tag season empty">Season</span>
            )}
            {props.post.theme && (
              <span className="post-tag theme filled">{postTheme()}</span>
            )}
            {!props.post.theme && (
              <span className="post-tag theme empty">Theme</span>
            )}
            <span className={`post-tag filled ${props.post.availableWithoutCar}`}>
              뚜벅이 여행 가능
            </span>
          </div>
        </div>
      </div>
      <div className="header-content-right">
        <div className="header-top">
          <div className="header-top-buttons">
            {isAuthenticated && props.isPostDetail && props.post.is_shared && (
              <button
                className="post-cart-button"
                onClick={props.onClickAddPostCartButton}
              >
                Add this route to Cart
              </button>
            )}
            {props.isPostDetail && !props.post.is_shared && (
              <button
                className="post-share-button"
                onClick={props.onClickPostShareButton}
              >
                Share
              </button>
            )}
            {props.loggedUserId === props.post.author_id && (
              <div className="header-top-icons">
                <img className="icon" src={edit_btn} />
                <img className="icon" src={delete_btn} />
              </div>
            )}
          </div>
          <div className="post-created-at-container">
            <span className="post-created-at">{props.post.created_at}</span>
            <img className="time-icon" src={created_at_icon} />
          </div>
        </div>
        <div className="header-bottom">
          {props.post.is_shared && isAuthenticated && props.isPostDetail && props.post.liked && (
            <img
              className="post-like-icon liked"
              onClick={props.onClickPostLikeButton}
              src={like_icon}
            />
          )}
          {props.post.is_shared && isAuthenticated && props.isPostDetail && !props.post.liked && (
            <img
              className="post-like-icon unliked"
              onClick={props.onClickPostLikeButton}
              src={unlike_icon}
            />
          )}
          {props.post.is_shared && !(isAuthenticated && props.isPostDetail) && (
            <img className="post-like-icon unliked" src={unlike_icon} />
          )}
          {props.post.is_shared && props.post.like_counts}
          {props.post.is_shared && (
            <img className="post-comment-icon" src={comment_icon} />
          )}
          {props.post.comments
            ? props.post.is_shared && props.post.comments.length
            : props.post.is_shared && props.post.comment_counts}
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
