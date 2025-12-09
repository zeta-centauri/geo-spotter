import { setUserInfo } from 'shared/lib';

import {
    setAccessToken,
    setRefreshToken,
} from '../../../instance/instance.tokens';
import { apiPost } from '../../../methods';
import type { LoginBody, Tokens, User } from '../types';

export type LoginResponse = Tokens & User;

export const login = async (body: LoginBody) => {
    const data = await apiPost<LoginResponse, LoginBody>('/auth/login', body);

    const {
        data: { access, refresh, ...user },
    } = data;

    setUserInfo(user);

    setAccessToken(access);
    setRefreshToken(refresh);

    return data;
};
