import React from 'react';
import PropTypes from 'prop-types';

export const ChatMessage = (props) => {
    const {message, user} = props;

    // ChatMessage.propTypes = {
    //     users: PropTypes.array.isRequired,
    //     messages: PropTypes.string.isRequired,
    // };



  const getClassName = () => {
    if (message.type === 'SERVER_MESSAGE') {
      return 'system-message';
    }

        if (user.name === message.user) {
      return 'outgoing';
    }

    return 'incoming';
  };


    return (
            <div className={getClassName()}>{message.user}: {message.text}</div>
    );

};
