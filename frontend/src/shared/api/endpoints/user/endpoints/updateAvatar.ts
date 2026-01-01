// import { apiPost } from 'shared/api/methods';
// import type { User } from 'shared/types';

// import { getUrl } from '../getUrl';

// export type UpdateAvatarPayload = {
//     file: File;
// };

// export type UpdateAvatarResponse = User;

// export const updateAvatar = async ({ file }: UpdateAvatarPayload) => {
//     if (!file) {
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     return await apiPost<UpdateAvatarResponse, FormData>(
//         `${getUrl()}/users`,
//         formData,
//         {
//             headers: { 'Content-Type': 'multipart/form-data' },
//         }
//     );
// };
