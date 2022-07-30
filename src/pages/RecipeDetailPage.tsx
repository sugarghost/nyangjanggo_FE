import recipeApi from '@apis/RecipeApi';
import CommentsPage from '@components/comment/CommentsPage';
import { ReactComponent as EditIcon } from '@icon/edit.svg';
import { ReactComponent as HeartIcon } from '@icon/heart.svg';
import { ReactComponent as TrashIcon } from '@icon/x.svg';
import userToken from '@recoil/userAtom';
import { userSelector } from '@recoil/userSelector';
import { RecipeDetail, ResourceForm, StepForm } from '@type/recipeType';
import { getToken, getNickname } from '@utils/jwt';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const RecipeDetailPage = ({ match }) => {
  // 공통 처리
  const navigate = useNavigate();
  const location = useLocation();

  // 파라미터 처리
  const { boardIdParams } = useParams();
  // 페이지 조회 처리
  const userInfomation = useRecoilValue(userSelector);
  const [userInfo, setUserInfo] = useState<RecipeDetail>();
  const [boardId, setBoardId] = useState<number>(Number(boardIdParams));
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const [ResourceForm, setResourceForm] = useState<ResourceForm[]>([]);
  const [StepForm, setStepForm] = useState<StepForm[]>([]);
  // 좋아요 여부 확인
  const [isLike, setIsLike] = useState(false);
  const deleteRecipeApi = recipeApi.deleteRecipe;
  const likeRecipeApi = recipeApi.likeRecipe;

  // 넘겨 받은 boardId를 이용해 해당 레시피의 상세 정보를 받아옴
  const { isLoading, data } = useQuery(['postDetail', boardId], async () => recipeApi.getRecipeDetail(boardId), {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!boardId,
    onSuccess: (e) => {
      // 레시피 정보 처리 단계
      setRecipe({
        title: e.data.title,
        content: e.data.content,
        mainImg: e.data.mainImg,
        nickname: e.data.nickname,
        userImg: e.data.userImg,
      });

      // 재료 정보 처리 단계
      // 화면에 그릴 때 Category 단위로 나눠서 map을 중첩해 사용하기 위해서 일치하는 Category 데이터끼리 묶음
      const ResourceFormTemp: ResourceForm[] = [];

      // 넘겨온 데이터에서 resource 내용을 열거함
      e.data.resourceResponseDtoList?.map((fields: any, index: number) => {
        // 기존 ResourceFormTemp에 저장된 Category 값과 반환된 resourceResponseDtoList 속에 category 데이터와 일치하는 경우 해당 인덱스를 반환
        const categoryIndex = ResourceFormTemp.findIndex((item) => item.category === fields.category);
        // 일치하는 category가 있어서 인덱스가 -1이 아닌 경우 실행
        if (categoryIndex !== -1) {
          // 일치하는 category가 있는 위치에 resources(리스트 형태) 값에 push를 통해 데이터를 추가해줌
          ResourceFormTemp[categoryIndex].resources.push({
            resourceName: fields.resourceName,
            amount: fields.amount,
          });
        } else {
          // 만약 반환된 인덱스가 없으면 일치하는 카테고리가 없다는 뜻으로 신규로 만들어줌
          ResourceFormTemp.push({
            category: fields.category,
            resources: [
              {
                resourceName: fields.resourceName,
                amount: fields.amount,
              },
            ],
          });
        }
      });
      setResourceForm(ResourceFormTemp);

      // 조리 과정 처리 단계
      const StepFormTemp: StepForm[] = [];
      e.data.recipeStepResponseDtoList.map((fields: any, index: number) => {
        StepFormTemp[fields.stepNum] = fields;
      });
      setStepForm(StepFormTemp);

      // 좋아요 처리 단계
      if (userInfomation) {
        e.data.goodList.map((fields: any, index: number) => {
          if (fields.nickname === userInfomation.nickname) {
            setIsLike(true);
          }
        });
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  // 수정 페이지 기능
  const modifyRecipeDetail = () => {
    navigate('/recipeRegisterPage', { state: { boardId, recipe, ResourceForm, StepForm, type: 'modify' } });
  };

  const deleteRecipeMutation = useMutation((boardId: number) => deleteRecipeApi(boardId), {
    onSuccess: (res) => {
      navigate('/');
    },
    onError: (e) => {
      console.log('putRecipeMutation Error:', e);
    },
  });

  // 삭제 버튼 클릭시 삭제
  const deleteRecipeDetail = () => {
    deleteRecipeMutation.mutate(boardId);
  };

  const likeRecipeMutation = useMutation((boardId: number) => likeRecipeApi(boardId), {
    onSuccess: (res) => {
      setIsLike(!isLike);
    },
    onError: (e) => {
      console.log('likeRecipeMutation Error:', e);
    },
  });

  // 좋아요 버튼
  const likeRecipeDetail = () => {
    likeRecipeMutation.mutate(boardId);
  };

  return (
    <div className="mx-auto w-9/10">
      <div className="float-right">
        {recipe?.nickname === userInfomation?.nickname && (
          <>
            <IconButton onClick={modifyRecipeDetail}>
              <EditIcon className="m-auto" stroke="white" />
            </IconButton>
            <IconButton onClick={deleteRecipeDetail}>
              <TrashIcon className="m-auto" stroke="white" />
            </IconButton>
          </>
        )}
        {userInfomation?.nickname && (
          <IconButton onClick={likeRecipeDetail}>
            <HeartIcon className="m-auto" stroke={isLike ? '#EB3120' : 'white'} />
          </IconButton>
        )}
      </div>
      <img className="min-h-80 mb-4 w-full rounded-2xl image-render-auto bg-gray-100" src={recipe?.mainImg} alt="" />
      <p className="text-gray-700 text-left text-4xl my-1 font-900">{recipe?.title}</p>
      <textarea
        className="text-left text-lg w-full my-1 font-300 border-gray-200 border-2 rounded-md min-h-30 p-2 focus:outline-none"
        readOnly
        value={recipe?.content}
      />

      <hr />
      {ResourceForm.length !== 0 ? (
        <>
          <p className="text-gray-700 text-left text-lg my-1 font-900">재료 분류</p>
          {ResourceForm.map((categorys, index) => (
            <div key={categorys.category}>
              <div className="shadow-md p-4 flex flex-col w-full h-auto rounded-lg">
                <p className="text-lg my-1 font-500 text-left">{categorys.category}</p>
                {categorys.resources.map((resource, subIndex) => (
                  <div key={`${categorys.category}_${resource.resourceName}`}>
                    <div className="flex justify-between w-full mb-4">
                      <span className="float-left text-left text-base w-2/3 my-1 font-400">
                        {resource.resourceName}
                      </span>
                      <span className="text-base my-1 font-400">:</span>
                      <span className="float-right text-right text-base w-1/3 my-1 font-400">{resource.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <hr />
        </>
      ) : (
        <></>
      )}
      {StepForm.length !== 0 ? (
        <>
          <p className="text-gray-700 text-left text-lg my-1 font-900">조리 과정</p>
          <div className="shadow-md p-4 flex flex-col w-full h-auto rounded-lg">
            {StepForm.map((field, index) => (
              <div key={index}>
                <p className="text-lg my-1 font-500 text-left">조리과정 {index + 1}</p>
                <RecipeInfoWrapper>
                  <div className="flex justify-between w-full mb-4">
                    <img src={field.imageLink} className="img-render w-2/6 rounded-lg" alt="" />
                    <div className="w-4/6 ml-4 text-left border-gray-200 border-2 rounded-md p-1">
                      {field.stepContent}
                    </div>
                  </div>
                </RecipeInfoWrapper>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      <CommentsPage boardId={boardId} />
    </div>
  );
};

export default RecipeDetailPage;
const IconButton = styled.button`
  margin: 0.25rem;
  background-color: #dedede;
  vertical-align: middle;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
`;

const MainImgWrapperLabel = styled.div`
  text-align: left;
`;

const MainImgWrapper = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-top: 10px;
`;

const RegisterTitle = styled.div<any>`
  text-align: left;
  width: 100%;
  font-weight: bold;
  margin: ${(props) => props.margin ?? '0'};
`;

const RegisterImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const IngredientsWrapper = styled.div`
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-width: 350px;
  border-radius: 8px;
  padding: 16px 16px 100px 16px;
`;

const IngredientTitle = styled.div`
  text-align: left;
  font-weight: bold;
  margin-bottom: 13px;
`;

const IngredientInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 7px 0;
  border-bottom: 1px solid grey;
`;

const RecipeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RecipeStepImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;
