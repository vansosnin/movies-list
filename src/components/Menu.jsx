import React, { Component } from 'react';
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
        const { store } = this.props;
        const isLoggedIn = store.currentUser.isLoggedIn;

        return (
            <nav className="navbar navbar-dark bg-dark">
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
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={this._handleLogOut}
                        >
                            Развойти
                        </button>
                    )}
                </div>
            </nav>
        );
    }
}

Menu.propTypes = {
    store: PropTypes.shape({
        currentUser: PropTypes.object,
    }),
};

export default observer(Menu);
