import React, { useRef, useState } from "react";
import buttonUp from "../static/chevron-down.svg";
import buttonDown from "../static/chevron-up.svg";
import { PlaceType } from "../store/Post/postInterfaces";
import "../styles/components/CreatePlaceCard.scss";
import ItemTypes from "../utils/items";
import { useDrag, useDrop } from "react-dnd";

interface PropsType {
  id: Number;
  place: PlaceType;
  icon: string;
  type: "search" | "place" | "route";
  isPlaceInCart: (id: number) => boolean;
  isPlaceInRoute?: (place: any) => boolean;
  onClickCartButton?: (place: PlaceType) => void;
  movePlace?: (dragIndex: number, hoverIndex: number) => void;
}

function CreatePlaceCard(props: PropsType) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
  });
  const [{ opacity }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, place: props.place },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(ref));
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickCartButton = () => {
    if (props.onClickCartButton) {
      props.onClickCartButton(props.place);
    }
  };

  return (
    <div ref={ref} style={{ opacity }} className="create-place-container">
      <div className="place-container-top">
        <div className="place-title">{props.place.name}</div>
        <button
          className={`place-cart-button ${props.type}`.concat(
            props.isPlaceInCart(props.place.id) ? " selected" : ""
          )}
          onClick={onClickCartButton}
        >
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
