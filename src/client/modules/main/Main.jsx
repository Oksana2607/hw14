import { UsersTable } from './components/usersTable';
import { Chat } from './components/chat';
import React, { PureComponent } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import PropTypes from 'prop-types';

let ws = null;

class Main extends PureComponent {
    state = {
        user: {},
        receiver: '',
        messages: [],
        allUsers: [],
        theme: 'light',
        activeUsers: [],
        activeModule: '',
        activeComponent: 'usersTable',
        emojiesMenu: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const { theme } = this.state;
        const { theme: prevTheme } = prevState;

        if (prevTheme !== theme) {
            document.documentElement.className = theme;
            document.getElementById('toggleBtn').className = theme;
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    async componentDidMount() {
        await this.initWs();
        await this.getUserFromLS();
        await this.changeActiveComponent('usersTable');
        await this.getAllUsers();
        await this.toggleTheme();
    }

    toggleTheme = () => {
        const theme = this.state.theme === 'light' ? 'dark' : 'light';

        this.setState(state => ({
            ...state,
            theme,
        }));
    };

    changeActiveComponent = componentName => {
        this.setState(state => ({
            ...state,
            activeComponent: componentName,
        }));
    };

    addMessage = text => {
        const message = {
            type: 'USER_MESSAGE',
            username: this.state.user.name,
            text,
            user_id: this.state.user._id,
            receiver: 'all',
            time: new Date(),
        };

        this.setState(state => ({
            ...state,
            messages: [...state.messages, message],
        }));

        this.sendMessage(message);
        // this.dialogWindowScrollDown();
    };

    //добавляем сообщения из базы и чужие сообщения
    addMessageFromDB = messageObj => {
        switch (messageObj.type) {
            case 'ACTIVE_USERS':
                this.setState(state => ({
                    ...state,
                    activeUsers: messageObj.text,
                }));
                break;
            default:
                this.setState(state => ({
                    ...state,
                    messages: [...state.messages, messageObj],
                }));
        }
        // this.dialogWindowScrollDown();
    };

    getAllUsers = async () => {
        const data = await fetch('http://localhost:8080/users', {
            method: 'POST', // или 'PUT'
            mode: 'cors',
            // credentials: 'include',
            body: JSON.stringify(this.state), // data может быть типа `string` или {object}!
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await this.addUsers(await data.json());
    };

    addUsers = users => this.setState(state => ({
            ...state,
            allUsers: [...state.allUsers, ...users],
        }));

    initWs = () => {
        ws && ws.close();

        ws = new WebSocket('ws://localhost:4000');

        ws.onopen = () => {
            this.sendMessage({
                type: 'USER_CONNECT',
                user: this.state.user.name,
                user_id: this.state.user._id,
                text: '',
                receiver: 'all',
                time: new Date(),
            });
        };

        ws.onmessage = message => this.addMessageFromDB(JSON.parse(message.data));

        ws.onclose = () => {};
    };

    sendMessage = data => ws.send(JSON.stringify(data));

    logOut = () => {
        if (ws) {
            ws.close();
            ws = null;
        }

        localStorage.setItem('user', '');
        window.location.href = '/';
    };

    emojisMenu = () => {
        this.setState({
                emojisMenu: false,
            },
            () => document.removeEventListener('click', this.closeEmojiMenu)
        );
    };

    showEmojis = () => {
        this.setState({
                emojisMenu: true,
            },
            () => document.addEventListener('click', this.closeEmojiMenu)
        );
    };

    closeEmojiMenu = () => {
        this.setState({
                emojisMenu: false,
            },
            () => document.removeEventListener('click', this.closeEmojiMenu)
        );
    };

    getUserFromLS = () => {
        const user = JSON.parse(window.localStorage.getItem('user'));

        this.setState(state => ({
            ...state,
            user,
        }));
    };

    render() {
        const { t } = this.props;
        const {
            user,
            activeComponent,
        } = this.state;

        return (
            <div className='wrapper'>
                <div className='wrapper__header header'>
                    <h1 className='header__title'>{ t('users') }</h1>
                </div>
                <div className='wrapper__user user'>
                    <div className='user__data'>
                        <div className='user__data name' id='nameActive'>{ t('name') }: { user.name }</div>
                        <div className='user__data email' id='emailActive'>{ t('eMail') }: { user.email }</div>
                    </div>
                    <div className='user__logout'>
                        <button className='user__logout toggleTheme' onClick = {this.toggleTheme}>
                            <p id='toggleBtn'>
                                <i className='fas fa-moon'/>
                                <i className='fas fa-sun'/>
                            </p>
                        </button>
                        <button id='logoutBtn'
                                onClick = {this.logOut}
                                className='user__logout logout'
                                children = {t('logOut')}
                        />
                    </div>
                </div>
                <div className='wrapper__users users'>
                    <div className='users__buttons'>
                        <div className='users__button button-users'>
                            <button id='usersBtn'
                                    className='button-users__btn'
                                    onClick = {() => this.changeActiveComponent('usersTable')}
                                    children={t('users')}
                            />
                        </div>
                        <div className='users__button button-chat'>
                            <button id='chatBtn'
                                    className='button-chat__btn'
                                    onClick={() => this.changeActiveComponent('chat')}
                                    children={t('chat')}
                            />
                        </div>
                        <div id='usersChat' className='users__button users-chat'/>
                    </div>
                    <div id='usersTable' className='users__change'>
                        {
                            activeComponent === 'usersTable' ? (
                                <UsersTable
                                    t={t}
                                    my_user={this.state.user}
                                    users={this.state.allUsers}
                                    activeUsers={this.state.activeUsers}
                                    activeComponent={this.state.activeComponent}
                                    changeActiveComponent={this.changeActiveComponent}
                                />
                            ) : null
                        }
                        {
                            activeComponent === 'chat' ? (
                                <Chat
                                    t={t}
                                    addMessage={this.addMessage}
                                    messages={this.state.messages}
                                    user={this.state.user}
                                    emojisMenu={this.state.emojisMenu}
                                    showEmojis={this.showEmojis}
                                    closeMenu={this.closeEmojiMenu}
                                />
                            ) : null
                        }
                    </div>
                    <div id='chatTable' className='users__change'/>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withAuthorization(Main);