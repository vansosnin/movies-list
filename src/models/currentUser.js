import { types } from 'mobx-state-tree';

export const CurrentUser = types
    .model({
        username: types.optional(types.string, ''),
        email: types.optional(types.string, ''),
    })
    .views((self) => ({
        get isLoggedIn() {
            return !!self.username;
        },
    }))
    .actions((self) => ({
        set(user) {
            self.username = user.displayName;
            self.email = user.email;
            console.log('set!');
        },
    }));
