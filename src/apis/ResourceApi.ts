import { authInstance, axiosInstance } from './axiosInstance';

export interface Ingredient {
  amount: string;
  category?: string;
  endTime: string;
  resourceName: string;
}

export const postResource = async (payload: FormData) => {
  authInstance
    .post(`/user/fridge`, payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      console.log('재료등록 : ',res);
      alert("재료등록이 완료 되었습니다!")
    })
    .catch((err) => {
      alert("재료등록에 실패했습니다!")
      console.log('재료 등록에러 :', err);
    });
};

export const getResource = async () => {
  const res = authInstance.get(`/user/fridge`);

  return res
};
