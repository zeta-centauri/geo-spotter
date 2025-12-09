import type { AxiosInstance } from 'axios';

import { accessTokenInterceptor } from './accessTokenInterceptor';
import { errorInterceptor } from './errorInterceptor';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';

export const interceptors = (instance: AxiosInstance) => {
    accessTokenInterceptor(instance);
    refreshTokenInterceptor(instance);
    errorInterceptor(instance);
};
