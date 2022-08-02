import { axiosInstance } from './axiosInstance';

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post('https://gyuni.shop/refresh', {
      accessToken: localStorage.getItem('accessToken'),
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
