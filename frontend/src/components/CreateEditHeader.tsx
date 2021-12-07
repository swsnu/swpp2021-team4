import React, { useEffect, useState } from "react";
import { PostInfoDataType } from "../containers/CreateEditPost";
import { Folder } from "../store/User/userInterfaces";
import '../styles/components/CreateEditHeader.css';
import checked_icon from "../static/checked.svg";
import { Regions, Cities } from "../utils/locations";

interface PropType {
  folder: Folder
  thumbnailImage: string
  postInfoData: PostInfoDataType
  onChangePostInfoData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onClickAvailableWithoutCar: () => void
  changeLocationQuery: (text: string | null) => void
}

function CreateEditHeader(props: PropType) {
  const {
    thumbnailImage,
    postInfoData,
    onChangePostInfoData,
  } = props;

  const [regionIdx, setRegionIdx] = useState<number>(0);
  const [cityIdx, setCityIdx] = useState<number>(0);
  const [location, setLocation] = useState<string | null>('');

  const onChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionIdx(e.target.selectedIndex);
    setCityIdx(0);
    setLocation(e.target[e.target.selectedIndex].textContent);
  }

  const onChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityIdx(e.target.selectedIndex - 1);
    setLocation(`${Regions[regionIdx - 1]} ${Cities[regionIdx - 1][e.target.selectedIndex - 1]}`);
  }

  useEffect(() => {
    props.changeLocationQuery(location);
  }, [location]);

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
            <select id="location-region" onChange={onChangeRegion} className={`${regionIdx !== 0 ? 'selected' : ''}`}>
              <option value="">지역 선택</option>
              {Regions.map((region: string) => {
                return (<option
                  key={region}
                  value={region}
                >{region}</option>);
              })}
            </select>
            {Cities[regionIdx] && Cities[regionIdx].length > 0 && (
              <select id="location-city" onChange={onChangeCity} className={`${cityIdx !== 0 ? 'selected' : ''}`}>
                <option value="">시, 군</option>
                {Cities[regionIdx - 1].map((city: string) => {
                  return (<option key={city} value={city}>{city}</option>);
                })}
              </select>
            )}
            <div className='line' />
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

          <div className="post-ce-info-third-line">
            <div className="post-ce-info-thumbnail">
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={onChangePostInfoData}
                placeholder="여행 대표 이미지"
              />
              <label className="thumbnail-button" htmlFor="thumbnail">
                Upload Image
              </label>
            </div>

            <select
              id="seasonRecommendation"
              className={`season ${props.postInfoData.seasonRecommendation === "" ? "" : "selected"}`}
              name="seasonRecommendation"
              onChange={onChangePostInfoData}
            >
              <option value="">Season Recommendation</option>
              <option value="spr" selected={postInfoData.seasonRecommendation === 'spr'}>봄</option>
              <option value="sum" selected={postInfoData.seasonRecommendation === 'sum'}>여름</option>
              <option value="aut" selected={postInfoData.seasonRecommendation === 'aut'}>가을</option>
              <option value="win" selected={postInfoData.seasonRecommendation === 'win'}>겨울</option>
            </select>

            <select
              id="theme"
              className={`${props.postInfoData.theme === "" ? "" : "selected"}`}
              name="theme"
              onChange={onChangePostInfoData}
            >
              <option value="">Theme</option>
              <option value="friends" selected={postInfoData.theme === 'friends'}>친구와 함께!</option>
              <option value="family" selected={postInfoData.theme === 'family'}>가족과 함께!</option>
              <option value="lover" selected={postInfoData.theme === 'lover'}>연인과 함께!</option>
              <option value="alone" selected={postInfoData.theme === 'alone'}>나홀로 여행!</option>
            </select>

            <div className="availableWithoutCar">
              <input type="checkbox" id="availableWithoutCar-checkbox" name="xxx" value="yyy" />
              {props.postInfoData.isAvailableWithoutCar && (
                <img className="check-icon" src={checked_icon} onClick={props.onClickAvailableWithoutCar} />
              )}
              {!props.postInfoData.isAvailableWithoutCar && (
                <div className="check-icon" onClick={props.onClickAvailableWithoutCar}></div>
              )}
              <label htmlFor="availableWithoutCar-checkbox">뚜벅이 여행 가능</label>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default React.memo(CreateEditHeader);
