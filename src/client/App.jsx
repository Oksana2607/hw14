import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import './app.less';
import Main from './modules/main/Main.jsx';
import Login from './modules/login/Login.jsx';
import SignIn from './modules/signin/SignIn.jsx';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import PropTypes from 'prop-types';

import withLocalization from './hoc/withLocalization';

class App extends Component {
    static propTypes = {
        t: PropTypes.func.isRequired,
        lang: PropTypes.string.isRequired,
    };

    state = {
        user: {},
        lang: this.props.lang,
    };

     changeLanguage = lang => {
        const { i18n } = this.props;

        this.setState(state => ({
            ...state,
            lang,
        }));
        this.setToLocalStorage('lang', lang);
        i18n.changeLanguage(lang);
    };

    loadLanguageFromLS = () => {
        const lang = this.getFromLocalStorage('lang');
        if (lang !== ''){
            this.changeLanguage(lang);
        }else {
            this.changeLanguage('GB');
        }
    };

    setToLocalStorage = (item, string) => {
        if (string) {
            localStorage.setItem(item, string);
        }
    };

    getFromLocalStorage = (item) => {
        let data = window.localStorage.getItem(item);
        if (data) return data
    };


    handleLogin = user => {
        this.setState(state => ({
            ...state,
            user,
        }));
    };

    // dialogWindowScrollDown = () => {
    //     const elem = document.getElementById('chatContent');
    //     console.log(elem);
    //     elem.scrollTop = elem.scrollHeight;
    // };

    componentDidMount() {
        this.loadLanguageFromLS();
    }

    render() {
        const { t } = this.props;
        const {
            user,
            lang
        } = this.state;

        return (
            <Router>
                <div className='wrapper-login' lang={lang}>
                    <div className='settings__item'>
                        <ReactFlagsSelect
                            className='ReactFlagsSelect'
                            countries = {['GB', 'DE', 'AE', 'UA']}
                            customLabels = {{'GB': 'EN', 'DE': 'DE', 'AE': 'AE', 'UA': 'UA'}}
                            onSelect = {this.changeLanguage}
                            defaultCountry = {lang}
                        />
                    </div>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Login
                                user={user}
                                t={t}
                                handleLogin={this.handleLogin}
                            />)}
                        />
                        <Route exact path='/signin' render={() => (
                            <SignIn
                                t={t}
                            />)}
                        />
                        <Route exact path='/main' render = {props => (
                            <Main {...props}
                                t={t}
                            />)}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withLocalization(App);