// @flow

import {
    adminConfirmSignUp,
} from './_operations/admin-confirm-sign-up';
import {
    adminDeleteUser,
} from './_operations/admin-delete-user';
import {
    signUp,
} from './_operations/sign-up';

export const cognito = {
    adminConfirmSignUp,
    adminDeleteUser,
    signUp,
};
