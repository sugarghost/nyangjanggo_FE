import RecipeApi from '@apis/RecipeApi';
import Card from '@components/Card';
import React, { Suspense, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LikePage = () => {
  // 공통 처리
  const navigate = useNavigate();
  const getLikeListApi = RecipeApi.getLikeList;
  const [likeList, setLikeList] = useState([]);

  // 좋아요 게시물 가져오기
  const { data: likeListData } = useQuery(['getLikeList'], async () => getLikeListApi(), {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setLikeList(res.data.content);
    },
  });

  // 상세 페이지 기능
  const viewRecipeDetail = (boardId: number) => {
    navigate('/recipeDetailPage', { state: { boardId } });
  };

  return (
    <>
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="mx-auto w-full min-h-screen">
          <CardsContainer className="flex flex-row">
            {likeList.map((content: any) => (
              <Card
                cardTitle={content.title}
                key={content.boardId}
                cardImg={content.mainImg}
                styleCustom={{ width: '50%', margin: '16px 0 0 0' }}
                onClick={(e) => viewRecipeDetail(content.boardId)}
                goodCount={content.goodCount}
              />
            ))}
          </CardsContainer>
        </div>
      </Suspense>
    </>
  );
};

const CardsContainer = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px 0px 15px;
`;

export default LikePage;
