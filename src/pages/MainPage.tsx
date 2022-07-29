import MainSearched from '@components/search/MainSearched';
import Search from '@components/search/Search';
import { searchTypeAtom } from '@recoil/searchAtom';
import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MainPage = () => {
  const navigate = useNavigate();
  const searchTypeState = useRecoilValue(searchTypeAtom);
  // 메인 페이지 검색 결과 페이지 코드 스플리팅
  const EntitySearched = React.lazy(() => import('@components/search/EntitySearched'));
  const ResourceSearched = React.lazy(() => import('@components/search/ResourceSearched'));
  const TitleSearched = React.lazy(() => import('@components/search/TitleSearched'));

  useEffect(() => {}, [searchTypeState]);
  return (
    <>
      <Search />
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      {searchTypeState === '' ? (
        <MainSearched />
      ) : searchTypeState === 'entity' ? (
        <Suspense>
          <EntitySearched />
        </Suspense>
      ) : searchTypeState === 'resource' ? (
        <Suspense>
          <ResourceSearched />
        </Suspense>
      ) : searchTypeState === 'title' ? (
        <Suspense>
          <TitleSearched />
        </Suspense>
      ) : (
        <MainSearched />
      )}
    </>
  );
};

export default MainPage;
