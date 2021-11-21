import React from "react";
import search from '../static/search.svg';
function Search() {
  return <div className="search">
    <img src={search} />
    <input type="text" placeholder="키워드를 입력해주세요"/>
    <button>Search</button>
  </div>;
}

export default Search;
