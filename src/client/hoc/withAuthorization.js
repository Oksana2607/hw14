import React, { PureComponent } from 'react';

function withAuthorization(Component) {
    return class withAuthorization extends PureComponent {
        componentWillCheckLS() {
            const userValidate = JSON.parse(window.localStorage.getItem('user'));

            return !(userValidate === null || userValidate === '');
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