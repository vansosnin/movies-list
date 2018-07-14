import { Firebase } from './firebase';

const MOVIES_REF = 'movies';

export class Movie {
    constructor() {
        this._firebase = Firebase.instance();
        this._ref = this._firebase.db.ref(ACCOUNTS_REF);
        this._auth = Auth.instance();
    }

    getList() {
        return this._ref.orderByChild('createDate').once('value');
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

        return this._ref.push().set({
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
