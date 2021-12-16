import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { history } from '../store/store';
import { getMockStore, stubInitialState } from '../test-utils/mocks';
import CreateEditPost from './CreateEditPost';
// import axios from 'axios';

const mockStore = getMockStore(stubInitialState);

jest.mock('../components/CreateEditHeader', () => {
  return jest.fn(() => {
    return (
      <div className="post-ce-container">

      </div>
    )
  })
});

jest.mock('../components/MyRoutesSection', () => {
  return jest.fn(() => {
    return (
      <div className="my-routes-container">

      </div>
    )
  })
});

jest.mock('../components/Map', () => {
  return jest.fn(() => {
    return (
      <div className="map-container">

      </div>
    )
  })
});

describe('<CreateEditPost />', () => {
  let createEditPost: JSX.Element;
  let component: ReactWrapper;
  let confirmSpy: jest.SpyInstance;

  beforeEach(() => {
    createEditPost = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <CreateEditPost folder={{id: 1, name: ''}} />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );
    
    component = mount(createEditPost);
    confirmSpy = jest.spyOn(window, 'confirm');
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(
      (callback) => callback(stubInitialState)
    );

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = component.find('.create-edit-post-container');
    expect(wrapper.length).toBe(1);
  });

  it('should call onClickRoute successfully', () => {
    // jest.spyOn(axios, 'get')
    //   .mockImplementation(() => {
    //     return new Promise((resolve) => {
    //       const result = {
    //         status: 200,
    //         data: {
    //           places: stubPlaceList,
    //           posts: stubPostList
    //         }
    //       };
    //       resolve(result);
    //     })
    //   });
    // 463-464
    const routeModalBtn = component.find('#route-change-button');
    routeModalBtn.simulate('click');

    let selectRouteModal = component.find('.select-route-modal-container.true');
    expect(selectRouteModal.length).toBe(1);

    let routeContainer = selectRouteModal.find('.route-header-title');
    expect(routeContainer.length).toBe(0); // 수정해야함
  });

  it('should call onClickCloseModal successfully', () => {
    // turn on the selectRouteModal
    const wrapper = component.find('#route-change-button');
    wrapper.simulate('click');
    let selectRouteModal = component.find('.select-route-modal-container.true');
    expect(selectRouteModal.length).toBe(1);

    const closeIcon = selectRouteModal.find('.close-modal-icon');
    expect(closeIcon.length).toBe(1);

    // check when window.confirm returns true
    confirmSpy.mockImplementation(() => true);
    closeIcon.simulate('click');
    selectRouteModal = component.find('.select-route-modal-container.false');
    expect(selectRouteModal.length).toBe(1);

    // check whether modal is automatically dismissed after first function call
    wrapper.simulate('click');
    selectRouteModal = component.find('.select-route-modal-container.true');
    expect(selectRouteModal.length).toBe(1);
    closeIcon.simulate('click');
    selectRouteModal = component.find('.select-route-modal-container.false');
    expect(selectRouteModal.length).toBe(1);

    // check when window.confirm returns false
    const secondComponent = mount(createEditPost);
    const secondWrapper = secondComponent.find('#route-change-button');
    secondWrapper.simulate('click');
    let secondModal = secondComponent.find('.select-route-modal-container.true');
    const secondCloseIcon = secondModal.find('.close-modal-icon');
    confirmSpy.mockImplementation(() => false);
    secondCloseIcon.simulate('click');

    secondModal = secondComponent.find('.select-route-modal-container.true');
    expect(secondModal.length).toBe(1);
  });

  it('should change routeModalVisible as true', () => {
    const wrapper = component.find('#route-change-button');
    expect(wrapper.length).toBe(1);

    wrapper.simulate('click');
    const selectRouteModal = component.find('.select-route-modal-container.true');
    expect(selectRouteModal.length).toBe(1);
  });
});
