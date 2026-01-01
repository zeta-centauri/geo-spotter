import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './utils';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
