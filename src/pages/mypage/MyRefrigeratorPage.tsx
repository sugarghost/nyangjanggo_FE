import { postResource, getResource, Ingredient } from '@/apis/ResourceApi';
import { ingredientsSelector } from '@/recoil/ingredient';
import { isExist } from '@utils/jwt';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authInstance } from '../../apis/axiosInstance';
import Calendar from '../../components/mypage/Calendar';

const MyRefrigeratorPage = () => {
  const [profileImage, setProfileImage] = useState('https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg');
  // 페이지 이동 후 돌아오면 반영이 안되는 오류가 있어 비활성화(아마 캐시 관련 사항이 아닐까 싶음)
  const currentIngredient = useRecoilValue(ingredientsSelector);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showRegisterIngredient, setShowRegisterIngredient] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCount, setIngredientCount] = useState<number>(null);
  const [expirationDate, setExpirationDate] = useState<any>();
  const [editIngredientId, setEditIngredientId] = useState<number | null>();
  const [loading, setLoading] = useState(false);

  useQuery(['getingredients'], async () => getResource(), {
    refetchOnWindowFocus: false,
    enabled: isExist(),
    onSuccess: (res) => {
      setIngredients(res.data);
    },
  });

  const handleOnClcikAddButton = () => {
    setShowRegisterIngredient(!showRegisterIngredient);
  };

  const handleOnChangeIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.currentTarget.value);
  };

  const handleOnChangeIngredientCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientCount(parseInt(e.currentTarget.value));
  };

  const getExpirationDay = (date) => {
    const exprationDate = new Date(date);
    const nowDate = new Date();

    const diffDate = exprationDate.getTime() - nowDate.getTime();
    const diffDateNumber = Math.floor(diffDate / (1000 * 60 * 60 * 24)) + 1;

    let returnElement = <div>{diffDateNumber} 일 남음</div>;

    if (diffDateNumber === 0 || isNaN(diffDateNumber)) {
      returnElement = <div style={{ color: '#ff7f00' }}>오늘까지</div>;
    } else if (diffDateNumber < 0) {
      returnElement = <div style={{ color: 'red' }}>{Math.abs(diffDateNumber)} 일이 지났습니다!</div>;
    }
    return returnElement;
  };

  const handleOnClickDelete = (e) => {
    const deleteItemIdx = e.target.id;

    const deletedIngredients = Array.from(ingredients);
    deletedIngredients.splice(deleteItemIdx, 1);

    const formData = new FormData();

    formData.append(
      'fridgeRequestDtoList',
      new Blob([JSON.stringify(deletedIngredients)], { type: 'application/json' }),
    );

    authInstance
      .put(`/user/fridge`, formData)
      .then((res) => {
        setIngredients([...deletedIngredients]);
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      });
  };

  const [editMode, setEditMode] = useState(false);
  // 삭제와 수정을 둘다
  const handleOnClickEditMode = (e) => {
    const selectIngredientId = e.target.id as number;
    setEditIngredientId(e.target.id);
    setEditMode(true);

    setShowRegisterIngredient(true);

    const editIngredient = ingredients[selectIngredientId] as Ingredient;

    setIngredientName(editIngredient.resourceName);
    setIngredientCount(parseInt(editIngredient.amount));

    // setEditIngredientId(null);
    // setEditMode(false);
  };

  const handleOnClickEdit = () => {
    const editIngredientsArray = Array.from(ingredients);

    editIngredientsArray.push({
      resourceName: ingredientName,
      amount: String(ingredientCount),
      endTime: expirationDate,
      category: '',
    });

    editIngredientsArray.splice(editIngredientId, 1);

    const formData = new FormData();

    formData.append(
      'fridgeRequestDtoList',
      new Blob([JSON.stringify(editIngredientsArray)], { type: 'application/json' }),
    );

    authInstance
      .put(`/user/fridge`, formData)
      .then((res) => {
        setIngredients([...editIngredientsArray]);
      })
      .catch((err) => {
        console.log('재료 가져오기 에러 :', err);
      })
      .finally(() => {
        setEditMode(false);
        setEditIngredientId(null);
        setIngredientName('');
        setIngredientCount(null);
        setShowRegisterIngredient(false);
      });
  };

  const handleOnClickRegister = async () => {
    if (!ingredientName) {
      alert('재료 이름을 확인해 주세요!');
      return;
    }

    if (ingredientCount < 1) {
      alert('수량은 1개 이상으로 입력해주세요!');
      return;
    }

    setLoading(true);

    const formData = new FormData();

    const requestList = [
      {
        category: '',
        resourceName: ingredientName,
        amount: String(ingredientCount),
        endTime: String(expirationDate),
      },
    ];

    formData.append('fridgeRequestDtoList', new Blob([JSON.stringify(requestList)], { type: 'application/json' }));

    authInstance
      .post(`/user/fridge`, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setIngredients([...ingredients, ...requestList]);
        setIngredientName('');
        setIngredientCount(1);
        alert('재료등록이 완료 되었습니다!');
      })
      .catch((err) => {
        alert('재료등록에 실패했습니다!');
        console.log('재료 등록에러 :', err);
      });

    setLoading(false);
  };
  return (
    <div className="mx-auto w-full min-h-screen" style={{ padding: '0px 10px' }}>
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
            <input
              type="date"
              id="start"
              name="trip-start"
              style={{ margin: '10px 0 0 0' }}
              value={moment(expirationDate).format('YYYY-MM-DD')}
              onChange={(e) => {
                setExpirationDate(e.target.value);
              }}
              min="2018-01-01"
            />
          </>
        ) : (
          <>
            {ingredients.length > 0 ? (
              Array.from(ingredients).map((item, idx) => (
                <div key={idx}>
                  <EditOption>
                    <div onClick={handleOnClickEditMode} id={String(idx)}>
                      수정
                    </div>
                    <div style={{ margin: '0 4px' }}>|</div>
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
                    <div>{getExpirationDay(item.endTime)}</div>
                  </IngredientsBox>
                </div>
              ))
            ) : (
              <div>등록하신 재료가 없습니다.</div>
            )}
          </>
        )}
      </OptionsWrapper>

      {showRegisterIngredient &&
        // 모바일 환경에서 버튼이 제대로 표시 안되서 일단 교체

        (editMode ? (
          <SaveButton disabled={loading} onClick={handleOnClickEdit}>
            {loading ? '수정중' : '수정하기'}
          </SaveButton>
        ) : (
          <SaveButton disabled={loading} onClick={handleOnClickRegister}>
            {loading ? '등록중' : '등록하기'}
          </SaveButton>
        ))}
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
  background: #eb3120;
  margin: 0px auto;
  padding: 16px;
  color: white;
  max-width: 420px;
`;

const SaveButton = styled.button`
  border-radius: 0.375rem;
  height: 2.5rem;
  width: 100%;
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(235, 49, 32, var(--tw-bg-opacity));
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  &:disabled {
    background-color: rgba(154, 154, 154, var(--tw-bg-opacity));
  }
`;
