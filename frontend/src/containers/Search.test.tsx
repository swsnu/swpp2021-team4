import React  from "react";
import {  mount } from "enzyme";
import { Provider } from "react-redux";
import {  ConnectedRouter } from "connected-react-router";
import { Route,  Switch, BrowserRouter } from "react-router-dom";
import Search from "./Search";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";



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
         author_id: 4,
         author_name: "username",
         comment_count: 0,
         created_at: "2021-11-10T20:43:42Z",
         id: 9,
         is_shared: true,
         like_count: 2,
         thumbnail_image:
          "/media/thumbnail_image/2021/11/10/28493cc3a2ba4eadb4fd0d10c28957ef.jpg",
         title: "겨울강릉",
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
        {
          id: 2,
          name: "ex2",
          post_id: 1,
          description: "ex2",
          day: 1,
          folder_id: 1,
          latitude: "1",
          longitude: "1",
          lat: "1",
          lon: "1",
          homepage: "ex2",
          phone_number: "ex2",
          address: "ex2",
          category: "ex2",
          index: 2,
        },
      ],
      season: "ex1",
      theme: "ex1",
      title: "ex1",
      like_counts: 1,
      liked: true,
      created_at: "ex1",
      pathList: [
        {
          from_place_id: 1,
          id: 1,
          post_id: 1,
          to_place_id: 2,
          transportation: "car",
        },
      ],
    },
    selectedFolder: {
      id: 1,
      name: "ex1",
    },
    search: [ 
      {
         author_id: 4,
         author_name: "username",
         comment_count: 0,
         created_at: "2021-11-10T20:43:42Z",
         id: 9,
         is_shared: true,
         like_count: 2,
         thumbnail_image:
          "/media/thumbnail_image/2021/11/10/28493cc3a2ba4eadb4fd0d10c28957ef.jpg",
         title: "겨울강릉",
          },
        ],
    likeSorted: [ {
      author_id: 4,
      author_name: "username",
      comment_count: 0,
      created_at: "2021-11-10T20:43:42Z",
      id: 9,
      is_shared: true,
      like_count: 2,
      thumbnail_image:
       "/media/thumbnail_image/2021/11/10/28493cc3a2ba4eadb4fd0d10c28957ef.jpg",
      title: "겨울강릉",
       },],
    dateSorted: [ {
      author_id: 4,
      author_name: "username",
      comment_count: 0,
      created_at: "2021-11-10T20:43:42Z",
      id: 9,
      is_shared: true,
      like_count: 2,
      thumbnail_image:
       "/media/thumbnail_image/2021/11/10/28493cc3a2ba4eadb4fd0d10c28957ef.jpg",
      title: "겨울강릉",
       },],
  },
};

const mockStore = getMockStore(stubInitialState);


jest.mock("../components/PostItem", () => {
  return jest.fn((props) => {
    return (
      <div className="spyPost">
        <div className="spytitle">{props.title}</div>
        <div className="spyauthor_name">{props.author_name}</div>
      </div>
    );
  });
});
describe("<Search />", () => {
  let search: JSX.Element;

  beforeEach(() => {
    search = (
      <BrowserRouter>
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact render={() => <Search />} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Search Page", () => {
    const component = mount(search);
    const wrapper = component.find(".search-container");
    expect(wrapper.length).toBe(1);
  });

  it("should click search button", () => {
    const component = mount(search);
    const ps_input = component.find(".search-keyword");
    ps_input.simulate("change", { target: { value: "s" } });
    const button = component.find(".search-button");
    button.simulate("click");
  });
  it("should change season", () => {
    const component = mount(search);
    const spring = component.find("#season").at(0);
    spring.simulate("click");
    const summer = component.find("#season").at(1);
    summer.simulate("click");
    const fall = component.find("#season").at(2);
    fall.simulate("click");
    const winter = component.find("#season").at(3);
    winter.simulate("click");
  });

  it("should change theme", () => {
    const component = mount(search);
    const theme1 = component.find("#theme").at(0);
    theme1.simulate("click");
    const theme2 = component.find("#theme").at(1);
    theme2.simulate("click");
    const theme3 = component.find("#theme").at(2);
    theme3.simulate("click");
    const theme4 = component.find("#theme").at(3);
    theme4.simulate("click");
  });

  it("should click transporation", () => {
    const component = mount(search);
    const transporation = component.find("#transportation");
    transporation.simulate("click");
  });

  it("should sort according to selected sorting method", () => {
    const component = mount(search);
    const like = component.find("#sorting-method").at(0);
    like.simulate("click");
    const date = component.find("#sorting-method").at(1);
    date.simulate("click");
  });

  it("should show searched Posts", () => {
    const component = mount(search);
    const button = component.find(".search-button");
    button.simulate("click");
  });
});