import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import MyPage from "../containers/MyPage";
import UserInfo from "../containers/UserInfo";
import { useUserState } from "../hooks/useUserState";

function UserInfoPage() {
  interface String {
    id: string;
  }

  const { id } = useParams<String>();

  const loggedUser = useUserState();

  return (
    <div>
      <NavBar />
      {loggedUser.id === Number(id) ?
        <MyPage loggedUser={loggedUser} id={Number(id)} />
        : <UserInfo loggedUser={loggedUser} id={Number(id)} />}
    </div>
  );
}

export default UserInfoPage;
