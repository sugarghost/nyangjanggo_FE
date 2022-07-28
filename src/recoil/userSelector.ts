import userApi from '@apis/UserApi';
import { authInstance } from '@apis/axiosInstance';
import { isExist } from '@utils/jwt';
import { selector, useRecoilValue, atom, selectorFamily } from 'recoil';

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    if (isExist()) {
      const response = await userApi.getUser();
      return response.data;
    }
    return {};
  },
});
