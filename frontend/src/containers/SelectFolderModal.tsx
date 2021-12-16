import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderList from "../components/FolderList";
import { RootReducerType } from "../store/store";
import { addFolderAction, editFolderAction } from "../store/User/userAction";
import { Folder } from "../store/User/userInterfaces";
import "../styles/components/SelectFolderModal.css";
import add_icon from "../static/add_day_icon.svg";
import close_modal_icon from "../static/close-modal-icon.svg";

interface PropsType {
  isModalVisible: boolean;
  onClickSelectButton: (folder: Folder | null) => void;
  onClickCloseModal: () => void;
}

function SelectFolderModal(props: PropsType) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [editText, setEditText] = useState<string>("");

  const [newFolderText, setNewFolderText] = useState("");
  const [isMakeFolderBtnClicked, setIsMakeFolderBtnClicked] = useState(false);

  const onClickFolder = useCallback(
    (folder: Folder) => {
      setSelectedFolder(folder);
      if (editingFolder !== null && folder.id !== editingFolder.id) {
        setEditingFolder(null);
      }

      if (isMakeFolderBtnClicked) {
        setNewFolderText("");
        setIsMakeFolderBtnClicked(false);
      }
    },
    [editingFolder]
  );

  const onClickEditFolder = useCallback((folder: Folder) => {
    setEditingFolder(folder);

    if (isMakeFolderBtnClicked) {
      setNewFolderText("");
      setIsMakeFolderBtnClicked(false);
    }
  }, []);

  const onClickMakeFolder = useCallback(() => {
    setIsMakeFolderBtnClicked(true);

    if (editingFolder) {
      setEditingFolder(null);
      setEditText("");
    }
    if (selectedFolder) {
      setSelectedFolder(null);
    }
  }, [editingFolder, selectedFolder]);

  const onChangeEditFolder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setEditText(e.target.value);
    },
    []
  );

  const onChangeMakeFolder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setNewFolderText(e.target.value);
    },
    []
  );

  const onPressEnterEditFolder = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter" || !editingFolder) return;
      if (!editText) {
        alert('폴더명을 입력해주세요!');
        return;
      }

      dispatch(
        editFolderAction(
          loggedUser.id,
          editingFolder.id,
          { folder_name: editText },
          () => {
            setSelectedFolder(editingFolder);
            setEditingFolder(null);
          }
        )
      );
    },
    [loggedUser.id, editingFolder, editText]
  );

  const onPressEnterMakeFolder = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (!newFolderText) {
        alert('폴더명을 입력해주세요!');
        return;
      }

      dispatch(
        addFolderAction(loggedUser.id, newFolderText, () => {
          setIsMakeFolderBtnClicked(false);
          setNewFolderText("");
        })
      );
    },
    [loggedUser.id, newFolderText]
  );

  if (!props.isModalVisible) {
    return <div />;
  }

  return (
    <div className="select-folder-modal-container">
      <div className="modal-title">
        Select a folder!
        <img
          className="close-modal-icon"
          src={close_modal_icon}
          onClick={props.onClickCloseModal}
        ></img>
      </div>

      <FolderList
        folders={loggedUser.folders}
        editText={editText}
        selectedFolder={selectedFolder}
        editingFolder={editingFolder}
        onClickFolder={onClickFolder}
        onClickEditFolder={onClickEditFolder}
        onChangeEditFolder={onChangeEditFolder}
        onPressEnterEditFolder={onPressEnterEditFolder}
      />

      <div className="make-folder-container">
        {!isMakeFolderBtnClicked ? (
          <div className="make-folder" onClick={onClickMakeFolder}>
            <img className="icon" src={add_icon} />
            <div className="make-folder-title">Add Folder</div>
          </div>
        ) : (
          <div>
            <input
              className="make-folder-input"
              value={newFolderText}
              onChange={onChangeMakeFolder}
              onKeyPress={onPressEnterMakeFolder}
              placeholder="새로운 폴더 이름을 입력해주세요"
            />
          </div>
        )}
      </div>

      <div
        className="select-folder-modal-select-btn"
        onClick={() => props.onClickSelectButton(selectedFolder)}
      >
        Select
      </div>
    </div>
  );
}

export default SelectFolderModal;
