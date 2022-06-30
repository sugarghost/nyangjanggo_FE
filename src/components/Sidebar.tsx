import React, { Children, useCallback, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { COLOR_V2 } from "../constants/ColorV2";
import LogoSimbol from "../images/side_simbol_logo.png";
import CloseIcon from "../images/sidebar_close_btn.png";
import ToggleArrow from "../images/toggle_arrow.png";
import Button from "./Botton";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  className?: string;
  userIdInitial?: string;
  licenseMessage?: string;

  onClickLogout?: () => void;
  onClickSignIn?: () => void;
  onClickSignUp?: () => void;
}

const SideActionBar = (props: IProps) => {
  const {
    isOpen,
    setIsOpen,
    className,
    userIdInitial,
    licenseMessage,
    onClickLogout,
    onClickSignIn,
    onClickSignUp,
  }: IProps = props;

  const [showUserMenu, setShowUserMenu] = useState(true);
  const [userId, setUserId] = useState(false);

  const onClickLogo = useCallback(() => {}, []);

  const handleOnClickShowUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {}, [userIdInitial]);

  return (
    <SideActionBarContainer
      className={className}
      isOpen={isOpen}
      onClick={setIsOpen}
    >
      <SideActionBarHeader>
        <a
          className="text-red-400 no-underline hover:text-red-400 hover:no-underline"
          href="#"
        >
          <div
            className="flex items-center text-2xl cursor-pointer"
            onClick={onClickLogo}
          >
            <SimbolWrapper src={LogoSimbol} alt="로고" title="로고" />
          </div>
        </a>
        <CloseBtn onClick={setIsOpen}>
          <CloseIconWrapper src={CloseIcon} />
        </CloseBtn>
      </SideActionBarHeader>
      <SideActionBarInner isOpen={isOpen}>
        <MenuWrapper>
          <MenuList style={{ margin: 0 }}>홈</MenuList>

          <MenuList>가격</MenuList>

          <MenuList>
            <a
              target="_blank"
              className=""
              href=" https://ohoolabs.notion.site/374a6f4a0ef74956b8b22c92b9f81e97"
            >
              <span
                style={{ color: COLOR_V2.GRAY3, fontWeight: 500, margin: 0 }}
              >
                사용자 가이드
              </span>
            </a>
          </MenuList>
        </MenuWrapper>

        {userId && (
          <UserMenuWrapper>
            <MenuProfileWrapper>
              <ProfileLeftWrapper>
                <ProfileImage
                  backgound={COLOR_V2.GRAY5}
                  color={COLOR_V2.WHITE1}
                >
                  {userIdInitial}
                </ProfileImage>
                <ProfileInfo>
                  <UserRollWrapper color={COLOR_V2.BLACK1}>
                    {userId}
                  </UserRollWrapper>
                  <UserPlanWrapper color={COLOR_V2.PRIMARY3}>
                    {licenseMessage}
                  </UserPlanWrapper>
                </ProfileInfo>
              </ProfileLeftWrapper>
              <ToggleButton
                showUserMenu={showUserMenu}
                onClick={handleOnClickShowUserMenu}
              >
                <ToggleArrowWrapper
                  showUserMenu={showUserMenu}
                  src={ToggleArrow}
                />
              </ToggleButton>
            </MenuProfileWrapper>
            {showUserMenu && (
              <MenuWrapper>
                <UserMenuList>내 프로필</UserMenuList>

                <UserMenuList>쿠폰</UserMenuList>

                <UserMenuList>API 관리</UserMenuList>

                <UserMenuList>계정 설정</UserMenuList>
              </MenuWrapper>
            )}
          </UserMenuWrapper>
        )}

        {userId ? (
          <Button
            onClick={onClickLogout}
            styleCustom={{
              margin: "32px 0 0 0",
              padding: "12px 14px",
              width: "80px",
              height: "44px",
              fontSize: "16px",
              hoverColor: COLOR_V2.GRAY1,
              activeColor: COLOR_V2.GRAY1,
              disabledColor: COLOR_V2.PRIMARY9,
              background: COLOR_V2.GRAY6,
              color: COLOR_V2.GRAY3,
            }}
          >
            <div>로그아웃</div>
          </Button>
        ) : (
          <>
            <Button
              onClick={onClickSignIn}
              styleCustom={{
                margin: "32px 0 0 0",
                padding: "12px 14px",
                width: "80px",
                height: "44px",
                fontSize: "16px",
                hoverColor: COLOR_V2.GRAY1,
                activeColor: COLOR_V2.GRAY1,
                disabledColor: COLOR_V2.PRIMARY9,
                background: COLOR_V2.GRAY6,
                color: COLOR_V2.GRAY3,
              }}
            >
              <div>로그인</div>
            </Button>
            <Button
              onClick={onClickSignUp}
              styleCustom={{
                margin: "12px 0 0 0",
                padding: "12px 14px",
                width: "80px",
                height: "44px",
                fontSize: "16px",
                color: COLOR_V2.PRIMARY7,
                background: COLOR_V2.PRIMARY1,
                hoverColor: COLOR_V2.PRIMARY2,
                activeColor: COLOR_V2.PRIMARY8,
                disabledColor: COLOR_V2.PRIMARY9,
              }}
            >
              <div>가입</div>
            </Button>
          </>
        )}
      </SideActionBarInner>
    </SideActionBarContainer>
  );
};

const slide = keyframes`
  from {
    transform: translateX(300px);
  }
  to {
    transform: translateX(0px);
  }
`;

const SideActionBarContainer = styled.div<any>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: ${(props) => (props.isOpen ? 0 : "")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  background: white;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;

const SideActionBarHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 62px;
  top: 0;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
  padding: 9px 15px;
  align-items: center;
  margin: 0px 0px 0px 8px;
`;

const SideActionBarInner = styled.div<any>`
  position: absolute;
  top: 62px;
  width: 100%;
  height: 100%;
  padding: 24px 15px;
`;

const MenuWrapper = styled.ul`
  text-align: left;
  transition: all 0.3s ease-in-out;
`;

const MenuList = styled.li`
  padding: 8px;
  height: 44px;
  margin-top: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLOR_V2.GRAY3};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: ${COLOR_V2.GRAY6};
  }
`;

const UserMenuWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const UserMenuList = styled.li`
  padding: 8px;
  height: 44px;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  font-feature-settings: "case" on, "ss02" on;
  color: ${COLOR_V2.GRAY3};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${COLOR_V2.GRAY6};
  }
`;

const MenuProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  width: 100%;
  padding: 12px 8px;
`;

const ProfileLeftWrapper = styled.div`
  display: flex;
`;

const ProfileImage = styled.div<any>`
  border-radius: 23px;
  background: ${(props) => props.backgound ?? ""};
  width: 46px;
  height: 46px;
  margin-right: 12px;
  color: ${(props) => props.color ?? ""};
  text-align: center;
  padding: 4px 0 0 0;
  font-size: 24px;
`;

const ProfileInfo = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  display: flex;
  flex-direction: column;
  align-items: left;
  letter-spacing: -0.02em;
  text-align: start;
`;

const ToggleButton = styled.button<any>`
  transform: ${(props) => (props.showUserMenu ? "scaleY(1)" : "scaleY(-1)")};
  transition: transform 500ms ease-in-out;
`;

const ToggleArrowWrapper = styled.img<any>`
  width: 16px;
  height: 16px;
  object-fit: fit;

  image-rendering: -webkit-optimize-contrast !important;
`;

const UserPlanWrapper = styled.p`
  color: ${(props) => props.color ?? COLOR_V2.PRIMARY3};
`;

const UserRollWrapper = styled.p`
  color: ${(props) => props.color ?? COLOR_V2.BLACK1};
`;
const CloseBtn = styled.button<any>``;

const CloseIconWrapper = styled.img`
  width: 20.5px;
  height: 20.5px;
  object-fit: fit;
  margin: 4px 12px 0px 0px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: crisp-edges;
`;

const SimbolWrapper = styled.img`
  width: 25px;
  height: 25px;
  object-fit: fit;
  margin-top: 4px;
  -webkit-perspective: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: crisp-edges;
`;

export default SideActionBar;
