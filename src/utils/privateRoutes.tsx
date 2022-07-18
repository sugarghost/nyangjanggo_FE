/* eslint-disable react/no-unused-prop-types */
import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { isExist, getToken } from './jwt';

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}

// 타입 스크립트 첫 글자가 대문자여야지 인식을 함
export default function PrivateRoutes({ authentication }: PrivateRouteProps): React.ReactElement | null {
  //   const token = localToken ? JSON.parse(localToken) : "";
  const ReactSwal = withReactContent(Swal);
  // const isAuthenticated = isExist(getToken("userToken") ?? "");
  const isAuthenticated = isExist();
  // authentication = true : 이 페이지에 접근하려면 인증이 되어있어야 함
  // authentication = false : 이 페이지에 접근하려면 인증이 안 되어있어야 함
  if (authentication) {
    // true, 인증이 되어있어야함
    if (isAuthenticated === false) {
      // 인증이 되어있어야하는데 안되어있음
      ReactSwal.fire({
        title: <p>로그인 필요 합니다!</p>,
        html: <p>로그인으로 이동합니다</p>,
        icon: 'info',
        timer: 3000,
      });
      return <Navigate to="/signUpPage" />;
    }
    // 인증이 필요한 페이지에 인증된 상태로 접근
    return <Outlet />;
  }
  // false, 인증이 안되어있어야함

  if (isAuthenticated === true) {
    // 인증이 안되어있어야 하는데 되어 있음

    // 사용자에게 3초간 유지되는 알림창을 표시
    // 화면 이동은 미리 진행됨
    ReactSwal.fire({
      title: <p>이미 로그인 되어 있습니다!</p>,
      html: <p>메인으로 이동합니다!</p>,
      icon: 'info',
      timer: 3000,
    });
    // 인증이 필요없는 페이지에서 인증이 되어있는 경우 메인 페이지로
    return <Navigate to="/" />;
  }

  // 인증이 필요없는 페이지에서 인증이 안되어 있으니 목표 위치로 보내줌줌
  return <Outlet />;
}
