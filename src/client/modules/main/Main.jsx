// import React from 'react';
import {UsersTable} from './components/usersTable';
import {Chat} from './components/chat';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {withTranslation} from 'react-i18next';
import withAuthorization from '../../hoc/withAuthorization';

let ws = null;

class Main extends Component {

    state = {
        user: {},
        lang: 'GB',
        receiver: '',
        messages: [],
        allUsers: [],
        theme: 'light',
        activeUsers: [],
        activeModule: '',
        activeComponent: 'usersTable',
        emojiesMenu: false,
    };

    toggleTheme = () => {
        const theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.className = theme;
        this.setState({theme});

        document.getElementById('toggleBtn').className = theme;

        document.documentElement.setAttribute('data-theme', theme);
    };

    changeActiveComponent = (componentName) => {
        this.setState(state => ({
            ...state,
            activeComponent: componentName,
        }));
    };

    addMessage = (text) => {
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
    addMessageFromDB = (messageObj) => {
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

    getAllUsers = () => {
        fetch('http://localhost:8080/users', {
            method: 'POST', // или 'PUT'
            mode: 'cors',
            // credentials: 'include',
            body: JSON.stringify(this.state), // data может быть типа `string` или {object}!
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then((response) => {
                    this.addUsers(response);
                },
                (error) => {
                    alert(`Error321:${error}`);
                });
    };

    addUsers = (users) => {
        this.setState(state => ({
            ...state,
            allUsers: [...state.allUsers, ...users],
        }));
    };

    initWs = () => {
        if (ws) {
            ws.close();
        }

        ws = new WebSocket('ws://localhost:4000');

        ws.onopen = () => {
            // console.log('onopen');
            this.sendMessage({
                type: 'USER_CONNECT',
                user: this.state.user.name,
                user_id: this.state.user._id,
                text: '',
                receiver: 'all',
                time: new Date(),
            });
        };

        ws.onmessage = message => {
            // console.log('message');
            this.addMessageFromDB(JSON.parse(message.data));
        };

        ws.onclose = () => {
            // console.log('onclose', 2);
        };
    };

    sendMessage = (data) => {
        // console.log('sendMessage', data);
        ws.send(JSON.stringify(data));
    };

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
        const data = JSON.parse(window.localStorage.getItem('user'));
        this.setState(state => ({
            ...state,
            user: data,
        }));
    };

    async componentDidMount() {
        await this.initWs();
        await this.getUserFromLS();
        await this.changeActiveComponent('usersTable');
        await this.getAllUsers();
        await this.toggleTheme();
    }

    render() {
        const {t} = this.props;
        return (

            <div className='wrapper'>
                <div className='wrapper__header header'>
                    <h1 className='header__title'>{t('users')}</h1>
                </div>
                <div className='wrapper__user user'>
                    <div className='user__data'>
                        <div className='user__data name' id='nameActive'>{t('name')}: {this.state.user.name}</div>
                        <div className='user__data email' id='emailActive'>{t('eMail')}: {this.state.user.email}</div>
                    </div>
                    <div className='user__logout'>
                        <button className='user__logout toggleTheme' onClick={this.toggleTheme}>
                            <p id='toggleBtn'>
                                <i className='fas fa-moon'></i>
                                <i className='fas fa-sun'></i>
                            </p>
                        </button>
                        <button className='user__logout logout' id='logoutBtn'
                                onClick={this.logOut}>{t('logOut')}</button>
                    </div>
                </div>
                <div className='wrapper__users users'>
                    <div className='users__buttons'>
                        <div className='users__button button-users'>
                            <button className='button-users__btn' id='usersBtn'
                                    onClick={() => this.changeActiveComponent('usersTable')}>{t('users')}</button>
                        </div>
                        <div className='users__button button-chat'>
                            <button className='button-chat__btn' id='chatBtn'
                                    onClick={() => this.changeActiveComponent('chat')}>{t('chat')}</button>
                        </div>
                        <div className='users__button users-chat' id='usersChat'/>
                    </div>
                    <div className='users__change' id='usersTable'>
                        {
                            this.state.activeComponent === 'usersTable' && (
                                <UsersTable
                                    t={t}
                                    my_user={this.state.user}
                                    users={this.state.allUsers}
                                    activeUsers={this.state.activeUsers}
                                    activeComponent={this.state.activeComponent}
                                    changeActiveComponent={this.changeActiveComponent}
                                />
                            )
                        }
                        {
                            this.state.activeComponent === 'chat' && (
                                <Chat
                                    t={t}
                                    addMessage={this.addMessage}
                                    messages={this.state.messages}
                                    user={this.state.user}
                                    emojisMenu={this.state.emojisMenu}
                                    showEmojis={this.showEmojis}
                                    closeMenu={this.closeEmojiMenu}
                                />
                            )
                        }
                    </div>
                    <div className='users__change' id='chatTable'/>
                </div>
            </div>
        );
    }
}
// Main.propTypes = {
//     t: PropTypes.func.isRequired,
//     users: PropTypes.array.isRequired,
//     logOut: PropTypes.func.isRequired,
//     messages: PropTypes.array.isRequired,
//     addMessage: PropTypes.func.isRequired,
//     user: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//     }).isRequired,
//     toggleTheme: PropTypes.func.isRequired,
//     activeUsers: PropTypes.array.isRequired,
//     activeComponent: PropTypes.string.isRequired,
//     changeActiveModule: PropTypes.func.isRequired,
//     changeActiveComponent: PropTypes.func.isRequired,
//     addEmojis: PropTypes.func.isRequired,
//     emojisMenu: PropTypes.func.isRequired,
//     showEmojis: PropTypes.func.isRequired,
//     closeMenu: PropTypes.func.isRequired,
// };

// export default React.memo(withTranslation('common')(Main));
export default withAuthorization(React.memo(Main));