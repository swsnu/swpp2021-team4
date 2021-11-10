import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "../styles/components/Userinfo.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useUserState } from "../hooks/useUserState";
import logo from "../static/profile.png";
import button_up from "../static/chevron-down.svg";
import button_down from "../static/chevron-up.svg";
import vector from "../static/Vector.svg";
import { editFolderAction } from "../store/User/userAction";
import PostItem from "../components/PostItem";
import { Folder } from "../store/User/userInterfaces";

function UserInfo() {
  const dispatch = useDispatch();

  interface String {
    id: string;
  }

  interface SimplePostType {
    id: number;
    thumbnail_image: string;
    title: string;
    author: string;
    author_id: number;
    like_count: number;
    comment_count: number;
  }

  const [toggle, setToggle] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [posts, setPosts] = useState<SimplePostType[]>();

  const loggedUser = useUserState();

  const [isFolderEdited, setIsFolderEdited] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: ""
  })

  const [userInfo, setUserInfo] = useState({
    profile_image: "",
    email: "",
    username: "",
  });
  const onEditProfile = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isFolderEdited) {
      setFolderInputs({ folderId: 0, folderName: "" });
    }
  }, [isFolderEdited])

  const { id } = useParams<String>();

  const onChangeEditFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFolderInputs({
      ...folderInputs,
      folderName: e.target.value
    })
  };

  const onClickEditFolder = (folder_id: number, folder_name: string) => {
    setFolderInputs({
      folderId: folder_id,
      folderName: folder_name
    })
  }

  const onEditFolder = (folder_id: number) => {
    dispatch(editFolderAction(
      loggedUser.id,
      folder_id,
      { folder_name: folderInputs.folderName },
      (value) => setIsFolderEdited(value))
    )
  }

  const onClickFolder = (folder_id: number) => {
    axios
      .get<{ posts: SimplePostType[] }>(`/user/${id}/folder/${folder_id}`)
      .then(function (response) {
        setPosts(response.data.posts)
      })
      .catch((err) => err.response);
  }

  const onClickShare = () => {
    axios
      .get<{ shared_posts: SimplePostType[] }>(`/user/${id}/share/`)
      .then(function (response) {
        console.log(response.data)
        setPosts(response.data.shared_posts)
      })
      .catch((err) => err.response);
  }

  const onClickLike = () => {
    axios
      .get<{ liked_posts: SimplePostType[] }>(`/user/${id}/like/`)
      .then(function (response) {
        setPosts(response.data.liked_posts);
      })
      .catch((err) => err.response);
  }

  useEffect(() => {
    axios
      .get(`/user/${id}/`)
      .then(function (response) {
        setUserInfo(response.data);
      })
      .catch((err) => err.response);
  }, [id]);

  if (isSubmitted) {
    return <Redirect to="/edit_profile/" />;
  }

  return (
    <div className="userinfo-container">
      <div className="profile">Profile</div>
      <div className="showProfile">
        <div className="image-wrapper">
          <div className="image">
            {userInfo.profile_image == null && (
              <img className="profileImage" src={logo} />
            )}
            {userInfo.profile_image != null && (
              <img className="profileImage" src={userInfo.profile_image} />
            )}
          </div>
        </div>
        <div className="basicInfo">
          <div className="email">
            <div className="field">E-mail</div>
            <div className="value">{userInfo.email}</div>
          </div>
          <div className="line"></div>
          <div className="name">
            <div className="field">username</div>
            <div className="value">{userInfo.username}</div>
          </div>
          <div className="line"></div>
          {(loggedUser?.id ?? 0) == id && (
            <button className="edit-btn" onClick={onEditProfile}>
              Edit
            </button>
          )}
        </div>
      </div>
      {(loggedUser?.id ?? 0) == id && (
        <div className="Folder">
          <div className="left">
            <div className="folderHead">
              Folders
              {toggle && (
                <img
                  className="icon"
                  src={button_up}
                  onClick={() => setToggle(!toggle)}
                />
              )}
              {!toggle && (
                <img
                  className="icon"
                  src={button_down}
                  onClick={() => setToggle(!toggle)}
                />
              )}
            </div>
            {toggle && loggedUser.folders &&
              loggedUser.folders.map((fold: Folder) => {
                if (folderInputs.folderId === fold.id) {
                  return (
                    <div className="folder_input_container">
                      <input
                        id="edit_folder_input"
                        type="text"
                        value={folderInputs.folderName}
                        onChange={onChangeEditFolder}
                        placeholder="변경할 폴더 이름"
                      />
                      <img className="icon" src={vector} onClick={() => onEditFolder(fold.id)} />
                    </div>
                  )
                } else {
                  return (
                    <div className="eachItem" key={fold.id}>
                      <div
                        className="folder_name"
                        onClick={() => {
                          onClickFolder(fold.id);
                        }}
                      >
                        {fold.name}{" "}
                      </div>
                      <img className="icon" src={vector} onClick={() => onClickEditFolder(fold.id, fold.name)} />
                    </div>
                  );
                }
              })}
            <div className="left_button">
              <button onClick={onClickLike} className="folderHead">
                Like Routes
              </button>
            </div>
            <div className="left_button">
              <button onClick={onClickShare} className="folderHead">
                Shared Routes
              </button>
            </div>
          </div>

          <div className="right">
            <div className="route_image">
              {posts &&
                posts.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author}
                      author_id={post.author_id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
