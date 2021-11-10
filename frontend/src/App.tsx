import React from "react";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserInfoPage from "./pages/UserInfoPage";
import EditProfilePage from "./pages/EditProfilePage";
import CreateEditPostPage from "./pages/CreateEditPostPage";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  const unAuthorized = () => {
    return <Redirect to="/signin/" />;
  };

  const authorized = () => {
    return (
      <Switch>
        <Route exact path={["/post/create/", "/post/:id/edit/"]} component={CreateEditPostPage} />
        <Route exact path="/post/:id/" component={PostDetailPage} />
        <Route exact path="/user_info/:id/" component={UserInfoPage} />
        <Route exact path="/edit_profile/" component={EditProfilePage} />
        <Route path={["/", "/main/"]} component={MainPage} />
      </Switch>
    );
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/signup/" component={SignupPage} />
        <Route exact path="/signin/" component={SigninPage} />

        {
          true
            ? authorized()
            : unAuthorized()
        }

      </Switch>
    </div>
  );
}

export default App;
