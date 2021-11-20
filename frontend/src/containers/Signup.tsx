import React, { useState, useEffect } from "react";
import { signup } from "../api/userApi";
import '../styles/components/Signup.css';
import { useDispatch } from "react-redux";
import { signinAction } from "../store/User/userAction";
import { useHistory } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInputs, setUserInputs] = useState({
    userEmail: '',
    userName: '',
    userPassword: '',
    checkUserPassword: ''
  });
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    if (isSigned) {
      history.push('/main/');
    }
  }, [isSigned])

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value
    });
  }

  const onClickSignupButton = async () => {
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
      const response = await signup({ email: userEmail, username: userName, password: userPassword });
      if (response.status === 201) {
        dispatch(signinAction({ email: userInputs.userEmail, password: userInputs.userPassword }, (value) => setIsSigned(value)));
      } else {
        alert('singup failed');
      }
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-title">Sign Up</div>

      <div className="divider-horizontal" />

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
