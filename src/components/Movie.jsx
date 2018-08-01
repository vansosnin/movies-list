import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

class Movie extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            title: props.movie.title,
            description: props.movie.description,
            initialTitle: props.movie.title,
            initialDescription: props.movie.description,
        };
    }

    _handleCheck = (evt) => {
        const { movieId, setChecked } = this.props.movie;

        setChecked({ isChecked: evt.target.checked, movieId });
    };

    _handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    _toggleEditing = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    };

    _resetEditing = () => {
        this.setState({
            title: this.state.initialTitle,
            description: this.state.initialDescription,
            isEditing: false,
        });
    };

    _handleSave = () => {
        const { update, movieId } = this.props.movie;

        update({
            movieId,
            title: this.state.title,
            description: this.state.description,
        });

        this.setState({
            isEditing: false,
            initialTitle: this.state.title,
            initialDescription: this.state.description,
        });
    };

    _delete = () => {
        const { deleteMovie, movieId } = this.props.movie;
        deleteMovie(movieId);
    };

    render() {
        const { isEditing, title, description } = this.state;
        const { isDisabled, isAdmin, movie } = this.props;
        const { movieId, isChecked } = movie;

        if (isEditing) {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="Title">Название</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Title"
                            name="title"
                            value={title}
                            placeholder="Облачный атлас"
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Description">Описание</label>
                        <textarea
                            className="form-control"
                            id="Description"
                            name="description"
                            value={description}
                            placeholder="Хороший фильм, надо смотреть"
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={this._handleSave}
                            title="Сохранить"
                        >
                            💾
                        </button>
                        <button
                            type="button"
                            className="btn btn-light btn-sm"
                            onClick={this._resetEditing}
                            title="Отменить редактирование"
                        >
                            ❌
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={this._handleCheck}
                    className="form-check-input"
                    id={movieId}
                    disabled={isDisabled}
                />
                <div className="form-check-label d-flex">
                    <ReactMarkdown source={title} />
                    {isAdmin && (
                        <div className="btn-group ml-2">
                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={this._toggleEditing}
                                title="Редактировать"
                            >
                                ✏️
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={this._delete}
                                title="Удалить"
                            >
                                🗑
                            </button>
                        </div>
                    )}
                </div>

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
        update: PropTypes.func,
        deleteMovie: PropTypes.func,
    }),
    isAdmin: PropTypes.bool,
};

export default Movie;
