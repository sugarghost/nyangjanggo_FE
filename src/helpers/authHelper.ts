import { useParams } from 'react-router';

const kakaoLoginRedirect = () => {
  const params: any = useParams();

  localStorage.clear();
  localStorage.setItem('accessToken', params.token);
};

const authCheck = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    window.location.href = '/';
  }
};
