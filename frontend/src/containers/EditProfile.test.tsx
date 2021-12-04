// import React from 'react';
// import { mount } from "enzyme";
// import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
// import EditProfile from './EditProfile';
// import { history } from "../store/store";
// import { getMockStore } from "../test-utils/mocks";
// import * as actionCreators from '../store/User/userAction';
// import * as reactRedux from "react-redux";
// import axios from "axios";

// const stubInitialState = {
//     user: {
//         loggedUser: {
//             id: 1,
//             email: "email",
//             username: "username",
//             profile_image: "",
//             folders: [],
//         }
//     },
//     post: {
//         posts: [
//             {
//                 id: 1,
//                 header_image: "ex1",
//                 thumbnail_image: "ex1",
//                 author_id: 1,
//                 author_name: "ex1",
//                 availableWithoutCar: true,
//                 comments: [
//                     {
//                         username: "ex1",
//                         content: "ex1",
//                         profile_image: "ex1",
//                         id: 1,
//                         created_at: "ex1",
//                         author_id: "1,",
//                     },
//                 ],
//                 days: 1,
//                 folder_id: 1,
//                 folder_name: "ex1",
//                 is_shared: true,
//                 location: "ex1",
//                 places: [],
//                 season: "ex1",
//                 theme: "ex1",
//                 title: "ex1",
//                 like_counts: 1,
//                 liked: true,
//             },
//         ],
//         detailedPost: {
//             id: 1,
//             header_image: "ex1",
//             thumbnail_image: "ex1",
//             author_id: 1,
//             author_name: "ex1",
//             availableWithoutCar: true,
//             comments: [
//                 {
//                     username: "ex1",
//                     content: "ex1",
//                     profile_image: "ex1",
//                     id: 1,
//                     created_at: "ex1",
//                     author_id: "1,",
//                 },
//             ],
//             days: 1,
//             folder_id: 1,
//             folder_name: "ex1",
//             is_shared: true,
//             location: "ex1",
//             places: [],
//             season: "ex1",
//             theme: "ex1",
//             title: "ex1",
//             like_counts: 1,
//             liked: true,
//         },
//         selectedFolder: {
//             id: 1,
//             name: "ex1",
//         },
//         search: [],
//         likeSorted: [],
//         dateSorted: [],
//     },
// };

// const mockStore = getMockStore(stubInitialState);

// describe('<EditProfile />', () => {
//     let editProfile: JSX.Element;
//     jest.mock("axios");

//     beforeEach(() => {
//         editProfile = (
//             <BrowserRouter>
//                 <Provider store={mockStore}>
//                     <ConnectedRouter history={history}>
//                         <Switch>
//                             <Route path="/" exact render={() => <EditProfile />} />
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
//         const component = mount(editProfile);
//         const wrapper = component.find('.edit-profile-container');
//         expect(wrapper.length).toBe(1);
//     });

//     it("should edit profile properly", () => {
//         jest
//             .spyOn(reactRedux, "useSelector")
//             .mockImplementation((callback) => callback(stubInitialState));
//         axios.post = jest
//             .fn()
//             .mockImplementation(() => Promise.resolve({ status: 201 }));
//         // const spyEditProfileAction = jest.spyOn(actionCreators, 'editProfileAction')
//         //     .mockImplementation(() => { return dispatch => { }; });
//         jest.spyOn(window, 'alert').mockImplementation(() => { });
//         const component = mount(editProfile);
//         const usernameInput = component.find("#username");
//         usernameInput.simulate("change", { target: { value: "edited_username" } });
//         const pwdInput = component.find("#password");
//         pwdInput.simulate("change", { target: { value: "password" } });
//         const checkPwdInput = component.find("#password2");
//         checkPwdInput.simulate("change", { target: { value: "password" } });
//         const uploadImageButton = component.find(".upload-image-button");
//         uploadImageButton.simulate("click");
//         const submitButton = component.find(".edit-profile-btn");
//         submitButton.simulate("click");
//         expect(axios.post).toHaveBeenCalledTimes(1);
//     });

//     it("should not edit profile", () => {
//         const spyEditProfileAction = jest.spyOn(actionCreators, 'editProfileAction')
//             .mockImplementation(() => { return dispatch => { }; });
//         jest.spyOn(window, 'alert').mockImplementation(() => { });
//         const component = mount(editProfile);
//         const usernameInput = component.find("#username");
//         usernameInput.simulate("change", { target: { value: "" } });
//         // const pwdInput = component.find("#password");
//         // pwdInput.simulate("change", { target: { value: "password" } });
//         // const checkPwdInput = component.find("#password2");
//         // checkPwdInput.simulate("change", { target: { value: "password" } });
//         const button = component.find(".edit-profile-btn");
//         button.simulate("click");
//         expect(spyEditProfileAction).toHaveBeenCalledTimes(0);
//     });

// })