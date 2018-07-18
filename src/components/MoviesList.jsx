import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Movie from './Movie';

class MoviesList extends Component {
    render() {
        const { movies } = this.props;

        if (!movies || !movies.length) {
            return null;
        }

        return (
            <main className="container">
                {movies.map((movie) => (
                    <Movie key={movie.movieId} {...movie} />
                ))}
            </main>
        );
    }
}

MoviesList.propTypes = {
    movies: PropTypes.array,
};

export default observer(MoviesList);
