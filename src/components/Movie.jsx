import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Movie extends PureComponent {
    render() {
        const { title, description } = this.props;

        return (
            <div>
                <label>
                    <input type="checkbox" disabled="true" />
                    <span>{title}</span>
                    <span>{description}</span>
                </label>
            </div>
        );
    }
}

Movie.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default Movie;
