import React, { Component } from 'react';
import './app.less';
import './matrix/themeLite.less';
import './matrix/themeDark.less';
import Main from './modules/main/Main.jsx';
import Login from './modules/login/Login.jsx';
import Signin from './modules/signin/SignIn.jsx';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { withTranslation } from 'react-i18next';
import i18n from './i18n';
import PropTypes from 'prop-types';

let ws = null;

class App extends Component {
    state = {
        _user: {},
        lang: 'GB',
        _receiver: '',
        _messages: [],
        _allUsers: [],
        theme: 'light',
        _activeUsers: [],
        activeModule: 'login',
        activeComponent: 'login',
        emojiesMenu: false,
    };

    toggleTheme = () => {
        const theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.className = theme;
        this.setState({ theme });

            document.getElementById('toggleBtn').className = theme;

        document.documentElement.setAttribute('data-theme', theme);
    };

    changeActiveComponent = (componentName) => {
        this.setState(state => ({
            ...state,
            activeComponent: componentName,
        }));
    };

    changeLanguage = (lang) => {
        this.setState({ lang: lang });
        i18n.changeLanguage(lang);
    };

    addUsers = (users) => {
        console.log(users);
        this.setState(state => ({
            ...state,
            _allUsers: [...state._allUsers, ...users],
        }));
    };

    addUser = (user) => {
        console.log(user);
        this.setState(state => ({
            ...state,
            _allUsers: [...state._allUsers, user],
        }));
    };

    handleLogin = (user) => {
        this.setState(state => ({
            ...state,
            _user: user,
        }));

        this.initWs();
    };

    logOut = () => {
        if (ws) {
            ws.close();
            ws = null;
        }

        this.changeActiveModule('login');
    };

    dialogWindowScrollDown = () => {
        const elem = document.getElementById('chatContent');
        console.log(elem);
        elem.scrollTop = elem.scrollHeight;
    };

    addMessage = (text) => {
        const message = {
            type: 'USER_MESSAGE',
            username: this.state._user.name,
            text,
            user_id: this.state._user._id,
            receiver: 'all',
            time: new Date(),
        };

        this.setState(state => ({
            ...state,
            _messages: [...state._messages, message],
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
                    _activeUsers: messageObj.text,
                }));
                break;
            default:
                this.setState(state => ({
                    ...state,
                    _messages: [...state._messages, messageObj],
                }));
        }
        // this.dialogWindowScrollDown();
    };

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        fetch('/users', {
            method: 'POST', // или 'PUT'
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(this.state), // data может быть типа `string` или {object}!
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then((response) => {
                    this.addUsers(response);
                },
                (error) => {
                    alert(`Error:${error}`);
                });
    };

    initWs = () => {
        if (ws) {
            ws.close();
        }

        ws = new WebSocket('ws://localhost:4000');
        ws.onopen = () => {
            console.log('onopen');
            this.sendMessage({
                type: 'USER_CONNECT',
                user: this.state._user.name,
                user_id: this.state._user._id,
                text: '',
                receiver: 'all',
                time: new Date(),
            });
        };

        ws.onmessage = message => {
            this.addMessageFromDB(JSON.parse(message.data));
        };

        ws.onclose = () => {
            // console.log('onclose', 2);
        };
    };

    sendMessage = (data) => {
        console.log('sendMessage', data);
        ws.send(JSON.stringify(data));
    };

    changeActiveModule = (moduleName) => {
        this.setState(state => ({
            ...state,
            activeModule: moduleName,
        }));
    };

    emojisMenu = () => {
        this.setState({
                emojisMenu: false,
            },
            () => document.removeEventListener('click', this.closeMenu)
        );
    };
    showEmojis = () => {
        this.setState({
                emojisMenu: true,
            },
            () => document.addEventListener('click', this.closeMenu)
        );
    };

    closeMenu = () => {
        this.setState({
                emojisMenu: false,
            },
            () => document.removeEventListener('click', this.closeMenu)
        );
    };

    render() {
        const {
            lang,
            activeModule,
        } = this.state;

        return (
            <div className='wrapper-login' lang={lang}>
                <div id='loader'>
                    <progress id='progress_loader' value='0' max='100'/>
                    <output htmlFor='progress_loader'/>
                </div>
                <div className='settings__item'>
                    <ReactFlagsSelect
                        className = 'ReactFlagsSelect'
                        countries = {['GB', 'DE', 'AE', 'UA']}
                        customLabels = {{ 'GB': 'EN', 'DE': 'DE', 'AE': 'AE', 'UA': 'UA' }}
                        defaultCountry = {lang.toUpperCase()}
                        onSelect={this.changeLanguage}
                    />
                </div>
                {
                    activeModule === 'signIn' &&
                    <Signin
                        t={this.props.t}
                        changeActiveModule={this.changeActiveModule}
                        addUser={this.addUser}
                    />

                }
                {
                    activeModule === 'login' &&
                    <Login
                        t={this.props.t}
                        changeActiveModule={this.changeActiveModule}
                        changeActiveComponent={this.changeActiveComponent}
                        handleLogin={this.handleLogin}
                    />

                }
                {
                    activeModule === 'main' &&
                    <Main
                        t={this.props.t}
                        users={this.state._allUsers}
                        logOut={this.logOut}
                        activeUsers={this.state._activeUsers}
                        user={this.state._user}
                        messages={this.state._messages}
                        activeComponent={this.state.activeComponent}
                        changeActiveModule={this.changeActiveModule}
                        changeActiveComponent={this.changeActiveComponent}
                        addMessage={this.addMessage}
                        toggleTheme={this.toggleTheme}
                        emojisMenu={this.state.emojisMenu}
                        closeMenu={this.closeMenu}
                        addEmoji={this.addEmojis}
                        showEmojis={this.showEmojis}
                    />
                }
            </div>
        );
    }
}

App.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(App);