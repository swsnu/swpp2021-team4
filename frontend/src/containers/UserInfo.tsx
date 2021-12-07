import React, { useState, useEffect } from "react";
import "../styles/components/Userinfo.css";
import axios from "axios";
import PostHeader from "../components/PostHeader";
import { UserType } from "../store/User/userInterfaces";
import BasicUserInfo from "../components/BasicUserInfo";
import { HeaderPostType } from "../store/Post/postInterfaces";

interface PropType {
  loggedUser: UserType;
  id: number;
}

function UserInfo(props: PropType) {
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

  return (
    <div className="userinfo-container">
      <div className="title">Profile</div>
      <BasicUserInfo
        loggedUserId={props.loggedUser.id}
        id={props.id}
        email={userInfo.email}
        username={userInfo.username}
        profile_image={userInfo.profile_image}
      />
      <div className="title route-list-title">Route List</div>
      <div className="user-posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="user-post">
              <PostHeader
                loggedUserId={props.loggedUser.id}
                post={post}
                isPostDetail={false}
              />
            </div>);
        })}
      </div>
    </div>
  );
}

export default UserInfo;

