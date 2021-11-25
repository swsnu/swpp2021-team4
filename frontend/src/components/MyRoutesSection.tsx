import React, { useEffect, useState } from "react";
import "../styles/components/MyRoutesSection.scss";
import addIcon from "../static/add_day_icon.svg";
import { PlaceDayType, PlaceType } from "../store/Post/postInterfaces";
import deleteIcon from "../static/delete.svg";
import CreatePlaceCard from "./CreatePlaceCard";
import Path from "./Path";
import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";

interface PropType {
  days: number;
  selectedDay: number;
  routePlaces: any[];
  onClickDay: (value: number) => void;
  onClickAddIcon: (value: number) => void;
  onDeletePlace: (place: any) => void;
  onAddPlace: (place: any) => void;
}

interface ItemType {
  type: string;
  place: PlaceType;
}

function MyRoutesSection(props: PropType) {
  const {
    days,
    selectedDay,
    onClickDay,
    onClickAddIcon,
    routePlaces,
    onDeletePlace,
    onAddPlace,
  } = props;

  const [todayPlaceList, setTodayPlaceList] = useState<PlaceDayType[]>([]);

  useEffect(() => {
    setTodayPlaceList(
      routePlaces.filter((p: PlaceDayType) => p.day == selectedDay)
    );
  }, [selectedDay, routePlaces]);

  const renderDayButtons = () => {
    const results = [];
    for (let i = 0; i < days; i++) {
      results.push(
        <div
          key={i + 1}
          className={
            "my-routes-day-btn " + (i + 1 === selectedDay ? " selected" : "")
          }
          onClick={() => onClickDay(i + 1)}
        >
          Day {i + 1}
        </div>
      );
    }
    return results;
  };

  const [{ background }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: ItemType) => onAddPlace(item.place),
    collect: (monitor) => ({
      background: monitor.isOver() ? "#e2e3e9" : "#f6f6f9",
    }),
  });

  return (
    <div className="my-routes-container">
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
          }}
        >
          {renderDayButtons()}
        </div>
        <img
          style={{ marginLeft: "11px" }}
          onClick={() => onClickAddIcon(days + 1)}
          src={addIcon}
        />
      </div>
      <div
        className="my-routes-places-container"
        style={{ background }}
        ref={drop}
      >
        {todayPlaceList.map((result: PlaceDayType, index: number) => {
          const { place } = result;
          return (
            <>
              <CreatePlaceCard
                key={index}
                id={place.id}
                place={place}
                icon={deleteIcon}
                type="route"
                onClickCartButton={onDeletePlace}
                isPlaceInCart={() => true}
              />
              {index !== todayPlaceList.length - 1 && (
                <Path
                  key={index}
                  from={place}
                  to={todayPlaceList[index + 1].place}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MyRoutesSection);
