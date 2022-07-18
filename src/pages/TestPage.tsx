import React, { ChangeEvent, InputHTMLAttributes, Suspense, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import userToken from '../recoil/userAtom';

function TestPage({}) {
  const setUserToken = useSetRecoilState(userToken);
  setUserToken(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHNsdHM5NUBnbWFpbC5jb20iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2NTc1NDIzOTMsImV4cCI6MTY1ODc1MTk5M30.IVoFRLjsMx_TevanNPKkJRoPzlXXxffPju1gzCn6ato',
  );
  return <div />;
}

export default TestPage;
