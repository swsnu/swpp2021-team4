// import React from "react";
// import { mount } from "enzyme";
// import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
// import MyPage from "./MyPage";
// import { getMockStore } from "../test-utils/mocks";
// import { history } from "../store/store";

// const mockStore = getMockStore();

// jest.mock("../components/BasicUserInfo", () => {
//     return jest.fn((props) => {
//         return (
//             <div className="spyBasicUserInfo">
//                 <div className="spyUsername">{props.username}</div>
//             </div>
//         );
//     });
// });

// describe('<MyPage />', () => {
//     let mypage: JSX.Element;

//     beforeEach(() => {
//         mypage = (
//             <BrowserRouter>
//                 <Provider store={mockStore}>
//                     <ConnectedRouter history={history}>
//                         <Switch>
//                             <Route path="/" exact render={
//                                 () => <MyPage loggedUser={{
//                                     id: 1,
//                                     username: "user1",
//                                     email: "a@a.com",
//                                     profile_image: "",
//                                     folders: []
//                                 }} id={1} />} />
//                         </Switch>
//                     </ConnectedRouter>
//                 </Provider>
//             </BrowserRouter>
//         );
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should render without errors', () => {
//         const component = mount(mypage);
//         const wrapper = component.find('.userinfo-container');
//         expect(wrapper.length).toBe(1);
//     });

// })