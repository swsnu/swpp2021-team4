import React from "react";
import { shallow } from "enzyme";
import SigninPage from "./SigninPage";

describe("<SigninPage />", () => {
    it("should render without errors", () => {
        const component = shallow(<SigninPage location={'/'} match={''} history={''} />);
        let wrapper = component.find("NavBar");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("Signin");
        expect(wrapper.length).toBe(1);
    });
});
