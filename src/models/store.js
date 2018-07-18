import { types } from 'mobx-state-tree';
import { CurrentUser } from './currentUser';
import { Movie } from './movie';

const Store = types.model({
    currentUser: CurrentUser,
    movies: types.array(Movie),
});

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

export default getStore();
