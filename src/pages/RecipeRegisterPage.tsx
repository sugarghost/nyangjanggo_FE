import React, { useState } from "react";
import styled from "styled-components";

import Button from "../components/Botton";
import InputV2 from "../components/InputV2";
import Textarea from "../components/Textarea";
import { registerRecipe } from "../apis/RegisterApi";

const RecipeRegisterPage = () => {
  const [mainImage, setMainImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  const handleOnClickRegister = (e: React.MouseEvent) => {
    if (registerStep === 1) {
      setRegisterStep(2);
    } else if (registerStep === 2) {
      registerRecipe("TODO 레시피 데이터 넣기");
    }
  };



  const [registerStep, setRegisterStep] = useState(1);

  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            {registerStep === 1 ? (
              <>
                <MainImgWrapperLabel>요리 메인 페이지</MainImgWrapperLabel>
                <MainImgWrapper className="img-render" src={mainImage} />
                <InputV2
                  inputLabel={"요리 이름"}
                  onChange={() => {}}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />

                <Textarea
                  inputLabel={"요리 설명"}
                  rows={10}
                  onChange={() => {}}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />
              </>
            ) : (
              <>
                <div style={{ position: "relative" }}>
                  <RegisterTitle>재료 분류</RegisterTitle>
                  <IngredientsWrapper className="box-shadow">
                    <IngredientTitle>재료</IngredientTitle>
                    <IngredientInfoWrapper>
                      <div>재료 등록</div>
                      <div>재료량</div>
                    </IngredientInfoWrapper>
                    <IngredientInfoWrapper>
                      <div>재료 등록</div>
                      <div>재료량</div>
                    </IngredientInfoWrapper>
                    <div className="position-center" style={{ bottom: "0px" }}>
                      <Button
                        styleCustom={{
                          margin: "30px auto 0 auto",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <div></div>
                      </Button>
                    </div>
                  </IngredientsWrapper>
                </div>

                <RegisterTitle margin={"30px 0 0 0"}>조리 과정</RegisterTitle>
                <IngredientsWrapper className="box-shadow">
                  <IngredientTitle>재료</IngredientTitle>
                  <RecipeInfoWrapper>
                    <div className="text-aling-left">조리과정1</div>
                    <IngredientInfoWrapper>
                      <RecipeStepImage className="img-render" />
                      <textarea placeholder="텍스트 입력"></textarea>
                    </IngredientInfoWrapper>
                  </RecipeInfoWrapper>
                  <RecipeInfoWrapper>
                    <IngredientInfoWrapper>
                      <RecipeStepImage className="img-render" />
                      <textarea></textarea>
                    </IngredientInfoWrapper>
                  </RecipeInfoWrapper>
                </IngredientsWrapper>
              </>
            )}
            <Button
              onClick={handleOnClickRegister}
              styleCustom={{ margin: "10px 0 0 0" }}
            >
              <div>등록하기</div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeRegisterPage;

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
