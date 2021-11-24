import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import search from "../static/search.svg";
import { getPostsAction, searchAction } from "../store/Post/postAction";
import "../styles/components/Search.scss";
import { SearchType } from "../store/Post/postInterfaces";
import PostItem from "../components/PostItem";
import {
  useDateSortedSearchPostState,
  useLikeSortedPostState,
  useSearchPostState,
} from "../hooks/usePostsState";

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
  const [sorting, setSorting] = useState("");
  const [searched, SetSearch] = useState(false);
  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const searchedPosts = useSearchPostState();
  const likeSortedPosts = useLikeSortedPostState();
  const dateSortedPosts = useDateSortedSearchPostState();
  useEffect(() => {
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
  }, [dispatch]);

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
    console.log(searched);
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
            className={`season${userInputs.season == "spr" ? "-clicked" : ""}`}
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
            className={`season${userInputs.season == "sum" ? "-clicked" : ""}`}
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
            className={`season${userInputs.season == "aut" ? "-clicked" : ""}`}
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
            className={`season${userInputs.season == "win" ? "-clicked" : ""}`}
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
            className={`theme${userInputs.theme == "lover" ? "-clicked" : ""}`}
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
            className={`theme${userInputs.theme == "family" ? "-clicked" : ""}`}
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
              userInputs.theme == "friends" ? "-clicked" : ""
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
            className={`theme${userInputs.theme == "alone" ? "-clicked" : ""}`}
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
              userInputs.transportation == "True" ? "-clicked" : ""
            }`}
            onClick={() =>
              userInputs.transportation == "False" ||
              userInputs.transportation == ""
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
      <div className="search-result-container">
        <div className="search-title">
          <div className="search-research">Routes</div>
          <button
            className={`sorting${sorting == "like" ? "-clicked" : ""}`}
            onClick={() => setSorting("like")}
          >
            좋아요 순
          </button>
          <button
            className={`sorting${sorting == "date" ? "-clicked" : ""}`}
            onClick={() => setSorting("date")}
          >
            최신게시물 순
          </button>
        </div>
        <div className="search-research-content">
          {sorting == "" &&
            searchedPosts.map((post: SearchType) => {
              return (
                <PostItem
                  key={post.id}
                  id={post.id}
                  thumbnail_image={post.thumbnail_image}
                  title={post.title}
                  author_name={post.author_name}
                  author_id={post.author_id}
                />
              );
            })}
          {sorting == "like" &&
            likeSortedPosts.map((post: SearchType) => {
              return (
                <PostItem
                  key={post.id}
                  id={post.id}
                  thumbnail_image={post.thumbnail_image}
                  title={post.title}
                  author_name={post.author_name}
                  author_id={post.author_id}
                />
              );
            })}
          {sorting == "date" &&
            dateSortedPosts.map((post: SearchType) => {
              return (
                <PostItem
                  key={post.id}
                  id={post.id}
                  thumbnail_image={post.thumbnail_image}
                  title={post.title}
                  author_name={post.author_name}
                  author_id={post.author_id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
