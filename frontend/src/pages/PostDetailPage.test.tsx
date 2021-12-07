import React from "react";
import { shallow } from "enzyme";
import PostDetailPage from "./PostDetailPage";

describe("<PostDetailPage />", () => {
    it("should render without errors", () => {
        const component = shallow(<PostDetailPage />);
        let wrapper = component.find("NavBar");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("PostDetail");
        expect(wrapper.length).toBe(1);
    });
});
