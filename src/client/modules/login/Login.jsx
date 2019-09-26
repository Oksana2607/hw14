import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    setToLocalStorage = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    signUp = async () => {
        const data = await fetch('http://localhost:8080/auth', {
            method: 'POST', // или 'PUT'
            mode: 'cors',
            body: JSON.stringify(this.state), // data может быть типа `string` или {object}!
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            // await this.setToLocalStorage(await data.json());
            // window.location.href = '/main';

            .then(async res => {
                // console.log(await res.json())
                await this.setToLocalStorage(await res.json());
                window.location.href = '/main';
            })
            .catch(error => {
                alert('login error');
            })
    };

    render() {
        const {t} = this.props;

        return (
            <div className='wrapper-login'>
                <div className='container' id='container'>
                    <div className='container__button' action='#'>
                        <a
                            className='button__log-in button'
                            href='/'
                        >
                            {t('login')}
                        </a>
                        <a
                            className='button__log-in button'
                            href='/signin'
                        >
                            {t('signIn')}
                        </a>
                    </div>
                    <form className='container-log-in' id='logIn' onSubmit={this.handleSubmit}>
                        <div className='form__log-in log-in'>
                            <div className='log-in__Email form_block'>
                                <label htmlFor='email_log' className='input-label'>{t('yourEmail')}</label>
                                <input
                                    type='email_log'
                                    id='email'
                                    placeholder={t('yourEmail')}
                                    required
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='log-in__password form_block'>
                                <label htmlFor='password_log' className='input-label'>{t('password')}</label>
                                <input
                                    type='password'
                                    id='password'
                                    placeholder={t('password')}
                                    required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className='form__buttonSubmit buttonSubmit'>
                            <button
                                className='buttonSubmit__log-in submit__button'
                                id='submitBtn'
                                onClick={this.signUp}
                            >
                                {t('submit')}
                            </button>
                        </div>
                        <div className='form__error' id='error'/>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    t: PropTypes.func.isRequired,
    addActiveUser: PropTypes.func,
    handleLogin: PropTypes.func.isRequired,
};