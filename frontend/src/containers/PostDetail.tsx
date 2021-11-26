import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import {
  cartPostAction,
  getPostAction,
  getCommentsAction,
} from "../store/Post/postAction";
import "../styles/components/PostDetail.css";
import "../styles/components/Place.css";
import Map from "../components/Map";
import cart from "../static/cart-icon.svg";
import edit_btn from "../static/edit-icon.svg";
import { addFolderAction, editFolderAction } from "../store/User/userAction";
import { CommentType, PlaceType } from "../store/Post/postInterfaces";
import Place from "../components/Place";
import { useFolderState } from "../hooks/useFolderState";
import { RootReducerType } from "../store/store";
import profile_image from "../static/profile.png";
import delete_icon from "../static/delete-icon.svg";
import hover_delete_icon from "../static/hover-delete-icon.svg";
import PostHeader from "../components/PostHeader";
import like_icon from "../static/like-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";

function PostDetail() {
  interface FolderType {
    id: number;
    name: string;
  }
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);
  const [clicked, setClicked] = useState(true);
  const onClickAddPostCartButton = () => {
    setClicked(false);
    return clicked;
  };
  const onClickFolderSelect = (folderId: number) => {
    alert("장바구니에 성공적으로 담겼습니다!");
    setClicked(true);
    dispatch(cartPostAction(Number(id), folderId));
  };

  const [isFolderAdding, setIsFolderAdding] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: "",
    newFolderName: "",
  });

  const onChangeEditFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderInputs({
      ...folderInputs,
      folderName: e.target.value,
    });
  };

  const onChangeAddFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderInputs({
      ...folderInputs,
      newFolderName: e.target.value,
    });
  };

  const onClickAddFolder = () => {
    setIsFolderAdding(true);
  };

  const onClickEditFolder = (folder_id: number, folder_name: string) => {
    setFolderInputs({
      ...folderInputs,
      folderId: folder_id,
      folderName: folder_name,
    });
  };

  const onEditFolder = (folder_id: number) => {
    dispatch(
      editFolderAction(
        loggedUser.id,
        folder_id,
        { folder_name: folderInputs.folderName },
        (value) => {
          if (value)
            setFolderInputs({ ...folderInputs, folderId: 0, folderName: "" });
        }
      )
    );
  };

  const onAddFolder = () => {
    dispatch(
      addFolderAction(loggedUser.id, folderInputs.newFolderName, (value) =>
        setIsFolderAdding(!value)
      )
    );
    setFolderInputs({ ...folderInputs, newFolderName: "" });
  };

  // place의 타입 정의 후 any 고치기
  const post = usePostState();
  const folders = useFolderState();
  // console.log(post);
  // const folderMapping = () => {
  //   folders.map((folder: FolderType) => {
  //     return <div key={folder.id}>{folder.name}</div>;
  //   });
  // };
  const placeMapping = () => {
    if (post.places) {
      const places = post.places;
      const days = post.days;
      const placeList = [];
      for (let day = 1; day <= days; day++) {
        placeList.push(
          <div className="route-day-info">
            Day{day}
            {places
              .filter((place: any) => place.day == day)
              .map((dayPlace: PlaceType) => {
                return (
                  <Place
                    key={days.index}
                    place={dayPlace}
                    icon={cart}
                    onClickButton={() => onClickAddPostCartButton()}
                  />
                );
              })}
          </div>
        );
      }
      return placeList;
    } else return null;
  };

  const onClickPostLikeButton = () => {
    axios
      .get(`/post/${id}/like/`)
      .then(function () {
        dispatch(getPostAction(Number(id)));
      })
      .catch((err) => err.response);
  };
  const [newComment, setComment] = useState("");
  const onChangeCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const onClickCreateComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newComment === ``) {
      return null;
    } else {
      const body = {
        username: loggedUser.username,
        content: newComment,
      };
      return axios.post(`/post/${id}/comment/create/`, body).then(function () {
        dispatch(getCommentsAction(Number(id)));
        setComment("");
      });
    }
  };

  const onClickCommentDelete = (commentId: number) => {
    if (commentId && window.confirm("댓글을 정말 삭제하시겠습니까?")) {
      return axios.delete(`/post/${id}/comment/${commentId}`).then(function () {
        dispatch(getCommentsAction(Number(id)));
      });
    }
  };

  return (
    <>
      <div className="post-detail-container">
        <PostHeader
          loggedUserId={loggedUser.id}
          post={post}
          isPostDetail={true}
          onClickAddPostCartButton={onClickAddPostCartButton}
          onClickPostLikeButton={onClickPostLikeButton}
        />
        <div className="post-detail-body">
          <div className="body-route-container">{placeMapping()}</div>
          <div className="body-left-container">
            <Map
              fromWhere={'detail'}
              location={post.location}
              placeList={post.places.map((place: any) => {
                place.lat = place.latitude;
                place.lon = place.longitude;
                return {
                  day: place.day,
                  place,
                };
              })}
            />
            <div className="body-comments-container">
              <div
                className={`comment-input-container ${
                  loggedUser.id ? `visible` : `invisible`
                }`}
              >
                {post.liked ? (
                  <img
                    className="post-like-icon liked logged"
                    onClick={() => onClickPostLikeButton()}
                    src={like_icon}
                  />
                ) : (
                  <img
                    className="post-like-icon unliked"
                    onClick={() => onClickPostLikeButton()}
                    src={unlike_icon}
                  />
                )}
                <input
                  className="comment-input"
                  type="text"
                  placeholder="댓글을 입력해주세요"
                  onChange={onChangeCommentInput}
                  value={newComment}
                />
                <button
                  className="comment-submit"
                  onClick={onClickCreateComment}
                >
                  게시
                </button>
              </div>
              <div className="comments-container">
                {post.comments &&
                  post.comments.map((comment: CommentType, index: number) => {
                    return (
                      <div className="each-comment-container" key={index}>
                        <div className="each-comment-top">
                          <img
                            className="each-profile-image"
                            src={comment.profile_image || profile_image}
                          />
                          <NavLink
                            to={`/user_info/${comment.author_id}/`}
                            className="each-comment-author"
                          >
                            {comment.username}
                          </NavLink>
                          <span className="each-comment-content">
                            {comment.content}&nbsp;&nbsp;&nbsp;
                          </span>
                          <button
                            id="delete-comment-button"
                            className={`visible-${
                              loggedUser.username === comment.username
                            }`}
                            onClick={() => onClickCommentDelete(comment.id)}
                          >
                            <img src={delete_icon} />
                            <img src={hover_delete_icon} />
                          </button>
                        </div>
                        <div className="each-comment-bottom">
                          <div className="each-comment-created-at">
                            {comment.created_at}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`folder-select-modal ${clicked && `invisible`}`}>
        <div className="folder-modal-top">
          <div className="folder-modal-title">Select a Folder!</div>
          <button className="close-button" onClick={() => setClicked(true)}>
            X
          </button>
        </div>
        <div className="folder-modal-middle">
          {folders &&
            folders.map((folder: FolderType) => {
              if (folderInputs.folderId === folder.id) {
                return (
                  <div className="folder-modal-name">
                    <input
                      id="edit-folder-input"
                      type="text"
                      value={folderInputs.folderName}
                      onChange={onChangeEditFolder}
                    />
                    <img
                      className="icon"
                      src={edit_btn}
                      onClick={() => onEditFolder(folder.id)}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={folder.id}>
                    <div
                      className="folder-modal-name"
                      onClick={() => onClickFolderSelect(folder.id)}
                    >
                      {folder.name}
                    </div>
                    <img
                      className="icon"
                      src={edit_btn}
                      onClick={() => onClickEditFolder(folder.id, folder.name)}
                    />
                  </div>
                );
              }
            })}
          {isFolderAdding && (
            <div className="add-folder">
              <input
                id="add-folder-input"
                type="text"
                value={folderInputs.newFolderName}
                onChange={onChangeAddFolder}
              />
              <img
                className="icon"
                src={edit_btn}
                onClick={() => onAddFolder()}
              />
            </div>
          )}
          <div className="add-folder" onClick={() => onClickAddFolder()}>
            Add Folder
          </div>
        </div>
        <div className="folder-modal-bottom">
          {/* <button
            className="folder-select-button"
            onClick={() => onClickFolderSelect()}
          >
            Select
          </button> */}
        </div>
      </div>
    </>
  );
}

export default PostDetail;
