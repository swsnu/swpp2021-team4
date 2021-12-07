import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import CreateEditHeader from "../components/CreateEditHeader";
import Map from "../components/Map";
import MyRoutesSection from "../components/MyRoutesSection";
import PlaceSearchSection from "../components/PlaceSearchSection";
import { usePostState } from "../hooks/usePostState";
import { CreateEditPostLocationType } from "../pages/CreateEditPostPage";
import { createPostAction, editPostAction } from "../store/Post/postAction";
import { PathListType, PathValueType, PlaceDayType, PlaceType, ServerPathType } from "../store/Post/postInterfaces";
import { Folder } from "../store/User/userInterfaces";
import "../styles/components/CreateEditPost.css";

export interface PostInfoDataType {
  title: string;
  location: string;
  days: number;
  seasonRecommendation: string;
  theme: string;
  thumbnailImage: string;
  isAvailableWithoutCar: boolean;
  folderId: number;
  isShared: false;
}
const initialFolderData: PostInfoDataType = {
  title: "",
  location: "",
  days: 3,
  seasonRecommendation: "",
  theme: "",
  thumbnailImage: "",
  isAvailableWithoutCar: false,
  folderId: 0,
  isShared: false,
};

const defaultImage =
  "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg";

interface PropsType {
  folder: Folder;
}

function CreateEditPost(props: PropsType) {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLocation = useLocation<CreateEditPostLocationType>();
  const post = usePostState();

  const [postInfoData, setPostInfoData] = useState<PostInfoDataType>(initialFolderData);
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);
  const [routePlaces, setRoutePlaces] = useState<PlaceDayType[]>([]);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [createdPostId, setCreatedPostId] = useState<number>(0);
  const [pathList, setPathList] = useState<PathListType>({});

  useEffect(() => {
    if (isPostCreated && createdPostId) {
      history.push(`/post/${createdPostId}/`);
    }
  }, [isPostCreated, createdPostId]);

  useEffect(() => {
    setPostInfoData({
      ...postInfoData,
      folderId: props.folder?.id || 0,
    });
  }, [props.folder]);

  useEffect(() => {
    if (pageLocation.state?.from === 'edit' && post.id === pageLocation.state?.postId) {
      // when post is edited, set post info datas as edited post's datas.

      const placeList = post.places.map((place: PlaceType) => ({ day: place.day, place }));
      const convertedPathList: PathListType = {};
      post.pathList?.forEach((path: ServerPathType) => convertedPathList[path.from_place_id] = { to: path.to_place_id.toString(), transportation: path.transportation });

      setPathList(convertedPathList);
      setRoutePlaces(placeList);
      setPostInfoData({
        title: post.title,
        location: post.location,
        days: post.days,
        seasonRecommendation: post.season,
        theme: post.theme,
        thumbnailImage: post.thumbnail_image,
        isAvailableWithoutCar: post.availableWithoutCar,
        folderId: post.folder_id,
        isShared: post.is_shared
      });
    }
  }, [pageLocation, post]);

  const changeLocationQuery = (text: string | null) => {
    if (text) setLocationQuery(text);
  }

  const [editPlace, setEditedPlace] = useState<{ id: number, description: string }>({
    id: 0,
    description: "",
  });

  const onChangePlaceDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlace({
      ...editPlace,
      description: e.target.value,
    });
  };

  const onAddPlace = (place: PlaceType) => {
    setRoutePlaces((prevState: any) => {
      return [
        ...prevState,
        {
          place: { ...place, id: place.id + Date.now() },
          day: selectedDay,
        },
      ];
    });
  };

  const onEditPlace = (place: PlaceType) => {
    setRoutePlaces(
      routePlaces.map((p: PlaceDayType) => {
        if (p.place.id === editPlace.id) {
          p.place.description = editPlace.description;
        }
        return p;
      })
    );

    if (editPlace.id === place.id) {
      setEditedPlace({
        id: 0,
        description: "",
      });
    } else {
      setEditedPlace({
        id: place.id,
        description: place.description,
      });
    }
  };

  const onChangePath = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      origin: PlaceType,
      destination: PlaceType
    ) => {
      setPathList({
        ...pathList,
        [origin.id]: {
          to: destination.id,
          transportation: e.target.value,
        },
      });
    },
    [pathList]
  );

  const onDeletePlace = useCallback(
    (place: PlaceType) => {
      setRoutePlaces(
        routePlaces.filter(
          (p: PlaceDayType) => p.day !== selectedDay || p.place.id !== place.id
        )
      );
    },
    [routePlaces, selectedDay]
  );

  const isPlaceInRoute = (place: PlaceType) => {
    return routePlaces
      .filter((p: PlaceDayType) => p.day === selectedDay)
      .some((p: PlaceDayType) =>
        p.place.id.toString().startsWith(place.id.toString())
      );
  };

  const [selectedTab, setSelectedTab] = useState<"place" | "search">("place");

  const onClickCreateEditButton = () => {
    const {
      title,
      thumbnailImage,
      days,
      theme,
      seasonRecommendation,
      location,
      isAvailableWithoutCar,
      folderId,
      isShared,
    } = postInfoData;

    const placeListData = routePlaces
      .filter((p: PlaceDayType) => p.day)
      .map((p: PlaceDayType, index: number) => {
        const { day, place } = p;

        return {
          day,
          index,
          kakao_id: place.id,
          name: place.name,
          description: place.description,
          latitude: place.lat || place.latitude || "",
          longitude: place.lon || place.longitude || "",
          homepage: place.homepage,
          address: place.address,
          category: place.category,
          phone_number: place.phone_number,
        };
      });

    const pathListData = Object.entries(pathList).map(([key, value]) => ({
      from: key,
      to: value.to,
      transportation: value.transportation,
    }));

    const defaultthumbnailImage =
      "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73968eea-cbbe-49cd-b001-353e9e962cbf.jpeg";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("is_shared", isShared?.toString() || 'false');
    formData.append('thumbnail_image', thumbnailImage || defaultthumbnailImage);
    formData.append('days', days?.toString());
    formData.append('theme', theme);
    formData.append('season', seasonRecommendation);
    formData.append('location', location);
    formData.append('availableWithoutCar', isAvailableWithoutCar.toString())
    formData.append('folder_id', folderId ? folderId.toString() : '172637238622223');
    formData.append('places', JSON.stringify(placeListData));
    formData.append('path_list', JSON.stringify(pathListData));
    formData.append("enctype", 'multipart/form-data');

    if (pageLocation.state?.from === 'edit') {
      // edit
      dispatch(editPostAction(formData, post.id, () => history.push(`/post/${post?.id}/`)));
    } else {
      //create
      dispatch(createPostAction(formData, (isCreated: boolean, postId: number) => {
        setIsPostCreated(isCreated);
        setCreatedPostId(postId);
      }));
    }
  }

  const onChangePostInfoData = useCallback(
    (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      if (e.target?.files) {
        // 이미지 업로드
        const reader = new FileReader();
        reader.onloadend = () => {
          setPostInfoData({
            ...postInfoData,
            thumbnailImage: reader.result?.toString() || "",
          });
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setPostInfoData({
          ...postInfoData,
          [e.target.id]: e.target.value,
        });
      }
    },
    [postInfoData]
  );

  const onClickAvailableWithoutCar = () => {
    setPostInfoData({
      ...postInfoData,
      isAvailableWithoutCar: !postInfoData.isAvailableWithoutCar,
    });
  };


  const onClickDay = useCallback((value: number) => {
    setSelectedDay(value);
  }, []);

  const onClickDeleteDay = (e: React.MouseEvent<HTMLElement>, deletedDay: number) => {
    e?.stopPropagation();
    if (postInfoData.days == 1) {
      alert('day를 모두 삭제할 수 없습니다!');
      return;
    }
    if (deletedDay == postInfoData.days) {
      setSelectedDay(deletedDay-1);
    }

    const deletedPlaceList = routePlaces?.filter((place: PlaceDayType) => place.day === deletedDay);
    deletedPlaceList.forEach((place: PlaceDayType) => {
      Object.entries(pathList)?.forEach(([key, value]: [string, PathValueType]) => {
        if (key === place.place?.id?.toString() || value.to === place.place?.id?.toString()) {
          delete pathList[key];
        }
      });
    });

    let remainPlaceList = routePlaces?.filter((place: PlaceDayType) => place.day !== deletedDay);
    if (deletedDay < postInfoData.days) {
      remainPlaceList = remainPlaceList?.map((placeDay: PlaceDayType) => {
        const { place, day } = placeDay;
        return day > deletedDay
          ? { day: day-1, place: { ...place, day: day-1 }}
          : placeDay;
      });
    }
    setRoutePlaces(remainPlaceList);
    setPostInfoData({ ...postInfoData, days: postInfoData.days-1 });
  };

  const onClickAddIcon = useCallback(
    (value: number) => {
      if (postInfoData.days !== value) {
        setPostInfoData({ ...postInfoData, days: value });
        setSelectedDay(value);
      }
    },
    [postInfoData.days]
  );

  const onClickTabButton = (type: "search" | "place") => {
    setSelectedTab(type);
  };

  return (
    <div>
      <CreateEditHeader
        folder={props.folder}
        thumbnailImage={postInfoData.thumbnailImage || defaultImage}
        postInfoData={postInfoData}
        onClickAvailableWithoutCar={onClickAvailableWithoutCar}
        onChangePostInfoData={onChangePostInfoData}
        changeLocationQuery={changeLocationQuery}
      />
      <div className="create-edit-content-container">
        <div className="create-edit-place-section">
          <div className="create-edit-places-section">
            <div className="my-routes-title">Places</div>
            <PlaceSearchSection
              selectedTab={selectedTab}
              onClickTabButton={onClickTabButton}
              setRoutePlaces={setRoutePlaces}
              selectedDay={selectedDay}
              isPlaceInRoute={isPlaceInRoute}
              onAddPlace={onAddPlace}
            />
          </div>

          <div className="create-edit-routes-section">
            <div className="my-routes-title">My Routes</div>
            <MyRoutesSection
              days={postInfoData.days}
              selectedDay={selectedDay}
              pathList={pathList}
              setPathList={setPathList}
              onClickDeleteDay={onClickDeleteDay}
              onChangePath={onChangePath}
              onClickDay={onClickDay}
              onClickAddIcon={onClickAddIcon}
              routePlaces={routePlaces}
              editPlace={editPlace}
              onChangePlaceDescription={onChangePlaceDescription}
              onEditPlace={onEditPlace}
              onDeletePlace={onDeletePlace}
              setRoutePlaces={setRoutePlaces}
            />
          </div>
        </div>

        <Map
          fromWhere={pageLocation.state?.from === 'edit' ? 'edit' : 'create'}
          location={locationQuery}
          selectedDay={selectedDay}
          placeList={routePlaces}
          onClickButton={onClickCreateEditButton}
        />
      </div>
    </div>
  );
}

export default CreateEditPost;
