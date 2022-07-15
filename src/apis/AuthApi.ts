import { axiosInstance } from './axiosInstance';

export const refreshToken = async () => {
  try {
    console.log('access_token :', localStorage.getItem('token'));
    const res = await axiosInstance.post('http://13.125.36.183/refresh', {
      accessToken: localStorage.getItem('token'),
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
