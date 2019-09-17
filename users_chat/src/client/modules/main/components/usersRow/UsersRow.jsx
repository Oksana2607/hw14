import React from 'react';

export const UsersRow = (props) => {
  const { user } = props;

  return (
    <tr className="body">
      <td className="table__body-centred">
        <div className="table__body-statusActive" />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <button id="{user._id}" className="private_chat" onClick="handleUserClick(id)">Private Chat</button>
      </td>
    </tr>
  );
};
