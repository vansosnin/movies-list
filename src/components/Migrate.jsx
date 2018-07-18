import React, { PureComponent, Fragment } from 'react';
import { Movie } from '../firebase/movie';
import { Auth } from '../firebase/auth';
import { CheckedMovie } from '../firebase/checkedMovie';
import config from '../config.json';

export class Migrate extends PureComponent {
    _migrate = () => {
        const trelloUrl = `https://api.trello.com/1/checklists/${
            config['trello-checklist-id']
        }?key=${config['trello-api-key']}&token=${config['trello-token']}`;

        fetch(trelloUrl, { method: 'get' })
            .then((response) => response.json())
            .then((result) => {
                const firebaseModel = result.checkItems.map((item) => ({
                    movieId: item.id,
                    title: item.name,
                    description: '',
                }));

                const movieModel = new Movie();
                movieModel.createList(firebaseModel);

                const currentUser = Auth.instance().currentUser;
                const uid = currentUser.uid;

                const checkedMovie = new CheckedMovie();
                checkedMovie.createList(uid, result.checkItems);
            });
    };

    render() {
        return (
            <button type="button" onClick={this._migrate}>
                Migrate
            </button>
        );
    }
}
