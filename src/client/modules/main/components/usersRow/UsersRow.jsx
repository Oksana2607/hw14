import React from 'react';
import PropTypes from 'prop-types';
import {UsersTable} from '../usersTable';

export const UsersRow = (props) => {
    const {
        t,
        user,
        my_user,
        activeUsers,
        changeActiveComponent,
    } = props;

    const handleClick = (componentName) => {
        changeActiveComponent(componentName);
    };

    const isActive = activeUsers.find(item => item.user_id === user._id);

    const getClassName = () => {
        if (isActive) {
            return 'table__body-statusActive';
        }

        return 'table__body-statusOffline';
    };
    if (my_user.email !== user.email) {
        return (
            <tr className='body'>
                <td className='table__body-centred'>
                    <div className={getClassName()}/>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button id='{user._id}' className='private_chat'
                            onClick={() => handleClick('chat')}>{t('privateChat')}</button>
                </td>
            </tr>
        );
    } else {

        return null;
    }
};
UsersRow.propTypes = {
    t: PropTypes.func,
    user: PropTypes.object.isRequired,
    my_user: PropTypes.object.isRequired,
    activeUsers: PropTypes.array.isRequired,
    changeActiveComponent: PropTypes.func.isRequired,
};