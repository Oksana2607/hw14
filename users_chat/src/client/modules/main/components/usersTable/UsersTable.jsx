import React from 'react';
import { UsersRow } from '../usersRow';


export const UsersTable = (props) => {
  const {
    users,
    changeActiveComponent
  } = props;

  return (
    <div className="users__table" id="usersTable">
      <table className="users__table table" id="table">
        <thead className="table__header header">
          <tr className="header">
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th />
          </tr>
        </thead>
        <tbody className="table__body body">
          {users.map(item => (
            <UsersRow
              changeActiveComponent={changeActiveComponent}
              key={item._id}
              user={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
