import React, { useState, useEffect } from "react";
import "../styles/components/Userinfo.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import PostHeader from "../components/PostHeader";
import { getPostAction } from "../store/Post/postAction";
import { UserType } from "../store/User/userInterfaces";
import BasicUserInfo from "../components/BasicUserInfo";

interface HeaderPostType {
  id: number;
  thumbnail_image: string;
  title: string;
  author_name: string;
  author_id: number;
  location: string;
  days: number;
  season: string;
  theme: string;
  like_counts: number;
  comment_counts: number;
  availableWithoutCar: boolean;
}

interface PropType {
  loggedUser: UserType;
  id: number;
}

function UserInfo(props: PropType) {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    profile_image: "",
  });

  const [posts, setPosts] = useState<Array<HeaderPostType>>([]);

  useEffect(() => {
    axios
      .get(`/user/${props.id}/posts/`)
      .then(function (response) {
        setPosts(response.data.posts);
      })
      .catch((err) => err.response);
  }, [props.id]);

  useEffect(() => {
    axios
      .get(`/user/${props.id}/`)
      .then(function (response) {
        setUserInfo(response.data);
      })
      .catch((err) => err.response);
  }, [props.id]);

  const onClickPostLikeButton = () => {
    axios
      .get(`/post/${props.id}/like/`)
      .then(function () {
        dispatch(getPostAction(props.id));
      })
      .catch((err) => err.response);
  };

  return (
    <div className="userinfo-container">
      <div className="profile">Profile</div>
      <BasicUserInfo
        loggedUserId={props.loggedUser.id}
        id={props.id}
        email={userInfo.email}
        username={userInfo.username}
        profile_image={userInfo.profile_image}
      />
      {posts.map((post) => {
        return (
          <PostHeader
            key={post.id}
            loggedUserId={props.loggedUser.id}
            post={post}
            isPostDetail={false}
            onClickPostLikeButton={onClickPostLikeButton}
          />);
      })}

    </div>
  );
}

export default UserInfo;

