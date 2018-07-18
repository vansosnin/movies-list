import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Auth } from '../firebase/auth';

class Menu extends Component {
    _handleLogIn = () => {
        Auth.instance().signIn();
    };

    _handleLogOut = () => {
        Auth.instance().signOut();
    };

    render() {
        const { currentUser } = this.props;
        const { isLoggedIn, username } = currentUser;

        return (
            <nav className="navbar navbar-dark bg-dark justify-content-end">
                <div className="nav-item">
                    {!isLoggedIn ? (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this._handleLogIn}
                        >
                            Войти
                        </button>
                    ) : (
                        <Fragment>
                            <span
                                className="navbar-text"
                                style={{ marginRight: '10px' }}
                            >
                                Привет, {username}
                            </span>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={this._handleLogOut}
                            >
                                Развойти
                            </button>
                        </Fragment>
                    )}
                </div>
            </nav>
        );
    }
}

Menu.propTypes = {
    currentUser: PropTypes.object,
};

export default observer(Menu);
