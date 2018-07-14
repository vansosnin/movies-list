import { Firebase } from './firebase';

let instance = null;

export class Auth {
    constructor() {
        if (instance) {
            return instance;
        }

        this._firebase = Firebase.instance();
        this._auth = this._firebase.auth;
        this._user = null;

        this._attachEventListeners();

        instance = this;
        return instance;
    }

    static instance() {
        return new Auth();
    }

    get currentUser() {
        return this._user;
    }

    signIn() {
        const { providers } = this._firebase;
        this._auth.signInWithPopup(providers.google);
    }

    signOut() {
        this._auth.signOut();
    }

    _attachEventListeners() {
        this._auth.onAuthStateChanged((user) => {
            if (user) {
                this._user = user;
            } else {
                this._user = null;
            }
        });
    }
}
