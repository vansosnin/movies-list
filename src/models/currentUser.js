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
            if (user) {
                self.username = user.displayName;
                self.email = user.email;
            } else {
                self.username = null;
                self.email = null;
            }
        },
    }));
