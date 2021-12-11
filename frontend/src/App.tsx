import React from "react";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserInfoPage from "./pages/UserInfoPage";
import EditProfilePage from "./pages/EditProfilePage";
import CreateEditPostPage from "./pages/CreateEditPostPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducerType } from "./store/store";
import "./styles/reset.css";

function App() {
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  const unAuthorized = () => {
    return <Redirect to="/signin/" />;
  };

  const authorized = () => {
    return (
      <Switch>
        <Route
          exact
          path={["/post/create/", "/post/:id/edit/"]}
          component={CreateEditPostPage}
        />
        <Route exact path="/edit_profile/" component={EditProfilePage} />
      </Switch>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup/" component={SignupPage} />
          <Route exact path="/signin/" component={SigninPage} />
          <Route exact path="/post/show/:id/" component={PostDetailPage} />
          <Route exact path="/user_info/:id/" component={UserInfoPage} />
          <Route exact path={["/", "/main/"]} component={MainPage} />

          {loggedUser.id ? authorized() : unAuthorized()}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
