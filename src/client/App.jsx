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
import PropTypes from 'prop-types';

// import withLocalization from './hoc/withLocalization';

import { withTranslation } from 'react-i18next';
import i18n from './i18n';

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

    handleLogin = (user) => {
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

    render() {
        const {
            lang,
        } = this.state;

        const { i18n, t} = this.props;
        console.log('PROPS APP', this.props );

        return (
            <Router>
                <div className='wrapper-login' lang={lang}>
                    <div className='settings__item'>
                        <ReactFlagsSelect
                            className='ReactFlagsSelect'
                            countries={['GB', 'DE', 'AE', 'UA']}
                            customLabels={ {'GB': 'EN', 'DE': 'DE', 'AE': 'AE', 'UA': 'UA'} }
                            defaultCountry={lang.toUpperCase()}
                            onSelect={this.changeLanguage}
                        />
                    </div>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Login
                                user={this.state.user}
                                t={t}
                                handleLogin={this.handleLogin}
                            />)}
                        />
                        <Route exact path='/signin' render={() => (
                            <Signin
                                t={t}
                            />)}
                        />
                        <Route exact path='/main' render={props => (
                            <Main {...props}
                                t={t}
                                logOut={this.logOut}
                                toggleTheme={this.toggleTheme}
                            />)}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    // t: PropTypes.func.isRequired,
};

export default withTranslation('common')(App);
// export default withLocalization(App);