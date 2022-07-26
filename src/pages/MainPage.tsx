import EntitySearched from '@components/search/EntitySearched';
import MainSearched from '@components/search/MainSearched';
import Search from '@components/search/Search';
import { searchQuery } from '@recoil/searchAtom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MainPage = () => {
  const navigate = useNavigate();
  const searchedType = useRecoilValue(searchQuery);

  return (
    <>
      <Search />
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      {searchedType.type === '' ? <MainSearched /> : <EntitySearched />}
    </>
  );
};

export default MainPage;
