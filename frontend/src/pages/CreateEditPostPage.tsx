import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import CreateEditPost from "../containers/CreateEditPost";
import SelectFolderModal from "../containers/SelectFolderModal";
import { usePostState } from "../hooks/usePostState";
import { getPostAction } from "../store/Post/postAction";
import { Folder } from "../store/User/userInterfaces";

export interface CreateEditPostLocationType {
  from: string
  postId: number
}

function CreateEditPostPage() {
  const dispatch = useDispatch();
  const location = useLocation<CreateEditPostLocationType>();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<Folder|null>(null);
  const post = usePostState();

  const onClickBackground = () => {
    if (isModalVisible) {
      alert('폴더를 선택하거나, 새로 만든 후 Select 버튼을 눌러주세요.');
    }
  }

  const onClickSelectButton = useCallback(
    (folder: Folder|null) => {
      if (folder?.id) {
        setIsModalVisible(false);
        setSelectedFolder(folder);
      } else {
        alert('폴더를 선택하거나, 새로 만든 후 Select 버튼을 눌러주세요.');
      }
    },
    []
  );

  useEffect(() => {
    if (location.state?.from === 'edit') {
      if (post.id !== location.state?.postId) {
        dispatch(getPostAction(Number(location.state.postId)));
      } else {
        setIsModalVisible(false);
        setSelectedFolder({
          id: post.folder_id,
          name: post.folder_name
        });
      }
    }
  }, [location, post]);

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
