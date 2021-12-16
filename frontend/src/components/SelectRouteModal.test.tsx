import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SelectRouteModal from './SelectRouteModal';
import { stubPostList } from '../test-utils/mocks';

describe('<SelectRouteModal />', () => {
  let mockSelectBtn: jest.Mock;
  let mockClickRouteBtn: jest.Mock;
  let mockClickCloseBtn: jest.Mock;
  let selectRouteModal: JSX.Element;
  let component: ShallowWrapper;

  beforeEach(() => {
    mockSelectBtn = jest.fn();
    mockClickRouteBtn = jest.fn();
    mockClickCloseBtn = jest.fn();
    
    selectRouteModal = (
      <SelectRouteModal
        cartRouteList={stubPostList}
        isModalVisible={true}
        clickedRoute={1}
        countModalClick={0}
        onClickRouteSubmitButton={mockSelectBtn}
        onClickRoute={mockClickRouteBtn}
        onClickCloseModal={mockClickCloseBtn}
      />
    );
    component = shallow(selectRouteModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render without errors', () => {
    const wrapper = component.find('.select-route-modal-container.true');
    expect(wrapper.length).toBe(1);
  });

  it('should call onClickSelectButton', () => {
    const selectBtn = component.find('.select-route-modal-select-btn');
    expect(selectBtn.length).toBe(1);

    selectBtn.simulate('click');
    expect(mockSelectBtn).toHaveBeenCalled();
  });

  it('should render route list', () => {
    let routeContainer = component.find('.route-container.selected');
    expect(routeContainer.length).toBe(1);

    routeContainer.simulate('click');
    expect(mockClickRouteBtn).toHaveBeenCalled();

    routeContainer = component.find('.route-container');
    expect(routeContainer.length).toBe(3);

    routeContainer.at(1).simulate('click');
    expect(mockClickRouteBtn).toHaveBeenCalled();
  });

  it('should call onClickRoute', () => {
    const createRouteBtn = component.find('.route-container.blank-route');
    expect(createRouteBtn.length).toBe(1);

    createRouteBtn.simulate('click');
    expect(mockClickRouteBtn).toHaveBeenCalled();
  });
});
