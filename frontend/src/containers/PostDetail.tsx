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
import border from "../static/post_info_border.svg";
import "../styles/components/PostDetail.css";
import "../styles/components/Place.css";
import Map from "../components/Map";
import cart from "../static/cart-icon.svg";
import { CommentType, PlaceType } from "../store/Post/postInterfaces";
import Place from "../components/Place";
import { useFolderState } from "../hooks/useFolderState";
import { RootReducerType } from "../store/store";
import comment_icon from "../static/comment-icon.svg";
import like_icon from "../static/like-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";
import profile_image from "../static/profile.png";
import delete_icon from "../static/delete-icon.svg";
import hover_delete_icon from "../static/hover-delete-icon.svg";

function PostDetail() {
  interface String {
    id: string;
  }
  interface FolderType {
    id: number;
    name: string;
  }
  const dispatch = useDispatch();
  const { id } = useParams<String>();
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

  // place의 타입 정의 후 any 고치기
  const post = usePostState();
  const folders = useFolderState();
  // console.log(post);
  console.log("folders" + folders);
  // const folderMapping = () => {
  //   folders.map((folder: FolderType) => {
  //     return <div key={folder.id}>{folder.name}</div>;
  //   });
  // };
  const placeMapping = () => {
    if (post.places) {
      // setLikes(post.like_counts);
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
  const postSeason = () => {
    if (post.season === "spr") return "Spring";
    else if (post.season === "sum") return "Summer";
    else if (post.season === "aut") return "Autumn";
    else if (post.season === "win") return "Winter";
  };

  const postTheme = () => {
    if (post.theme === "friends") return "친구와 함께!";
    else if (post.theme === "family") return "가족과 함께!";
    else if (post.theme === "lover") return "연인과 함께!";
    else if (post.theme === "alone") return "나홀로 여행!";
  };
  const withoutCar: boolean = post.availableWithoutCar;
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
    if (commentId) {
      return axios.delete(`/post/${id}/comment/${commentId}`).then(function () {
        dispatch(getCommentsAction(Number(id)));
      });
    }
  };
  return (
    <>
      <div className="post-detail-container">
        <div className="post-detail-header">
          <div className="header-image">
            <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg" />
          </div>
          <div className="header-content-left">
            <div className="header-top">
              <div className="post-folder-name">
                {loggedUser.id == post.author_id && post.folder_name}
              </div>
            </div>
            <div className="header-middle">
              <div className="post-title-name">{post.title}</div>
              <div className="post-info-container">
                <span className="post-info">{post.location}</span>
                <span className="post-info-border">
                  <img src={border} />
                </span>
                <span className="post-info">{post.days}일 코스</span>
              </div>
            </div>
            <div className="header-bottom">
              <div className="post-author">
                <NavLink to={`/user_info/${post.author_id}/`}>
                  {post.author_name}
                </NavLink>
              </div>
              <div className="post-tag-container">
                <span className="post-tag">{postSeason()}</span>
                <span className="post-tag">{postTheme()}</span>
                <span className={`post-tag ${withoutCar}`}>
                  뚜벅이 여행 가능
                </span>
              </div>
            </div>
          </div>
          <div className="header-content-right">
            <div className="header-top">
              <button
                className="post-cart-button"
                onClick={() => onClickAddPostCartButton()}
              >
                Add this route to Cart
              </button>
            </div>
            <div className="header-bottom">
              {post.liked ? (
                <img
                  className="post-like-icon liked"
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
              {post.like_counts}
              <img className="post-comment-icon" src={comment_icon} />
              {post.comments.length}
            </div>
          </div>
        </div>
        <div className="post-detail-body">
          <div className="body-route-container">{placeMapping()}</div>
          <div className="body-left-container">
            <Map location={post.location} />
            <div className="body-comments-container">
              <div className="comment-input-container">
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
                        <img
                          className="each-profile-image"
                          src={comment.profile_image || profile_image}
                        />
                        <span className="each-comment-author">
                          {comment.username}
                        </span>
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
              return (
                <div
                  className="folder-modal-name"
                  onClick={() => onClickFolderSelect(folder.id)}
                  key={folder.id}
                >
                  {folder.name}
                </div>
              );
            })}
          {/* <div className="add-folder">Add Folder</div> */}
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
