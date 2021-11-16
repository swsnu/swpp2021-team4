import React, { useCallback, useState } from "react";
import CreateEditHeader from "../components/CreateEditHeader";
import Map from "../components/Map";
import MyRoutesSection from "../components/MyRoutesSection";
import PlaceSearchSection from "../components/PlaceSearchSection";
import { usePostState } from "../hooks/usePostState";
import "../styles/components/CreateEditPost.scss";

export interface PostInfoDataType {
  title: string;
  location: string;
  days: number;
  seasonRecommendation: string;
  theme: string;
  image: string;
  availableWithoutCar: boolean;
}
const initialFolderData: PostInfoDataType = {
  title: "",
  location: "",
  days: 3,
  seasonRecommendation: "",
  theme: "",
  image: "",
  availableWithoutCar: false,
};

function CreateEditPost() {
  const post = usePostState();
  const [postInfoData, setPostInfoData] =
    useState<PostInfoDataType>(initialFolderData);
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);

  const [routePlaces, setRoutePlaces] = useState<any[]>([]);

  const onAddPlace = (place: any) => {
    setRoutePlaces([ ...routePlaces, { place, day: selectedDay } ]);
  }

  const [selectedTab, setSelectedTab] = useState<'place' | 'search'>('place');
  // const [searchResults, setSearchResults] = useState<any>([]);

  const onChangePostInfoData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.preventDefault();
      setPostInfoData({
        ...postInfoData,
        [e.target.id]: e.target.value,
      });
    },
    [postInfoData]
  );

  const onPressEnterLocation = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setLocationQuery(postInfoData.location);
      }
    },
    [postInfoData.location]
  );

  const onClickDay = useCallback((value: number) => {
    setSelectedDay(value);
  }, []);

  const onClickAddIcon = useCallback(
    (value: number) => {
      if (postInfoData.days !== value) {
        setPostInfoData({ ...postInfoData, days: value });
      }
    },
    [postInfoData.days]
  );

  const onClickTabButton = (type: "search" | "place") => {
    setSelectedTab(type);
  };

  // const onChangeSearchTabQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setSearchTabQuery(e.target.value);
  // }, []);

  // const onChangeSearchResults = useCallback((results: any) => {
  //   setSearchResults(results);
  // }, []);

  return (
    <div>
      <CreateEditHeader
        post={post}
        postInfoData={postInfoData}
        onChangePostInfoData={onChangePostInfoData}
        onPressEnterLocation={onPressEnterLocation}
      />
      <div className="create-edit-content-container">

        <div className="create-edit-place-section">
          <div className="create-edit-places-section">
            <div className="my-routes-title">Places</div>
            <PlaceSearchSection
              selectedTab={selectedTab}
              onClickTabButton={onClickTabButton}
              onAddPlace={onAddPlace}
              selectedDay={selectedDay}
            />
          </div>

          <div className="create-edit-routes-section">
            <div className="my-routes-title">My Routes</div>
            <MyRoutesSection
              days={postInfoData.days}
              selectedDay={selectedDay}
              onClickDay={onClickDay}
              onClickAddIcon={onClickAddIcon}
              routePlaces={routePlaces}
            />
          </div>
        </div>

        <Map
          location={locationQuery}
          selectedDay={selectedDay}
          placeList={routePlaces}
        />
      </div>
    </div>
  );
}

export default CreateEditPost;
