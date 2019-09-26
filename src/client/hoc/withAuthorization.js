import React from 'react';

function withAuthorization(Component) {
    return class withAuthorization extends React.Component {
        componentWillCheckLS() {
            const userValidate = JSON.parse(window.localStorage.getItem('user'));
            if (userValidate === null || userValidate === '') {
                return false;
            } else {
                return true;
            }
        }

        render() {
            if (this.componentWillCheckLS()) {
                return <Component {...this.props} />;
            } else {
                window.location.href = '/';
            }
        }
    }
}

export default withAuthorization;