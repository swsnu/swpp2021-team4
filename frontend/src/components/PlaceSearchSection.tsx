import React, { useEffect, useState } from "react";
import { PlaceType, PlaceDayType } from "../store/Post/postInterfaces";
import "../styles/components/PlaceSearchSection.css";
import CreatePlaceCard from "./CreatePlaceCard";
import cart from "../static/cart-icon.svg";
import deleteIcon from "../static/delete.svg";
import searchIcon from "../static/search.svg";
import addIcon from "../static/add.svg";

const { kakao } = window;
interface PropType {
  selectedTab: "place" | "search";
  selectedDay: number;
  onClickTabButton: (type: "place" | "search") => void;
  onAddPlace: (place: any) => void;
  isPlaceInRoute: (place: any) => boolean;
  initialCartPlaceList: PlaceDayType[];
  setRoutePlaces?: (value: React.SetStateAction<PlaceDayType[]>) => void;
  // searchTabQuery?: string
  // onChangeSearchTabQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PlaceSearchSection(props: PropType) {
  const {
    selectedTab,
    onClickTabButton,
    onAddPlace,
    isPlaceInRoute,
    setRoutePlaces,
    initialCartPlaceList,
    // searchTabQuery,
    // onChangeSearchTabQuery
  } = props;
  const [searchTabQuery, setSearchTabQuery] = useState("");
  const [isSearchRequested, setIsSearchRequested] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [cartPlaceList, setCartPlaceList] = useState(initialCartPlaceList);
  useEffect(() => {
    if (initialCartPlaceList) {
      initialCartPlaceList.map((placeDay: PlaceDayType) => {
        setCartPlaceList((prevState: any) => {
          return [...prevState, placeDay];
        });
      });
    }
  }, [initialCartPlaceList[0]]);
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
              description: "",
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

  const isPlaceInCart = (id: number) => {
    return cartPlaceList.some((p: PlaceDayType) => p.place.id === id);
  };

  const onClickCartButton = (place: PlaceType) => {
    if (isPlaceInCart(place.id)) {
      setCartPlaceList(
        cartPlaceList.filter((p: PlaceDayType) => p.place.id !== place.id)
      );
    } else {
      setCartPlaceList([...cartPlaceList, { place: place, day: 0 }]);
    }
  };

  const onDeleteCartButton = (place: PlaceType) => {
    setCartPlaceList(
      cartPlaceList.filter((p: PlaceDayType) => p.place.id !== place.id)
    );
  };

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
      <div className="place-search-tab">
        <div className="place-search-input-container">
          <img className="search-icon" src={searchIcon} />
          <input
            className="place-search-input"
            type="text"
            value={searchTabQuery}
            onChange={onChangeSearchTabQuery}
            onKeyPress={onPressEnterSearch}
            placeholder="장소 이름을 입력하세요"
          />
        </div>
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
                selectedDay={null}
                id={place.id}
                key={place.id}
                place={place}
                icon={cart}
                type="search"
                onClickCartButton={onClickCartButton}
                isPlaceInCart={(id: number) => isPlaceInCart(id)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderPlaceTab = () => {
    return (
      <div>
        {cartPlaceList.map((result: PlaceDayType, index) => {
          return (
            <CreatePlaceCard
              selectedDay={null}
              index={index}
              id={result.place.id}
              key={result.place.id}
              place={result.place}
              icon={isPlaceInRoute(result.place) ? deleteIcon : addIcon}
              type="place"
              onClickCartButton={onAddPlace}
              onClickUncartButton={onDeleteCartButton}
              isPlaceInCart={(id: number) => isPlaceInCart(id)}
              isPlaceInRoute={isPlaceInRoute}
              setRoutePlaces={setRoutePlaces}
            />
          );
        })}
      </div>
    );
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
