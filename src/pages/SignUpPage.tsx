import React from "react";

import Button from "../components/Botton";
import SignTitle from "../components/sign/SignTitle";

const SignUpPage = () => {
  return (
    <>
      <div className="bg-secondary-1 flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container max-w-screen-lg xl:max-w-screen-xl mx-auto">
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
                <div>카카오 로그인</div>
              </Button>
              <Button
                className={"w-full"}
                styleCustom={{
                  background: "grey",
                  margin: "10px 0 0 0",
                }}
                onClick={() => {}}
              >
                <div>네이버 로그인</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
