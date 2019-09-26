import React from 'react';
import { I18nextProvider, withTranslation } from 'react-i18next';
import i18n from './../i18n';

export default function withLocalization(Component) {
    class withLocalization extends React.Component {
        render() {
            let lang = window.localStorage.getItem('lang');

            if (lang === null) lang = 'GB';
            this.props = {
                ...this.props,
                lang,
            };

            if (Component) {
                return (
                    <I18nextProvider i18n = {i18n}>
                        <Component {...this.props}/>
                    </I18nextProvider>
                );
            }
        }
    }

    return withTranslation('common')(withLocalization);
}