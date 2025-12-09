import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from './instance/instance.tokens';

const getApiUrl = () => {
    return `${import.meta.env.VITE_API_URL}/api`;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl(),
        prepareHeaders: (headers) => {
            const token = getAccessToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    tagTypes: ['Lessons'],
    endpoints: () => ({}),
});

export type BaseQuery = typeof rtkApi;
