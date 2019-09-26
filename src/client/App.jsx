import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import './app.less';
import './matrix/themeLite.less';
import './matrix/themeDark.less';
import Main from './modules/main/Main.jsx';
import Login from './modules/login/Login.jsx';
import Signin from './modules/signin/SignIn.jsx';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import {withTranslation} from 'react-i18next';
import i18n from './i18n';
import PropTypes from 'prop-types';



class App extends Component {
    state = {
            user: {},
            lang: 'GB',
            // receiver: '',
            // messages: [],
            // allUsers: [],
            // theme: 'dark',
            // activeUsers: [],
            // activeModule: '',
            // activeComponent: 'usersTable',
            // emojiesMenu: false,
        };

    changeLanguage = (lang) => {
        this.setState({lang: lang});
        i18n.changeLanguage(lang);
    };

    // addUser = (user) => {
    //     console.log(user);
    //     this.setState(state => ({
    //         ...state,
    //         allUsers: [...state.allUsers, user],
    //     }));
    // };

    handleLogin = (user) => {
        console.log('handle_login',user);
        this.setState(state => ({
            ...state,
            user: user,
        }));


    };

    dialogWindowScrollDown = () => {
        const elem = document.getElementById('chatContent');
        console.log(elem);
        elem.scrollTop = elem.scrollHeight;
    };

    // changeActiveModule = (moduleName) => {
    //     this.setState(state => ({
    //         ...state,
    //         activeModule: moduleName,
    //     }));
    // };
    //
    // emojisMenu = () => {
    //     this.setState({
    //             emojisMenu: false,
    //         },
    //         () => document.removeEventListener('click', this.closeMenu)
    //     );
    // };
    // showEmojis = () => {
    //     this.setState({
    //             emojisMenu: true,
    //         },
    //         () => document.addEventListener('click', this.closeMenu)
    //     );
    // };
    //
    // closeMenu = () => {
    //     this.setState({
    //             emojisMenu: false,
    //         },
    //         () => document.removeEventListener('click', this.closeMenu)
    //     );
    // };

    render() {
        const {
            lang,
            activeModule,
        } = this.state;
        // console.log('render app state', this.state);
        return (
            <Router>
                <div className='wrapper-login' lang={lang}>
                    <div className='settings__item'>
                        <ReactFlagsSelect
                            className='ReactFlagsSelect'
                            countries={['GB', 'DE', 'AE', 'UA']}
                            customLabels={{'GB': 'EN', 'DE': 'DE', 'AE': 'AE', 'UA': 'UA'}}
                            defaultCountry={lang.toUpperCase()}
                            onSelect={this.changeLanguage}
                        />
                    </div>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Login
                                user={this.state.user}
                                t={this.props.t}
                                // changeActiveModule={this.changeActiveModule}
                                // changeActiveComponent={this.changeActiveComponent}
                                handleLogin={this.handleLogin}
                            />)}
                        />
                        <Route exact path='/signin' render={() => (
                            <Signin
                                t={this.props.t}
                                // changeActiveModule={this.changeActiveModule}
                                // addUser={this.addUser}
                            />)}
                        />
                        <Route exact path='/main' render={props => (
                            <Main {...props}
                                t={this.props.t}
                                // users={this.state.allUsers}
                                logOut={this.logOut}
                                // activeUsers={this.state.activeUsers}
                                // user={this.state.user}
                                // messages={this.state.messages}
                                // activeComponent={this.state.activeComponent}
                                // changeActiveModule={this.changeActiveModule}
                                // changeActiveComponent={this.changeActiveComponent}
                                // addMessage={this.addMessage}
                                toggleTheme={this.toggleTheme}
                                // emojisMenu={this.state.emojisMenu}
                                // closeMenu={this.closeMenu}
                                // addEmoji={this.addEmojis}
                                // showEmojis={this.showEmojis}
                            />)}
                        />
                    </Switch>
                </div>
            </Router>
        );


    }
}

App.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(App);