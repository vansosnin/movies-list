import { types } from 'mobx-state-tree';

export const Movie = types.model({
    movieId: types.string,
    title: types.string,
    description: types.optional(types.string, ''),
});
