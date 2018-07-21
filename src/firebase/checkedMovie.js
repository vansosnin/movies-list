import { Firebase } from './firebase';
import { Auth } from './auth';

const MOVIES_REF = 'checkedMovies';

export class CheckedMovie {
    constructor() {
        this._firebase = Firebase.instance();
        this._ref = this._firebase.db.ref(MOVIES_REF);
        this._auth = Auth.instance();
    }

    getCheckedMovies(uid) {
        return this._ref.child(uid).once('value');
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
