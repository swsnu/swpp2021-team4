import React, { useState } from "react";
import { useDispatch } from "react-redux";
import search from "../static/search.svg";
import { searchAction } from "../store/Post/postAction";
import "../styles/components/Search.scss";

function Search() {
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useState({
    keyword: "",
    season: "",
    location: "",
    days: "1",
    theme: "",
    transportation: "",
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value,
    });
    console.log(e.target.value);
  };
  const onClickSearch = () => {
    dispatch(
      searchAction({
        keyword: userInputs.keyword,
        season: userInputs.season,
        location: userInputs.location,
        days: userInputs.days,
        theme: userInputs.theme,
        transportation: userInputs.transportation,
      })
    );
  };
  return (
    <div className="search-container">
      <div className="search">
        <img className="search-svg" src={search} />
        <input
          id="keyword"
          className="search-keyword"
          type="text"
          value={userInputs.keyword}
          onChange={onChangeInputs}
          placeholder="키워드를 입력해주세요"
        />
        <button
          className="search-button"
          onClick={() => {
            onClickSearch();
          }}
        >
          Search
        </button>
      </div>
      <div className="filter">
        <div className="location">
          <div className="category">Location</div>
          <input
            id="location"
            className="search-location"
            type="text"
            value={userInputs.location}
            onChange={onChangeInputs}
            placeholder="Where do you wanna go?"
          />
        </div>
        <div className="lines"></div>
        <div className="seasons">
          <div className="category">Season</div>
          <button
            id="season"
            className="season"
            onClick={() =>
              userInputs.season != "Spring"
                ? setUserInputs({
                    ...userInputs,
                    season: "Spring",
                  })
                : setUserInputs({ ...userInputs, season: "" })
            }
          >
            Spring
          </button>
          <button
            id="season"
            className="season"
            onClick={() =>
              userInputs.season != "Summer"
                ? setUserInputs({
                    ...userInputs,
                    season: "Summer",
                  })
                : setUserInputs({ ...userInputs, season: "" })
            }
          >
            Summer
          </button>
          <button
            id="season"
            className="season"
            onClick={() =>
              userInputs.season != "Fall"
                ? setUserInputs({
                    ...userInputs,
                    season: "Fall",
                  })
                : setUserInputs({ ...userInputs, season: "" })
            }
          >
            Fall
          </button>
          <button
            id="season"
            className="season"
            onClick={() =>
              userInputs.season != "Winter"
                ? setUserInputs({
                    ...userInputs,
                    season: "Winter",
                  })
                : setUserInputs({ ...userInputs, season: "" })
            }
          >
            Winter
          </button>
        </div>
        <div className="lines"></div>
        <div className="days">
          <div className="category">Days</div>
          <input
            id="days"
            className="search-days"
            type="number"
            placeholder="1"
            min="1"
            value={userInputs.days}
            onChange={onChangeInputs}
          />
        </div>
        <div className="lines"></div>
        <div className="themes">
          <div className="category">Theme</div>
          <button
            id="theme"
            className="theme"
            onClick={() =>
              userInputs.theme != "lover"
                ? setUserInputs({
                    ...userInputs,
                    theme: "lover",
                  })
                : setUserInputs({
                    ...userInputs,
                    theme: "",
                  })
            }
          >
            연인과 함께
          </button>
          <button
            id="theme"
            className="theme"
            onClick={() =>
              userInputs.theme != "family"
                ? setUserInputs({
                    ...userInputs,
                    theme: "family",
                  })
                : setUserInputs({
                    ...userInputs,
                    theme: "",
                  })
            }
          >
            가족과 함께
          </button>
          <button
            id="theme"
            className="theme"
            onClick={() =>
              userInputs.theme != "friends"
                ? setUserInputs({
                    ...userInputs,
                    theme: "freinds",
                  })
                : setUserInputs({
                    ...userInputs,
                    theme: "",
                  })
            }
          >
            친구와 함께
          </button>
          <button
            id="theme"
            className="theme"
            onClick={() =>
              userInputs.theme != "alone"
                ? setUserInputs({
                    ...userInputs,
                    theme: "alone",
                  })
                : setUserInputs({
                    ...userInputs,
                    theme: "",
                  })
            }
          >
            나홀로 여행
          </button>
        </div>
        <div className="lines"></div>
        <div className="transportation">
          <div className="category">Transportation</div>
          <button
            id="transportation"
            className="theme"
            onClick={() =>
              userInputs.transportation == "false" ||
              userInputs.transportation == ""
                ? setUserInputs({
                    ...userInputs,
                    transportation: "true",
                  })
                : setUserInputs({
                    ...userInputs,
                    transportation: "false",
                  })
            }
          >
            뚜벅이 여행 가능
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
