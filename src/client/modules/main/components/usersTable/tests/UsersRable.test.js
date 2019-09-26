import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { UsersTable } from '../UsersTable';

const mockProps = {
    users: [],
    my_user: {},
    t: () => {},
    activeUsers: [],
    changeActiveComponent: () => {},
};

describe('UsersTable snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <UsersTable {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});