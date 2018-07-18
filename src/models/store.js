import { types } from 'mobx-state-tree';
import { CurrentUser } from './currentUser';
import { Movie } from './movie';
import { Movie as MovieFirebase } from '../firebase/movie';
import { CheckedMovie } from '../firebase/checkedMovie';

const Store = types
    .model({
        currentUser: CurrentUser,
        movies: types.array(Movie),
    })
    .actions((self) => ({
        setMoviesList(moviesList) {
            self.movies = moviesList.map((movie) =>
                Movie.create({
                    ...movie,
                })
            );
        },
    }));

let instance;
const getStore = () => {
    if (!instance) {
        instance = Store.create({
            currentUser: {},
            movies: [],
        });
    }

    return instance;
};

const store = getStore();

const movieModel = new MovieFirebase();
const movies = movieModel
    .getList()
    .then((list) => store.setMoviesList(Object.values(list.val())));

export default store;
