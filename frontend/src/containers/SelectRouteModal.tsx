import React, { useCallback, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootReducerType } from "../store/store";
import "../styles/components/SelectFolderModal.css";
import "../styles/components/SelectRouteModal.css";
import { SimplePostType } from "../store/Post/postInterfaces";

interface PropsType {
  cartRouteList: SimplePostType[];
  isModalVisible: boolean;
  onClickRouteSubmitButton: (routeId: number) => void;
}

function SelectRouteModal(props: PropsType) {
  // const dispatch = useDispatch();
  // const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  const [clickedRoute, setClickedRoute] = useState<number | null>(null);
  const onClickRoute = useCallback((routeId: number) => {
    setClickedRoute(routeId);
  }, []);
  
  const onClickSelectButton = useCallback(() => {
    if (clickedRoute) {
    } else {
      alert("빈 루트가 생성됩니다.");
    }
  }, []);

  return (
    <div className={`select-route-modal-container ${props.isModalVisible}`}>
      <div className="modal-title">Select a route!</div>
      <div className="route-list-container">
        {props.cartRouteList.map((route: SimplePostType) => {
          return (
            <div
              key={route.id}
              onClick={() => onClickRoute(route.id)}
              className="route-container"
            >
              <div className="route-header-image">
                <img src={route.thumbnail_image} />
              </div>
              <div className="route-header-info">
                <div className="route-header-title">{route.title}</div>
                <div className="route-header-author">{route.author_name}</div>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => onClickRoute}
          className="route-container blank-route"
        >
          Start with a new Route
        </div>
      </div>
      <div
        className="select-route-modal-select-btn"
        onClick={() => onClickSelectButton()}
      >
        Select
      </div>
    </div>
  );
}

export default SelectRouteModal;
