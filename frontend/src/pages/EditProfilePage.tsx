import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import EditProfile from "../containers/EditProfile";

function EditProfilePage() {
  return (
    <>
      <NavBar />
      <EditProfile />
      <Footer />
    </>
  );
}

export default EditProfilePage;
