import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editProfileAction } from "../store/User/userAction";
import { useHistory } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInputs, setUserInputs] = useState({
    username: '',
    password: '',
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
    const formData = new FormData();
    formData.append('username', userInputs.username);
    formData.append('password', userInputs.password);
    if (selectedFile) formData.append('profile_image', selectedFile);

    dispatch(editProfileAction(formData, (value) => setIsEdited(value)));
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