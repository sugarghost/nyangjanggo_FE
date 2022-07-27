import SearchApi from '@apis/SearchApi';
import Card from '@components/Card';
import Carousel from '@components/Carousel';
import Search from '@components/search/Search';
import useIntersectionObserver from '@hook/intersectionObserver';
import { searchQuery } from '@recoil/searchAtom';
import { Pageable, SearchContent } from '@type/searchType';
import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useInfiniteQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

export type PostContent = {
  boardId: number;
  commentCount: number;
  content: string;
  createdAt: string;
  goodCount: number;
  mainImg: string;
  modifiedAt: string;
  nickname: string;
  title: string;
  userImg: string;
};

const TitleSearched = () => {
  // 공통 처리
  const navigate = useNavigate();
  // 검색 이벤트 발생 시 컴포넌트간 검색 방식을 교환하기 위한 recoil
  const [searchQueryState, setSearchQueryState] = useRecoilState(searchQuery);

  // 검색을 위한 API
  const getRecipeListByTitleApi = SearchApi.getRecipeListByTitle;

  // 무한 스크롤을 위해 특정 요소가 보이는지 판별하기 위한 Intersection Observer
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // 타겟이 보이는 경우 fetchNextPage를 실행해 다음 페이지 데이터를 가져옴
    isIntersecting && fetchNextPage();
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  // 서버와 통신하기 위한 axios를 실행하는 함수로, 리턴 값을 무한 스크롤에서 활용하기 위해 재가공
  const fetchPostList = async (pageParam: number) => {
    // 추후에 다른 모드(좋아요 정렬 등)를 지원 시 재 사용성을 높이기 위해 선언
    const paramTemplate = {
      page: pageParam,
      size: searchQueryState.size,
      query: searchQueryState.query,
    };
    const res = await getRecipeListByTitleApi(paramTemplate);
    console.log(res);
    const content = [];
    res.data.hits?.hits.map((hit) => {
      content.push({
        boardId: hit._source.id,
        title: hit._source.title,
        nickname: hit._source.userNickname,
        userImg: hit._source.userImageLink,
        goodCount: hit._source.goodCount,
        commentCount: hit._source.commentCount,
        mainImg: hit._source.mainImageLink,
        createdAt: hit._source.createdAt,
        modifiedAt: hit._source.modifiedAt,
      });
    });
    const last = res.data.hits?.total.value <= paramTemplate.size * (pageParam + 1);
    // 페이지 번호를 증가시키는 용도로 사용 될 nextPage는 기존 pageParam(페이지 넘버)에 +1을 해줌
    return { content, nextPage: pageParam + 1, last: last === undefined || last === true };
  };

  // 무한 스크롤을 위해 useInfiniteQuery를 사용함,
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    'infinitePosts',
    // pageParam(페이지 번호)를 파라미터로 axios 실행을 위한 fetchPostList를 실행
    // 페이지 번호는 getNextPageParam을 통해 1씩 증가하다가 마지막 도달 시 undefined로 작동을 멈춤
    async ({ pageParam = searchQueryState.page }) => fetchPostList(pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.last) return lastPage.nextPage;
        return undefined;
      },
    },
  );

  // 상세 페이지 기능
  const viewRecipeDetail = (boardId: number) => {
    navigate('/recipeDetailPage', { state: { boardId } });
  };

  // 메인 페이지로 돌아가는 용도
  const viewContentDetail = () => {
    setSearchQueryState({
      type: '',
      query: '',
      size: 10,
      page: 0,
    });
  };

  return (
    <>
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-screen-md mx-auto">
            <div className="mx-auto w-full">
              <ContentTitle>
                요리이름 검색결과<ContentTitleMain onClick={viewContentDetail}>메인보기</ContentTitleMain>
              </ContentTitle>
              <CardsContainer className="flex flex-row">
                {data?.pages?.map((page, index) => (
                  <React.Fragment key={index}>
                    {page?.content?.map((content: SearchContent, subIndex: number) => (
                      <Card
                        cardTitle={content.title}
                        key={content.boardId}
                        cardImg={content.mainImg}
                        styleCustom={{ width: '40vw', margin: 'auto' }}
                        onClick={(e) => viewRecipeDetail(content.boardId)}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </CardsContainer>
            </div>
            {isFetchingNextPage ? (
              <div className="py-3 text-center">로딩 중</div>
            ) : hasNextPage ? (
              <div ref={setTarget} className="py-3 text-center" />
            ) : (
              <></>
            )}

            <hr />
          </div>
        </div>
      </Suspense>
    </>
  );
};

const ContentTitle = styled.div`
  text-align: left;
  padding: 0px 15px 0px 15px;
  font-family: 'NEXON Lv2 Gothic';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  max-width: inherit;
  padding: 16px;
  color: #eb3120;
`;

const ContentTitleMain = styled.span`
  float: right;
`;
const CardsContainer = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px 0px 15px;
`;

const ScrollMenuWrapper = styled.div`
  margin: 8px 0 0 0;
  padding: 0 0 30px 16px;
  overflow: scroll;

  @media screen and (max-width: 500px) {
    max-width: 410px;
  }
`;

export default TitleSearched;
