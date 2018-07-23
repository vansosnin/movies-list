import { Firebase } from './firebase';

const MOVIES_REF = 'checkedMovies';

export class CheckedMovie {
    constructor() {
        this._firebase = Firebase.instance();
        this._ref = this._firebase.db.ref(MOVIES_REF);
    }

    getCheckedMovies(uid) {
        return this._ref.child(uid).once('value');
    }

    addCheckedMovie(uid, movieId) {
        this.getCheckedMovies(uid).then((moviesSnapshot) => {
            const movies = moviesSnapshot.val().checkedMovies;

            moviesSnapshot.ref
                .child('checkedMovies')
                .update(movies.concat(movieId));
        });
    }

    createList(uid, movies) {
        this._ref
            .child(uid)
            .remove()
            .then(() => {
                this._ref.child(uid).set({
                    userId: uid,
                    checkedMovies: movies
                        .filter((movie) => movie.state === 'complete')
                        .map((movie) => movie.id),
                });
            });
    }
}
