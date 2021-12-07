import React, { useEffect, useState, useCallback } from "react";
import "../styles/components/MyRoutesSection.scss";
import addIcon from "../static/add_day_icon.svg";
import {
  PathListType,
  PlaceDayType,
  PlaceType,
} from "../store/Post/postInterfaces";
import deleteIcon from "../static/delete.svg";
import Path from "./Path";
import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";
import update from "immutability-helper";
import CreatePlaceCard from "./CreatePlaceCard";

interface PropType {
  days: number;
  selectedDay: number;
  routePlaces: any[];
  pathList: PathListType;
  setPathList: (value: React.SetStateAction<PathListType>) => void;
  onChangePath: (
    e: React.ChangeEvent<HTMLSelectElement>,
    origin: PlaceType,
    destination: PlaceType
  ) => void;
  onClickDay: (value: number) => void;
  onClickAddIcon: (value: number) => void;
  editPlace: { id: number; description: string };
  onChangePlaceDescription?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditPlace: (place: any) => void;
  onDeletePlace: (place: any) => void;
  setRoutePlaces: (value: React.SetStateAction<PlaceDayType[]>) => void;
}

function MyRoutesSection(props: PropType) {
  const {
    days,
    selectedDay,
    onClickDay,
    onClickAddIcon,
    routePlaces,
    onEditPlace,
    onDeletePlace,
  } = props;

  const [todayPlaceList, setTodayPlaceList] = useState<PlaceDayType[]>([]);
  console.log(todayPlaceList);
  useEffect(() => {
    setTodayPlaceList(
      routePlaces.filter((p: PlaceDayType) => p.day == selectedDay)
    );
  }, [selectedDay, routePlaces]);

  const movePlace = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = todayPlaceList[dragIndex];
      if (dragCard) {
        setTodayPlaceList(
          update(todayPlaceList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        );
      }
    },
    [todayPlaceList]
  );

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
    drop: () => ({ day: props.selectedDay }),
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
          style={{ marginLeft: "11px", cursor: "pointer" }}
          onClick={() => onClickAddIcon(days + 1)}
          src={addIcon}
        />
      </div>
      <div
        className="my-routes-places-container"
        style={{ background }}
        ref={drop}
      >
        {todayPlaceList.map((result: PlaceDayType, index) => {
          const { place } = result;
          return (
            <>
              <CreatePlaceCard
                setRoutePlaces={props.setRoutePlaces}
                setPathList={props.setPathList}
                selectedDay={props.selectedDay}
                todayPlaceList={todayPlaceList}
                key={result.place.id}
                index={index}
                id={place.id}
                place={place}
                icon={deleteIcon}
                type="route"
                editPlace={props.editPlace}
                onEditPlace={onEditPlace}
                onChangePlaceDescription={props.onChangePlaceDescription}
                onClickCartButton={onDeletePlace}
                isPlaceInCart={() => true}
                movePlace={movePlace}
              />
              {index !== todayPlaceList.length - 1 && (
                <Path
                  key={index}
                  pathList={props.pathList}
                  onChangePath={props.onChangePath}
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
