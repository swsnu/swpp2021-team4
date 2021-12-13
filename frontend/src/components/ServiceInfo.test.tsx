import React from "react";
import { shallow } from "enzyme";
import ServiceInfo from "./ServiceInfo";

describe("<ServieInfoPage />", () => {
    it("should render without errors", () => {
        const component = shallow(<ServiceInfo />);
        let wrapper = component.find(".serviceInfo");
        expect(wrapper.length).toBe(1);
    });
});
