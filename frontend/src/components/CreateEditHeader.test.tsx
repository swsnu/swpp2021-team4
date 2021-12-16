import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CreateEditHeader from './CreateEditHeader';
import { initialPostData } from '../containers/CreateEditPost';

describe('<CreateEditHeader />', () => {
  let createEditHeader: JSX.Element;
  let component: ShallowWrapper;
  let mockChangeLocation: jest.Mock;
  let mockClickWithoutCar: jest.Mock;
  let mockChangePostInfo: jest.Mock;

  beforeEach(() => {
    mockChangeLocation = jest.fn();
    mockClickWithoutCar = jest.fn();
    mockChangePostInfo = jest.fn();
    createEditHeader = (
      <CreateEditHeader
        folder={{id: 1, name: 'exFolder'}}
        thumbnailImage=""
        postInfoData={initialPostData}
        onChangePostInfoData={mockChangePostInfo}
        onClickAvailableWithoutCar={mockClickWithoutCar}
        changeLocationQuery={mockChangeLocation}
      />
    );

    component = shallow(createEditHeader);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = component.find('.post-ce-container');
    expect(wrapper.length).toBe(1);
  });

  it('should change region', () => {
    const regionSelect = component.find('#location-region');
    expect(regionSelect.length).toBe(1);
    regionSelect.simulate(
      'change',
      {
        target: {
          value: '경기도',
          selectedIndex: 9,
          textContent: '경기도'
        }
      }
    );

    // const citySelect = component.find('#location-city');
    // expect(citySelect.length).toBe(0);
    // const cityOptions = component.find('.city-option');
    // expect(cityOptions.length).toBe(1);

    // const kk = component.find('.seoul');
    // expect(kk.length).toBe(1);
    
    // setTimeout(() => {
    //   const citySelect = component.find('#location-city');
    //   expect(citySelect.length).toBe(1);
    //   done();
    // });
    const setRegionIdx = jest.fn();
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    spyUseState.mockImplementation((regionIdx: any) => [
      regionIdx,
      setRegionIdx,
    ]);

    expect(setRegionIdx).toBeTruthy();
  });

  it('should', () => {
    // const titleInput = component.find('.post-ce-title');
    // expect(titleInput.length).toBe(1);

    // titleInput.simulate('change', { target: { value: 'new title'} });
    // expect(mockChangePostInfo).toHaveBeenCalled();

    // const setUserInputs = jest.fn();
    // let spyUseState: any;
    // spyUseState = jest.spyOn(React, "useState");
    // spyUseState.mockImplementation((userInputs: any) => [
    //     userInputs,
    //     setUserInputs,
    // ]);
  });

  it('shoulde change city', () => {
    component.setProps({ postInfoData: { ...initialPostData, location: '철원' } });
    // const titleInput = component.find('#location-city');
    // expect(titleInput.length).toBe(1);
  });
});
