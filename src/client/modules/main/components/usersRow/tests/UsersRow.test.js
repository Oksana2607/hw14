import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { UsersRow } from '../UsersRow';

const mockProps = {
    user: {},
    my_user: {},
    t: () => {},
    activeUsers: [],
    changeActiveComponent: () => {},
};

describe('UsersRow snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <UsersRow {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});