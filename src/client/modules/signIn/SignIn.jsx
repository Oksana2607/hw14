import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SignIn extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    handleClick = async () => {
        await this.signIn();
    };

    validateForm() {
        return this.state.email.length > 0
            && this.state.password.length > 0
            && this.state.password === this.state.confirmPassword
            && this.state.name.length > 0;
    }

    signIn = async () => {
        const data = await fetch('http://localhost:8080/signInUser', {
            method: 'POST', // или 'PUT'
            mode: 'cors',
            body: JSON.stringify(this.state), // data может быть типа `string` или {object}!
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.text())
            .then(
                async (result) => {
                    alert(await result);
                    window.location.href = '/';
                },
                async (error) => {
                    alert(`Error:${await JSON.parse(error)}`);
                },
            );
    };

    render() {
        const {t} = this.props;

        return (
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
                <form id='signIn' className='form__sing-in' onSubmit={this.handleSubmit}>
                    <div className='form__sing-in sign-in'>
                        <div className='sign-in__Name form_block'>
                            <label htmlFor='name' className='input-label'>{t('name')}</label>
                            <input
                                type='text'
                                id='name'
                                placeholder={t('name')}
                                required
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='sign-in__Email form_block'>
                            <label
                                htmlFor='email'
                                className='input-label'
                            >
                                {t('yourEmail')}
                            </label>
                            <input
                                type='email'
                                id='email'
                                placeholder={t('yourEmail')}
                                required
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='sign-in__password form_block'>
                            <label
                                htmlFor='password'
                                className='input-label'
                            >
                                {t('password')}
                            </label>
                            <input
                                type='password'
                                id='password'
                                placeholder={t('password')}
                                required
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='sign-in__confirmPassword form_block'>
                            <label
                                htmlFor='confirm_password'
                                className='input-label'
                            >
                                {t('confirmPassword')}
                            </label>
                            <input
                                type='password'
                                id='confirmPassword'
                                placeholder={t('confirmPassword')}
                                required
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='form__buttonSubmit buttonSubmit'>
                            <button
                                className='buttonSubmit__sign-in submit__button'
                                id='submitBtnSignIn'
                                onClick={this.handleClick}
                                disabled={!this.validateForm()}
                            >
                                {t('submit')}
                            </button>
                        </div>
                        <div className='form__error' id='error'/>
                    </div>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    t: PropTypes.func.isRequired,
};