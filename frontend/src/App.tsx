import React from "react";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserInfoPage from "./pages/UserInfoPage";
import { Routes, Route, Navigate } from "react-router-dom";
import EditProfilePage from "./pages/EditProfilePage";
import CreateEditPostPage from "./pages/CreateEditPostPage";

interface Props {
  element: any;
  path?: string;
  loggedIn?: boolean | undefined;
}
const PrivateRoute: React.FC<Props> = (props) => {
  console.log("hi");
  if (props.loggedIn === true) {
    return <Route path={props.path} element={props.element} />;
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  const loggedIn: boolean = false;
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <PrivateRoute
        path="/post/create"
        loggedIn={loggedIn}
        element={<CreateEditPostPage />}
      />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/post/:id/edit" element={<CreateEditPostPage />} />
      <Route path="/user_info/:id" element={<UserInfoPage />} />
      <Route path="/edit_profile" element={<EditProfilePage />} />
    </Routes>
  );
}

export default App;
