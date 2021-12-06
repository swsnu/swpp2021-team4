import React from "react";
import NavBar from "../components/NavBar";
import Search from "../containers/Search";
import SearchInfo from "../components/SearchInfo";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <NavBar />
      <Search />
      <SearchInfo />
      <Footer />
    </>
  );
}

export default MainPage;
