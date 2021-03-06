import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import MoviesList from './MoviesList';
import '../shared/bootstrap.min.css';
import './global.css';

class App extends Component {
    render() {
        const { store } = this.props;
        return (
            <Fragment>
                <Menu currentUser={store.currentUser} />
                <MoviesList
                    movies={store.movies}
                    hideChecked={store.hideChecked}
                    toggleHideChecked={store.toggleHideChecked}
                    isLoggedIn={store.currentUser.isLoggedIn}
                    totalCount={store.totalCount}
                    watchedCount={store.watchedCount}
                    isAdmin={store.currentUser.isAdmin}
                    addMovie={store.addMovie}
                />
            </Fragment>
        );
    }
}

App.propTypes = {
    store: PropTypes.object,
};

export default observer(App);
