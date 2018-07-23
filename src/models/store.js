import { types, flow, onAction } from 'mobx-state-tree';
import { CurrentUser } from './currentUser';
import { Movie } from './movie';
import { Movie as MovieFirebase } from '../firebase/movie';
import { CheckedMovie } from '../firebase/checkedMovie';

const Store = types
    .model({
        currentUser: CurrentUser,
        movies: types.array(Movie),
        hideChecked: types.boolean,
    })
    .views((self) => ({
        isLoggedIn() {
            return self.currentUser.isLoggedIn;
        },
        get totalCount() {
            return self.movies.length;
        },
        get watchedCount() {
            return self.movies.filter((movie) => movie.isChecked).length;
        },
    }))
    .actions((self) => ({
        fetchMoviesList: flow(function*() {
            const movieModel = new MovieFirebase();
            const moviesRef = yield movieModel.getList();
            let movies = Object.values(moviesRef.val());

            if (self.currentUser) {
                const checkedMoviesModel = new CheckedMovie();
                const checkedMoviesRef = yield checkedMoviesModel.getCheckedMovies(
                    self.currentUser.uid
                );
                const checkedMovies = checkedMoviesRef.val().checkedMovies;

                movies = movies.map((movie) => ({
                    ...movie,
                    isChecked: checkedMovies.includes(movie.movieId),
                }));
            }

            return self.setMoviesList(movies);
        }),
        setMoviesList(moviesList) {
            self.movies = moviesList.map((movie) =>
                Movie.create({
                    ...movie,
                })
            );
        },
        toggleHideChecked(isHidden) {
            self.hideChecked = isHidden;
        },
    }));

let instance;
const getStore = () => {
    if (!instance) {
        instance = Store.create({
            currentUser: {},
            movies: [],
            hideChecked: true,
        });
    }

    return instance;
};

const store = getStore();

onAction(store, (call) => {
    const { name, path, args } = call;

    if (path === '/currentUser' && name === 'set') {
        store.fetchMoviesList();
    }

    if (name === 'setChecked') {
        const { isChecked, movieId } = args[0];
        const checkedMoviesModel = new CheckedMovie();

        if (isChecked) {
            checkedMoviesModel.addCheckedMovie(store.currentUser.uid, movieId);
        } else {
            checkedMoviesModel.removeCheckedMovie(
                store.currentUser.uid,
                movieId
            );

            store.fetchMoviesList();
        }
    }
});

store.fetchMoviesList();

export default store;
