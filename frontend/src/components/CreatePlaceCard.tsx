import React, { useState } from "react";
import buttonUp from "../static/chevron-down.svg";
import buttonDown from "../static/chevron-up.svg";
import { PlaceType } from "../store/Post/postInterfaces";
import "../styles/components/CreatePlaceCard.scss";
import ItemTypes from "../utils/items";
import { useDrag } from "react-dnd";

interface PropsType {
  id: Number;
  place: PlaceType;
  icon: string;
  onClickButton: (place: any) => void;
}
// interface DragType {
//   item: {
//     type: string;
//   };
// }

function CreatePlaceCard(props: PropsType) {
  const [{ opacity }, dragRef] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, id: props.id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickCartButton = () => {
    props.onClickButton(props.place);
  };

  return (
    <div ref={dragRef} style={{ opacity }} className="create-place-container">
      <div className="place-container-top">
        <div className="place-title">{props.place.name}</div>
        <button className="place-cart-button" onClick={onClickCartButton}>
          <img src={props.icon} />
        </button>
      </div>
      <div className="place-container-middle">
        <div className="place-description">{props.place.name}입니다.</div>
        <img
          className="post-icon"
          src={isExpanded ? buttonUp : buttonDown}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <div
        className={"place-info-container".concat(
          !isExpanded ? " invisible" : ""
        )}
      >
        <div className="place-info">
          <div className="place-info-column">Homepage</div>
          <div className="place-info-item">{props.place?.homepage}</div>
        </div>
        <div className="place-info">
          <div className="place-info-column">Phone</div>
          <div className="place-info-item">{props.place?.phone_number}</div>
        </div>
        <div className="place-info">
          <div className="place-info-column">Address</div>
          <div className="place-info-item">{props.place?.address}</div>
        </div>
        <div className="place-info">
          <div className="place-info-column">Category</div>
          <div className="place-info-item">{props.place?.category}</div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(CreatePlaceCard);
