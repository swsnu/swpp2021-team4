import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../test-utils/mocks";
import * as userAction from "../store/User/userAction";
import * as reactRedux from "react-redux";
import SelectFolderModal from "./SelectFolderModal";

const stubInitialState = {
  user: {
    loggedUser: {
      id: 1,
      email: "ex1",
      username: "ex1",
      profile_image: "ex1",
      folders: [
        { id: 1, name: "ex1" },
        { id: 2, nmae: "ex2" },
      ],
    },
  },
};
const mockStore = getMockStore(stubInitialState);

jest.mock("../components/FolderList", () => {
  return jest.fn((props) => {
    return (
      <div className="spy-folder-list-container">
        {props.folders.map((folder: any) => {
          if (folder.id === props.editingFolder?.id) {
            return (
              <div className="spy-edit-folder-container">
                <input
                  className="spy-edit-folder-input"
                  type="text"
                  value={props.editText}
                  placeholder={folder.name}
                  onChange={props.onChangeEditFolder}
                  onKeyPress={props.onPressEnterEditFolder}
                />
              </div>
            );
          }
          return (
            <div
              key={folder.id}
              className={"spy-folder-container".concat(
                folder.id == props.selectedFolder?.id ? " selected" : ""
              )}
              onClick={() => props.onClickFolder(folder)}
            >
              {folder.name}
              <img
                className="icon"
                src=""
                style={{ fill: "green" }}
                onClick={() => props.onClickEditFolder(folder)}
                onMouseOver={() => props.setEditIcon("edit-over")}
                onMouseLeave={() => props.setEditIcon("edit-leave")}
              />
            </div>
          );
        })}
      </div>
    );
  });
});

describe("<SelectFolderModal/>", () => {
  let selectFolderModal: any;
  let visible = true;
  let mockClickSelectButton = jest.fn();
  beforeEach(() => {
    selectFolderModal = (
      <Provider store={mockStore}>
        <SelectFolderModal
          isModalVisible={visible}
          onClickSelectButton={mockClickSelectButton}
        />
      </Provider>
    );
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render folder modal correctly", () => {
    const component = mount(selectFolderModal);
    const wrapper = component.find(".select-folder-modal-container");
    expect(wrapper.length).toBe(1);
  });
  it("should make new folder when clicked", () => {
    let spyAddFolderAction;
    spyAddFolderAction = jest
      .spyOn(userAction, "addFolderAction")
      .mockImplementation(() => jest.fn());
    // let setIsMakeFolderBtnClicked = jest.fn();
    // let spyUseState: any;
    // spyUseState = jest.spyOn(React, "useState");
    // spyUseState.mockImplementation((isMakeFolderBtnClicked: any) => [
    //   isMakeFolderBtnClicked,
    //   setIsMakeFolderBtnClicked,
    // ]);
    const component = mount(selectFolderModal);
    const wrapper = component.find(".make-folder");
    wrapper.simulate("click");
    expect(component.find(".make-folder-input").length).toBe(1);
    const makeInput = component.find(".make-folder-input");
    makeInput.simulate("change", { target: { value: "ex1" } });
    makeInput.simulate("keypress", { key: "Enter" });
    expect(spyAddFolderAction).toHaveBeenCalled();
    // expect(setIsMakeFolderBtnClicked).toBeTruthy();
  });

  it("should edit folder name", () => {
    let spyEditFolderAction;
    spyEditFolderAction = jest
      .spyOn(userAction, "editFolderAction")
      .mockImplementation(() => jest.fn());
    const component = mount(selectFolderModal);
    const wrapper = component.find(".spy-folder-container").at(0);
    wrapper.simulate("click");
    expect(component.find(".selected").length).toBe(1);
    const editImg = component.find(".icon").at(0);
    editImg.simulate("click");
    expect(component.find(".spy-edit-folder-container").length).toBe(1);
    const editInput = component.find(".spy-edit-folder-input").at(0);
    editInput.simulate("change", { target: { value: "test1" } });
    editInput.simulate("keypress", { key: "a" });
    expect(spyEditFolderAction).toHaveBeenCalledTimes(0);
    editInput.simulate("keypress", { key: "Enter" });
    expect(spyEditFolderAction).toHaveBeenCalled();
  });
  it("should return editFolder to null", () => {
    const component = mount(selectFolderModal);
    const wrapper = component.find(".spy-folder-container").at(0);
    wrapper.simulate("click");
    const editImg = component.find(".icon").at(0);
    editImg.simulate("click");
    component.find(".spy-folder-container").last().simulate("click");
    expect(component.find(".edit-folder-container").length).toBe(0);
  });
  it("should call select function when clicked", () => {
    const component = mount(selectFolderModal);
    const wrapper = component.find(".select-folder-modal-select-btn");
    wrapper.simulate("click");
    expect(mockClickSelectButton).toHaveBeenCalled();
  });

  it("should set false again when ismakefolderbuttonclicked", () => {
    const component = mount(selectFolderModal);
    const wrapper = component.find(".spy-folder-container").at(0);
    wrapper.simulate("click");
    const editImg = component.find(".icon").at(0);
    editImg.simulate("click");
    const otherWrap = component.find(".make-folder");
    otherWrap.simulate("click");
    expect(component.find(".edit-folder-container").length).toBe(0);
  });
  it("should not render modal if invisible", () => {
    const component = mount(
      <Provider store={mockStore}>
        <SelectFolderModal
          isModalVisible={false}
          onClickSelectButton={mockClickSelectButton}
        />
      </Provider>
    );
    expect(component.find("div").length).toBe(1);
  });
});
