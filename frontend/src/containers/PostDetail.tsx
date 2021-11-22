import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { usePostState } from "../hooks/usePostState";
import { cartPostAction, getPostAction } from "../store/Post/postAction";
import border from "../static/post_info_border.svg";
import "../styles/components/PostDetail.css";
import "../styles/components/Place.css";
import Map from "../components/Map";
import cart from "../static/cart-icon.svg";
import edit_btn from "../static/edit-icon.svg";
import { PlaceType } from "../store/Post/postInterfaces";
import Place from "../components/Place";
import { useFolderState } from "../hooks/useFolderState";
import { RootReducerType } from "../store/store";
import { addFolderAction, editFolderAction } from "../store/User/userAction";

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
    console.log("did");
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

  const [isFolderEdited, setIsFolderEdited] = useState(false);
  const [isFolderAdded, setIsFolderAdded] = useState(false);
  const [isFolderAdding, setIsFolderAdding] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: "",
    newFolderName: ""
  })

  useEffect(() => {
    if (isFolderEdited) {
      setFolderInputs({ ...folderInputs, folderId: 0, folderName: "" });
    }
  }, [isFolderEdited])

  useEffect(() => {
    if (isFolderAdded) {
      setFolderInputs({ ...folderInputs, newFolderName: "" });
    }
  }, [isFolderAdded])

  const onChangeEditFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFolderInputs({
      ...folderInputs,
      folderName: e.target.value
    })
  };

  const onChangeAddFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFolderInputs({
      ...folderInputs,
      newFolderName: e.target.value
    })
  };

  const onClickAddFolder = () => {
    setIsFolderAdding(true);
  }

  const onClickEditFolder = (folder_id: number, folder_name: string) => {
    setFolderInputs({
      ...folderInputs,
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

  const onAddFolder = () => {
    dispatch(addFolderAction(
      loggedUser.id,
      folderInputs.newFolderName,
      (value) => setIsFolderAdded(value))
    )
    setIsFolderAdding(false);
  }

  // place의 타입 정의 후 any 고치기
  const post = usePostState();
  const folders = useFolderState();
  // console.log(post);
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
  return (
    <>
      <div className="post-detail-container">
        <div className="post-detail-header">
          <div className="header-image">
            <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg" />
          </div>
          <div className="header-content-left">
            <div className="header-top">
              <div className="post-folder-name">{loggedUser.id == post.author_id && post.folder_name}</div>
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
            <button
              className="post-cart-button"
              onClick={() => onClickAddPostCartButton()}
            >
              Add this route to Cart
            </button>
          </div>
        </div>
        <div className="post-detail-body">
          <div className="body-route-container">{placeMapping()}</div>
          <div className="body-map-container">
            <Map
              location={post.location}
              placeList={post.places.map((place: any) => {
                place.lat = place.latitude;
                place.lon = place.longitude;
                return {
                  day: place.day,
                  place
                };
              })}
            />
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
                      id="edit_folder_input"
                      type="text"
                      value={folderInputs.folderName}
                      onChange={onChangeEditFolder}
                    />
                    <img className="icon" src={edit_btn} onClick={() => onEditFolder(folder.id)} />
                  </div>
                )
              } else {
                return (
                  <div key={folder.id}>
                    <div
                      className="folder-modal-name"
                      onClick={() => onClickFolderSelect(folder.id)}
                    >
                      {folder.name}
                    </div>
                    <img className="icon" src={edit_btn} onClick={() => onClickEditFolder(folder.id, folder.name)} />
                  </div>
                );
              }
            })}
          {isFolderAdding &&
            <div className="add-folder">
              <input
                id="add_folder_input"
                type="text"
                value={folderInputs.newFolderName}
                onChange={onChangeAddFolder}
              />
              <img className="icon" src={edit_btn} onClick={() => onAddFolder()} />
            </div>}
          <div
            className="add-folder"
            onClick={() => onClickAddFolder()}
          >Add Folder</div>
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
