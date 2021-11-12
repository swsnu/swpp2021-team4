import React from "react";
import NavBar from "../components/NavBar";
import UserInfo from "../containers/UserInfo";


function UserInfoPage() {
  return (
    <div className="UserInfoPage">
      <NavBar />
      <UserInfo />
    </div>
  );
}

export default UserInfoPage;
