import { api, apiMethods } from 'shared/api';

import { tagTypes } from '../constants';

const getUrl = () => 'users';

export type UpdateAvatarResponse = {
    avatarUrl: string;
};

export const editUserInfoApi = api.injectEndpoints({
    endpoints: (build) => ({
        updateAvatar: build.mutation<UpdateAvatarResponse, FormData>({
            query: (body: FormData) => ({
                url: `${getUrl()}/avatar`,
                method: apiMethods.post,
                body,
            }),
            invalidatesTags: [tagTypes.CurrentUser],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateAvatarMutation } = editUserInfoApi;
