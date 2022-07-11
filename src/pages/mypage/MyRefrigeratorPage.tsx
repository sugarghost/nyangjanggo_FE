import React, { useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../apis/axiosInstance";
import BottomFloat from "../../components/BottomFloat";
import Calendar from "../../components/mypage/Calendar";

const MyRefrigeratorPage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  const [showRegisterIngredient, setShowRegisterIngredient] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCount, setIngredientCount] = useState<number>();

  const handleOnClcikAddButton = () => {
    setShowRegisterIngredient(!showRegisterIngredient);
  };

  const handleOnChangeIngredientName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientName(e.currentTarget.value);
  };

  const handleOnChangeIngredientCount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientCount(parseInt(e.currentTarget.value));
  };

  const handleOnClickRegister = () => {
    const res = axiosInstance.post(``)
    
  };
  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="mx-auto w-full" style={{ padding: "0px 10px" }}>
            <OptionsWrapper>
              <IngredientAddBtnWrapper>
                <IngredientAddBtn onPointerDown={handleOnClcikAddButton}>
                  +
                </IngredientAddBtn>
              </IngredientAddBtnWrapper>
              {showRegisterIngredient ? (
                <>
                  <IngredientRegisterTitleInput
                    onChange={handleOnChangeIngredientName}
                    value={ingredientName}
                    placeholder="재료 이름"
                  />
                  <IngredientRegisterCountInput
                    onChange={handleOnChangeIngredientCount}
                    value={ingredientCount}
                    placeholder="재료 수량"
                    type={"number"}
                  />
                </>
              ) : (
                <>
                  <IngredientsBox className="">
                    <div>
                      06/01
                      <span style={{ margin: "0 0 0 20px" }}>달걀(6개)</span>
                    </div>
                    <div>10일 남음</div>
                  </IngredientsBox>
                </>
              )}

              <Calendar />
            </OptionsWrapper>
          </div>
        </div>
        {showRegisterIngredient && (
          <BottomFloat className="w-full">
            <RegisterButton onClick={handleOnClickRegister}>
              등록하기
            </RegisterButton>
          </BottomFloat>
        )}
      </div>
    </>
  );
};

export default MyRefrigeratorPage;

const OptionsWrapper = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0 0 0;
`;

const IngredientsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border: 1px solid grey;
  margin: 5px 0 0 0;
  pointer: cursor;
`;

const IngredientAddBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const IngredientAddBtn = styled.button`
  font-weight: 500;
  font-size: 30px;
`;

const IngredientRegisterTitleInput = styled.input`
  height: 50px;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;
const IngredientRegisterCountInput = styled.input`
  height: 50px;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  background: grey;
  margin: 0px auto;
  padding: 16px;
  color: white;
  max-width: 420px;
`;
