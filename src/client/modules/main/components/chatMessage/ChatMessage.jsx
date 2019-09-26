import React from 'react';
import PropTypes from 'prop-types';

export const ChatMessage = (props) => {
    const {
        user,
        message,
    } = props;



    const getClassName = () => {
        if (message.type !== 'USER_MESSAGE') {
            return 'system-message';
        }

        if (user.name === message.username) {
            return 'outgoing';
        }

        return 'incoming';
    };

    // if (message._id !== message.user_id) {
        return (
            <div className={getClassName()}>{message.username}: {message.text}</div>
        );
    // }

    // return (
    //     <div className={getClassName()}>{message.text}</div>
    // );
};

// ChatMessage.propTypes = {
//     user: PropTypes.array.isRequired,
//     message: PropTypes.array.isRequired,
// };