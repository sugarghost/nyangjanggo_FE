import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { PRODUCTION } from '../constants';
import { getToken } from '../utils/jwt';

export const axiosInstance = axios.create();

axiosInstance.defaults.validateStatus = (status) => status < 400;
axiosInstance.defaults.baseURL = PRODUCTION ? 'https://gyuni.shop/api' : 'https://gyuni.shop/api';
axiosInstance.defaults.timeout = 30000;

export const authInstance = axios.create();

authInstance.defaults.validateStatus = (status) => status < 400;
authInstance.defaults.baseURL = PRODUCTION ? 'https://gyuni.shop/api' : 'https://gyuni.shop/api';
authInstance.defaults.timeout = 30000;

authInstance.interceptors.request.use((config) => {
  // 리퀘스트 전에 토큰을 가져다 꺼내는데, axios.defaults.headers.common.Authorization를 활용하는 방안으로 변경 예정
  const accessToken = getToken();
  console.log('accessToken :', accessToken);
  if (accessToken) {
    config.headers = { 'Access-Token': `${accessToken}` };
  }
  try {
    return config;
  } catch (err) {
    console.error(`[_axios.interceptors.request] config : ${err}`);
  }
  return config;
});

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const accessToken = getToken();

    if (status === 401) {
      if (error.response.data.code === 'TA002') {
        const originalRequest = config;
        // token refresh 요청
        console.log('TA002');
        await axios
          .post(
            `https://gyuni.shop/refresh`, // token refresh api
            {},
            { headers: { 'Access-Token': `${accessToken}` } },
          )
          .then((result) => {
            console.log('result :', result);
            const { accessToken: newAccessToken, accessTokenExpireDate: newAccessTokenExpireDate } = result.data;
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
            return axios(originalRequest);
          })
          .catch((refreshError) => {
            console.log('refreshError: ', refreshError);
            localStorage.removeItem('accessToken');
            ReactSwal.fire({
              title: '<p>로그인 정보가 유효하지 않습니다!</p>',
              html: '<p>로그인으로 이동합니다</p>',
              icon: 'error',
            }).then(() => {
              window.location.href = '/signUpPage';
            });
            return false;
          });
        // 새로운 토큰 저장
      }

      localStorage.removeItem('accessToken');

      const ReactSwal = withReactContent(Swal);
      console.log('result :', error.response.data);
      // navigate 방식은 여기서 호출이 안되서 다른 방식으로 이용
      ReactSwal.fire({
        title: '<p>로그인 정보가 유효하지 않습니다!</p>',
        html: '<p>로그인으로 이동합니다</p>',
        icon: 'error',
      }).then(() => {
        window.location.href = '/signUpPage';
      });
      return false;
    }
    return Promise.reject(error);
  },
);
