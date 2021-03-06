import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Movie from './Movie';
import AddMovieForm from './AddMovieForm';

class MoviesList extends Component {
    _resolveHideChecked = (evt) => {
        this.props.toggleHideChecked(evt.target.name === 'HideChecked');
    };

    render() {
        const {
            movies,
            hideChecked,
            isLoggedIn,
            totalCount,
            watchedCount,
            isAdmin,
            addMovie,
        } = this.props;

        if (!movies || !movies.length) {
            return null;
        }

        return (
            <main className="container py-4">
                {isLoggedIn && (
                    <Fragment>
                        <div className="btn-group">
                            <button
                                type="button"
                                className={cx('btn', {
                                    active: hideChecked,
                                    'btn-success': hideChecked,
                                    'btn-secondary': !hideChecked,
                                })}
                                name="HideChecked"
                                onClick={this._resolveHideChecked}
                            >
                                Спрятать просмотренные
                            </button>
                            <button
                                type="button"
                                className={cx('btn', {
                                    active: !hideChecked,
                                    'btn-success': !hideChecked,
                                    'btn-secondary': hideChecked,
                                })}
                                name="ShowChecked"
                                onClick={this._resolveHideChecked}
                            >
                                Не прятать просмотренные
                            </button>
                        </div>
                        <span className="badge badge-secondary ml-2">
                            {watchedCount}/{totalCount}
                        </span>
                    </Fragment>
                )}

                {!isLoggedIn && (
                    <div className="alert alert-primary">
                        Залогинься, чтобы отчекивать фильмы
                    </div>
                )}

                <div className="py-4">
                    {movies.map(
                        (movie) =>
                            hideChecked && movie.isChecked ? null : (
                                <Movie
                                    key={movie.movieId}
                                    movie={movie}
                                    isDisabled={!isLoggedIn}
                                    isAdmin={isAdmin}
                                />
                            )
                    )}
                </div>

                {isAdmin && <AddMovieForm addMovie={addMovie} />}
            </main>
        );
    }
}

MoviesList.propTypes = {
    movies: PropTypes.array,
    hideChecked: PropTypes.bool,
    toggleHideChecked: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    totalCount: PropTypes.number,
    watchedCount: PropTypes.number,
    isAdmin: PropTypes.bool,
    addMovie: PropTypes.func,
};

export default observer(MoviesList);
