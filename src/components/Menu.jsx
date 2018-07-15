import React, { PureComponent } from 'react';
import { Auth } from '../firebase/auth';

export class Menu extends PureComponent {
    _handleLogIn = () => {
        Auth.instance().signIn();
    };

    _handleLogOut = () => {
        Auth.instance().signOut();
    };

    render() {
        const isLoggedIn = !!Auth.instance().currentUser;

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
