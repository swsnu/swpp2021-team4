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
  onEditFolderComplete: () => void
}

interface FolderListPropsType {
  folders: FolderType[]
  editText: string
  selectedFolder: FolderType | null
  editingFolder: FolderType | null
  onClickFolder: (folder: FolderType) => void
  onClickEditFolder: (folder: FolderType) => void
  onChangeEditFolder: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEditFolderComplete: () => void
  onPressEnterEditFolder: (e: React.KeyboardEvent) => void
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
      {folder.name}
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
    onEditFolderComplete,
    onPressEnterEditFolder
  } = props;

  return (
    <div className="folder-list-container">
      {
        folders.map((folder: FolderType) => {
          if (folder.id === editingFolder?.id) {
            return (
              <div className="edit-folder-container">
                <input
                  className="edit-folder-input"
                  type="text"
                  value={editText}
                  placeholder={folder.name}
                  onChange={onChangeEditFolder}
                  onKeyPress={onPressEnterEditFolder}
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
              onEditFolderComplete={onEditFolderComplete}
            />
          )
        })
      }
    </div>
  )
}

export default FolderList;
