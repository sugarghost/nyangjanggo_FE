import React from "react";

import { refreshToken } from "../apis/AuthApi";
import { axiosInstance } from "../apis/axiosInstance";
import Button from "../components/Botton";
import SignTitle from "../components/sign/SignTitle";

const SignUpPage = () => {
  const kakaoAuth = async () => {
    try {
      const res = await axiosInstance.get(
        `http://3.35.233.99/oauth2/authorization/kakao`
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const refreshTokenTest = () => {
    refreshToken();
  };

  return (
    <>
      <div className="bg-secondary-1 items-center min-h-screen bg-white dark:bg-gray-900 mt-100">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto">
            <div className="m-4">
              <SignTitle>
                <div>LOGO</div>
              </SignTitle>
              <Button
                className={"w-full"}
                styleCustom={{
                  background: "grey",
                  margin: "150px 0 0 0",
                }}
                onClick={() => {}}
              >
                {/* TODO href에 서버 url 받기 
                  http://back-end-server/oauth2/authorization/kakao,
                  http://back-end-server/oauth2/authorization/naver
                */}
                <a href="http://3.35.233.99/oauth2/authorization/kakao">
                  <div>카카오 로그인</div>
                </a>
                {/* <div onClick={kakaoAuth}>카카오 로그인</div> */}
              </Button>
              <Button
                className={"w-full"}
                styleCustom={{
                  background: "grey",
                  margin: "10px 0 0 0",
                }}
                onClick={() => {}}
              >
                <a href="http://3.35.233.99/oauth2/authorization/naver">
                  <div>네이버 로그인</div>
                </a>
              </Button>
              <Button
                className={"w-full"}
                styleCustom={{
                  background: "grey",
                  margin: "10px 0 0 0",
                }}
                onClick={refreshTokenTest}
              >
                <div>리프래쉬 토큰 테스트</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
