import React from "react";
import { PlaceType } from "../store/Post/postInterfaces";
import '../styles/components/PlaceItem.css';
import deleteIcon from "../static/delete-icon.svg"

interface PropsType {
    place: PlaceType
    onClickUncartPlace?: (placeId: number) => void;
}

function PlaceItem(props: PropsType) {
    return (
        <div className="place-item-container">
            <div className="place-item-top">
                <div className="place-item-title">{props.place.name}</div>
                <button className="place-item-delete">
                    <img src={deleteIcon} onClick={() => {
                        if (props.onClickUncartPlace) props.onClickUncartPlace(props.place.id)
                    }}></img>
                </button>
            </div>
            <div className="place-item-description">{props.place.description}</div>
        </div>
    );
}
export default PlaceItem;
