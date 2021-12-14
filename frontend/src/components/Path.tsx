import React, { useEffect, useState } from "react";
import arrowDownIcon from "../static/arrow_down.svg";
import "../styles/components/Path.css";
import { PathListType, PlaceType } from "../store/Post/postInterfaces";
import returnPathTime from "../utils/returnPathTime";

interface PropsType {
  isFromDetail?: boolean;
  from: PlaceType;
  to: PlaceType;
  transportation?: string;
  pathList?: PathListType;
  onChangePath?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    origin: PlaceType,
    destination: PlaceType
  ) => void;
  selectedDay?: number;
}

const transportationTypes = [
  { value: "", name: "이동수단" },
  { value: "car", name: "자동차" },
  { value: "pub", name: "대중교통" },
  { value: "vic", name: "자전거" },
  { value: "wal", name: "걷기" },
];

function Path(props: PropsType) {
  const { from, to, transportation = "", pathList = {}, onChangePath } = props;
  const [posFrom, setPosFrom] = useState("");
  const [posTo, setPosTo] = useState("");
  const [time, setTime] = useState("");
  const [pathInfoData, setPathInfoData] = useState({
    transportation: "",
    velocity: 0,
  });

  useEffect(() => {
    setPosFrom(`${from.lon || from.longitude},${from.lat || from.latitude}`);
    setPosTo(`${to.lon || to.longitude},${to.lat || to.latitude}`);
  }, [from, to]);

  useEffect(() => {
    const setPathTime = async () => {
      const pathTime: string = await returnPathTime(
        posFrom,
        posTo,
        pathList[from.id]?.transportation || transportation
      );
      setTime(pathTime);
    };
    if (posFrom && posTo) {
      setPathTime();
    }
  }, [posFrom, posTo, pathList]); // when user clicks another day, calculate each path time

  useEffect(() => {
    let transportationName: string = "";
    let velocity: number = 0;
    switch (transportation) {
      case "car":
        transportationName = "자동차";
        velocity = 80;
        break;
      case "pub":
        transportationName = "대중버스";
        velocity = 40;
        break;
      case "vic":
        transportationName = "자전거";
        velocity = 20;
        break;
      case "wal":
        transportationName = "걷기";
        velocity = 4;
    }
    if (velocity && transportationName) {
      setPathInfoData({
        transportation: transportationName,
        velocity,
      });
    }
  }, [transportation]);

  const onChangeSelectOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (onChangePath) {
      onChangePath(event, from, to);
    }
  };

  return (
    <div className="path-container">
      <img className="path-icon" src={arrowDownIcon} />
      {(!props.isFromDetail || Object.keys(pathList).length > 0) && (
        <>
          <select
            id="path"
            className="path-select-container"
            name="path"
            onChange={onChangeSelectOption}
          >
            {transportationTypes.map((t: { name: string; value: string }) => {
              return pathList[from.id] &&
                pathList[from.id].transportation === t.value ? (
                <option key={t.value} value={t.value} selected>
                  {t.name}
                </option>
              ) : (
                <option key={t.value} value={t.value}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <span>
            {pathList[from.id]?.transportation && !time.includes("NaN")
              ? `약 ${time}`
              : ""}
          </span>
        </>
      )}
      {(!props.isFromDetail || Object.keys(pathList).length == 0) && (
        <span className="post-detail-path">
          {transportation && !time.includes("NaN")
            ? `약 ${time} (${pathInfoData.transportation}, 시속 ${pathInfoData.velocity}km 기준)`
            : ""}
        </span>
      )}
    </div>
  );
}

export default React.memo(Path);
