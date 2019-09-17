import React from 'react';

export const Chat = props => (
  <div className="users__chat chat" id="chat">
    <div className="chat__title">Chat</div>
    <div className="chat__body">
      <div className="chat__content" id="chatContent" />
      <div className="chat__footer">
        <input className="chat__input" id="message" type="text" />
        <button className="chat__button" id="sendBtn">Send</button>
      </div>
    </div>
  </div>
);
