import React from "react";
import NavBar from "../components/NavBar";
import Search from "../containers/Search";
import Footer from "../components/Footer";
import ServiceInfo from "../components/ServiceInfo";
function MainPage() {
  return (
    <>
      <NavBar />
      <Search />
      <ServiceInfo />
      <Footer />
    </>
  );
}

export default MainPage;
