import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Chat } from '../Chat';
import PropTypes from "prop-types";

const mockProps = {
    t: () => {},
    user: {},
    messages: [],
    addMessage: () => {},
    showEmojis: () => {},
    emojisMenu: () => {},
    closeEmojiMenu: () => {},
};

describe('Chat snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Chat {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});