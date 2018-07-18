import { Firebase } from './firebase';
import { Auth } from './auth';

const MOVIES_REF = 'movies';

export class Movie {
    constructor() {
        this._firebase = Firebase.instance();
        this._ref = this._firebase.db.ref(MOVIES_REF);
        this._auth = Auth.instance();
    }

    getList() {
        return this._ref.orderByChild('createDate').once('value');
    }

    createList(movies) {
        this._ref.remove().then(() => {
            for (const movie of movies) {
                const currentTimestamp = new Date().getTime();

                this._ref.child(movie.movieId).set({
                    ...movie,
                    createDate: currentTimestamp,
                    updateDate: currentTimestamp,
                });
            }
        });
    }

    save(data) {
        const { movieId } = data;

        if (movieId) {
            return this._update(data);
        }

        return this._create(data);
    }

    remove({ movieId }) {
        return this._ref.child(movieId).remove();
    }

    _create({ title, description }) {
        const currentTimestamp = new Date().getTime();
        const ref = this._ref.push();

        return ref.set({
            movieId: ref.key,
            title,
            description,
            createDate: currentTimestamp,
            updateDate: currentTimestamp,
        });
    }

    _update({ movieId, title, description }) {
        return this._ref
            .child(movieId)
            .update({ title, description, updateDate: new Date().getTime() });
    }
}
