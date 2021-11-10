import React from "react";
import "../styles/components/PostItem.scss";
import { NavLink } from "react-router-dom";

interface PropType {
  id: number;
  thumbnail_image?: string;
  title: string;
  author_name: string;
  author_id: number;
}

function PostItem(props: PropType) {
  return (
    <div className="postitem-container">
      <div className="info">
        <div className="title">
          <NavLink
            to={`/post/${props.id}/`}
            className="nav-mypage-btn nav-btn-font"
          >
            {props.title}
          </NavLink>
        </div>
        <div className="author_name">
          <NavLink to={`/user_info/${props.author_id}/`}>
            {props.author_name}
          </NavLink>
        </div>
      </div>
      <div className="thumbnail">
        <NavLink to={`/post/${props.id}/`}>
          <img src={props.thumbnail_image} />
        </NavLink>
      </div>
    </div>
  );
}

export default PostItem;
