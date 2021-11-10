import React, { useCallback, useState } from "react";
import CreateEditHeader from "../components/CreateEditHeader";
import Map from "../components/Map";
import MyRoutesSection from "../components/MyRoutesSection";
import { usePostState } from "../hooks/usePostState";

export interface PostInfoDataType {
  title: string
  location: string
  days: number
  seasonRecommendation: string
  theme: string
  image: string
  availableWithoutCar: boolean
}
const initialFolderData: PostInfoDataType = {
  title: '',
  location: '',
  days: 3,
  seasonRecommendation: '',
  theme: '',
  image: '',
  availableWithoutCar: false,
}

function CreateEditPost() {
  const post = usePostState();
  const [postInfoData, setPostInfoData] = useState<PostInfoDataType>(initialFolderData);
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);

  const onChangePostInfoData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    setPostInfoData({
      ...postInfoData,
      [e.target.id]: e.target.value
    });
  }, [postInfoData]);

  const onPressEnterLocation = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLocationQuery(postInfoData.location);
    }
  }, [postInfoData.location]);

  const onClickDay = useCallback((value: number) => {
    setSelectedDay(value);
  }, []);

  const onClickAddIcon = useCallback((value: number) => {
    if (postInfoData.days !== value) {
      setPostInfoData({ ...postInfoData, days: value });
    }
  }, [postInfoData.days]);

  return (
    <div>
      <CreateEditHeader
        post={post}
        postInfoData={postInfoData}
        onChangePostInfoData={onChangePostInfoData}
        onPressEnterLocation={onPressEnterLocation}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <MyRoutesSection
          days={postInfoData.days}
          selectedDay={selectedDay}
          onClickDay={onClickDay}
          onClickAddIcon={onClickAddIcon}
        />
        <Map
          location={locationQuery}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
}

export default CreateEditPost;