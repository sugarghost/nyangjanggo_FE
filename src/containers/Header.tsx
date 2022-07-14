import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BackArrow from "../images/back_arrow.png";
import UserIcon from "../images/user_icon.png";

type RouterPages =
  | "/signInPage"
  | "/signUpPage"
  | "/recipeDetailPage"
  | "/recipeRegisterPage"
  | "/myPage"
  | "/myPage/myRefrigeratorPage"
  | "/"
  | null;

type RouterPageNames =
  | "회원가입"
  | "로그인"
  | "상세보기"
  | "등록하기"
  | "마이페이지"
  | "MY 냉장고"
  | "메인페이지"
  | ""
  | null;

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const returnPageTitle = (pathName: RouterPages): RouterPageNames => {
    if (pathName === "/signInPage") {
      return "회원가입";
    } else if (pathName === "/signUpPage") {
      return "";
    } else if (pathName === "/recipeDetailPage") {
      return "상세보기";
    } else if (pathName === "/recipeRegisterPage") {
      return "등록하기";
    } else if (pathName === "/myPage") {
      return "마이페이지";
    } else if (pathName === "/myPage/myRefrigeratorPage") {
      return "MY 냉장고";
    } else if (pathName === "/") {
      return "";
    }

    //return "";
  };

  const [pageTitle, setPageTitle] = useState<RouterPageNames>("");

  useEffect(() => {
    const currentPathName = window.location.pathname as RouterPages;
    
    setPageTitle(returnPageTitle(currentPathName));
  }, [window.location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <header className="p-4">
      <div className="flex items-center justify-between bg-opacity-50">
        {windowDimenion.winWidth > 750 ? (
          <>
            <div className="mx-2 text-center">
              <LogoWrapper
                className="font-extrabold xs:text-3xl md:text-3xl"
                onPointerUp={goHome}
              >
                LOGO
              </LogoWrapper>
            </div>
            <UserIconWrapper
              className="img-render"
              onClick={goMypage}
              src={UserIcon}
            />
          </>
        ) : (
          <MobileHeader className="w-full  text-center flex justify-between">
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            ></BackButton>
            <MobileHeaderTitle>{pageTitle}</MobileHeaderTitle>
            {/* <div>&nbsp;&nbsp;</div> */}
            <UserIconWrapper
              className="img-render"
              onClick={goMypage}
              src={UserIcon}
            />
          </MobileHeader>
        )}
      </div>
    </header>
  );
};

export default Header;

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const MobileHeader = styled.header`
  width: 100%;
  font-weight: bold;
  item-align: center;
  padding: 3px 0px;
`;

const BackButton = styled.div`
  background: url(${BackArrow});
  width: 30px;
  height: 30px;
  background-size: cover;
  cursor: pointer;
`;

const MobileHeaderTitle = styled.div`
  margin: auto 0px;
`;

const UserIconWrapper = styled.img`
  margin-right: 8px;
  width: 21px;
  height: 24px;
  cursor: pointer;
`;
