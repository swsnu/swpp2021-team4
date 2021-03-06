import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import CreateEditHeader from "../components/CreateEditHeader";
import Map from "../components/Map";
import MyRoutesSection from "../components/MyRoutesSection";
import PlaceSearchSection from "../components/PlaceSearchSection";
import SelectRouteModal from "../components/SelectRouteModal";
import { usePostState } from "../hooks/usePostState";
import { CreateEditPostLocationType } from "../pages/CreateEditPostPage";
import { createPostAction, editPostAction } from "../store/Post/postAction";
import {
  PathListType,
  PathValueType,
  PlaceDayType,
  PlaceType,
  ServerPathType,
  SimplePostType,
  // PostType,
} from "../store/Post/postInterfaces";
import { Folder } from "../store/User/userInterfaces";
import "../styles/components/CreateEditPost.css";
import { useUserState } from "../hooks/useUserState";
import axios from "axios";


export interface PostInfoDataType {
  title: string;
  location: string;
  days: number;
  seasonRecommendation: string;
  theme: string;
  thumbnailImage: any;
  isAvailableWithoutCar: boolean;
  folderId: number;
  isShared: false;
}
const initialPostData: PostInfoDataType = {
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

interface PropsType {
  folder: Folder;
}

function CreateEditPost(props: PropsType) {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLocation = useLocation<CreateEditPostLocationType>();
  const post = usePostState();
  const loggedUser = useUserState();

  const [postInfoData, setPostInfoData] =
    useState<PostInfoDataType>(initialPostData);
  const [thumbnailUrl, setThumbnailUrl] = useState<any>("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);
  const [routePlaces, setRoutePlaces] = useState<PlaceDayType[]>([]);
  const [initialCartPlaceList, setCartPlaceList] = useState<PlaceDayType[]>([]);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [createdPostId, setCreatedPostId] = useState<number>(0);
  const [pathList, setPathList] = useState<PathListType>({});
  //should choose a base route when the user visits create page
  const [routeModalVisible, setRouteModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isPostCreated && createdPostId) {
      history.push(`/post/show/${createdPostId}/`);
    }
  }, [isPostCreated, createdPostId]);

  const [cartRouteList, setCartRouteList] = useState<SimplePostType[]>([]);
  const [countModalClick, setCountModalClick] = useState<number>(0);
  //render places saved in the cart
  useEffect(() => {
    if (props.folder.id) {
      axios
        .get<{
          my_posts: SimplePostType[];
          posts: SimplePostType[];
          places: PlaceType[];
        }>(`/user/${loggedUser.id}/folder/${props.folder.id}`)
        .then(function (response) {
          let placeList = [...initialCartPlaceList];
          response.data.places.forEach((place: PlaceType) => {
            placeList = [...placeList, { place: place, day: selectedDay }];
          });
          setCartPlaceList(placeList);

          let routeList = [...cartRouteList];
          response.data.posts.forEach((route: SimplePostType) => {
            routeList = [...routeList, route];
          });

          if (routeList.length > 0) {
            setCartRouteList(routeList);
            if (pageLocation.state?.from !== "edit") {
              setRouteModalVisible(true);
            }
          } else {
            setCountModalClick((prev) => prev + 1);
          }
        })
        .catch((err) => err.response);
    }
    setPostInfoData({
      ...postInfoData,
      folderId: props.folder?.id || 0,
    });
  }, [props.folder]);

  useEffect(() => {
    if (
      pageLocation.state?.from === "edit" &&
      post.id === pageLocation.state?.postId
    ) {
      // when post is edited, set post info datas as edited post's datas.
      // do not need to choose a base route when the location is from "edit"
      setRouteModalVisible(false);
      const placeList = post.places.map((place: PlaceType) => ({
        day: place.day,
        place,
      }));
      const convertedPathList: PathListType = {};
      post.pathList?.forEach(
        (path: ServerPathType) =>
          (convertedPathList[path.from_place_id] = {
            to: path.to_place_id.toString(),
            transportation: path.transportation,
          })
      );

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
        isShared: post.is_shared,
      });
    }
  }, [pageLocation, post]);

  useEffect(() => {
    if (locationQuery)
      setPostInfoData({ ...postInfoData, location: locationQuery });
  }, [locationQuery]);

  const changeLocationQuery = (text: string | null) => {
    if (text) setLocationQuery(text);
  };

  const [editPlace, setEditedPlace] = useState<{
    id: number;
    description: string;
  }>({
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
          //match PathList type
          to: destination.id.toString(),
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

  const onClickRouteSubmitButton = (routeId: number) => {
    //when the user clicks existing route
    if (routeId) {
      axios
        .get(`/post/${routeId}/`)
        .then(function (response) {
          //when the user wants to change routes during creating
          if (routePlaces && countModalClick > 0) {
            if (!window.confirm("????????? ????????? ?????? ????????? ??? ????????????.")) {
              return null;
            }
          }
          // render places in my routes section
          const placeList: PlaceDayType[] = response.data.places.map(
            (place: PlaceType) => ({
              place: { ...place, id: place.id + Date.now() },
              day: place.day,
            })
          );
          // render paths in my routes section
          const convertedPathList: PathListType = {};
          response.data.pathList.forEach(
            (path: ServerPathType) =>
              (convertedPathList[path.from_place_id] = {
                to: path.to_place_id.toString(),
                transportation: path.transportation,
              })
          );
          setPathList(convertedPathList);
          setRoutePlaces(placeList);
        })
        .catch((err) => err.response);
    }
    setCountModalClick((prevCount) => prevCount + 1);
    //close modal
    setRouteModalVisible(false);
  };

  const onClickCreateEditButton = () => {
    const {
      title,
      thumbnailImage,
      days,
      theme,
      seasonRecommendation,
      isAvailableWithoutCar,
      folderId,
      isShared,
      location,
    } = postInfoData;

    if (!(title && theme && seasonRecommendation && location && days)) {
      window.alert("????????? ????????? ?????? ???????????????!");
      return;
    } else if (routePlaces.length < 1) {
      alert("?????? ????????? ????????? ??????????????????!");
      return;
    }

    let maxDay: number = 0;
    const placeListData = routePlaces
      .filter((p: PlaceDayType) => p.day)
      .map((p: PlaceDayType, index: number) => {
        const { day, place } = p;
        if (day > maxDay) maxDay = day;

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("is_shared", isShared?.toString() || "false");
    formData.append("thumbnail_image", thumbnailImage);
    formData.append("days", maxDay?.toString());
    formData.append("theme", theme);
    formData.append("season", seasonRecommendation);
    formData.append("location", location);
    formData.append("availableWithoutCar", isAvailableWithoutCar.toString());
    formData.append("folder_id", folderId?.toString() ?? "");
    formData.append("places", JSON.stringify(placeListData));
    formData.append("path_list", JSON.stringify(pathListData));
    formData.append("enctype", "multipart/form-data");

    if (pageLocation.state?.from === "edit") {
      // edit
      dispatch(
        editPostAction(formData, post.id, () =>
          history.push(`/post/show/${post?.id}/`)
        )
      );
    } else {
      //create
      dispatch(
        createPostAction(formData, (isCreated: boolean, postId: number) => {
          setIsPostCreated(isCreated);
          setCreatedPostId(postId);
        })
      );
    }
  };

  const onChangePostInfoData = useCallback(
    (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      if (e.target?.files) {
        // ????????? ?????????
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailUrl(reader.result);
          setPostInfoData({
            ...postInfoData,
            thumbnailImage: e.target.files[0],
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

  const onClickDeleteDay = (
    e: React.MouseEvent<HTMLElement>,
    deletedDay: number
  ) => {
    e?.stopPropagation();
    if (postInfoData.days == 1) {
      alert("day??? ?????? ????????? ??? ????????????!");
      return;
    }
    if (deletedDay == postInfoData.days) {
      setSelectedDay(deletedDay - 1);
    }

    const deletedPlaceList = routePlaces?.filter(
      (place: PlaceDayType) => place.day === deletedDay
    );
    deletedPlaceList.forEach((place: PlaceDayType) => {
      Object.entries(pathList)?.forEach(
        ([key, value]: [string, PathValueType]) => {
          if (
            key === place.place?.id?.toString() ||
            value.to === place.place?.id?.toString()
          ) {
            delete pathList[key];
          }
        }
      );
    });

    let remainPlaceList = routePlaces?.filter(
      (place: PlaceDayType) => place.day !== deletedDay
    );
    if (deletedDay < postInfoData.days) {
      remainPlaceList = remainPlaceList?.map((placeDay: PlaceDayType) => {
        const { place, day } = placeDay;
        return day > deletedDay
          ? { day: day - 1, place: { ...place, day: day - 1 } }
          : placeDay;
      });
    }
    setRoutePlaces(remainPlaceList);
    setPostInfoData({ ...postInfoData, days: postInfoData.days - 1 });
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

  const [clickedRoute, setClickedRoute] = useState<number>(0);
  const onClickRoute = (routeId: number) => {
    setClickedRoute(routeId);
    setRouteModalVisible(true);
  };

  const onClickCloseModal = () => {
    //when user first visits createPage
    //submit ?????? ?????? close modal?????? ??? ???????????? ??? ?????? ??????
    if (
      routeModalVisible &&
      !countModalClick &&
      !(pageLocation.state?.from === "edit")
    ) {
      if (confirm("???????????? ??? ????????? ???????????????.")) {
        setRouteModalVisible(false);
      } else {
        setRouteModalVisible(true);
      }
    } else {
      setRouteModalVisible(false);
    }
    setCountModalClick((prevCount) => prevCount + 1);
  };

  return (
    <div className="create-edit-post-container">
      <SelectRouteModal
        onClickCloseModal={onClickCloseModal}
        onClickRoute={onClickRoute}
        clickedRoute={clickedRoute}
        cartRouteList={cartRouteList}
        isModalVisible={routeModalVisible}
        onClickRouteSubmitButton={onClickRouteSubmitButton}
        countModalClick={countModalClick}
      />
      <CreateEditHeader
        folder={props.folder}
        thumbnailImage={thumbnailUrl ? thumbnailUrl : post.thumbnail_image}
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
              initialCartPlaceList={initialCartPlaceList}
              selectedTab={selectedTab}
              onClickTabButton={onClickTabButton}
              setRoutePlaces={setRoutePlaces}
              selectedDay={selectedDay}
              isPlaceInRoute={isPlaceInRoute}
              onAddPlace={onAddPlace}
            />
          </div>

          <div className="create-edit-routes-section">
            <div className="my-routes-title">
              My Routes
              <div className="select-route-button">
                <button
                  id="route-change-button"
                  onClick={() => setRouteModalVisible(true)}
                >
                  ?????? ?????????
                </button>
              </div>
            </div>

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
          fromWhere={pageLocation.state?.from === "edit" ? "edit" : "create"}
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
