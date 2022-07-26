import EntitySearched from '@components/search/EntitySearched';
import MainSearched from '@components/search/MainSearched';
import ResourceSearched from '@components/search/ResourceSearched';
import Search from '@components/search/Search';
import TitleSearched from '@components/search/TitleSearched';
import { searchQuery } from '@recoil/searchAtom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MainPage = () => {
  const navigate = useNavigate();
  const searchQueryState = useRecoilValue(searchQuery);

  return (
    <>
      <Search />
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      {searchQueryState.type === '' ? (
        <MainSearched />
      ) : searchQueryState.type === 'entity' ? (
        <EntitySearched />
      ) : searchQueryState.type === 'resource' ? (
        <ResourceSearched />
      ) : searchQueryState.type === 'title' ? (
        <TitleSearched />
      ) : (
        <MainSearched />
      )}
    </>
  );
};

export default MainPage;
