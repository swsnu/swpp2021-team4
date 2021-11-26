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
import { CommentType, PlaceType } from "../store/Post/postInterfaces";
import Place from "../components/Place";
import { RootReducerType } from "../store/store";
import profile_image from "../static/profile.png";
import delete_icon from "../static/delete-icon.svg";
import hover_delete_icon from "../static/hover-delete-icon.svg";
import PostHeader from "../components/PostHeader";
import like_icon from "../static/like-icon.svg";
import unlike_icon from "../static/unlike-icon.svg";
import SelectFolderModal from "./SelectFolderModal";
import { Folder } from "../store/User/userInterfaces";

function PostDetail() {
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPostAddedToCart, setIsPostAddedToCart] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(0); // tracks which place user try to put in cart

  const onClickAddPostCartButton = () => {
    // executed when user clicks 'Add this route to cart' button
    setIsPostAddedToCart(true);
    setIsModalVisible(true);
  };

  const onClickAddPlaceCartButton = (placeId: number) => {
    // executed when user clicks place's cart icon
    setIsModalVisible(true);
    setSelectedPlaceId(placeId);
  }

  const onClickModalBackground = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    if (isPostAddedToCart) {
      setIsPostAddedToCart(false);
    }
    if (selectedPlaceId) {
      setSelectedPlaceId(0);
    }
  }
  
  const onClickFolderSelect = (folder: Folder|null) => {
    if (!folder?.id) {
      alert("서버 에러!");
      setIsModalVisible(false);
      return;
    }

    alert("장바구니에 성공적으로 담겼습니다!");    
    if (isPostAddedToCart) {
      // add current post to cart
      dispatch(cartPostAction(Number(id), folder.id));
      setIsPostAddedToCart(false);
    } else {
      // add selected place to cart
      axios.post(`/place/${selectedPlaceId}/cart/${folder.id}/`)
      .then(() => setSelectedPlaceId(0))
      .catch(() => alert('문제가 발생하여 카트에 저장되지 않았습니다!'));
    }
    setIsModalVisible(false);
  };

  
  // place의 타입 정의 후 any 고치기
  const post = usePostState();

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
                    onClickButton={onClickAddPlaceCartButton}
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
      <div
        className="post-detail-container"
        onClick={onClickModalBackground}
      >
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

      <SelectFolderModal
        isModalVisible={isModalVisible}
        onClickSelectButton={onClickFolderSelect}
      />
    </>
  );
}

export default PostDetail;
