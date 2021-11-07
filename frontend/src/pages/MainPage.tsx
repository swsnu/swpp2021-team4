import React from "react";
import NavBar from "../components/NavBar";
import Search from "../containers/Search";
import SearchResultList from "../containers/SearchResultList";
import SearchInfo from "../components/SearchInfo";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <NavBar />
      <Search />
      <SearchResultList />
      <SearchInfo />
      <Footer />
    </>
  );
}

export default MainPage;
