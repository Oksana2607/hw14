import React from 'react';

export const ChatMessage = (props) => {
  const { message, user } = props;
  return (
    <div className="outgoing">{ message.text }</div>
  );
};


// if (message.user !== user.name) {
//     return (
//         <div className="outgoing">{ message.text }</div>
//     );
// }
