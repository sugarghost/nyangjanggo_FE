import { postResource, getResource } from '@/apis/ResourceApi';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { authInstance } from '../../apis/axiosInstance';
import { axiosInstance } from '../../apis/axiosInstance';
import BottomFloat from '../../components/BottomFloat';
import Calendar from '../../components/mypage/Calendar';
import { COLOR } from '../../constants';

const MyRefrigeratorPage = () => {
  const [profileImage, setProfileImage] = useState('https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg');
  const [ingredients, setIngredients] = useState<any>([]);
  const [showRegisterIngredient, setShowRegisterIngredient] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCount, setIngredientCount] = useState<number>(null);
  const [expirationDate, setExpirationDate] = useState(new Date());

  const getRefrigerator = () => {};

  useEffect(() => {
    getResource();
  }, [showRegisterIngredient]);

  const handleOnClcikAddButton = () => {
    setShowRegisterIngredient(!showRegisterIngredient);
  };

  const handleOnChangeIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.currentTarget.value);
  };

  const handleOnChangeIngredientCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientCount(parseInt(e.currentTarget.value));
  };

  const handleOnClickDelete = (e) => {
    const id = e.target;

    authInstance
      .delete(`/user/fridge/${id}`)
      .then((res) => {
        const _ingredients = ingredients.filter((item) => item.id !== id);

        setIngredients(_ingredients);
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      });
  };

  const handleOnClickEdit = (e) => {
    const id = e.target;
    authInstance
      .delete(`/user/fridge/${id}`)
      .then((res) => {
        const idx = ingredients.findIndex(id);

        setIngredients([...ingredients]);
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      });
  };

  const handleOnClickRegister = () => {
    if (!ingredientName) {
      alert('재료 이름을 확인해 주세요!');
      return;
    }

    const formData = new FormData();

    const requestList = [
      {
        category: '',
        resourceName: ingredientName,
        amount: String(ingredientCount),
        endTime: String(expirationDate.toISOString()).substr(0, 10),
      },
    ];

    formData.append('fridgeRequestDtoList', new Blob([JSON.stringify(requestList)], { type: 'application/json' }));
    postResource(formData);
  };
  return (
    <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="mx-auto w-full" style={{ padding: '0px 10px' }}>
          <OptionsWrapper>
            <IngredientAddBtnWrapper>
              {showRegisterIngredient ? (
                <IngredientAddBtn onPointerDown={handleOnClcikAddButton}>←</IngredientAddBtn>
              ) : (
                <IngredientAddBtn onPointerDown={handleOnClcikAddButton}>+</IngredientAddBtn>
              )}
            </IngredientAddBtnWrapper>
            {showRegisterIngredient ? (
              <>
                <Title style={{ textAlign: 'left' }}>재료 등록</Title>

                <label
                  style={{
                    textAlign: 'left',
                    color: '#676767',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    margin: '32px 0 0 0',
                  }}
                >
                  재료 이름
                </label>
                <IngredientRegisterTitleInput
                  style={{ margin: '10px 0 0 0' }}
                  onChange={handleOnChangeIngredientName}
                  value={ingredientName}
                  placeholder="재료 이름"
                />
                <label
                  style={{
                    textAlign: 'left',
                    color: '#676767',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    margin: '29px 0 0 0',
                  }}
                >
                  재료 수량
                </label>
                <IngredientRegisterCountInput
                  style={{ margin: '10px 0 0 0' }}
                  onChange={handleOnChangeIngredientCount}
                  value={ingredientCount}
                  placeholder="재료 수량"
                  type="number"
                />

                <Time style={{ textAlign: 'left' }}>유통기한</Time>
                <DatePickerWrapper style={{ margin: '20px 0 0 -90px' }}>
                  <DatePicker
                    style={{ margin: '0 0 0 -100px' }}
                    selected={expirationDate}
                    onChange={(date: Date) => setExpirationDate(date)}
                  />
                </DatePickerWrapper>
              </>
            ) : (
              <>
                <EditOption>
                  <div>수정</div>
                  <div onClick={handleOnClickEdit} style={{ margin: '0 4px' }}>
                    |
                  </div>
                  <div onClick={handleOnClickDelete} style={{}}>
                    삭제
                  </div>
                </EditOption>
                <IngredientsBox className="">
                  <div>
                    <span style={{ margin: '0 0 0 0' }}>달걀(6개)</span>
                  </div>
                  <div>10일 남음</div>
                </IngredientsBox>
              </>
            )}

            {/* <Calendar /> */}
          </OptionsWrapper>
        </div>
      </div>
      {showRegisterIngredient && (
        <BottomFloat className="w-full">
          <RegisterButton onClick={handleOnClickRegister}>등록하기</RegisterButton>
        </BottomFloat>
      )}
    </div>
  );
};

export default MyRefrigeratorPage;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #676767;
`;

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
  margin: 5px 0 0 0;
  pointer: cursor;
  padding: 26px 21px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
`;

const EditOption = styled.div`
  display: flex;
  justify-content: end;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #797979;
  padding: 0 0 2px 0;
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
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 12px;
  &:focus {
    outline: none;
  }
`;
const IngredientRegisterCountInput = styled.input`
  height: 50px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 12px;

  &:focus {
    outline: none;
  }
`;

const Time = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #676767;
  margin: 50px 0 0 0;
`;

const DatePickerWrapper = styled.div`
  margin: 10px 0 0 0;
  height: 50px;
  width: 100%;
  display: flex;
  item-align: left;
  justify-content: space-between;

  &:focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  background: ${COLOR.MAIN};
  margin: 0px auto;
  padding: 16px;
  color: white;
  max-width: 420px;
`;
