import React, { useEffect, useState } from "react";
import '../styles/components/Signin.scss';
import logo from '../static/logo_vertical.svg';
import { useDispatch } from "react-redux";
import { signinAction } from "../store/User/userAction";
import { useHistory } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInputs, setUserInputs] = useState({
    userEmail: '',
    userPassword: ''
  });
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    if (isSigned) {
      history.goBack();
    }
  }, [isSigned])

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value
    });
  }

  const onClickSigninButton = () => {
    dispatch(signinAction({ email: userInputs.userEmail, password: userInputs.userPassword }, (value) => setIsSigned(value)));
  }

  return (
    <div className="signin-container">
      <img src={logo} />
      <div className="divider" />

      <div className="signin-form-container">
        <input
          id="userEmail"
          type="text"
          value={userInputs.userEmail}
          onChange={onChangeInputs}
          placeholder="아이디를 입력해 주세요."
        />
        <input
          id="userPassword"
          type="password"
          value={userInputs.userPassword}
          onChange={onChangeInputs}
          placeholder="비밀번호를 입력해 주세요."
        />
        <button
          onClick={onClickSigninButton}
          disabled={!userInputs.userEmail || !userInputs.userPassword}
          className="signin-btn"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
export default Signin;
