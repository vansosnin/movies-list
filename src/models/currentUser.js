import { types } from 'mobx-state-tree';

export const CurrentUser = types
    .model({
        uid: types.optional(types.string, ''),
        username: types.optional(types.string, ''),
        email: types.optional(types.string, ''),
    })
    .views((self) => ({
        get isLoggedIn() {
            return !!self.uid;
        },
    }))
    .actions((self) => ({
        set(user) {
            if (user) {
                self.uid = user.displayName;
                self.username = user.displayName;
                self.email = user.email;
            } else {
                self.uid = null;
                self.username = null;
                self.email = null;
            }
        },
    }));
