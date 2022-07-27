import { ReactComponent as EditIcon } from '@icon/edit.svg';
import { ReactComponent as FrigeIcon } from '@icon/frige.svg';
import { ReactComponent as HeartIcon } from '@icon/heart.svg';
import { ReactComponent as HomeIcon } from '@icon/home.svg';
import { ReactComponent as UserIcon } from '@icon/user.svg';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../styles/footer.css';

function Footer() {
  const navigate = useNavigate();

  // 홈 버튼
  const homeButtonClick = () => {
    navigate('/');
  };

  // 냉장고 버튼
  const frigeButtonClick = () => {
    navigate('/myPage/myRefrigeratorPage');
  };

  // 레시피 버튼
  const recipeButtonClick = () => {
    navigate('/recipeRegisterPage');
  };

  // 좋아요 버튼
  const likeButtonClick = () => {
    navigate('/');
  };

  // 내정보 버튼
  const myInfoButtonClick = () => {
    navigate('/myPage');
  };

  const currentPathName = window.location.pathname;

  return (
    <footer className="w-full px-2 bg-gray-100 bottom-0 sticky">
      <div className="flex items-center justify-between">
        <div className="m-auto py-1 w-1/5" onClick={homeButtonClick}>
          <HomeIcon className="m-auto" stroke={currentPathName === '/' ? '#EB3120' : '#676767'} />
          <p className="text-sm">홈</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={frigeButtonClick}>
          <FrigeIcon
            className="m-auto"
            fill={currentPathName === '/myPage/myRefrigeratorPage' ? '#EB3120' : '#676767'}
          />
          <p className="text-sm">냉장고</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={recipeButtonClick}>
          <EditIcon className="m-auto" stroke={currentPathName === '/recipeRegisterPage' ? '#EB3120' : '#676767'} />
          <p className="text-sm">레시피</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={likeButtonClick}>
          <HeartIcon className="m-auto" stroke={currentPathName === '/' ? '#EB3120' : '#676767'} />
          <p className="text-sm">좋아요</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={myInfoButtonClick}>
          <UserIcon className="m-auto" stroke={currentPathName === '/myPage' ? '#EB3120' : '#676767'} />
          <p className="text-sm">내정보</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
