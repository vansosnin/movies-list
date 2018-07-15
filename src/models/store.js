import { types } from 'mobx-state-tree';
import { CurrentUser } from './currentUser';

const Store = types.model({
    currentUser: CurrentUser,
});

let instance;

const getStore = () => {
    if (!instance) {
        instance = Store.create({
            currentUser: {},
        });
    }

    return instance;
};

export default getStore();
