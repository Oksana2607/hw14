import React, { useState } from 'react';
import { ChatMessage } from '../chatMessage';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';

export const Chat = (props) => {
    const {
        t,
        user,
        messages,
        addMessage,
        showEmojis,
        emojisMenu,
    } = props;
    const [message, setMessage] = useState('');
    const handleClick = () => {
        // console.log(message);
        addMessage(message);
        setMessage('');
    };

    const addEmojis = (e) => {
        const emoji = e.native;
        setMessage(message + emoji);
    };

    return (
        <div className='users__chat chat' id='chat'>
            <div className='chat__title'>{t('chat')}</div>
            <div className='chat__body'>
                <div className='chat__content' id='chatContent'>
                    {messages.map(message => (
                        <ChatMessage
                            key={message._id}
                            message={message}
                            user={user}
                            emoji={message.emoji}
                        />
                    ))}
                </div>
                <div className='chat__footer'>
                    <input
                        type='text'
                        className='chat__input'
                        id='message'
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />
                    <button className='chat__button' id='sendBtn' onClick={handleClick}>{t('send')}</button>
                    {emojisMenu ?
                        <span className={'emojiPicker'}>
                        <Picker
                            onSelect={addEmojis}
                            emojiTootip={true}
                            title='weChat'
                        />
                        </span>
                        :
                        <p
                            onClick={showEmojis}
                            className='getEmojiButton'>
                            {String.fromCodePoint(0x1f60a)}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

Chat.propTypes = {
    t: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    messages: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired,
    showEmojis: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
};