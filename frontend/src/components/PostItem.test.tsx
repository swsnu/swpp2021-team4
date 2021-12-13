import React from "react";
import { shallow } from "enzyme";
import PostItem from "./PostItem";

describe("<PostItem />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <PostItem
        id={0}
        title={""}
        author_name={""}
        author_id={0}
        like_count={0}
        comment_count={0}
        is_shared={true}
      />
    );
    const wrapper = component.find(".postitem-container");
    expect(wrapper.length).toBe(1);
  });
  it("should render delete function", () => {
    const onClickUncartPost = jest.fn();
    const component = shallow(
      <PostItem
        id={0}
        title={""}
        author_name={""}
        author_id={0}
        like_count={0}
        comment_count={0}
        is_shared={true}
        onClickUncartPost={onClickUncartPost}
      />
    );
    const wrapper = component.find(".post-in-cart-delete img");
    wrapper.simulate("click");
    expect(onClickUncartPost).toHaveBeenCalledTimes(1);
  });
  it("should show 'Shared' when prop is true", () => {
    const component = shallow(
      <PostItem
        id={1}
        title={"1"}
        author_name={"hi"}
        author_id={1}
        like_count={0}
        comment_count={0}
        is_shared={true}
        isMyPost={true}
      />
    );
    expect(component.find(".author_badge").text()).toEqual("Shared");
  });
  it("should show 'Shared' when prop is true", () => {
    const component = shallow(
      <PostItem
        id={1}
        title={"1"}
        author_name={"hi"}
        author_id={1}
        like_count={0}
        comment_count={0}
        is_shared={false}
        isMyPost={true}
      />
    );
    expect(component.find(".author_name").text()).toEqual("");
  });
});
