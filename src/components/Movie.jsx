import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Movie extends PureComponent {
    render() {
        const { title, description, movieId } = this.props;

        return (
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={movieId}
                    disabled="true"
                />
                <label className="form-check-label" for={movieId}>
                    {title}
                </label>
                <small className="form-text text-muted">{description}</small>
            </div>
        );
    }
}

Movie.propTypes = {
    movieId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default Movie;
