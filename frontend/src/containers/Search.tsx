import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import search from "../static/search.svg";
import { getPostsAction, searchAction } from "../store/Post/postAction";
import "../styles/components/Search.css";
import { SimplePostType } from "../store/Post/postInterfaces";
import PostItem from "../components/PostItem";
import { Regions, Cities } from "../utils/locations";
import {
  useDateSearchPostState,
  useLikeSearchPostState,
  usePostsState,
  useSearchPostState,
} from "../hooks/usePostsState";

function Search() {
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useState({
    keyword: "",
    season: "",
    location: "",
    days: "",
    theme: "",
    transportation: "",
  });
  const [sorting, setSorting] = useState("");
  const [searched, SetSearch] = useState(false);
  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const searchedPosts = useSearchPostState();
  const likeSearchedPosts = useLikeSearchPostState();
  const dateSearchPosts = useDateSearchPostState();
  const postsAll = usePostsState();
  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value,
    });
  };

  const onClickSearch = () => {
    dispatch(
      searchAction(
        {
          keyword: userInputs.keyword,
          season: userInputs.season,
          location: userInputs.location,
          days: userInputs.days,
          theme: userInputs.theme,
          transportation: userInputs.transportation,
        },
        (value) => SetSearch(value)
      )
    );
  };

  const [regionIdx, setRegionIdx] = useState<number>(0);
  const [cityIdx, setCityIdx] = useState<number>(0);
  const [location, setLocation] = useState<string | null>("");

  const onChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionIdx(e.target.selectedIndex);
    setCityIdx(0);
    setLocation(e.target[e.target.selectedIndex].textContent);
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityIdx(e.target.selectedIndex - 1);
    setLocation(
      `${Regions[regionIdx - 1]} ${
        Cities[regionIdx - 1][e.target.selectedIndex - 1]
      }`
    );
  };

  useEffect(() => {
    if (location) setUserInputs({ ...userInputs, location: location });
    else setUserInputs({ ...userInputs, location: "" });
  }, [location]);

  return (
    <div className="search-container">
      <div className="middle-container">
        <div className="search">
          <img className="search-svg" src={search} />
          <input
            id="keyword"
            className="search-keyword"
            type="text"
            value={userInputs.keyword}
            onChange={onChangeInputs}
            placeholder="원하는 여행을 검색해보세요"
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
            <select
              id="location-region"
              onChange={onChangeRegion}
              className={`${regionIdx !== 0 ? "selected" : ""}`}
            >
              <option value="">지역 선택</option>
              {Regions.map((region: string) => {
                return (
                  <option key={region} value={region}>
                    {region}
                  </option>
                );
              })}
            </select>
            {Cities[regionIdx - 1] && Cities[regionIdx - 1].length > 0 && (
              <select
                id="location-city"
                onChange={onChangeCity}
                className={`${cityIdx !== 0 ? "selected" : ""}`}
              >
                <option value="">시, 군</option>
                {Cities[regionIdx - 1].map((city: string) => {
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="lines"></div>
          <div className="seasons">
            <div className="category">Season</div>
            <button
              id="season"
              className={`season${
                userInputs.season === "spr" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.season != "spr"
                  ? setUserInputs({
                      ...userInputs,
                      season: "spr",
                    })
                  : setUserInputs({ ...userInputs, season: "" })
              }
            >
              Spring
            </button>
            <button
              id="season"
              className={`season${
                userInputs.season === "sum" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.season != "sum"
                  ? setUserInputs({
                      ...userInputs,
                      season: "sum",
                    })
                  : setUserInputs({ ...userInputs, season: "" })
              }
            >
              Summer
            </button>
            <button
              id="season"
              className={`season${
                userInputs.season === "aut" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.season != "aut"
                  ? setUserInputs({
                      ...userInputs,
                      season: "aut",
                    })
                  : setUserInputs({ ...userInputs, season: "" })
              }
            >
              Fall
            </button>
            <button
              id="season"
              className={`season${
                userInputs.season === "win" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.season != "win"
                  ? setUserInputs({
                      ...userInputs,
                      season: "win",
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
              placeholder="숫자를 입력하세요"
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
              className={`theme${
                userInputs.theme === "lover" ? "-clicked" : ""
              }`}
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
              className={`theme${
                userInputs.theme === "family" ? "-clicked" : ""
              }`}
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
              className={`theme${
                userInputs.theme === "friends" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.theme != "friends"
                  ? setUserInputs({
                      ...userInputs,
                      theme: "friends",
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
              className={`theme${
                userInputs.theme === "alone" ? "-clicked" : ""
              }`}
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
              className={`theme${
                userInputs.transportation === "True" ? "-clicked" : ""
              }`}
              onClick={() =>
                userInputs.transportation === "False" ||
                userInputs.transportation === ""
                  ? setUserInputs({
                      ...userInputs,
                      transportation: "True",
                    })
                  : setUserInputs({
                      ...userInputs,
                      transportation: "False",
                    })
              }
            >
              뚜벅이 여행 가능
            </button>
          </div>
        </div>
      </div>
      <div className="search-result-container">
        {searched == false && (
          <>
            <div className="search-result-header">
              <div className="search-result-title">Recent posts</div>
              </div>
              <div className="search-result-content">
                {true &&
                  postsAll.map((post: SimplePostType) => {
                    return (
                      <PostItem
                        key={post.id}
                        id={post.id}
                        thumbnail_image={post.thumbnail_image}
                        title={post.title}
                        author_name={post.author_name}
                        author_id={post.author_id}
                        like_count={post.like_count}
                        comment_count={post.comment_count}
                        is_shared={post.is_shared}
                      />
                    );
                  })}
             
            </div>
          </>
        )}
        {searched == true && (
          <>
            <div className="search-result-header">
              <div className="search-result-title">Search Results</div>
              <div className="search-result-sorting">
                <button
                  id="sorting-method"
                  className={`sorting${sorting === "like" ? "-clicked" : ""}`}
                  onClick={() => setSorting("like")}
                >
                  좋아요 순
                </button>
                <button
                  id="sorting-method"
                  className={`sorting${sorting === "date" ? "-clicked" : ""}`}
                  onClick={() => setSorting("date")}
                >
                  최신게시물 순
                </button>
              </div>
            </div>
            <div className="search-result-content">
              {sorting == "" && searchedPosts.length == 0 && (
                <div className="no-result">검색 결과가 존재하지 않습니다.</div>
              )}
              {sorting == "" &&
                searchedPosts.map((post: SimplePostType) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author_name}
                      author_id={post.author_id}
                      like_count={post.like_count}
                      comment_count={post.comment_count}
                      is_shared={post.is_shared}
                    />
                  );
                })}
              {sorting == "like" && searchedPosts.length == 0 && (
                <div className="no-result">검색 결과가 존재하지 않습니다.</div>
              )}
              {sorting == "like" &&
                likeSearchedPosts.map((post: SimplePostType) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author_name}
                      author_id={post.author_id}
                      like_count={post.like_count}
                      comment_count={post.comment_count}
                      is_shared={post.is_shared}
                    />
                  );
                })}
              {sorting == "date" && searchedPosts.length == 0 && (
                <div className="no-result">검색 결과가 존재하지 않습니다.</div>
              )}
              {sorting == "date" &&
                dateSearchPosts.map((post: SimplePostType) => {
                  return (
                    <PostItem
                      key={post.id}
                      id={post.id}
                      thumbnail_image={post.thumbnail_image}
                      title={post.title}
                      author_name={post.author_name}
                      author_id={post.author_id}
                      like_count={post.like_count}
                      comment_count={post.comment_count}
                      is_shared={post.is_shared}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
