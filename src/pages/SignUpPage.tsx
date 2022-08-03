import Logo from '@images/nyang_logo.png';
import React from 'react';
import styled from 'styled-components';

import KakaoButton from '../images/kakao_button.png';
import NaverButton from '../images/naver_button.png';

function SignUpPage() {
  return (
    <div className="mx-auto w-full min-h-screen">
      <div className="m-4">
        <LogoWrapper className="img-render" src={Logo} />
        <SignInfo>로그인 |</SignInfo>
        <button
          className="w-full"
          style={{
            margin: '30px 0 0 0',
          }}
          onClick={() => {}}
        >
          <a href="https://api.nyangjanggo.com/oauth2/authorization/kakao">
            {/* @ts-ignore */}
            <OauthButton src={KakaoButton} />
          </a>
        </button>
      </div>
    </div>
  );
}

const LogoWrapper = styled.img`
  width: 50%;
  margin: auto;
`;

const SignInfo = styled.div`
  width: 100%;
  text-align: left;
  font-family: 'NEXON Lv2 Gothic';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 27px;
  color: #797979;
  margin: 84px 0 0 0;
  padding: 0 0 0 20px;
`;

const OauthButton = styled.img`
  object-fit: cover;
  margin: auto;
`;

export default SignUpPage;
