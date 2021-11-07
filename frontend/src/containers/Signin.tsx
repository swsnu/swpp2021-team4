import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { signup } from "../api/userApi";
import { RootReducerType } from "../store/store";
import { signinAction } from "../store/User/userAction";

function Signin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  useEffect(() => {
    if (!isLoggedIn && sessionStorage.getItem('isAuthorized') === 'true') {
      // occurs infinite rerendering
      setIsLoggedIn(true);
    }
  }, [loggedUser]);
  
  const onClickSignup = async () => {
    const res = await signup({ username: 'vi2n231322232y', password: '1', email: '2te32t@322ts23231t1.com' });
    if (res.status === 201) {
      dispatch(signinAction({ email: 'test@test.com', password: '1' }));
    }
  }

  const onClickSigninButton = () => {
    dispatch(signinAction({ email: 'test@test.com', password: '1' }))
  }

  return (
    <div>
      { isLoggedIn && <Redirect to="/main/" /> }
      <div>Signin container</div>
      <button onClick={onClickSignup}>
        signup
      </button>

      <button onClick={onClickSigninButton}>
        signin
      </button>
    </div>
  )
}
export default Signin;
