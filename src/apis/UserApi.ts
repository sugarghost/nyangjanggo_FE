import { authInstance, axiosInstance } from './axiosInstance';

const user = '/user';

export default {
  async getUser() {
    const res = await authInstance.get(`${user}`);
    return res;
  },

  async putUser(payload: FormData) {
    const res = await authInstance.put(`${user}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },
  async checkNickname(nickname: string) {
    const res = await authInstance.get(`${user}/checkNickname?nickname=${nickname}`);
    return res;
  },
};
