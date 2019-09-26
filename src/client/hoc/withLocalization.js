import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';

function withLocalization(Component) {

    return class withLocalization extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                i18n,
                withTranslation,
            };
        }

        render() {
            console.log(this.state, '...state1');
            return <Component {...this.props} {...this.state} />;
        }
    }
}

export default withTranslation()(withLocalization);