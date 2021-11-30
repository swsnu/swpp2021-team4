import React from "react";
import { shallow } from "enzyme";
import EditProfilePage from "./EditProfilePage";

describe("<EditProfilePage />", () => {
    it("should render without errors", () => {
        const component = shallow(<EditProfilePage />);
        let wrapper = component.find("NavBar");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("EditProfile");
        expect(wrapper.length).toBe(1);
    });
});
