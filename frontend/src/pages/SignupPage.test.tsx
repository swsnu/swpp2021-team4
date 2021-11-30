import React from "react";
import { shallow } from "enzyme";
import SignupPage from "./SignupPage";

describe("<SignupPage />", () => {
    it("should render without errors", () => {
        const component = shallow(<SignupPage location={'/'} match={''} history={''} />);
        let wrapper = component.find("NavBar");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("Signup");
        expect(wrapper.length).toBe(1);
    });
});
