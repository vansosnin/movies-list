import { types } from 'mobx-state-tree';
import { Movie as MovieFirebase } from '../firebase/movie';

export const Movie = types
    .model({
        movieId: types.string,
        title: types.string,
        isChecked: types.optional(types.boolean, false),
        description: types.optional(types.string, ''),
    })
    .actions((self) => ({
        setChecked({ isChecked }) {
            self.isChecked = isChecked;
        },
        update(movie) {
            const movieModel = new MovieFirebase();
            movieModel.save(movie);
        },
        deleteMovie(movieId) {
            const movieModel = new MovieFirebase();
            movieModel.remove({ movieId });
        },
    }));
