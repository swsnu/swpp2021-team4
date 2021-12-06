import React from "react";
import { PostInfoDataType } from "../containers/CreateEditPost";
import { Folder } from "../store/User/userInterfaces";
import '../styles/components/CreateEditHeader.scss';

interface PropType {
  folder: Folder
  thumbnailImage: string
  postInfoData: PostInfoDataType
  onChangePostInfoData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onPressEnterLocation: (e: React.KeyboardEvent) => void
}

function CreateEditHeader(props: PropType) {
  const {
    thumbnailImage,
    postInfoData,
    onChangePostInfoData,
    onPressEnterLocation
  } = props;

  return (
    <div className="post-ce-container">
      <div className="post-ce-header">
        <div className="header-image">
          <img src={thumbnailImage} />
        </div>

        <div className="post-ce-info-container">
          <div className="post-ce-info-first-line">
            <div className="post-ce-folder-name">{props.folder.name}</div>
          </div>

          <div className="post-ce-info-second-line">
            <input
              id="title"
              className="post-ce-title"
              type="text"
              placeholder="Title"
              value={postInfoData.title}
              onChange={onChangePostInfoData}
            />
            <input
              id="location"
              type="text"
              placeholder="Location"
              value={postInfoData.location}
              onChange={onChangePostInfoData}
              onKeyPress={onPressEnterLocation}
              style={{ maxWidth: '7.8vw' }}
            />
            <div style={{ margin: '0 10px', height: '50px', width: '1px', backgroundColor: 'red' }} />
            <input
              id="days"
              type="number"
              min={1}
              placeholder="Days"
              style={{ maxWidth: '4.5vw' }}
              value={postInfoData.days}
              onChange={onChangePostInfoData}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Upload Image</span>
              <input
                style={{ width: 50, height: 50, fontSize: '10px', textOverflow: 'wrap' }}
                id="profile_image"
                type="file"
                accept="image/*"
                onChange={onChangePostInfoData}
                placeholder="여행 대표 이미지"
              />
            </div>
            <select id="seasonRecommendation" name="seasonRecommendation" onChange={onChangePostInfoData}>
              <option value="">추천 계절</option>
              <option value="spr" selected={postInfoData.seasonRecommendation === 'spr'}>봄</option>
              <option value="sum" selected={postInfoData.seasonRecommendation === 'sum'}>여름</option>
              <option value="aut" selected={postInfoData.seasonRecommendation === 'aut'}>가을</option>
              <option value="win" selected={postInfoData.seasonRecommendation === 'win'}>겨울</option>
            </select>

            <select id="theme" name="theme" onChange={onChangePostInfoData}>
              <option value="">테마 선택</option>
              <option value="friends" selected={postInfoData.theme === 'friends'}>친구와 함께!</option>
              <option value="family" selected={postInfoData.theme === 'family'}>가족과 함께!</option>
              <option value="lover" selected={postInfoData.theme === 'lover'}>연인과 함께!</option>
              <option value="alone" selected={postInfoData.theme === 'alone'}>나홀로 여행!</option>
            </select>

            <input type="checkbox" name="xxx" value="yyy" />
            <div>뚜벅이 여행 가능</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CreateEditHeader);
