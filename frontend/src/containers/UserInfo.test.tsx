// import React from "react";
// import { mount } from "enzyme";
// import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
// import UserInfo from "./UserInfo";
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

// jest.mock("../components/PostHeader", () => {
//     return jest.fn((props) => {
//         return (
//             <div className="spyPostHeader">
//                 <div className="spyPostTitle">{props.post.title}</div>
//                 <button className="spyLikeButton"
//                     onClick={props.onClickPostLikeButton}>button</button>
//             </div>
//         );
//     });
// });

// describe('<UserInfo />', () => {
//     let userInfo: JSX.Element;

//     beforeEach(() => {
//         userInfo = (
//             <BrowserRouter>
//                 <Provider store={mockStore}>
//                     <ConnectedRouter history={history}>
//                         <Switch>
//                             <Route path="/" exact render={
//                                 () => <UserInfo loggedUser={{
//                                     id: 1,
//                                     username: "user1",
//                                     email: "a@a.com",
//                                     profile_image: "",
//                                     folders: []
//                                 }} id={2} />} />
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
//         const component = mount(userInfo);
//         const wrapper = component.find('.userinfo-container');
//         expect(wrapper.length).toBe(1);
//     });

// })