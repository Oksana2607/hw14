import React from 'react';
import { UsersTable } from './components/usersTable';
import { Chat } from './components/chat';

export const Main = (props) => {
  const {
    users,
    addMessage,
    activeComponent,
    changeActiveModule,
    changeActiveComponent
  } = props;

  const handleClick = (componentName) => {
    changeActiveComponent(componentName);
  };

  const handleModule = (moduleName) => {
    changeActiveModule(moduleName);
  };

  return (
    <div className="wrapper">
      <div className="wrapper__header header">
        <h1 className="header__title">Users</h1>
      </div>
      <div className="wrapper__user user">
        <div className="user__data">
          <div className="user__data name" id="name">Name:</div>
          <div className="user__data email" id="email">Email:</div>
        </div>
        <div className="user__logout">
          <button className="user__logout logout" id="logoutBtn" onClick={() => handleModule('login')}>Log out</button>
        </div>
      </div>
      <div className="wrapper__users users">
        <div className="users__buttons">
          <div className="users__button button-users">
            <button className="button-users__btn" id="usersBtn" onClick={() => handleClick('usersTable')}>Users</button>
          </div>
          <div className="users__button button-chat">
            <button className="button-chat__btn" id="chatBtn" onClick={() => handleClick('chat')}>Chat</button>
          </div>
          <div className="users__button users-chat" id="usersChat" />
        </div>
        <div className="users__change" id="usersTable">
          {
            activeComponent === 'usersTable' && (
            <UsersTable
              users={users}
              activeComponent={activeComponent}
              changeActiveComponent={changeActiveComponent}
            />
            )
          }
          {
            activeComponent === 'chat' && (
            <Chat
              addMessage={addMessage}
            />
            )
          }
        </div>
        <div className="users__change" id="chatTable" />
      </div>
    </div>
  );
};
