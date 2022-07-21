import { axiosInstance } from './axiosInstance';

export const refreshToken = async () => {
  try {
    console.log('access_token :', localStorage.getItem('accessToken'));
    const res = await axiosInstance.post('https://gyuni.shop/refresh', {
      accessToken: localStorage.getItem('accessToken'),
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
