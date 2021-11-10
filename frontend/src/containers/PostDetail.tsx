import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import border from "../static/post_info_border.svg";
import "../styles/PostDetail.css";
import Map from "../components/Map";
import buttonUp from "../static/chevron-down.svg";
import buttonDown from "../static/chevron-up.svg";
import cartIcon from "../static/cart-icon.svg";
import { PlaceType } from "../store/Post/postInterfaces";

function PostDetail() {
  interface String {
    id: string;
  }
  const [toggle, setToggle] = useState<number[]>([]);
  const appendToggle = (id: number) => {
    const newToggle = toggle.concat(id);
    setToggle(newToggle);
    return toggle;
  };
  const removeToggle = (id: number) => {
    const newToggle = toggle.filter((_id) => _id !== id);
    setToggle(newToggle);
    return toggle;
  };
  const dispatch = useDispatch();
  const { id } = useParams<String>();
  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);

  // place의 타입 정의 후 any 고치기
  const post = usePostState();
  console.log(post);
  const mapping = () => {
    if (post.places) {
      const places = post.places;
      const days = post.days;
      const placeList = [];
      for (let day = 1; day <= days; day++) {
        placeList.push(
          <div key={days.index} className="route-day-info">
            Day{day}
            {places
              .filter((place: any) => place.day == day)
              .map((dayPlace: PlaceType) => {
                return (
                  <div key={dayPlace.id} className="place-container">
                    <div className="place-container-top">
                      <div className="place-title">{dayPlace.name}</div>
                      <button className="cart-button">
                        <img src={cartIcon} />
                      </button>
                    </div>
                    <div className="place-container-middle">
                      <div className="place-description text">
                        {dayPlace.description}
                      </div>
                      <div className="toggle-button">
                        {toggle.includes(dayPlace.id) && (
                          <img
                            className="post-icon"
                            src={buttonUp}
                            onClick={() => removeToggle(dayPlace.id)}
                          />
                        )}
                        {toggle.includes(dayPlace.id) || (
                          <img
                            className="post-icon"
                            src={buttonDown}
                            onClick={() => appendToggle(dayPlace.id)}
                          />
                        )}
                      </div>
                    </div>
                    {toggle.includes(dayPlace.id) && (
                      <div className="place-info-container">
                        <div className="place-info">
                          <div className="place-info-column">Homepage</div>
                          <div className="place-info-item">
                            {dayPlace.homepage}
                          </div>
                        </div>
                        <div className="place-info">
                          <div className="place-info-column">Phone</div>
                          <div className="place-info-item">
                            {dayPlace.phone_number}
                          </div>
                        </div>
                        <div className="place-info">
                          <div className="place-info-column">Address</div>
                          <div className="place-info-item">
                            {dayPlace.address}
                          </div>
                        </div>
                        <div className="place-info">
                          <div className="place-info-column">Category</div>
                          <div className="place-info-item">
                            {dayPlace.category}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="header-image">
          <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg" />
        </div>
        <div className="header-content-left">
          <div className="header-top">
            <div className="post-folder-name">{post.folder_name}</div>
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
            <div className="post-author">{post.author_name}</div>
            <div className="post-tag-container">
              <span className="post-tag">{postSeason()}</span>
              <span className="post-tag">{postTheme()}</span>
              <span className={`post-tag ${withoutCar}`}>뚜벅이 여행 가능</span>
            </div>
          </div>
        </div>
        <div className="header-content-right">
          <button className="post-cart-button">Add this route to Cart</button>
        </div>
      </div>
      <div className="post-detail-body">
        <div className="body-route-container">{mapping()}</div>
        <div className="body-map-container">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
