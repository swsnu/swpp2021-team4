import React, { useRef, useState } from "react";
import buttonUp from "../static/chevron-down.svg";
import buttonDown from "../static/chevron-up.svg";
import { PlaceType, PlaceDayType, PathListType } from "../store/Post/postInterfaces";
import "../styles/components/CreatePlaceCard.scss";
import ItemTypes from "../utils/items";
import { useDrag, useDrop } from "react-dnd";
import { XYCoord } from "dnd-core/dist/types/interfaces";

interface PropsType {
  id: Number;
  index?: number;
  todayPlaceList?: PlaceDayType[]
  place: PlaceType;
  icon: string;
  type: "search" | "place" | "route";
  isPlaceInCart: (id: number) => boolean;
  isPlaceInRoute?: (place: any) => boolean;
  onClickCartButton?: ((place: PlaceType) => void) | null;
  selectedDay: number | null;
  movePlace?: (dragIndex: number, hoverIndex: number) => void;
  setPathList?: (value: React.SetStateAction<PathListType>) => void;
  setRoutePlaces?: (value: React.SetStateAction<PlaceDayType[]>) => void;
}
interface ItemType {
  type: string;
  place: PlaceType;
  index: number;
  day: number;
}

interface PathValueType {
  to: string,
  transportation: 'car' | 'pub' | 'vic' | 'wal'
}

function CreatePlaceCard(props: PropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ opacity }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      type: ItemTypes.CARD,
      place: props.place,
      index: props.index,
      selectedDay: props.selectedDay || null,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ItemType>();
      const setRoutePlaces = props.setRoutePlaces;
      if (
        dropResult &&
        dropResult.day !== props.selectedDay &&
        setRoutePlaces
        ) {
        // drag place from cart to my route
        setRoutePlaces((prevState: any) => {
          return [...prevState, { place: { ...props.place, id: props.place.id+Date.now() }, day: dropResult.day }];
        });
      } else if (dropResult && setRoutePlaces && dropResult.day === props.selectedDay) {
        if (props.setPathList && props.index) {
          props.setPathList((prevState: PathListType) => {
            Object.entries(prevState).forEach(([key, value]: [string, PathValueType]) => {
              if (
                key === item.place.id.toString() ||
                value.to === item.place.id.toString() ||
                props.todayPlaceList && key === props.todayPlaceList[(item?.index || 1)-1].place.id.toString()
              ) {
                // removes path objects related to the dragged place and hovered place.
                delete prevState[key];
              }
            });
            return { ...prevState };
          });
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: ItemType, monitor) {
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (!ref.current || !hoverIndex) {
        return;
      }
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } else if (props.movePlace) {
        props.movePlace(dragIndex, hoverIndex);
      }
      
      item.index = hoverIndex;
    },
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
