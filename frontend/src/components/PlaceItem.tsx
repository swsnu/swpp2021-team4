import React from "react";
import { SimplePlaceType } from "../store/Post/postInterfaces";
import '../styles/components/PlaceItem.css';

interface PropsType {
    place: SimplePlaceType
}

function PlaceItem(props: PropsType) {
    return (
        <div className="place-item-container">
            <div className="place-item--title">{props.place.name}</div>
            <div className="place-item--description">{props.place.description}</div>
        </div>
    );
}
export default PlaceItem;
