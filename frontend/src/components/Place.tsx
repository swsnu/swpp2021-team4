import React, { useState } from "react";
import buttonUp from "../static/chevron-down.svg";
import buttonDown from "../static/chevron-up.svg";
import { PlaceType } from "../store/Post/postInterfaces";
import "../styles/components/Place.css";

interface PropsType {
  place: PlaceType;
  icon: string;
  onClickButton: Function;
  onAddButton?: (place:any) => void
}
function Place(props: PropsType) {
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
  return (
    <div className="place-container">
      <div className="place-container-top">
        <div className="place-title" onClick={() => {
          if (props.onAddButton) {
            props.onAddButton(props.place)
          }
        }}>
          {props.place.name}
        </div>
        <button
          className="place-cart-button"
          onClick={() => props.onClickButton()}
        >
          <img src={props.icon} />
        </button>
      </div>
      <div className="place-container-middle">
        <div className="place-description text">{props.place.description}</div>
        <div className="toggle-button">
          {toggle.includes(props.place.id) && (
            <img
              className="post-icon"
              src={buttonUp}
              onClick={() => removeToggle(props.place.id)}
            />
          )}
          {toggle.includes(props.place.id) || (
            <img
              className="post-icon"
              src={buttonDown}
              onClick={() => appendToggle(props.place.id)}
            />
          )}
        </div>
      </div>
      {toggle.includes(props.place.id) && (
        <div className="place-info-container">
          <div className="place-info">
            <div className="place-info-column">Homepage</div>
            <div className="place-info-item">{props.place.homepage}</div>
          </div>
          <div className="place-info">
            <div className="place-info-column">Phone</div>
            <div className="place-info-item">{props.place.phone_number}</div>
          </div>
          <div className="place-info">
            <div className="place-info-column">Address</div>
            <div className="place-info-item">{props.place.address}</div>
          </div>
          <div className="place-info">
            <div className="place-info-column">Category</div>
            <div className="place-info-item">{props.place.category}</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Place;
