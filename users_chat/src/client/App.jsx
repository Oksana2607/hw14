import React, { Component } from 'react';
import './app.less';

import Main from './modules/main/Main.jsx';
import Login from './modules/login/Login.jsx';
import SignIn from './modules/signIn/SignIn.jsx';

export default class App extends Component {
    state = {
        _user: {
            _id: '5d7b70327bc20e0fe81f4ebe',
            name: 'alex',
            email: 'alex456@gmail.com',
            password: '145',
            isActive: true,
        },
        _messages: [
            { type: 'SERVER_MESSAGE', text: 'Welcome!', time: '2019-09-17T05:56:09.241Z' },
            {
                _id: '5d7f25fb3b75502078a5375a',
                text: 'Привет',
                user: 'Oksana',
                time: '2019-09-16T06:04:43.164Z',
                user_id: '5d7b70857bc20e0fe81f4ec4',
                receiver_id: '',
            },
            {
                _id: '5d7f26033b75502078a5375b',
                text: 'Как твои дела?',
                user: 'Oksana',
                time: '2019-09-16T06:04:51.403Z',
                user_id: '5d7b70857bc20e0fe81f4ec4',
                receiver_id: '',
            },
            {
                _id: '5d7f260f3b75502078a5375c',
                text: 'Все ок',
                user: 'alex',
                time: '2019-09-16T06:05:03.258Z',
                user_id: '5d7b70327bc20e0fe81f4ebe',
                receiver_id: '',
            },
        ],
        _allUsers: [
            {
                _id: '5d7b70327bc20e0fe81f4ebe',
                name: 'alex',
                email: 'alex456@gmail.com',
                password: '145',
                isActive: true,
            },
            {
                _id: '5d7b70487bc20e0fe81f4ec1',
                name: 'Никита Кочерга',
                email: 'edvardkenuey1718@gmail.com',
                password: '123',
                isActive: false,
            },
            {
                _id: '5d7b70857bc20e0fe81f4ec4',
                name: 'Oksana',
                email: 'oksana@gmail.com',
                password: '123',
                isActive: false,
            },
            {
                _id: '5d7b7da8582acb1d3cb8b385',
                name: 'Никита',
                email: 'edvard18@gmail.com',
                password: '123',
                isActive: false,
            },
        ],
        _activeUsers: [
            {
                _id: '5d7b70327bc20e0fe81f4ebe',
                name: 'alex',
                email: 'alex456@gmail.com',
                password: '145',
                isActive: true,
            }
        ],
        _receiver_id: '',
        activeModule: 'main',
        activeComponent: 'chat',
    };

    changeActiveComponent = componentName => {
        this.setState(state => ({
            ...state,
            activeComponent: componentName,
        }));
    };

    addActiveUser = user => {
        this.setState(state => ({
            ...state,
            _activeUsers: [...state._activeUsers, user],
        }));
    };

    addUser = user => {
        this.setState(state => ({
            ...state,
            _allUsers: [...state._allUsers, user],
        }));
    };

    addMessage = text => {
        const message = {
            _id: this.state._user._id,
            user: this.state._user.name,
            text,
            user_id: this.state._user._id,
            receiver_id: this.state._receiver_id,
            time: new Date(),
        };

        this.setState(state => ({
            ...state,
            _messages: [...state._messages, message],
        }));
    };

    changeActiveModule = moduleName => {
        this.setState(state => ({
            ...state,
            activeModule: moduleName
        }));
    };

    render() {
        const { activeModule } = this.state;

        return (
            <div className='wrapper-login'>
                <div id='loader'>
                    <progress id='progress_loader' value='0' max='100'/>
                    <output htmlFor='progress_loader'/>
                </div>
                {
                    activeModule === 'signIn' && (
                        <SignIn
                            addUser = {this.addUser}
                            changeActiveModule = {this.changeActiveModule}
                        />
                    )
                }
                {
                    activeModule === 'login' && (
                        <Login
                            addActiveUser = {this.addActiveUser}
                            changeActiveModule = {this.changeActiveModule}
                            changeActiveComponent = {this.changeActiveComponent}
                        />
                    )
                }
                {
                    activeModule === 'main' && (
                        <Main
                            user = {this.state._user}
                            users = {this.state._allUsers}
                            messages={this.state._messages}
                            addMessage = {this.addMessage}
                            activeComponent={this.state.activeComponent}
                            changeActiveModule = {this.changeActiveModule}
                            changeActiveComponent = {this.changeActiveComponent}
                        />
                    )
                }
            </div>
        );
    }
}
