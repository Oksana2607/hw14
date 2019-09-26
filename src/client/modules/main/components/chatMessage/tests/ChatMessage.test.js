import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ChatMessage } from '../ChatMessage';

const mockProps = {
    user: {},
    message: {},    
};

describe('ChatMessage snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ChatMessage {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});