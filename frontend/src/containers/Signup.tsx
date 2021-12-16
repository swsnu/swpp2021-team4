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

  const validateForm = (userEmail: string, userName: string, userPassword: string, checkUserPassword: string) => {
    let isValid: boolean = false;
    if (!userEmail) {
      alert('이메일을 입력해주세요!');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
      alert(`이메일 형식이 잘못되었습니다!\nex)tripick@tripick.com`);
    } else if (!userName) {
      alert('닉네임을 입력해주세요!');
    } else if (!userPassword) {
      alert('패스워드를 입력해주세요!')
    } else if (userPassword.length < 9) {
      alert(`비밀번호 형식이 잘못되었습니다!\n최소 하나의 문자 및 하나의 숫자가 포함된 8자 이상의 비밀번호를 입력해주세요.`)
    } else if (!checkUserPassword) {
      alert('비밀번호를 다시 한 번 입력해주세요!')
    } else if (userPassword !== checkUserPassword) {
      alert('두 패스워드가 서로 다릅니다!');
    } else {
      isValid = true;
    }
    return isValid;
  }

  const onClickSignupButton = async () => {
    const { userEmail, userName, userPassword, checkUserPassword } = userInputs;
    if (!validateForm(userEmail, userName, userPassword, checkUserPassword)) return;
    
    const response = await signup({ email: userEmail, username: userName, password: userPassword });
    if (response.status === 201) {
      dispatch(signinAction(
        { email: userInputs.userEmail, password: userInputs.userPassword },
        (value) => setIsSigned(value)
      ));
    } else if (response.status === 400 && response.data) {
      alert(`${response.data}`);
    } else if (response.status === 500) {
      alert('서버에러 발생! 트리픽에 문의해주세요');
    } else {
      alert('회원가입에 실패했습니다');
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
          placeholder="이메일을 입력해 주세요."
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
          placeholder="비밀번호를 입력해 주세요 (8자리 이상의 영문+숫자)"
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

        <div
          className="signup-btn"
          onClick={onClickSignupButton}
        >
          Sign Up
        </div>
      </div>
    </div>
  )
}

export default Signup;
