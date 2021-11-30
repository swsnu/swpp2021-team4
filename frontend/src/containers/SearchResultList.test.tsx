import React from "react";
import {shallow} from "enzyme";
import SearchResultList from "./SearchResultList";


describe("<SearchResultList>", ()=>{
    it("should render SearchResultList without error", ()=>{
        const component = shallow(<SearchResultList />);
        const wrapper = component.find(".search-result-container");
        expect(wrapper.length).toBe(1);
    })
})