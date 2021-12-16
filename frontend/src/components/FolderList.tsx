import React, { useState } from 'react';
import { Folder as FolderType } from '../store/User/userInterfaces';
import edit_btn from "../static/edit-icon.svg";
import edit_complete_btn from '../static/edit_complete_icon.svg';

interface FolderPropsType {
  folder: FolderType
  selectedFolder: FolderType | null
  onClickFolder: (folder: FolderType) => void
  onClickEditFolder: (folder: FolderType) => void
  onChangeEditFolder: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface FolderListPropsType {
  folders: FolderType[]
  editText: string
  selectedFolder: FolderType | null
  editingFolder: FolderType | null
  onClickFolder: (folder: FolderType) => void
  onClickEditFolder: (folder: FolderType) => void
  onChangeEditFolder: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressEnterEditFolder: (e: React.KeyboardEvent) => void
  onCompleteEditFolder: () => void
}

function Folder(props: FolderPropsType) {
  const {
    folder,
    selectedFolder,
    onClickEditFolder
  } = props;

  const [editIcon, setEditIcon] = useState(edit_btn);

  return (
    <div
      className={"folder-container".concat(folder.id == selectedFolder?.id ? ' selected' : '')}
      onClick={() => props.onClickFolder(folder)}
    >
      <span className="folder-name">{folder.name}</span>
      <img
        className="icon"
        src={editIcon}
        style={{ fill: 'green' }}
        onClick={() => onClickEditFolder(folder)}
        onMouseOver={() => setEditIcon(edit_complete_btn)}
        onMouseLeave={() => setEditIcon(edit_btn)}
      />
    </div>
  );
}

function FolderList(props: FolderListPropsType) {
  const {
    folders,
    editText,
    selectedFolder,
    editingFolder,
    onClickFolder,
    onClickEditFolder,
    onChangeEditFolder,
    onPressEnterEditFolder,
    onCompleteEditFolder,
  } = props;

  const [editIcon, setEditIcon] = useState(edit_btn);

  return (
    <div className="folder-list-container">
      {
        folders.map((folder: FolderType) => {
          if (folder.id === editingFolder?.id) {
            return (
              <div className="edit-folder-container">
                <input
                  className="make-folder-input"
                  type="text"
                  value={editText}
                  placeholder={folder.name}
                  onChange={onChangeEditFolder}
                  onKeyPress={onPressEnterEditFolder}
                />
                <img
                  className="icon"
                  src={editIcon}
                  style={{ fill: 'green' }}
                  onClick={onCompleteEditFolder}
                  onMouseOver={() => setEditIcon(edit_complete_btn)}
                  onMouseLeave={() => setEditIcon(edit_btn)}
                />
              </div>
            );
          }

          return (
            <Folder
              key={folder.id}
              folder={folder}
              selectedFolder={selectedFolder}
              onClickFolder={onClickFolder}
              onClickEditFolder={onClickEditFolder}
              onChangeEditFolder={onChangeEditFolder}
            />
          )
        })
      }
    </div>
  )
}

export default FolderList;
