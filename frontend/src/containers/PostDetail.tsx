import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import {
  cartPostAction,
  getPostAction,
  getCommentsAction,
  deletePostAction,
} from "../store/Post/postAction";
import "../styles/components/PostDetail.css";
import "../styles/components/Place.css";
import Map from "../components/Map";
import cart from "../static/cart-icon.svg";
import {
  CommentType,
  PlaceType,
  ServerPathType,
} from "../store/Post/postInterfaces";
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
import Path from "../components/Path";

function PostDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<any>();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPostAddedToCart, setIsPostAddedToCart] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(0); // tracks which place user try to put in cart
  const [selectedDay, setSelectedDay] = useState(0);

  const onClickAddPostCartButton = () => {
    // executed when user clicks 'Add this route to cart' button
    setIsPostAddedToCart(true);
    setIsModalVisible(true);
  };

  const onClickAddPlaceCartButton = (placeId: number) => {
    // executed when user clicks place's cart icon
    setIsModalVisible(true);
    setSelectedPlaceId(placeId);
  };

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
  };

  const onClickCloseModal = () => {
    setIsModalVisible(false);
  };

  const onClickFolderSelect = (folder: Folder | null) => {
    if (!folder?.id) {
      alert("?????? ??????!");
      setIsModalVisible(false);
      return;
    }

    alert("??????????????? ??????????????? ???????????????!");
    if (isPostAddedToCart) {
      // add current post to cart
      dispatch(cartPostAction(Number(id), folder.id));
      setIsPostAddedToCart(false);
    } else {
      // add selected place to cart
      axios
        .post(`/place/${selectedPlaceId}/cart/${folder.id}/`)
        .then(() => setSelectedPlaceId(0))
        .catch(() => alert("????????? ???????????? ????????? ???????????? ???????????????!"));
    }
    setIsModalVisible(false);
  };

  // place??? ?????? ?????? ??? any ?????????
  const post = usePostState();
  const placeMapping = () => {
    if (post.places) {
      const places = post.places;
      const days = post.days;
      const placeList = [];
      for (let day = 1; day <= days; day++) {
        placeList.push(
          <div
            key={day}
            className="route-day-info"
            onClick={() => setSelectedDay(day)}
          >
            Day{day}
            {places
              .filter((place: PlaceType) => place.day == day)
              .map((dayPlace: PlaceType, index: number, array: PlaceType[]) => {
                const pathFromCurrentPlace = post.pathList?.find(
                  (path: ServerPathType) => {
                    return (
                      path.from_place_id === dayPlace.id &&
                      index < array.length &&
                      path.to_place_id ==
                        (array[index + 1] && array[index + 1].id)
                    );
                  }
                );

                return (
                  <>
                    <Place
                      key={days.index}
                      place={dayPlace}
                      icon={cart}
                      onClickButton={onClickAddPlaceCartButton}
                    />
                    {pathFromCurrentPlace && (
                      <Path
                        isFromDetail
                        key={dayPlace.id + array[index + 1].id}
                        from={dayPlace}
                        to={array[index + 1]}
                        transportation={pathFromCurrentPlace.transportation}
                      />
                    )}
                  </>
                );
              })}
          </div>
        );
      }
      return placeList;
    } else return null;
  };

  const onClickPostShareButton = () => {
    if (!post.location || !post.days || !post.season || !post.theme) {
      alert("?????? ????????? ??? ????????? ????????? ??? ????????????!");
      return;
    }

    if (window.confirm("??? ????????? ?????? ??????????????? ?????????????????????????")) {
      axios
        .get(`/post/${post.id}/share/`)
        .then(function () {
          post.is_shared = true;
          history.push(`/post/show/${post.id}/`);
        })
        .catch((err) => err.response);
    }
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
        setComment("");
        dispatch(getCommentsAction(Number(id)));
      });
    }
  };

  const onClickCommentDelete = (commentId: number) => {
    if (commentId && window.confirm("????????? ?????? ?????????????????????????")) {
      return axios.delete(`/post/${id}/comment/${commentId}`).then(function () {
        dispatch(getCommentsAction(Number(id)));
      });
    }
  };

  const onClickPostDeleteButton = () => {
    if (window.confirm("????????? ?????????????????????????")) {
      dispatch(deletePostAction(post.id, () => history.goBack()));
    }
  };

  return (
    <>
      <div className="post-detail-container" onClick={onClickModalBackground}>
        <PostHeader
          loggedUserId={loggedUser.id}
          post={post}
          isPostDetail={true}
          onClickAddPostCartButton={onClickAddPostCartButton}
          onClickPostShareButton={onClickPostShareButton}
          onClickPostLikeButton={onClickPostLikeButton}
          onClickPostDeleteButton={onClickPostDeleteButton}
        />
        <div className="post-detail-body">
          <div className="body-route-container">{placeMapping()}</div>
          <div className="body-left-container">
            <Map
              fromWhere={"detail"}
              selectedDay={selectedDay}
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
            <div className="body-comments-container" hidden={!post.is_shared}>
              <div
                className={`comment-input-container ${
                  loggedUser.id ? `visible` : `invisible`
                }`}
              >
                {post.liked ? (
                  <img
                    id="like-icon"
                    className="post-like-icon liked logged"
                    onClick={() => onClickPostLikeButton()}
                    src={like_icon}
                  />
                ) : (
                  <img
                    id="unlike-icon"
                    className="post-like-icon unliked"
                    onClick={() => onClickPostLikeButton()}
                    src={unlike_icon}
                  />
                )}
                <input
                  className="comment-input"
                  type="text"
                  placeholder="????????? ??????????????????"
                  onChange={onChangeCommentInput}
                  value={newComment}
                />
                <button
                  className="comment-submit"
                  onClick={onClickCreateComment}
                >
                  ??????
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
        onClickCloseModal={onClickCloseModal}
      />
    </>
  );
}

export default PostDetail;
