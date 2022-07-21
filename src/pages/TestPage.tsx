import axios from 'axios';
import React, { ChangeEvent, InputHTMLAttributes, Suspense, useEffect, useState } from 'react';
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
  const testInstance = axios.create();

  testInstance.defaults.validateStatus = (status) => status < 400;
  testInstance.defaults.timeout = 30000;

  const accessToken = getToken();

  const token = () => {
    testInstance
      .get(
        `https://api.nyangjanggo.com/refresh`, // token refresh api
        { headers: { 'Access-Token': `${accessToken}` } },
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
      <button onClick={token}> 토큰 테스트 </button>
    </div>
  );
}

export default TestPage;
