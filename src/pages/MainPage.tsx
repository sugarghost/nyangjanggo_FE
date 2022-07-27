import MainSearched from '@components/search/MainSearched';
import Search from '@components/search/Search';
import { searchQuery } from '@recoil/searchAtom';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MainPage = () => {
  const navigate = useNavigate();
  const searchQueryState = useRecoilValue(searchQuery);
  // 메인 페이지 검색 결과 페이지 코드 스플리팅
  const EntitySearched = React.lazy(() => import('@components/search/EntitySearched'));
  const ResourceSearched = React.lazy(() => import('@components/search/ResourceSearched'));
  const TitleSearched = React.lazy(() => import('@components/search/TitleSearched'));
  return (
    <>
      <Search />
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      {searchQueryState.type === '' ? (
        <MainSearched />
      ) : searchQueryState.type === 'entity' ? (
        <Suspense>
          <EntitySearched />
        </Suspense>
      ) : searchQueryState.type === 'resource' ? (
        <Suspense>
          <ResourceSearched />
        </Suspense>
      ) : searchQueryState.type === 'title' ? (
        <Suspense>
          {' '}
          <TitleSearched />
        </Suspense>
      ) : (
        <MainSearched />
      )}
    </>
  );
};

export default MainPage;
