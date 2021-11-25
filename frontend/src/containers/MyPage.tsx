import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../styles/components/Userinfo.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import button_up from "../static/chevron-down.svg";
import button_down from "../static/chevron-up.svg";
import edit_btn from "../static/edit-icon.svg";
import delete_btn from "../static/delete-icon.svg";
import { deleteFolderAction, editFolderAction } from "../store/User/userAction";
import PostItem from "../components/PostItem";
import { Folder, UserType } from "../store/User/userInterfaces";
import { SimplePostType } from "../store/Post/postInterfaces";
import BasicUserInfo from "../components/BasicUserInfo";

interface PropType {
  loggedUser: UserType;
  id: number;
}

function MyPage(props: PropType) {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [posts, setPosts] = useState<SimplePostType[]>();

  const [isFolderEdited, setIsFolderEdited] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: ""
  })

  const onEditProfile = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isFolderEdited) {
      setFolderInputs({ folderId: 0, folderName: "" });
    }
  }, [isFolderEdited])

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
      props.loggedUser.id,
      folder_id,
      { folder_name: folderInputs.folderName },
      (value) => setIsFolderEdited(value))
    )
  }

  const onDeleteFolder = (folder_id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteFolderAction(props.loggedUser.id, folder_id));
    }
  }

  const onClickFolder = (folder_id: number) => {
    axios
      .get<{ posts: SimplePostType[] }>(`/user/${props.id}/folder/${folder_id}`)
      .then(function (response) {
        setPosts(response.data.posts)
      })
      .catch((err) => err.response);
  }

  const onClickShare = () => {
    axios
      .get<{ shared_posts: SimplePostType[] }>(`/user/${props.id}/share/`)
      .then(function (response) {
        setPosts(response.data.shared_posts)
      })
      .catch((err) => err.response);
  }

  const onClickLike = () => {
    axios
      .get<{ liked_posts: SimplePostType[] }>(`/user/${props.id}/like/`)
      .then(function (response) {
        setPosts(response.data.liked_posts);
      })
      .catch((err) => err.response);
  }

  if (isSubmitted) {
    return <Redirect to="/edit_profile/" />;
  }

  return (
    <div className="userinfo-container">
      <div className="profile">Profile</div>
      <BasicUserInfo
        loggedUserId={props.loggedUser.id}
        id={props.loggedUser.id}
        email={props.loggedUser.email}
        username={props.loggedUser.username}
        profile_image={props.loggedUser.profile_image}
        onEditProfile={onEditProfile}
      />
      {props.loggedUser.id === props.id &&
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
            {toggle && props.loggedUser.folders &&
              props.loggedUser.folders.map((fold: Folder) => {
                if (folderInputs.folderId === fold.id) {
                  return (
                    <div className="folder_input_container eachItem">
                      <input
                        id="edit_folder_input"
                        type="text"
                        value={folderInputs.folderName}
                        onChange={onChangeEditFolder}
                        placeholder="변경할 폴더 이름"
                      />
                      <img className="icon" src={edit_btn} onClick={() => onEditFolder(fold.id)} />
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
                      <img className="icon" src={edit_btn} onClick={() => onClickEditFolder(fold.id, fold.name)} />
                      <img className="icon" src={delete_btn} onClick={() => onDeleteFolder(fold.id)} />
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
      }
    </div>
  );
}

export default MyPage;
