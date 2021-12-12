import React, { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootReducerType } from "../store/store";
import "../styles/components/SelectFolderModal.css";
import "../styles/components/SelectRouteModal.css";
import { SimplePostType } from "../store/Post/postInterfaces";
import close_modal_icon from "../static/close-modal-icon.svg";

interface PropsType {
  cartRouteList: SimplePostType[];
  isModalVisible: boolean;
  onClickRouteSubmitButton: (routeId: number) => void;
  onClickRoute: (routeId: number) => void;
  clickedRoute: number;
  onClickCloseModal: () => void;
  countModalClick: number;
}

function SelectRouteModal(props: PropsType) {
  const {
    cartRouteList,
    isModalVisible,
    onClickRoute,
    onClickRouteSubmitButton,
    clickedRoute,
    onClickCloseModal,
    countModalClick,
  } = props;
  // const dispatch = useDispatch();
  // const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  const onClickSelectButton = useCallback(() => {
    onClickRouteSubmitButton(clickedRoute);
  }, [clickedRoute]);

  return (
    <div className={`select-route-modal-container ${isModalVisible}`}>
      <div className="modal-title">
        Select a route!
        <img
          className="close-modal-icon"
          src={close_modal_icon}
          onClick={onClickCloseModal}
        ></img>
      </div>
      <div className="route-list-container">
        {cartRouteList.map((route: SimplePostType) => {
          return (
            <div
              key={route.id}
              onClick={() => onClickRoute(route.id)}
              className={"route-container".concat(
                route.id == clickedRoute ? " selected" : ""
              )}
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
          onClick={() => onClickRoute(0)}
          className={"route-container blank-route"
            .concat(0 == clickedRoute ? " selected" : "")
            .concat(countModalClick==0 ? "" : " false")}
        >
          + 빈 루트 생성하기
        </div>
      </div>
      <button
        className="select-route-modal-select-btn"
        onClick={() => onClickSelectButton()}
      >
        Select
      </button>
    </div>
  );
}

export default SelectRouteModal;
