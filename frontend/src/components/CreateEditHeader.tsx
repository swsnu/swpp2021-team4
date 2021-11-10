import React from "react";
import { PostInfoDataType } from "../containers/CreateEditPost";
import { PostType } from "../store/Post/postInterfaces";
import '../styles/components/CreateEditHeader.scss';

interface PropType {
  post: PostType
  postInfoData: PostInfoDataType
  onChangePostInfoData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onPressEnterLocation: (e: React.KeyboardEvent) => void
}

function CreateEditHeader(props: PropType) {
  const {
    post,
    postInfoData,
    onChangePostInfoData,
    onPressEnterLocation
  } = props;
  if (post) {
    console.log();
  }

  return (
    <div className="post-ce-container">
      <div className="post-ce-header">
        <div className="header-image">
          <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg" />
        </div>

        <div className="post-ce-info-container">
          <div className="post-ce-info-first-line">
            <div className="post-ce-folder-name">{ true && 'Folder Name' }</div>
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
              placeholder="Days"
              style={{ maxWidth: '4.5vw' }}
              value={postInfoData.days}
              onChange={onChangePostInfoData}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{post?.author_name || 'Author'}</div>
            <select id="seasonRecommendation" name="seasonRecommendation" onChange={onChangePostInfoData}>
                <option value="">추천 계절</option>
                <option value="spr">봄</option>
                <option value="sum">여름</option>
                <option value="aut">가을</option>
                <option value="win">겨울</option>
            </select>

            <select id="theme" name="theme" onChange={onChangePostInfoData}>
                <option value="">테마 선택</option>
                <option value="friends">친구와 함께!</option>
                <option value="lover">가족과 함께!</option>
                <option value="lover">연인과 함께!</option>
                <option value="alone">나홀로 여행!</option>
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
