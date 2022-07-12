import React, { Suspense, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import boardPostApi from "../apis/RecipeApi";
import userToken from "../recoil/userAtom";
import { RecipeView, ResourceList, StepList } from "../type/recipeType";
import { getToken, getNickname } from "../utils/jwt";

const RecipeDetailPage = ({}) => {
  // 공통 처리
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { boardId: number };

  // 페이지 조회 처리
  const userName = getNickname(getToken("userToken"));
  const [userInfo, setUserInfo] = useState<RecipeView>();
  const [boardId, setBoardId] = useState<number>(state.boardId);
  const [recipe, setRecipe] = useState<RecipeView>();
  const [resourceList, setResourceList] = useState<ResourceList[]>([]);
  const [stepList, setStepList] = useState<StepList[]>([]);

  // 넘겨 받은 boardId를 이용해 해당 레시피의 상세 정보를 받아옴
  const { isLoading, data } = useQuery(
    ["postDetail", boardId],
    async () => await boardPostApi.getRecipeDetail(boardId),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !!boardId,
      onSuccess: (e) => {
        console.log("getRecipeDetail", e);
        // 레시피 정보 처리 단계
        setRecipe({
          title: e.data.title,
          subTitle: e.data.subTitle,
          content: e.data.content,
          mainImg: e.data.mainImg,
          nickname: e.data.nickname,
          userImg: e.data.userImg,
        });

        // 재료 정보 처리 단계
        // 화면에 그릴 때 Category 단위로 나눠서 map을 중첩해 사용하기 위해서 일치하는 Category 데이터끼리 묶음
        const resourceListTemp: ResourceList[] = [];

        //넘겨온 데이터에서 resource 내용을 열거함
        e.data.resourceResponseDtoList.map((fields: any, index: number) => {
          // 기존 resourceListTemp에 저장된 Category 값과 반환된 resourceResponseDtoList 속에 category 데이터와 일치하는 경우 해당 인덱스를 반환
          const categoryIndex = resourceListTemp.findIndex(
            (item) => item.category == fields.category
          );
          // 일치하는 category가 있어서 인덱스가 -1이 아닌 경우 실행
          if (categoryIndex != -1) {
            // 일치하는 category가 있는 위치에 resources(리스트 형태) 값에 push를 통해 데이터를 추가해줌
            resourceListTemp[categoryIndex].resources.push({
              resourceName: fields.resourceName,
              amount: fields.num,
            });
          } else {
            // 만약 반환된 인덱스가 없으면 일치하는 카테고리가 없다는 뜻으로 신규로 만들어줌
            resourceListTemp.push({
              category: fields.category,
              resources: [
                {
                  resourceName: fields.resourceName,
                  amount: fields.num,
                },
              ],
            });
          }
        });
        setResourceList(resourceListTemp);

        // 조리 과정 처리 단계
        const stepListTemp: StepList[] = [];
        e.data.recipeStepResponseDtoList.map((fields: any, index: number) => {
          stepListTemp[fields.stepNum] = fields;
        });
        setStepList(stepListTemp);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  useEffect(() => {}, []);
  // 수정 페이지 기능
  const modifyRecipeDetail = () => {
    navigate("/recipeRegisterPage", {
      state: { boardId, recipe, resourceList, stepList, type: "modify" },
    });
  };

  const deleteRecipeDetail = () => {
    navigate("/recipeRegisterPage", {
      state: { boardId, recipe, resourceList, stepList, type: "modify" },
    });
  };
  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            <RegisterImage className="img-render" src={recipe?.mainImg} />
            <p>{recipe?.title}</p>
            <p>{recipe?.subTitle}</p>
            <p>{recipe?.content}</p>
            <button onClick={modifyRecipeDetail}>수정</button>
            <button onClick={deleteRecipeDetail}>삭제</button>
            {recipe?.nickname === userName && (
              <>
                <button onClick={modifyRecipeDetail}>수정</button>
                <button onClick={deleteRecipeDetail}>삭제</button>
              </>
            )}

            <hr></hr>

            <RegisterTitle>
              <span>재료 분류</span>
            </RegisterTitle>
            <IngredientsWrapper className="box-shadow">
              {resourceList.map((categorys, index) => (
                <div key={index}>
                  <IngredientsWrapper className="box-shadow">
                    <IngredientTitle>{categorys.category}</IngredientTitle>
                    {categorys.resources.map((resource, subIndex) => (
                      <div key={index + "_" + subIndex}>
                        <IngredientInfoWrapper>
                          <div className="float-left">
                            {resource.resourceName}
                          </div>
                          <div className="float-right">{resource.amount}</div>
                        </IngredientInfoWrapper>
                      </div>
                    ))}
                  </IngredientsWrapper>
                </div>
              ))}
            </IngredientsWrapper>
            <hr></hr>

            <RegisterTitle>
              <span>조리과정</span>
            </RegisterTitle>
            <IngredientsWrapper className="box-shadow">
              {stepList.map((field, index) => (
                <div key={index}>
                  <IngredientTitle>조리과정 {index + 1}</IngredientTitle>
                  <RecipeInfoWrapper>
                    <IngredientInfoWrapper>
                      <RecipeStepImage
                        src={field.imageLink}
                        className="img-render"
                      />
                      <p>{field.content}</p>
                    </IngredientInfoWrapper>
                  </RecipeInfoWrapper>
                </div>
              ))}
            </IngredientsWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetailPage;

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
  margin: ${(props) => props.margin ?? "0"};
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
