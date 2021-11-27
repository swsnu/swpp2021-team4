import React from "react";
import { SimplePlaceType } from "../store/Post/postInterfaces";
import '../styles/components/PlaceItem.css';

interface PropsType {
    place: SimplePlaceType
}

function PlaceItem(props: PropsType) {
    return (
        <div className="place-container">
            <div className="place-title">{props.place.name}</div>
            <div className="place-description">{props.place.description}</div>
        </div>
    );
}
export default PlaceItem;
