import { api, apiMethods } from 'shared/api';
import type { User } from 'shared/types';

import type { LoginBody, RegisterBody } from './types';

const getUrl = () => 'auth';

type Tokens = {
    access: string;
    refresh: string;
};

type LoginResponse = Tokens & User;
type RegisterResponse = Tokens & User;

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginBody>({
            query: (body: LoginBody) => ({
                url: `${getUrl()}/login`,
                method: apiMethods.post,
                body,
            }),
        }),

        register: build.mutation<RegisterResponse, RegisterBody>({
            query: (body: RegisterBody) => ({
                url: `${getUrl()}/register`,
                method: apiMethods.post,
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
