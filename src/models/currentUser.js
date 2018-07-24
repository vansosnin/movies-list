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
        get isAdmin() {
            const admins = ['YbGx6NhXgiSOpiznXYMcl85Y2au1'];
            return admins.includes(self.uid);
        },
    }))
    .actions((self) => ({
        set(user) {
            if (user) {
                self.uid = user.uid;
                self.username = user.displayName;
                self.email = user.email;
            } else {
                self.uid = '';
                self.username = '';
                self.email = '';
            }
        },
    }));
