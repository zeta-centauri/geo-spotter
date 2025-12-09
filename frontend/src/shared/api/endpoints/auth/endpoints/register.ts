import { setUserInfo } from 'shared/lib';

import {
    setAccessToken,
    setRefreshToken,
} from '../../../instance/instance.tokens';
import { apiPost } from '../../../methods';
import type { RegisterBody, Tokens, User } from '../types';

export type RegisterResponse = Tokens & User;

export const register = async (body: RegisterBody) => {
    const data = await apiPost<RegisterResponse, RegisterBody>(
        '/auth/register',
        body
    );

    const {
        data: { access, refresh, ...user },
    } = data;

    setUserInfo(user);

    setAccessToken(access);
    setRefreshToken(refresh);

    return data;
};
