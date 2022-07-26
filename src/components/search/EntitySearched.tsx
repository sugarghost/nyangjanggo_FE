import SearchApi from '@apis/SearchApi';
import Card from '@components/Card';
import Carousel from '@components/Carousel';
import Search from '@components/search/Search';
import useIntersectionObserver from '@hook/intersectionObserver';
import { searchQuery } from '@recoil/searchAtom';
import { Pageable } from '@type/searchType';
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

const EntitySearched = () => {
  // 공통 처리
  const navigate = useNavigate();
  // 검색 이벤트 발생 시 컴포넌트간 검색 방식을 교환하기 위한 recoil
  const searchQueryState = useRecoilValue(searchQuery);

  // 게시글 목록 전처리
  const [boardType, setBoardType] = useState<string>('date');
  const [axiosParam, setAxiosParam] = useState<any>({
    size: 10,
    sort: 'createdAt,desc',
  });
  // 검색을 위한 API
  const getEntityApi = SearchApi.getRecipeListByEntity;

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
    // API가 명확하지 않은 시점이라 getPostsByDate라는 함수로 호출 중
    // 나중에 API가 정리되면, 한개에 기능에 sort 를 기반으로 정렬 로직이 좀 달라질 예정
    const res = await getEntityApi(paramTemplate);
    const { content, last } = res.data;
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

  return (
    <>
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-screen-md mx-auto">
            <div className="mx-auto w-full">
              <ContentTitle>
                {searchQueryState.query.split(','[0]) === 'goodCount' ? '인기 레시피' : '최신 레시피'}
              </ContentTitle>
              <CardsContainer className="flex flex-row">
                {data?.pages?.map((page, index) => (
                  <>
                    {page?.content?.map((content: any, subIndex: number) => (
                      <Card
                        cardTitle={content.title}
                        key={`${index}_${subIndex}`}
                        cardImg={content.mainImg}
                        styleCustom={{ width: '40vw', margin: 'auto' }}
                        onClick={(e) => viewRecipeDetail(content.boardId)}
                      />
                      // <div
                      //   className="flex my-2"
                      //   onClick={(e) => viewRecipeDetail(content.boardId)}
                      //   key={`${index}_${subIndex}`}
                      // >
                      //   <img src={content.mainImg} className="w-2/5" />
                      //   <div className="w-full">
                      //     <p>{content.title}</p>
                      //     <div className="flex">
                      //       <div>
                      //         <p>{content.nickname}</p>좋아요: {content.goodCount}
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                    ))}
                  </>
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
  padding: 16px 0 0 16px;
  color: #eb3120;
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

export default EntitySearched;
