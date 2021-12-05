import React from "react";
import { mount} from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import PostDetail from "./PostDetail";
import PostHeader from "../components/PostHeader";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as postAction from "../store/Post/postAction";
import * as reactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Place from "../components/Place";
import SelectFolderModal from "./SelectFolderModal";
// import { waitFor } from "@testing-library/dom";
// import { act } from "react-dom/test-utils";

const stubInitialState = {
  user: {
    loggedUser: {
      id: 1,
      email: "ex1",
      username: "ex1",
      profile_image: "ex1",
      folders: [],
    },
  },
  post: {
    posts: [
      {
        id: 1,
        header_image: "ex1",
        thumbnail_image: "ex1",
        author_id: 1,
        author_name: "ex1",
        availableWithoutCar: true,
        comments: [
          {
            username: "ex1",
            content: "ex1",
            profile_image: "ex1",
            id: 1,
            created_at: "ex1",
            author_id: "1,",
          },
        ],
        days: 1,
        folder_id: 1,
        folder_name: "ex1",
        is_shared: true,
        location: "ex1",
        places: [
          {
            id: 1,
            name: "ex1",
            post_id: 1,
            description: "ex1",
            day: 1,
            folder_id: 1,
            latitude: "1",
            longitude: "1",
            lat: "1",
            lon: "1",
            homepage: "ex1",
            phone_number: "ex1",
            address: "ex1",
            category: "ex1",
            index: 1,
          },
        ],
        season: "ex1",
        theme: "ex1",
        title: "ex1",
        like_counts: 1,
        liked: true,
      },
    ],
    detailedPost: {
      id: 1,
      header_image: "ex1",
      thumbnail_image: "ex1",
      author_id: 1,
      author_name: "ex1",
      availableWithoutCar: true,
      comments: [
        {
          username: "ex1",
          content: "ex1",
          profile_image: "ex1",
          id: 1,
          created_at: "ex1",
          author_id: 1,
        },
      ],
      comment_counts: 1,
      days: 1,
      // folder_id: 1,
      folder_name: "ex1",
      is_shared: false,
      location: "ex1",
      places: [
        {
          id: 1,
          name: "ex1",
          post_id: 1,
          description: "ex1",
          day: 1,
          folder_id: 1,
          latitude: "1",
          longitude: "1",
          lat: "1",
          lon: "1",
          homepage: "ex1",
          phone_number: "ex1",
          address: "ex1",
          category: "ex1",
          index: 1,
        },
      ],
      season: "ex1",
      theme: "ex1",
      title: "ex1",
      like_counts: 1,
      liked: true,
      created_at: "ex1",
      // updated_at:"ex1",
    },
    selectedFolder: {
      id: 1,
      name: "ex1",
    },
    search: [],
    likeSorted: [],
    dateSorted: [],
  },
};

const mockStore = getMockStore(stubInitialState);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "1",
  }),
  useRouteMatch: () => ({ url: "/post/1/" }),
}));

jest.mock("../components/Map", () => {
  return jest.fn((props) => {
    return (
      <div className="spy-map-container">
        <div className="spy-map-title">Map</div>
        <div id="map" />
        {props.fromWhere !== "detail" && (
          <div className="spy-map-create-btn" onClick={props.onClickButton}>
            {props.fromWhere}
          </div>
        )}
      </div>
    );
  });
});

describe("<PostDetail/>", () => {
  jest.mock("axios");
  let postDetail: any;
  let spyGetPostAction: any;
  let spyPush: any;
  beforeEach(() => {
    postDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <PostDetail />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );

    spyGetPostAction = jest
      .spyOn(postAction, "getPostAction")
      .mockImplementation(() => jest.fn());

    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render PostDetail correctly", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find(".post-detail-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render like function correctly", async () => {
    const component = mount(postDetail);
    const wrapper = component.find("#like-icon");
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ like_counts: 1 }));
    wrapper.simulate("click");
    expect(axios.get).toHaveBeenCalled();
    expect(spyGetPostAction).toHaveBeenCalled();
  });

  it("should not render like function when rejected", async () => {
    const component = mount(postDetail);
    const wrapper = component.find("#like-icon");
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("abc")));
    wrapper.simulate("click");
    expect(axios.get).toHaveBeenCalled();
  });

  it("should post new comment when button clicked", async () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const setComment = jest.fn();
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    spyUseState.mockImplementation((newComment: any) => [
      newComment,
      setComment,
    ]);
    component
      .find(".comment-input")
      .simulate("change", { target: { value: "ex1" } });
    const wrapper = component.find(".comment-submit");
    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 201 }));
    wrapper.simulate("click");
    expect(component.find(".comment-input").text()).toBe("");
    expect(axios.post).toHaveBeenCalled();
    // expect(spyGetCommentsAction).toHaveBeenCalled();
  });
  it("should not post new comments when empty", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const setComment = jest.fn();
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    spyUseState.mockImplementation((newComment: any) => [
      newComment,
      setComment,
    ]);
    component
      .find(".comment-input")
      .simulate("change", { target: { value: "" } });
    const wrapper = component.find(".comment-submit");
    axios.post = jest.fn();
    wrapper.simulate("click");
    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  it("should delete comment when button clicked", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find("#delete-comment-button");

    jest.spyOn(window, "confirm").mockReturnValue(true);
    axios.delete = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 200 }));
    wrapper.simulate("click");
    expect(axios.delete).toHaveBeenCalled();
  });

  it("should show folder modal when button clicked", () => {
    const component = mount(postDetail);
    const wrapper = component.find(".post-detail-container");
    wrapper.simulate("click");
  });

  it("should render onClickAddPostCartButton when button clicked", () => {
    const post = {
      id: 1,
      header_image: "ex1",
      thumbnail_image: "ex1",
      author_id: 1,
      author_name: "ex1",
      availableWithoutCar: true,
      comments: [
        {
          username: "ex1",
          content: "ex1",
          profile_image: "ex1",
          id: 1,
          created_at: "ex1",
          author_id: 1,
        },
      ],
      comment_counts: 1,
      days: 1,
      // folder_id: 1,
      folder_name: "ex1",
      is_shared: true,
      location: "ex1",
      places: [
        {
          id: 1,
          name: "ex1",
          post_id: 1,
          description: "ex1",
          day: 1,
          folder_id: 1,
          latitude: "1",
          longitude: "1",
          lat: "1",
          lon: "1",
          homepage: "ex1",
          phone_number: "ex1",
          address: "ex1",
          category: "ex1",
          index: 1,
        },
      ],
      season: "ex1",
      theme: "ex1",
      title: "ex1",
      like_counts: 1,
      liked: true,
      created_at: "ex1",
    };
    jest.spyOn(reactRedux, "useSelector").mockImplementation((callback) =>
      callback({
        user: {
          loggedUser: {
            id: 1,
            email: "ex1",
            username: "ex1",
            profile_image: "ex1",
            folders: [],
          },
        },
        post: {
          posts: [
            {
              id: 1,
              header_image: "ex1",
              thumbnail_image: "ex1",
              author_id: 1,
              author_name: "ex1",
              availableWithoutCar: true,
              comments: [
                {
                  username: "ex1",
                  content: "ex1",
                  profile_image: "ex1",
                  id: 1,
                  created_at: "ex1",
                  author_id: "1,",
                },
              ],
              days: 1,
              folder_id: 1,
              folder_name: "ex1",
              is_shared: true,
              location: "ex1",
              places: [
                {
                  id: 1,
                  name: "ex1",
                  post_id: 1,
                  description: "ex1",
                  day: 1,
                  folder_id: 1,
                  latitude: "1",
                  longitude: "1",
                  lat: "1",
                  lon: "1",
                  homepage: "ex1",
                  phone_number: "ex1",
                  address: "ex1",
                  category: "ex1",
                  index: 1,
                },
              ],
              season: "ex1",
              theme: "ex1",
              title: "ex1",
              like_counts: 1,
              liked: true,
            },
          ],
          detailedPost: {
            id: 1,
            header_image: "ex1",
            thumbnail_image: "ex1",
            author_id: 1,
            author_name: "ex1",
            availableWithoutCar: true,
            comments: [
              {
                username: "ex1",
                content: "ex1",
                profile_image: "ex1",
                id: 1,
                created_at: "ex1",
                author_id: 1,
              },
            ],
            comment_counts: 1,
            days: 1,
            // folder_id: 1,
            folder_name: "ex1",
            is_shared: true,
            location: "ex1",
            places: [
              {
                id: 1,
                name: "ex1",
                post_id: 1,
                description: "ex1",
                day: 1,
                folder_id: 1,
                latitude: "1",
                longitude: "1",
                lat: "1",
                lon: "1",
                homepage: "ex1",
                phone_number: "ex1",
                address: "ex1",
                category: "ex1",
                index: 1,
              },
            ],
            season: "ex1",
            theme: "ex1",
            title: "ex1",
            like_counts: 1,
            liked: true,
            created_at: "ex1",
            // updated_at:"ex1",
          },
          selectedFolder: {
            id: 1,
            name: "ex1",
          },
          search: [],
          likeSorted: [],
          dateSorted: [],
        },
      })
    );
    let postHeader: any;
    const onClickPostLikeButton = jest.fn();
    const onClickPostShareButton = jest.fn();
    const onClickAddPostCartButton = jest.fn();
    postHeader = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <PostHeader
              loggedUserId={1}
              isPostDetail={true}
              onClickAddPostCartButton={onClickAddPostCartButton}
              onClickPostShareButton={onClickPostShareButton}
              onClickPostLikeButton={onClickPostLikeButton}
              post={post}
            />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(postDetail);
    const wrapper = mount(postHeader);
    wrapper.find(".post-cart-button").simulate("click");
    const setIsPostAddedToCart = jest.fn();
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    spyUseState.mockImplementation((isPostAddedToCart: any) => [
      isPostAddedToCart,
      setIsPostAddedToCart,
    ]);
    expect(setIsPostAddedToCart).toBeTruthy();
    const placeWrapper = component.find(Place);
    placeWrapper.find(".place-cart-button").simulate("click");
    const setIsModalVisible = jest.fn();
    spyUseState.mockImplementation((isModalVisible: any) => [
      isModalVisible,
      setIsModalVisible,
    ]);
    expect(setIsModalVisible).toBeTruthy();
  });

  it("should render onClickPostShareButton when button clicked", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const component = mount(postDetail);
    const wrapper = component.find(PostHeader);
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve(() => spyPush));
    wrapper.find(".post-share-button").simulate("click");
    expect(axios.get).toHaveBeenCalled();
  });

  it("should alert when lacks of information", () => {
    const initialState = {
      user: {
        loggedUser: {
          id: 1,
          email: "ex1",
          username: "ex1",
          profile_image: "ex1",
          folders: [],
        },
      },
      post: {
        posts: [
          {
            id: 1,
            header_image: "ex1",
            thumbnail_image: "ex1",
            author_id: 1,
            author_name: "ex1",
            availableWithoutCar: true,
            comments: [
              {
                username: "ex1",
                content: "ex1",
                profile_image: "ex1",
                id: 1,
                created_at: "ex1",
                author_id: "1,",
              },
            ],
            days: 1,
            folder_id: 1,
            folder_name: "ex1",
            is_shared: false,
            location: "ex1",
            places: [
              {
                id: 1,
                name: "ex1",
                post_id: 1,
                description: "ex1",
                day: 1,
                folder_id: 1,
                latitude: "1",
                longitude: "1",
                lat: "1",
                lon: "1",
                homepage: "ex1",
                phone_number: "ex1",
                address: "ex1",
                category: "ex1",
                index: 1,
              },
            ],
            season: "",
            theme: "ex1",
            title: "ex1",
            like_counts: 1,
            liked: true,
          },
        ],
        detailedPost: {
          id: 1,
          header_image: "ex1",
          thumbnail_image: "ex1",
          author_id: 1,
          author_name: "ex1",
          availableWithoutCar: true,
          comments: [
            {
              username: "ex1",
              content: "ex1",
              profile_image: "ex1",
              id: 1,
              created_at: "ex1",
              author_id: 1,
            },
          ],
          comment_counts: 1,
          days: 1,
          // folder_id: 1,
          folder_name: "ex1",
          is_shared: false,
          location: "ex1",
          places: [
            {
              id: 1,
              name: "ex1",
              post_id: 1,
              description: "ex1",
              day: 1,
              folder_id: 1,
              latitude: "1",
              longitude: "1",
              lat: "1",
              lon: "1",
              homepage: "ex1",
              phone_number: "ex1",
              address: "ex1",
              category: "ex1",
              index: 1,
            },
          ],
          season: "",
          theme: "ex1",
          title: "ex1",
          like_counts: 1,
          liked: true,
          created_at: "ex1",
          // updated_at:"ex1",
        },
        selectedFolder: {
          id: 1,
          name: "ex1",
        },
        search: [],
        likeSorted: [],
        dateSorted: [],
      },
    };
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(initialState));
    jest.spyOn(window, "alert");
    const component = mount(postDetail);
    const wrapper = component.find(PostHeader);
    wrapper.find(".post-share-button").simulate("click");
    expect(window.alert).toHaveBeenCalled();
  });
  it("should render onClickFolderSelect when button clicked", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    let useStateSpy: any = jest.spyOn(React, "useState");
    const setIsModalVisible = jest.fn();
    useStateSpy.mockImplementation((isModalVisible: boolean) => [
      isModalVisible,
      setIsModalVisible,
    ]);
    const component = mount(postDetail);
    component.find(PostHeader).find(".post-cart-button").simulate("click");
    const wrapper = component.find(SelectFolderModal);
    wrapper.find(".select-folder-modal-select-btn").simulate("click");
    expect(setIsModalVisible).toBeTruthy();
  });

  it("should hide comment input when not logged in", () => {
    stubInitialState.user.loggedUser.id = 0;
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find(".invisible");
    expect(wrapper.length).toBe(1);
  });

  it("should show unlike icon when post not liked", () => {
    stubInitialState.user.loggedUser.id = 0;
    stubInitialState.post.detailedPost.liked = false;
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find("#unlike-icon");
    expect(wrapper.length).toBe(1);
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve(() => spyGetPostAction));
    wrapper.simulate("click");
    expect(axios.get).toHaveBeenCalled();
  });

  it("should render onClickModalBackground when container clicked", () => {
    stubInitialState.user.loggedUser.id = 1;
    stubInitialState.post.detailedPost.is_shared = true;
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const setIsModalVisible = jest.fn();
    const setIsPostAddedToCart = jest.fn();
    const setSelectedPlaceId = jest.fn();
    let useStateSpy: any = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((isModalVisible: boolean) => [
      isModalVisible,
      setIsModalVisible,
    ]);
    const component = mount(postDetail);
    const wrapper = component.find(PostHeader);
    wrapper.find(".post-cart-button").simulate("click");
    component.find(".post-detail-container").simulate("click");
    expect(setIsModalVisible).toBeTruthy();
    useStateSpy.mockImplementation((isPostAddedToCart: boolean) => [
      isPostAddedToCart,
      setIsPostAddedToCart,
    ]);
    expect(setIsPostAddedToCart).toBeTruthy();
    useStateSpy.mockImplementation((selectedPlaceId: number) => [
      selectedPlaceId,
      setSelectedPlaceId,
    ]);
    const placeWrapper = component.find(Place);
    placeWrapper.find(".place-cart-button").simulate("click");
    component.find(".post-detail-container").simulate("click");
    expect(setSelectedPlaceId).toBeTruthy();

  });

  it("should render default image when no profile image",()=>{
    stubInitialState.post.detailedPost.comments[0].profile_image="";
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find(".each-profile-image")
    expect(wrapper.length).toBe(1);
  })

  //coverage에 영향을 주지 않음
  it("should return null when no place", () => {
    stubInitialState.post.detailedPost.places = [];
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find(Place);
    expect(wrapper.length).toBe(0);
  });
});
