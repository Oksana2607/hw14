import React from 'react';
import {UsersRow} from '../usersRow/UsersRow.jsx';
import PropTypes from 'prop-types';

export const UsersTable = (props) => {
    const {
        t,
        users,
        activeUsers,
        changeActiveComponent,
    } = props;

    return (
        <div className='users__table' id='usersTable'>
            <table className='users__table table' id='table'>
                <thead className='table__header header'>
                <tr className='header'>
                    <th>{t('status')}</th>
                    <th>{t('name')}</th>
                    <th>{t('eMail')}</th>
                    <th/>
                </tr>
                </thead>
                <tbody className='table__body body'>
                {users.map(item =>
                    <UsersRow
                        t={t}
                        key={item._id}
                        user={item}
                        activeUsers={activeUsers}
                        changeActiveComponent={changeActiveComponent}
                    />
                )}
                </tbody>
            </table>
        </div>
    );
};

UsersTable.propTypes = {
    t: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeActiveComponent: PropTypes.func.isRequired,
    activeUsers: PropTypes.array.isRequired,
};