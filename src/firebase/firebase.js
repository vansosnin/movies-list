import firebase from 'firebase';
import configJson from '../config.json';

let instance = null;

const PROJECT_ID = configJson['firebase-project-id'];
const config = {
    apiKey: configJson['firebase-api-key'],
    projectId: PROJECT_ID,
    databaseURL: `https://${PROJECT_ID}.firebaseio.com/`,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    storageBucket: `${PROJECT_ID}.appspot.com`,
};

export class Firebase {
    constructor() {
        if (instance) {
            return instance;
        }

        this._firebase = firebase;
        this._firebase.initializeApp(config);
        this._db = this._firebase.database();
        this._ref = this._db.ref();

        instance = this;
        return instance;
    }

    static instance() {
        return new Firebase();
    }

    get auth() {
        return this._firebase.auth();
    }

    get providers() {
        return {
            google: new this._firebase.auth.GoogleAuthProvider(),
        };
    }

    get db() {
        return this._db;
    }
}
