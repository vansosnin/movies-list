import { types } from 'mobx-state-tree';

export const Movie = types.model({
    title: types.string,
    description: types.optional(types.string, ''),
});
