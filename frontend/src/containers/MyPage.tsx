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
import { PlaceType, SimplePostType } from "../store/Post/postInterfaces";
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
  const [folderInfo, setFolderInfo] = useState<{
    my_posts: SimplePostType[];
    posts: SimplePostType[];
    places: PlaceType[];
  }>({
    my_posts: [],
    posts: [],
    places: [],
  });
  const [sharedPosts, setSharedPosts] = useState<SimplePostType[]>();
  const [likedPosts, setLikedPosts] = useState<SimplePostType[]>();

  const [selected, setSelected] = useState(0);
  const [selectedFolderId, setSelectedFolderId] = useState(0);
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
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteFolderAction(props.loggedUser.id, folder_id));
    }
  };

  const onClickFolder = (folder_id: number) => {
    axios
      .get<{
        my_posts: SimplePostType[];
        posts: SimplePostType[];
        places: PlaceType[];
      }>(`/user/${props.id}/folder/${folder_id}/`)
      .then(function (response) {
        setFolderInfo(response.data);
        setSelectedFolderId(folder_id);
      })
      .catch((err) => err.response);
  };

  const onClickUncartPost = (postId: number) => {
    axios
      .delete(`/post/${postId}/cart/${selectedFolderId}/`)
      .then(function () {
        onClickFolder(selectedFolderId);
      })
      .catch((err) => err.response);
  };

  const onClickUncartPlace = (placeId: number) => {
    axios
      .delete(`/place/${placeId}/cart/${selectedFolderId}/`)
      .then(function () {
        onClickFolder(selectedFolderId);
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
        setSharedPosts(response.data.shared_posts);
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
                className="icon button_up"
                src={button_up}
                onClick={() => setToggle(!toggle)}
              />
            )}
            {!toggle && (
              <img
                className="icon button_down"
                src={button_down}
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
          {toggle &&
            props.loggedUser.folders &&
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
                    <img
                      className="icon"
                      src={edit_btn}
                      onClick={() => onEditFolder(fold.id)}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className="eachItem"
                    key={fold.id}
                    onClick={() => {
                      onClickFolder(fold.id);
                      setSelected(0);
                    }}
                  >
                    <div className="folder-name">{fold.name} </div>
                    <div>
                      <img
                        className="icon edit-folder-icon"
                        src={edit_btn}
                        onClick={() => onClickEditFolder(fold.id, fold.name)}
                      />
                      <img
                        className="icon  delete-folder-icon"
                        src={delete_btn}
                        onClick={() => onDeleteFolder(fold.id)}
                      />
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
          {selected === 0 && (
            <div className="posts-container">
              <div className="folder-my-posts">
                <div className="folder-title">내가 작성한 루트</div>
                <div className="folder-items">
                  {folderInfo.my_posts?.map((post) => {
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
                        isMyPost={true}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="folder-posts">
                <div className="folder-title">카트에 담은 루트</div>
                <div className="folder-items">
                  {folderInfo.posts?.map((post) => {
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
                        onClickUncartPost={onClickUncartPost}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="folder-places">
                <div className="folder-title">카트에 담은 장소</div>
                <div className="folder-items">
                  {folderInfo.places?.map((place) => {
                    return (
                      <PlaceItem
                        key={place.id}
                        place={place}
                        onClickUncartPlace={onClickUncartPlace}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {selected === 1 && (
            <div className="posts-container">
              {likedPosts &&
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
                })}
            </div>
          )}
          {selected === 2 && (
            <div className="posts-container">
              {sharedPosts &&
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
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
