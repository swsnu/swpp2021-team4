import React from "react";
import { NavLink } from "react-router-dom";
import border from "../static/post_info_border.svg";
import comment_icon from "../static/comment-icon.svg";
import like_icon from "../static/like-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";
import { CommentType } from "../store/Post/postInterfaces";
import "../styles/components/PostHeader.css";
import created_at_icon from "../static/created-at-icon.svg";

interface HeaderPostType {
  id: number;
  thumbnail_image: string;
  folder_name?: string;
  title: string;
  author_name: string;
  author_id: number;
  location: string;
  days: number;
  season: string;
  theme: string;
  like_counts: number;
  comments?: Array<CommentType>;
  comment_counts?: number;
  availableWithoutCar: boolean;
  liked?: boolean;
  created_at: string;
}

interface PropType {
  loggedUserId: number;
  post: HeaderPostType;
  isPostDetail: boolean;
  onClickAddPostCartButton?: () => void;
  onClickPostLikeButton: () => void;
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
            <span className="post-tag">{postSeason()}</span>
            <span className="post-tag">{postTheme()}</span>
            <span className={`post-tag ${props.post.availableWithoutCar}`}>
              뚜벅이 여행 가능
            </span>
          </div>
        </div>
      </div>
      <div className="header-content-right">
        <div className="header-top">
          {isAuthenticated && props.isPostDetail && (
            <button
              className="post-cart-button"
              onClick={props.onClickAddPostCartButton}
            >
              Add this route to Cart
            </button>
          )}
          <div className="post-created-at">
            <img className="time-icon" src={created_at_icon} />
            <span className="post-created-at">{props.post.created_at}</span>
          </div>
        </div>
        <div className="header-bottom">
          {isAuthenticated && props.isPostDetail && props.post.liked && (
            <img
              className="post-like-icon liked"
              onClick={props.onClickPostLikeButton}
              src={like_icon}
            />
          )}
          {isAuthenticated && props.isPostDetail && !props.post.liked && (
            <img
              className="post-like-icon unliked"
              onClick={props.onClickPostLikeButton}
              src={unlike_icon}
            />
          )}
          {!(isAuthenticated && props.isPostDetail) && (
            <img className="post-like-icon unliked" src={unlike_icon} />
          )}
          {props.post.like_counts}
          <img className="post-comment-icon" src={comment_icon} />
          {props.post.comments
            ? props.post.comments.length
            : props.post.comment_counts}
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
