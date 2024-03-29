import { ReactComponent as BackIcon } from '@icon/back.svg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackArrow from '../images/back_arrow.png';
import UserIcon from '../images/user_icon.png';

type RouterPages =
  | '/signInPage'
  | '/signUpPage'
  | '/recipeDetailPage'
  | '/recipeRegisterPage'
  | '/myPage'
  | '/myPage/myRefrigeratorPage'
  | '/likePage'
  | '/'
  | ''
  | null;

type RouterPageNames =
  | '회원가입'
  | '로그인'
  | '상세보기'
  | '등록하기'
  | '마이페이지'
  | 'MY 냉장고'
  | '메인페이지'
  | '좋아요 보기'
  | ''
  | null;

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const goMypage = () => {
    navigate('/mypage');
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
    if (pathName === '/signInPage') {
      return '회원가입';
    }
    if (pathName === '/signUpPage') {
      return '';
    }
    if (pathName.startsWith('/recipeDetailPage')) {
      return '상세보기';
    }
    if (pathName === '/recipeRegisterPage') {
      return '등록하기';
    }
    if (pathName === '/myPage') {
      return '마이페이지';
    }
    if (pathName === '/myPage/myRefrigeratorPage') {
      return 'MY 냉장고';
    }
    if (pathName === '/likePage') {
      return '좋아요 보기';
    }

    return '';
  };

  const [pageTitle, setPageTitle] = useState<RouterPageNames>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentPathName = window.location.pathname as RouterPages;

    setPageTitle(returnPageTitle(currentPathName));
  }, [window.location.pathname]);

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  return (
    <header>
      {window.location.pathname !== '/' &&
      window.location.pathname !== '/signUpPage' &&
      window.location.pathname !== '/signInPage' ? (
        <MobileHeader className="w-full text-center flex justify-between">
          <BackButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon fill="#676767" />
          </BackButton>
          <MobileHeaderTitle>{pageTitle}</MobileHeaderTitle>
        </MobileHeader>
      ) : (
        <></>
      )}
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
  align-items: center;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e2e2;
`;

const BackButton = styled.div`
  width: 30px;
  height: 30px;
  background-size: cover;
  cursor: pointer;
`;

const MobileHeaderTitle = styled.div`
  margin: auto;
`;

const UserIconWrapper = styled.img`
  margin-right: 8px;
  width: 21px;
  height: 24px;
  cursor: pointer;
`;
