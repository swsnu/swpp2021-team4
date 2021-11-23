import React, { useEffect, useState } from "react";
import { PlaceType } from "../store/Post/postInterfaces";
import "../styles/components/PlaceSearchSection.scss";
import CreatePlaceCard from "./CreatePlaceCard";
import cart from "../static/cart-icon.svg";
// import { useDrop } from "react-dnd";

const { kakao } = window;
interface PropType {
  selectedTab: "place" | "search";
  onClickTabButton: (type: "place" | "search") => void;
  onAddPlace: (place: any) => void;
  selectedDay: number;
  // searchTabQuery?: string
  // onChangeSearchTabQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PlaceSearchSection(props: PropType) {
  const {
    selectedTab,
    onClickTabButton,
    onAddPlace,
    // searchTabQuery,
    // onChangeSearchTabQuery
  } = props;

  const [searchTabQuery, setSearchTabQuery] = useState("");
  const [isSearchRequested, setIsSearchRequested] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  if (searchResults) {
    console.log();
  }

  useEffect(() => {
    if (isSearchRequested) {
      let places = new kakao.maps.services.Places();
      let placesSearchCB = (results: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          /**
           * 카카오 api response 타입 (임시 저장용)
           * address_name: "서울 강남구 신사동 668-33"
            category_group_code: "AT4"
            category_group_name: "관광명소"
            category_name: "여행 > 관광,명소 > 테마거리"
            distance: ""
            id: "7990409"
            phone: "02-3445-6402"
            place_name: "압구정로데오거리"
            place_url: "http://place.map.kakao.com/7990409"
            road_address_name: ""
            x: "127.039152029523"
            y: "37.5267558230172"
           */
          const convertedPlaces = results.map((result: any) => {
            return {
              id: result.id,
              name: result.place_name,
              homepage: result.place_url,
              phone_number: result.phone,
              address: result.address_name,
              category: result.category_group_name,
              lon: result.x,
              lat: result.y,
            };
          });
          setSearchResults(convertedPlaces);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 중 오류가 발생했습니다.");
        }
      };
      places.keywordSearch(searchTabQuery, placesSearchCB);
    }
  }, [isSearchRequested, searchTabQuery]);

  const onPressEnterSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsSearchRequested(true);
      setTimeout(() => setIsSearchRequested(false), 100);
    }
  };

  const onChangeSearchTabQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTabQuery(e.target.value);
  };

  const renderSearchTab = () => {
    return (
      <div>
        <input
          style={{ marginTop: "20px" }}
          type="text"
          value={searchTabQuery}
          onChange={onChangeSearchTabQuery}
          onKeyPress={onPressEnterSearch}
        />
        <div
          style={{
            maxHeight: "70vw",
            overflowY: "scroll",
            paddingBottom: "30px",
          }}
        >
          {searchResults.map((place: PlaceType) => {
            return (
              <CreatePlaceCard
                key={place.id}
                id={place.id}
                place={place}
                icon={cart}
                onClickButton={onAddPlace}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderPlaceTab = () => {
    return <div></div>;
  };
  return (
    <div className="place-search-container">
      <div className="place-search-tab-container">
        <div
          id="place"
          className={"tab-title" + (selectedTab === "place" ? " selected" : "")}
          onClick={() => onClickTabButton("place")}
        >
          Places
        </div>

        <div
          id="search"
          className={
            "tab-title" + (selectedTab === "search" ? " selected" : "")
          }
          onClick={() => onClickTabButton("search")}
        >
          Search
        </div>
      </div>
      {selectedTab === "search" ? renderSearchTab() : renderPlaceTab()}
    </div>
  );
}

export default React.memo(PlaceSearchSection);
