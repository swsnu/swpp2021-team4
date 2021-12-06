import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../styles/components/MyPage.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import button_up from "../static/chevron-down.svg";
import button_down from "../static/chevron-up.svg";
import edit_btn from "../static/edit-icon.svg";
import delete_btn from "../static/delete-icon.svg";
import { deleteFolderAction, editFolderAction } from "../store/User/userAction";
import PostItem from "../components/PostItem";
import { Folder, UserType } from "../store/User/userInterfaces";
import { SimplePlaceType, SimplePostType } from "../store/Post/postInterfaces";
import BasicUserInfo from "../components/BasicUserInfo";
import PlaceItem from "../components/PlaceItem";

interface PropType {
  loggedUser: UserType;
  id: number;
}

function MyPage(props: PropType) {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [folderInfo, setFolderInfo] = useState<{ my_posts: SimplePostType[], posts: SimplePostType[], places: SimplePlaceType[] }>({
    my_posts: [],
    posts: [],
    places: []
  });
  const [sharedPosts, setSharedPosts] = useState<SimplePostType[]>();
  const [likedPosts, setLikedPosts] = useState<SimplePostType[]>();

  const [selected, setSelected] = useState(0);
  const [isFolderEdited, setIsFolderEdited] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: "",
  });

  const onEditProfile = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isFolderEdited) {
      setFolderInputs({ folderId: 0, folderName: "" });
    }
  }, [isFolderEdited]);

  const onChangeEditFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFolderInputs({
      ...folderInputs,
      folderName: e.target.value,
    });
  };

  const onClickEditFolder = (folder_id: number, folder_name: string) => {
    setFolderInputs({
      folderId: folder_id,
      folderName: folder_name,
    });
  };

  const onEditFolder = (folder_id: number) => {
    dispatch(
      editFolderAction(
        props.loggedUser.id,
        folder_id,
        { folder_name: folderInputs.folderName },
        (value) => setIsFolderEdited(value)
      )
    );
  };

  const onDeleteFolder = (folder_id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteFolderAction(props.loggedUser.id, folder_id));
    }
  };

  const onClickFolder = (folder_id: number) => {
    axios
      .get<{
        my_posts: SimplePostType[],
        posts: SimplePostType[],
        places: SimplePlaceType[]
      }>(`/user/${props.id}/folder/${folder_id}`)
      .then(function (response) {
        setFolderInfo(response.data);
      })
      .catch((err) => err.response);
  };

  const onClickLike = () => {
    axios
      .get<{ liked_posts: SimplePostType[] }>(`/user/${props.id}/like/`)
      .then(function (response) {
        setLikedPosts(response.data.liked_posts);
        setSelected(1);
      })
      .catch((err) => err.response);
  };

  const onClickShare = () => {
    axios
      .get<{ shared_posts: SimplePostType[] }>(`/user/${props.id}/share/`)
      .then(function (response) {
        setSharedPosts(response.data.shared_posts)
        setSelected(2);
      })
      .catch((err) => err.response);
  };

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
      <div className="folder">
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
                      className="folder-name"
                      onClick={() => {
                        onClickFolder(fold.id);
                      }}
                    >
                      {fold.name}{" "}
                    </div>
                    <div>
                      <img className="icon" src={edit_btn} onClick={() => onClickEditFolder(fold.id, fold.name)} />
                      <img className="icon" src={delete_btn} onClick={() => onDeleteFolder(fold.id)} />
                    </div>
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
          <div className="posts-container">
            <div className="folder-my-posts">
              {(selected === 0) &&
                folderInfo.my_posts?.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author_name}
                      author_id={post.author_id}
                      like_count={post.like_count}
                      comment_count={post.comment_count}
                      is_shared={post.is_shared}
                    />
                  );
                })}
            </div>
            <div className="folder-posts">
              {(selected === 0) &&
                folderInfo.posts?.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author_name}
                      author_id={post.author_id}
                      like_count={post.like_count}
                      comment_count={post.comment_count}
                      is_shared={post.is_shared}
                    />
                  );
                })}
            </div>
            <div className="folder-places">
              {(selected === 0) &&
                folderInfo.places?.map((place) => {
                  return (
                    <PlaceItem
                      key={place.id}
                      place={place}
                    />
                  );
                })}

            </div>
            {(selected === 1) && likedPosts &&
              likedPosts.map((post) => {
                return (
                  <PostItem
                    key={post.id}
                    id={post.id}
                    thumbnail_image={post.thumbnail_image}
                    title={post.title}
                    author_name={post.author_name}
                    author_id={post.author_id}
                    like_count={post.like_count}
                    comment_count={post.comment_count}
                    is_shared={post.is_shared}
                  />
                );
              })
            }
            {(selected === 2) && sharedPosts &&
              sharedPosts.map((post) => {
                return (
                  <PostItem
                    key={post.id}
                    id={post.id}
                    thumbnail_image={post.thumbnail_image}
                    title={post.title}
                    author_name={post.author_name}
                    author_id={post.author_id}
                    like_count={post.like_count}
                    comment_count={post.comment_count}
                    is_shared={post.is_shared}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
