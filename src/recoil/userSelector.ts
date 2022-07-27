import userApi from '@apis/UserApi';
import { authInstance } from '@apis/axiosInstance';
import { selector, useRecoilValue, atom, selectorFamily } from 'recoil';

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    const response = await userApi.getUser();
    const data = response.data ? response.data : {};
    return data;
  },
});
