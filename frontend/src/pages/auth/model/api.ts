import { authEndpoints } from 'shared/api';
import { rtkApi } from 'shared/api/rtkApi';

export const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<
            authEndpoints.LoginResponse,
            authEndpoints.LoginBody
        >({
            queryFn: authEndpoints.login,
        }),

        register: build.mutation<
            authEndpoints.RegisterResponse,
            authEndpoints.RegisterBody
        >({
            queryFn: authEndpoints.register,
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
