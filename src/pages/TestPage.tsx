import axios from 'axios';
import React, { ChangeEvent, InputHTMLAttributes, Suspense, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import userToken from '../recoil/userAtom';
import { getToken } from '../utils/jwt';

function TestPage({}) {
  /*
  const setUserToken = useSetRecoilState(userToken);
  setUserToken(
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHNsdHM5NUBnbWFpbC5jb20iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2NTc1NDIzOTMsImV4cCI6MTY1ODc1MTk5M30.IVoFRLjsMx_TevanNPKkJRoPzlXXxffPju1gzCn6ato',
  );
  */
  const [isCredentials, setIsCredentials] = useState(true);
  const testInstance = axios.create();
  const targetApiRef = useRef<HTMLInputElement>(null);

  testInstance.defaults.validateStatus = (status) => status < 400;
  testInstance.defaults.timeout = 30000;

  const accessToken = getToken();

  const credentials = () => {
    setIsCredentials(!isCredentials);
  };
  const token = () => {
    const api = targetApiRef.current.value;
    console.log('api', api);
    testInstance
      .get(
        `${api}`, // token refresh api
        { headers: { 'Access-Token': `${accessToken}` }, withCredentials: isCredentials },
      )
      .then((result) => {
        console.log('result :', result);
      })
      .catch((refreshError) => {
        console.log('refreshError: ', refreshError);
      });
  };
  return (
    <div>
      <input ref={targetApiRef} />: 연결 API 입력
      <br />
      <button onClick={token}> 토큰 테스트 </button>
      <br />
      <button onClick={credentials}> Credentials 테스트 </button>
      <br />
      isCredentials: {isCredentials ? 'true' : 'false'}
    </div>
  );
}

export default TestPage;
