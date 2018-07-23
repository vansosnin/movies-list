import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

class Movie extends PureComponent {
    _handleChange = (evt) => {
        const { movieId, setChecked } = this.props.movie;

        setChecked({ isChecked: evt.target.checked, movieId });
    };

    render() {
        const {
            title,
            movieId,
            isChecked,
            isDisabled,
            description,
        } = this.props.movie;

        return (
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={this._handleChange}
                    className="form-check-input"
                    id={movieId}
                    disabled={isDisabled}
                />
                <ReactMarkdown source={title} className="form-check-label" />
                <small className="form-text text-muted">
                    <ReactMarkdown source={description} />
                </small>
            </div>
        );
    }
}

Movie.propTypes = {
    movie: PropTypes.shape({
        movieId: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        isChecked: PropTypes.bool,
        isDisabled: PropTypes.bool,
        setChecked: PropTypes.func,
    }),
};

export default Movie;
