import { authInstance, axiosInstance } from './axiosInstance';

export const postResource = async (payload: FormData) => {
  authInstance
    .post(`/user/fridge`, payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('재료 등록에러 :', err);
    });
};

export const getResource = async () => {
  authInstance
    .get(`/user/fridge`)
    .then((res) => {
      console.log('재료가져오기:', res);
      return res;
    })
    .catch((err) => {
      console.log('재료 가져오기 에러 :', err);
    });
};
