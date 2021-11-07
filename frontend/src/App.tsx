import React, { useEffect, useState } from "react";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserInfoPage from "./pages/UserInfoPage";
import EditProfilePage from "./pages/EditProfilePage";
import CreateEditPostPage from "./pages/CreateEditPostPage";
import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && sessionStorage.getItem('isAuthorized') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const unAuthorized = () => {
    return <Redirect to="/signin/" />;
  }

  const authorized = () => {
    return (
      <>
        <Route exact path={["post/create/", "post/:id/edit/"]}>
          <CreateEditPostPage />
        </Route>

        <Route exact path="/post/:id/">
          <PostDetailPage />
        </Route>

        <Route exact path="/user_info/:id/">
          <UserInfoPage />
        </Route>

        <Route exact path="/edit_profile/">
          <EditProfilePage />
        </Route>

        <Route path="/main/">
          <MainPage />
        </Route>
      </>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/signup/">
          <SignupPage />
        </Route>

        <Route exact path="/signin/">
          <SigninPage />
        </Route>

        {
          isLoggedIn
            ? authorized()
            : unAuthorized()
        }

      </Switch>
    </div>
  );
}

export default App;
