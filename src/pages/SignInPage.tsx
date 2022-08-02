import Button from '@components/Botton';
import SignTitle from '@components/sign/SignTitle';
import Logo from '@images/nyang_logo.png';
import React from 'react';
import styled from 'styled-components';

function SignInPage() {
  return (
    <div className="min-h-screen max-w-md mx-auto">
      <div className="m-4">
        <SignTitle>
          <LogoWrapper className="img-render" src={Logo} />
        </SignTitle>
        <Button
          className="w-full"
          styleCustom={{
            background: 'grey',
            margin: '150px 0 0 0',
          }}
          onClick={() => {}}
        >
          <div>카카오 로그인</div>
        </Button>
        <div style={{ marginTop: '50px' }}>
          <p style={{ opacity: '0.5' }}>아직 회원이 아니신가요?</p>
          <Button
            className="w-full"
            styleCustom={{
              background: 'grey',
              margin: '10px 0 0 0',
            }}
            onClick={() => {}}
          >
            <div>회원가입</div>
          </Button>
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

export default SignInPage;
