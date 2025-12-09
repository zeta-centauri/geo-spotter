import { configureStore } from '@reduxjs/toolkit';

import { rtkApi } from 'shared/api/rtkApi';

import { reducers } from './reducers';
import { register } from './storeRegistry';

export const store = configureStore({
    reducer: { ...reducers, [rtkApi.reducerPath]: rtkApi.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rtkApi.middleware),
});

// store.subscribe(() => {
//     const userState = store.getState().user;
//     setUserInfo(userState);
// });

register(store);

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
