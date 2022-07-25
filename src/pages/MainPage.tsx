import MainSearched from '@components/search/MainSearched';
import Search from '@components/search/Search';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Search />
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      <MainSearched />
    </>
  );
};

export default MainPage;
