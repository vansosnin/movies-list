import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class AddMovieForm extends PureComponent {
    state = {
        title: '',
        description: '',
    };

    _handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    _handleKeyDown = (evt) => {
        // ctrl/cmd + enter
        if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13) {
            this._handleSave();
        }
    };

    _handleSave = () => {
        this.props.addMovie(this.state);
        this.setState({
            title: '',
            description: '',
        });
    };

    render() {
        const { title, description } = this.state;

        return (
            <Fragment>
                <h2>Добавить фильм</h2>
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
                        onKeyDown={this._handleKeyDown}
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
                        onKeyDown={this._handleKeyDown}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this._handleSave}
                >
                    Сохранить
                </button>
            </Fragment>
        );
    }
}

AddMovieForm.propTypes = {
    addMovie: PropTypes.func,
};

export default AddMovieForm;
