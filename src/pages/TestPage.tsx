import React, { Suspense, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import userToken from "../recoil/userAtom";

const TestPage = ({}) => {
  const setUserToken = useSetRecoilState(userToken);
  setUserToken(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZ3l1bmlAa2FrYW8uY29tIiwicm9sZXMiOiJVU0VSIiwiaWF0IjoxNjU2OTA1Nzk3LCJleHAiOjE2NTY5MTI5OTd9.Yd1s1HwSiwXofyyMzZgtIObQnG9oIh0PUhBW-xK8DxY"
  );
  return <></>;
};

export default TestPage;
