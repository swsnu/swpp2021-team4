import React, { useCallback, useState } from "react";
import NavBar from "../components/NavBar";
import CreateEditPost from "../containers/CreateEditPost";
import SelectFolderModal from "../containers/SelectFolderModal";
import { Folder } from "../store/User/userInterfaces";

function CreateEditPostPage() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<Folder|null>(null);

  const onClickBackground = () => {
    if (isModalVisible) {
      alert('폴더를 선택하거나, 새로 만든 후 Select 버튼을 눌러주세요.');
    }
  }

  const onClickSelectButton = useCallback(
    (folder: Folder|null) => {
      if (!selectedFolder) {
        alert('폴더를 선택하거나, 새로 만든 후 Select 버튼을 눌러주세요.');
      }
    },
    []
  );

  return (
    <>
      <div onClick={onClickBackground}>
        <NavBar />
        <CreateEditPost folder={selectedFolder||{id: 0, name: ''}} />
      </div>
      <SelectFolderModal
        isModalVisible={isModalVisible}
        onClickSelectButton={onClickSelectButton}
      />
    </>
  );
}

export default CreateEditPostPage;
