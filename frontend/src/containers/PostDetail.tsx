import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import border from "../static/post_info_border.svg";
import "../styles/PostDetail.css";
import "../styles/components/Place.scss";
import Map from "../components/Map";
import cart from "../static/cart-icon.svg";
import { PlaceType } from "../store/Post/postInterfaces";
import Place from "../components/Place";
import { useFolderState } from "../hooks/useFolderState";

function PostDetail() {
  interface String {
    id: string;
  }
  interface FolderType {
    id: number;
    name: string;
  }
  // const [toggle, setToggle] = useState<number[]>([]);
  // const appendToggle = (id: number) => {
  //   const newToggle = toggle.concat(id);
  //   setToggle(newToggle);
  //   return toggle;
  // };
  // const removeToggle = (id: number) => {
  //   const newToggle = toggle.filter((_id) => _id !== id);
  //   setToggle(newToggle);
  //   return toggle;
  // };
  const dispatch = useDispatch();
  const { id } = useParams<String>();
  useEffect(() => {
    dispatch(getPostAction(Number(id)));
  }, [dispatch, id]);
  const onClickAddRouteCartButton = () => {
    return null;
  };
  // place의 타입 정의 후 any 고치기
  const post = usePostState();
  const folders = useFolderState();
  console.log(post);
  console.log(folders);
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
          <div key={days.index} className="route-day-info">
            Day{day}
            {places
              .filter((place: any) => place.day == day)
              .map((dayPlace: PlaceType) => {
                return (
                  <Place
                    key={days.index}
                    place={dayPlace}
                    icon={cart}
                    onClickButton={() => onClickAddRouteCartButton()}
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
  return (
    <>
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
                <span className={`post-tag ${withoutCar}`}>
                  뚜벅이 여행 가능
                </span>
              </div>
            </div>
          </div>
          <div className="header-content-right">
            <button className="post-cart-button">Add this route to Cart</button>
          </div>
        </div>
        <div className="post-detail-body">
          <div className="body-route-container">{placeMapping()}</div>
          <div className="body-map-container">
            <Map location={post.location} />
          </div>
        </div>
      </div>
      <div className="folder-select-modal">
        {folders &&
          folders.items.map((folder: FolderType) => {
            return <div key={folder.id}>{folder.name}</div>;
          })}
      </div>
    </>
  );
}

export default PostDetail;
