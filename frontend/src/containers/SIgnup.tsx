import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../api/userApi";
import '../styles/components/Signup.scss';

function Signup() {
  const [userInputs, setUserInputs] = useState({
    userEmail: '',
    userName: '',
    userPassword: '',
    checkUserPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value
    });
  }

  const onClickSignupButton = () => {
    const { userEmail, userName, userPassword, checkUserPassword } = userInputs;
    if (!userEmail) {
      alert('invalid email');
    } else if (!userName) {
      alert('invalid username');
    } else if (!userPassword || !checkUserPassword) {
      alert('invalid password!')
    } else if (userPassword !== checkUserPassword) {
      alert('passwords are different!');
    } else {
      signup({ email: userEmail, username: userName, password: userPassword });
      setUserInputs({
        userEmail: '',
        userName: '',
        userPassword: '',
        checkUserPassword: ''
      });
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return <Redirect to="/main/" />;
  }

  return (
    <div className="signup-container">
      <div className="signup-title">Sign Up</div>

      <div className="divider" />

      <div className="signup-form-container">
        <input
          id="userEmail"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={userInputs.userEmail}
          onChange={onChangeInputs}
        />
        <input
          id="userName"
          type="text"
          placeholder="닉네임을 입력해 주세요."
          value={userInputs.userName}
          onChange={onChangeInputs}
        />
        <input
          id="userPassword"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={userInputs.userPassword}
          onChange={onChangeInputs}
        />
        <input
          id="checkUserPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={userInputs.checkUserPassword}
          onChange={onChangeInputs}
        />

        <div className="signup-btn" onClick={onClickSignupButton}>
          Sign Up
        </div>
      </div>
    </div>
  )
}

export default Signup;
