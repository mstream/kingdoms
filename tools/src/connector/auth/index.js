// @flow

import {
    createUsers,
} from './_operations/create-users';
import {
    deleteUsers,
} from './_operations/delete-users';

export const auth = {
    createUsers,
    deleteUsers,
};
