import React from 'react';
import styled from 'styled-components';

import { refreshToken } from '../apis/AuthApi';
import Button from '../components/Botton';
import SignTitle from '../components/sign/SignTitle';
import KakaoButton from '../images/kakao_button.png';
import NaverButton from '../images/naver_button.png';
import Logo from '../images/nyang_logo.png';

function SignUpPage() {
  

  const refreshTokenTest = () => {
    refreshToken();
  };

  return (
    <div className="bg-secondary-1 items-center min-h-screen bg-white dark:bg-gray-900 mt-100">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="max-w-md mx-auto">
          <div className="m-4">
            <SignTitle>
              <LogoWrapper className="img-render" src={Logo} />
            </SignTitle>
            <SignInfo>Sign in |</SignInfo>
            <button
              className="w-full"
              style={{
                margin: '30px 0 0 0',
              }}
              onClick={() => {}}
            >
              {/* TODO href에 서버 url 받기
                  http://back-end-server/oauth2/authorization/kakao,
                  http://back-end-server/oauth2/authorization/naver
                */}
              <a href="https://api.nyangjanggo.com/oauth2/authorization/kakao">
                {/* @ts-ignore */}
                <OauthButton src={KakaoButton}></OauthButton>
              </a>
              {/* <div onClick={kakaoAuth}>카카오 로그인</div> */}
            </button>
            <button
              className="w-full"
              style={{
                margin: '12px auto 0 auto',
              }}
              onClick={() => {}}
            >
              <a href="https://api.nyangjanggo.com/oauth2/authorization/naver">
                {/* @ts-ignore */}
                <OauthButton src={NaverButton}></OauthButton>
              </a>
            </button>
            {/* <Button
                className={"w-full"}
                styleCustom={{
                  background: "grey",
                  margin: "10px 0 0 0",
                }}
                onClick={refreshTokenTest}
              >
                <div>리프래쉬 토큰 테스트</div>
              </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const LogoWrapper = styled.img`
  width: 130px;
  height: 130px;
  margin: 0px auto;
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
