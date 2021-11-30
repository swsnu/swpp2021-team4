import React from "react";
import { shallow } from "enzyme";
import MainPage from "./MainPage";

describe("<MainPage />", () => {
    it("should render without errors", () => {
        const component = shallow(<MainPage />);
        let wrapper = component.find("NavBar");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("Search");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("SearchResultList");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("SearchInfo");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("Footer");
        expect(wrapper.length).toBe(1);
    });
});
