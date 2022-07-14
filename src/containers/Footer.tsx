import { faHouse, faBoxArchive, faPen, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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
    navigate('/');
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

  return (
    <footer className="w-full px-2 bg-gray-100 bottom-0 sticky">
      <div className="flex items-center justify-between">
        <div className="m-auto py-1 w-1/5" onClick={homeButtonClick}>
          <FontAwesomeIcon className="" icon={faHouse} color="grey" />
          <p className="text-sm">홈</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={frigeButtonClick}>
          <FontAwesomeIcon className="m-1" icon={faBoxArchive} color="grey" />
          <p className="text-sm">냉장고</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={recipeButtonClick}>
          <FontAwesomeIcon className="m-1" icon={faPen} color="grey" />
          <p className="text-sm">레시피</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={likeButtonClick}>
          <FontAwesomeIcon className="m-1" icon={faHeart} color="grey" />
          <p className="text-sm">좋아요</p>
        </div>
        <div className="m-auto py-1 w-1/5" onClick={myInfoButtonClick}>
          <FontAwesomeIcon className="m-1" icon={faUser} color="grey" />
          <p className="text-sm">내정보</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
