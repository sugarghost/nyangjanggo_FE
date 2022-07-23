import { postResource, getResource } from '@/apis/ResourceApi';
import { Ingredient } from '@/apis/ResourceApi';
import { textState, ingredientsSelector } from '@/recoil/ingredient';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authInstance } from '../../apis/axiosInstance';
import BottomFloat from '../../components/BottomFloat';
import Calendar from '../../components/mypage/Calendar';
import { COLOR } from '../../constants';

const MyRefrigeratorPage = () => {
  const [profileImage, setProfileImage] = useState('https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg');
  const currentUser = useRecoilValue(textState);
  const currentIngredient = useRecoilValue(ingredientsSelector);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showRegisterIngredient, setShowRegisterIngredient] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCount, setIngredientCount] = useState<number>(null);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  // const getRefrigerator = () => {};

  useEffect(() => {
    setIngredients([...currentIngredient]);
    console.log('currentIngredient : ',currentIngredient)
  }, []);

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
    const deleteItemIdx = e.target.id;

    console.log("deleteItem : ",deleteItemIdx)

    let deletedIngredients  = Array.from(ingredients)
     deletedIngredients.splice(deleteItemIdx,1 )

    console.log("deletedIngredients :: ",deletedIngredients)

    const formData = new FormData();
    formData.append('fridgeRequestDtoList', new Blob([JSON.stringify(deletedIngredients)], { type: 'application/json' }));

    authInstance
      .put(`/user/fridge`, deletedIngredients)
      .then((res) => {
        setIngredients([...deletedIngredients])
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      });
  };

  // 삭제와 수정을 둘다 
  const handleOnClickEdit = (e) => {
    const id = e.target;
    authInstance
      .put(`/user/fridge/${id}`)
      .then((res) => {
        const idx = ingredients.findIndex(id);

        setIngredients([...ingredients]);
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      });
  };

  const handleOnClickRegister = async () => {
    if (!ingredientName) {
      alert('재료 이름을 확인해 주세요!');
      return;
    }
    setLoading(true);

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

    authInstance
      .post(`/user/fridge`, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log('재료등록 : ', [...ingredients, ...requestList]);
        setIngredients([...ingredients, ...requestList]);
        alert('재료등록이 완료 되었습니다!');
      })
      .catch((err) => {
        alert('재료등록에 실패했습니다!');
        console.log('재료 등록에러 :', err);
      });

    setLoading(false);
  };
  return (
    <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="mx-auto w-full" style={{ padding: '0px 10px' }}>
          <OptionsWrapper>
            <IngredientAddBtnWrapper>
              {showRegisterIngredient ? (
                <IngredientAddBtn style={{ userSelect: 'none' }} onPointerDown={handleOnClcikAddButton}>
                  ←
                </IngredientAddBtn>
              ) : (
                <IngredientAddBtn onPointerDown={handleOnClcikAddButton}>+</IngredientAddBtn>
              )}
            </IngredientAddBtnWrapper>
            {showRegisterIngredient ? (
              <>
                <Title style={{ textAlign: 'left', userSelect: 'none' }}>재료 등록</Title>

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
                {Array.from(ingredients).map((item, idx) => {
                  return (
                    <>
                      <EditOption key={idx}>
                        {/* <div>수정</div>
                        <div onClick={handleOnClickEdit} style={{ margin: '0 4px' }}>
                          |
                        </div> */}
                        <div id={String(idx)} onClick={handleOnClickDelete} style={{}}>
                          삭제
                        </div>
                      </EditOption>
                      <IngredientsBox className="">
                        <div>
                          <span style={{ margin: '0 0 0 0' }}>
                            {item.resourceName}({item.amount}개)
                          </span>
                        </div>
                        <div>{item.endTime}일 남음</div>
                      </IngredientsBox>
                    </>
                  );
                })}
                {/* <IngredientsBox className="">
                  <div>
                    <span style={{ margin: '0 0 0 0' }}>달걀(6개)</span>
                  </div>
                  <div>10일 남음</div>
                </IngredientsBox> */}
              </>
            )}

            {/* <Calendar /> */}
          </OptionsWrapper>
        </div>
      </div>
      {showRegisterIngredient && (
        <BottomFloat className="w-full">
          <RegisterButton disabled={loading} onClick={handleOnClickRegister}>
            {loading ? '등록중' : '등록하기'}{' '}
          </RegisterButton>
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
  margin-top: 10px;
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
