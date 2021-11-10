import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileAction } from "../store/User/userAction";
import { RootReducerType } from "../store/store";
import { useHistory } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  const [userInputs, setUserInputs] = useState({
    username: loggedUser.username,
    password: '',
    password2: '',
    profile_image: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (isEdited) {
      history.goBack();
    }
  }, [isEdited])

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value
    });
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return
    setSelectedFile(e.target.files[0]);
  };

  const onClickEditProfileButton = () => {
    const { username, password, password2 } = userInputs;
    if (!username) {
      alert('닉네임을 입력하세요!');
    } else if (!password || !password2) {
      alert('비밀번호를 입력하세요!')
    } else if (password !== password2) {
      alert('입력한 비밀번호가 서로 다릅니다!');
    } else {
      const formData = new FormData();
      formData.append('username', userInputs.username);
      formData.append('password', userInputs.password);
      if (selectedFile) formData.append('profile_image', selectedFile);
      else formData.append('profile_image', '');
      formData.append('enctype', 'multipart/form-data');

      dispatch(editProfileAction(loggedUser.id, formData, (value) => setIsEdited(value)));
    }
  }


  return (
    <div className="edit-profile-container">
      <div className="edit-profile-form-container">
        <input
          id="username"
          type="text"
          value={userInputs.username}
          onChange={onChangeInputs}
          placeholder="변경할 닉네임를 입력해 주세요."
        />
        <input
          id="password"
          type="password"
          value={userInputs.password}
          onChange={onChangeInputs}
          placeholder="변경할 비밀번호를 입력해 주세요."
        />
        <input
          id="password2"
          type="password"
          value={userInputs.password2}
          onChange={onChangeInputs}
          placeholder="변경할 비밀번호를 다시 입력해 주세요."
        />
        <input
          id="profile_image"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
          placeholder="프로필 사진"
        />
        <button
          onClick={onClickEditProfileButton}
          disabled={!userInputs.username || !userInputs.password}
          className="edit-profile-btn"
        >
          Update
        </button>
      </div>
    </div>);
}

export default EditProfile;