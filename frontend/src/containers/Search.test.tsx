import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Search from "./Search";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

const mockStore = getMockStore();
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
    const psInput = component.find(".search-keyword");
    psInput.simulate("change", { target: { value: "s" } });
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
    const wrapper = component.find(".spyPost");
    expect(wrapper.length).toBe(1);
  });
});
