import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Login from "../Login";

const mockProps = {
    t: () => {},
    addActiveUser: () => {},
    handleLogin: () => {},
};

describe('Login snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Login {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});