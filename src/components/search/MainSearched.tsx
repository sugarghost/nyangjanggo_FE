import SearchApi from '@apis/SearchApi';
import Card from '@components/Card';
import Carousel from '@components/Carousel';
import Search from '@components/search/Search';
import useIntersectionObserver from '@hook/intersectionObserver';
import RightArrow from '@images/right_arrow.png';
import { searchQueryAtom, searchTypeAtom } from '@recoil/searchAtom';
import { Pageable } from '@type/searchType';
import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useInfiniteQuery, useQuery } from 'react-query';
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

const MainSearched = () => {
  // 공통 처리
  const navigate = useNavigate();
  // 인기도순, 최신순 각각 10개씩 가져오기 위한 API
  const getEntity10Api = SearchApi.getRecipeListByEntity10;
  // 검색 이벤트 발생 시 컴포넌트간 검색 방식을 교환하기 위한 recoil
  const [searchQueryState, setSearchQueryState] = useRecoilState(searchQueryAtom);
  const [searchTypeState, setSearchTypeState] = useRecoilState(searchTypeAtom);

  // 최신순 게시물 가져오기
  const { data: recentData } = useQuery(['getRecentData'], async () => getEntity10Api('createdAt'), {
    refetchOnWindowFocus: false,
  });

  // 인기도 순 게시물 가져오기
  const { data: likeData } = useQuery(['getLikeData'], async () => getEntity10Api('goodCount'), {
    refetchOnWindowFocus: false,
  });
  // 상세 페이지 기능
  const viewRecipeDetail = (boardId: number) => {
    navigate(`/recipeDetailPage/${boardId}`);
  };
  // 최신순이나 인기도 순 좀더 자세히 보는 용도
  const viewContentDetail = (type: string) => {
    if (type === 'recent') {
      setSearchTypeState('entity');
      setSearchQueryState({
        query: 'createdAt,desc',
        size: 10,
        page: 0,
      });
    } else if (type === 'like') {
      setSearchTypeState('entity');
      setSearchQueryState({
        query: 'goodCount,desc',
        size: 10,
        page: 0,
      });
    }
  };

  return (
    <>
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="mx-auto w-full min-h-screen">
          <ContentTitle>
            최신순
            <ContentTitleMore onClick={() => viewContentDetail('recent')}>
              더보기
              <img src={RightArrow} />
            </ContentTitleMore>
          </ContentTitle>
          <ScrollMenuWrapper className="flex">
            <ScrollMenu>
              {recentData?.data.map((content: any, index: number) => (
                <Card
                  cardTitle={content.title}
                  key={index}
                  cardImg={content.mainImg}
                  styleCustom={{ width: '250px', margin: '1rem' }}
                  onClick={(e) => viewRecipeDetail(content.boardId)}
                  goodCount={content.goodCount}
                  nickname={content.nickname}
                  userImg={content.userImg}
                />
              ))}
            </ScrollMenu>
          </ScrollMenuWrapper>
          <ContentTitle>
            인기도
            <ContentTitleMore onClick={() => viewContentDetail('like')}>
              더보기
              <img src={RightArrow} />
            </ContentTitleMore>
          </ContentTitle>
          <ScrollMenuWrapper className="flex">
            <ScrollMenu>
              {likeData?.data.map((content: any, index: number) => (
                <Card
                  cardTitle={content.title}
                  key={index}
                  cardImg={content.mainImg}
                  styleCustom={{ width: '250px', margin: '1rem' }}
                  onClick={(e) => viewRecipeDetail(content.boardId)}
                  goodCount={content.goodCount}
                  nickname={content.nickname}
                  userImg={content.userImg}
                />
              ))}
            </ScrollMenu>
          </ScrollMenuWrapper>
        </div>
        <hr />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentTitleMore = styled.span`
  float: right;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #9a9a9a;
  display: flex;
  margin-left: 10px;
  align-items: center;
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
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 0.5rem;
  width: 100%;

  @media screen and (max-width: 500px) {
    max-width: 410px;
  }
`;

export default MainSearched;
