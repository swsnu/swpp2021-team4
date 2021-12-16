import React from 'react';
import { mount } from 'enzyme';
import FolderList from './FolderList';

const folders = [
    {
        id: 1,
        name: "ex1",
    },
    {
        id: 2,
        name: "ex2",
    },
    {
        id: 3,
        name: "ex3",
    }
]

describe('<FolderList />', () => {
    const spyOnClickFolder = jest.fn();
    const spyOnClickEditFolder = jest.fn();
    const spyOnChangeEditFolder = jest.fn();
    const spyOnPressEnterEditFolder = (folder: any) => { jest.fn(folder); };

    it('should render without errors', () => {
        const component = mount(<FolderList
            folders={folders}
            editText='edit'
            selectedFolder={folders[0]}
            editingFolder={folders[1]}
            onClickFolder={spyOnClickFolder}
            onClickEditFolder={spyOnClickEditFolder}
            onChangeEditFolder={spyOnChangeEditFolder}
            onPressEnterEditFolder={spyOnPressEnterEditFolder} />);
        let wrapper = component.find('.folder-list-container');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.edit-folder-container');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.folder-container.selected');
        wrapper.simulate("click");
        expect(spyOnClickFolder).toHaveBeenCalledTimes(1);
        wrapper = component.find('.icon').at(0);
        wrapper.simulate("click");
        wrapper.simulate("mouseover");
        wrapper.simulate("mouseleave");
    });
})
