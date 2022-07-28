import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { PRODUCTION } from '../constants';
import { getToken } from '../utils/jwt';

export const axiosInstance = axios.create();

axiosInstance.defaults.validateStatus = (status) => status < 400;
axiosInstance.defaults.baseURL = PRODUCTION ? 'https://gyuni.shop/api' : 'https://gyuni.shop/api';
axiosInstance.defaults.timeout = 30000;

export const elasticInstance = axios.create();

elasticInstance.defaults.validateStatus = (status) => status < 400;
elasticInstance.defaults.baseURL = 'http://15.165.84.237:9200';
elasticInstance.defaults.timeout = 30000;
elasticInstance.defaults.auth = {
  username: 'elastic',
  password: 'HangHaeNyang',
};

export const authInstance = axios.create();

authInstance.defaults.validateStatus = (status) => status < 400;
authInstance.defaults.baseURL = PRODUCTION ? 'https://gyuni.shop/api' : 'https://gyuni.shop/api';
authInstance.defaults.timeout = 30000;
authInstance.defaults.withCredentials = true;

authInstance.interceptors.request.use((config) => {
  // 리퀘스트 전에 토큰을 가져다 꺼내는데, axios.defaults.headers.common.Authorization를 활용하는 방안으로 변경 예정
  const accessToken = getToken();
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
    // 이후 유효하지 않은 토큰 결과가 나오면 로그인으로 이동시키는 안내를 보내기 위해 선언
    const ReactSwal = withReactContent(Swal);

    if (status === 401) {
      if (error.response.data.code === 'TA002') {
        const originalRequest = config;
        // token refresh 요청
        const { data, status } = await axios.get(
          `https://api.nyangjanggo.com/refresh`, // token refresh api
          { headers: { 'Access-Token': `${accessToken}` }, withCredentials: true },
        );
        // 새로운 토큰 저장

        if (status === 200) {
          const newAccessToken = data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers['Access-Token'] = `${newAccessToken}`;

          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        }

        localStorage.removeItem('accessToken');
        ReactSwal.fire({
          title: '<p>로그인 정보가 유효하지 않습니다!</p>',
          html: '<p>로그인으로 이동합니다</p>',
          icon: 'error',
        }).then(() => {
          window.location.href = '/signUpPage';
        });
        return Promise.reject(error);
      }

      // localStorage.removeItem('accessToken');

      // navigate 방식은 여기서 호출이 안되서 다른 방식으로 이용
      ReactSwal.fire({
        title: '<p>로그인 정보가 유효하지 않습니다!</p>',
        html: '<p>로그인으로 이동합니다</p>',
        icon: 'error',
      }).then(() => {
        window.location.href = '/signUpPage';
      });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
