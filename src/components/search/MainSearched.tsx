import SearchApi from '@apis/SearchApi';
import Card from '@components/Card';
import Carousel from '@components/Carousel';
import Search from '@components/search/Search';
import useIntersectionObserver from '@hook/intersectionObserver';
import { Pageable } from '@type/searchType';
import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
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

  const getEntity10Api = SearchApi.getEntity10;
  // 게시글 목록 전처리

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
    navigate('/recipeDetailPage', { state: { boardId } });
  };

  return (
    <>
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-screen-md mx-auto">
            <div className="mx-auto w-full">
              <br />
              <br />
              <br />
              <ContentTitle>최신순</ContentTitle>
              <ScrollMenuWrapper className="flex">
                <ScrollMenu>
                  {recentData?.data.map((content: any, index: number) => (
                    <Card
                      cardTitle={content.title}
                      key={index}
                      cardImg={content.mainImg}
                      styleCustom={{ width: '175px', height: '175px', margin: '16px 0 0 0' }}
                      onClick={(e) => viewRecipeDetail(content.boardId)}
                    />
                  ))}
                </ScrollMenu>
              </ScrollMenuWrapper>
              <ContentTitle>인기도</ContentTitle>
              <ScrollMenuWrapper className="flex">
                <ScrollMenu>
                  {likeData?.data.map((content: any, index: number) => (
                    <Card
                      cardTitle={content.title}
                      key={index}
                      cardImg={content.mainImg}
                      styleCustom={{ width: '50%', margin: '16px 0 0 0' }}
                      onClick={(e) => viewRecipeDetail(content.boardId)}
                    />
                  ))}
                </ScrollMenu>
              </ScrollMenuWrapper>
            </div>
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

export default MainSearched;
