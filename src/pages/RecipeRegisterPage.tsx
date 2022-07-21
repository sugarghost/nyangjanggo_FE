import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FieldValues, useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { DefaultValue } from 'recoil';
import styled from 'styled-components';

import recipeApi from '../apis/RecipeApi';
import Button from '../components/Botton';
import Category from '../components/recipe/Category';
import Step from '../components/recipe/Step';
import {
  RecipeDetail,
  RecipeForm,
  RecipeRegister,
  StepForm,
  ResourceForm,
  Resource,
  recipeValidationSchema,
  recipeDefaultValues,
} from '../type/recipeType';

export type StepPostFormFileds = {
  stepNum: number;
  stepContent: string;
  image: any;
  imgUrl: string;
};

// 이슈 #15번 string을 인덱스로 사용시 발생한 오류에 대해 해결을 고민한 흔적
// 결국 기존 방법 if 체제를 유지함(기능 개발에 집중)
export type Status = 'resourceName' | 'amount';
export type ResourcePostFileds = {
  category: string;
  resources: [
    {
      [key in Status]: string;
      // [amount:string]:string
      // resourceName: string;
      // amount: string;
    },
  ];
};

export type ResourceRequestDtoTemplate = {
  boardId: number;
  resourceRequestDtoList: [
    {
      resourceName: string;
      amount: string;
      category: string;
    },
  ];
};

export type BoardPostFormFileds = {
  title: string;
  subTitle: string;
  content: string;
  frontImageLink: File;
};

const RecipeRegisterPage = () => {
  // 공통 처리
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    boardId: number;
    type: string;
  };

  // 수정이냐 신규 작성이냐 여부를 나누기 위한 상태값
  const isModify = state?.type === 'modify';

  const [registerType, setRegisterType] = useState('Write');
  // step 1 이후 반환되는 boardId를 저장하고, step2->step1으로 이동 시 수정여부를 구분을 하기 위한 용도
  const [boardId, setBoardId] = useState<number>();
  // 레시피 정보 상태
  const mainImageRef = useRef<HTMLInputElement>(null);
  // 이미지 등록 전에 보여줄 샘플 이미지를 기본으로 등록
  const [mainImageUrl, setMainImageUrl] = useState<string>();

  const postRecipeApi = recipeApi.postRecipe;
  const putRecipeApi = recipeApi.putRecipe;
  const postImageApi = recipeApi.postImage;
  const postRegistApi = recipeApi.postRegiste;

  // 레시피 정보 등록 파트
  // 레시피 정보 useForm
  const recipeMethods = useForm<RecipeForm>({
    resolver: yupResolver(recipeValidationSchema),
    // 형식 맞춰도 계속 오류나서 그냥 비활성화 시켜버림....
    // defaultValues: recipeDefaultValues,
    mode: 'onChange',
  });

  const {
    register: recipeRegister,
    formState: { errors: recipeError },
    handleSubmit: recipeHandleSubmit,
    setValue: setRecipeValue,
    control: recipeControl,
  } = recipeMethods;

  const {
    fields: resourceFields,
    append: resourceAppend,
    remove: resourceRemove,
  } = useFieldArray({
    control: recipeControl,
    name: 'resourceRequestDtoList', // categories 에서 resourceRequestDtoList로 변경됨
  });

  const {
    fields: stepFields,
    append: stepAppend,
    remove: stepRemove,
  } = useFieldArray({
    control: recipeControl,
    name: 'recipeStepRequestDtoList', // recipeStepRequestDtoList 에서 recipeStepRequestDtoList로 변경됬으니 한번 다시 변경해야함
  });

  // 뒤로 돌아가기 용
  const goBack = () => {
    navigate(-1);
  };

  // 처음 페이지 진입시 해당 유저가 작성중이었던 레시피가 있는지 확인해 조회
  // 수정 모드인 경우 작동 안함
  const { isLoading, data: postingData } = useQuery(['getRecipePosting'], async () => recipeApi.getRecipePosting(), {
    refetchOnWindowFocus: false,
    enabled: !isModify,
    onSuccess: (res) => {
      console.log('getRecipePosting', res);

      if (res.data) {
        setBoardId(res.data.boardId);
      }
      setQueryData(res.data);
    },
  });

  // 수정 모드인 경우 수정 데이터를 불러오기 위해 작동
  const { isLoading: modifyIsLoading, data: modifyData } = useQuery(
    ['getRecipeModify'],
    async () => recipeApi.getRecipeDetail(state?.boardId),
    {
      refetchOnWindowFocus: false,
      enabled: isModify,
      onSuccess: (res) => {
        console.log('getRecipeModify', res);
        setQueryData(res.data);
      },
    },
  );

  const setQueryData = (data: any) => {
    if (data) {
      setBoardId(data.boardId);

      recipeMethods.setValue('title', data.title);
      recipeMethods.setValue('subTitle', data.subTitle);
      recipeMethods.setValue('content', data.content);
      setMainImageUrl(data.mainImg);

      // 재료 정보가 있는 경우 서버에서 넘어오는 데이터가 View 형식과는 다르기 때문에 처리 과정이 필요
      if (data.resourceResponseDtoList) {
        recipeMethods.setValue('resourceRequestDtoList', []);
        data.resourceResponseDtoList.map((fields: any, index: number) => {
          // 기존 resourceDefaultValues에 저장된 Category 값과 반환된 resourceResponseDtoList 속에 category 데이터와 일치하는 경우 해당 인덱스를 반환
          const categoryIndex = recipeMethods
            .getValues(`resourceRequestDtoList`)
            .findIndex((item) => item.category === fields.category);
          // 일치하는 category가 있어서 인덱스가 -1이 아닌 경우 실행
          if (categoryIndex !== -1) {
            // 일치하는 category가 있는 위치에 resources(리스트 형태) 값에 push를 통해 데이터를 추가해줌
            recipeMethods.setValue(`resourceRequestDtoList.${categoryIndex}.resources`, [
              ...recipeMethods.getValues(`resourceRequestDtoList.${categoryIndex}.resources`),
              {
                resourceName: fields.resourceName,
                amount: fields.amount,
              },
            ]);
          } else {
            // 만약 반환된 인덱스가 없으면 일치하는 카테고리가 없다는 뜻으로 신규로 만들어줌
            recipeMethods.setValue(`resourceRequestDtoList`, [
              ...recipeMethods.getValues(`resourceRequestDtoList`),
              {
                category: fields.category,
                resources: [
                  {
                    resourceName: fields.resourceName,
                    amount: fields.amount,
                  },
                ],
              },
            ]);
          }
        });
      }

      if (data.recipeStepResponseDtoList) {
        recipeMethods.setValue(`recipeStepRequestDtoList`, []);
        data.recipeStepResponseDtoList.map((fields: any, index: number) => {
          recipeMethods.setValue(`recipeStepRequestDtoList.${fields.stepNum}`, {
            stepNum: fields.stepNum,
            imageLink: fields.imageLink,
            stepContent: fields.stepContent,
          });
        });
      }
    }
  };
  // 최초 1회 실행되어 작성 모드가 수정인지 여부를 확인해 같이 들어온 값을 매핑 시키기 위함
  useEffect(() => {
    console.log('useEffect', state);
    if (isModify) {
      setRegisterType(state.type);
    } else {
      // pass
    }
  }, []);

  // 이미지 압축을 위해 사용
  const compressImage = async (image: File) => {
    try {
      // 최대한 1MB가 안넘도록 처리
      const options = {
        maxSizeMb: 1,
        // 용량 제한을 걸어도 원본의 크기 자체가 너무 크면 잘 작동이 안되서 최대 길이를 제한함
        maxWidthOrHeight: 900,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  const postRecipeMutation = useMutation((addData: FormData) => postRecipeApi(addData), {
    onSuccess: (res) => {
      console.log('postRecipeMutation:', res);
      setBoardId(res.data.boardId);
      window.scrollTo(0, 0);
    },
    onError: (e) => {
      console.log('postRecipeMutation Error:', e);
    },
  });

  const putRecipeMutation = useMutation((addData: FormData) => putRecipeApi(addData), {
    onSuccess: (res) => {
      console.log('putRecipeMutation:', res);
      // setBoardId(res.data.boardId);
      window.scrollTo(0, 0);
    },
    onError: (e) => {
      console.log('putRecipeMutation Error:', e);
    },
  });

  // 이미지 변경시 DB에 저장하고 Url을 받아오기 위한 API
  const postStepImageMutation = useMutation((addData: FormData) => postImageApi(addData), {
    onSuccess: (res) => {
      setMainImageUrl(res.data.imageLink);
      setRecipeValue('mainImageLink', res.data.imageLink);
    },
    onError: () => {
      // 예외처리 필요!
    },
  });

  // 레시피 정보 등록 단계에서 저장 버튼 클릭 시 실행
  const onSubmitRecipe = (values: RecipeForm) => {
    console.log(JSON.stringify(values, null, 2));

    // 화면에서 그려주는 구조와 서버에서 받는 구조가 조금 다르기 때문에 별도의 list로 재정의
    let resourceList: any = [];
    const stepList: any = [];

    // 화면을 그리는데 사용한 resourceList 변수에 내용을 꺼내 resourceRequestDtoList 리스트로 넣어줌
    values.resourceRequestDtoList.map((categories, index) =>
      categories.resources.map(
        (resource) =>
          (resourceList = [
            ...resourceList,
            {
              resourceName: resource.resourceName,
              amount: resource.amount,
              category: categories.category,
            },
          ]),
      ),
    );

    const formData = new FormData();
    formData.append('boardId', String(boardId));
    formData.append(
      'boardRequestDto',
      new Blob(
        [
          JSON.stringify({
            title: values.title,
            subTitle: values.subTitle,
            content: values.content,
            mainImageLink: values.mainImageLink,
            resourceRequestDtoList: resourceList,
            recipeStepRequestDtoList: values.recipeStepRequestDtoList,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    // 만약 boardId가 존재하는 경우라면 재료 등록 단계에서 회귀한 상태로
    // 추가가 아닌 수정 모드로 전환 해야함
    if (isModify) {
      putRecipeMutation.mutate(formData);
    } else {
      postRecipeMutation.mutate(formData);
    }
  };

  const onErrorRecipe = (errors: any, e: any) => console.log(errors, e);
  const onSaveMainImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const compressedImage = await compressImage(uploadFile);

      if (compressedImage) {
        const file = new File([compressedImage], compressedImage.name, { type: compressedImage.type });
        const formData = new FormData();
        formData.append('boardId', String(boardId));
        formData.append('multipartFile', file);
        postStepImageMutation.mutate(formData);
      } else {
        // 예외처리 필요!
      }
    }
  };

  const mainImageClick = () => {
    mainImageRef.current?.click();
  };
  // 재료 정보 파트

  // 조리 과정 파트

  const stepDelete = (index: number) => {
    stepRemove(index);
  };

  // 레시피 등록을 종료하기 위한 API
  const postRegistMutation = useMutation((addData: FormData) => postRegistApi(addData), {
    onSuccess: (res) => {
      navigate('/');
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return (
    <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="mx-auto w-90vw">
          <FormProvider {...recipeMethods}>
            <form onSubmit={recipeHandleSubmit(onSubmitRecipe, onErrorRecipe)}>
              <p className="text-gray-700 text-left text-lg my-1 font-900">요리 메인 이미지</p>
              <img
                className="min-h-80 w-full rounded-2xl image-render-auto bg-gray-100"
                src={mainImageUrl}
                onClick={mainImageClick}
                alt=""
              />

              <input
                type="file"
                onChange={onSaveMainImageFile}
                accept="image/jpg,impge/png,image/jpeg"
                ref={mainImageRef}
                hidden
              />
              <input
                className="p-4 my-4 w-full rounded-md border border-gray-300"
                placeholder="요리 이름"
                {...recipeRegister('title', { required: true })}
              />
              <input
                className="p-4 my-4 w-full rounded-md border border-gray-300"
                placeholder="요리 소개"
                {...recipeRegister('subTitle', { required: true })}
              />

              <textarea
                className="p-4 my-4 w-full rounded-md border border-gray-300"
                placeholder="요리 설명"
                rows={6}
                {...recipeRegister('content', { required: true })}
              />

              <span className="text-gray-700 text-left float-left text-lg my-1 font-900">재료 분류</span>
              <span
                className="m-1 float-right"
                onClick={() =>
                  resourceAppend({
                    category: '',
                    resources: [{ resourceName: '', amount: '' }],
                  })
                }
              >
                <FontAwesomeIcon icon={faPlus} color="grey" size="lg" />
              </span>
              {resourceFields.map((item, index) => (
                <div key={index}>
                  <Category name={item.category} index={index} onDelete={() => resourceRemove(index)} />
                </div>
              ))}
              <div className="w-full">
                <div>
                  <span className="text-gray-700 text-left float-left text-lg my-1 font-900">조리 과정</span>

                  <span className="m-1 float-right" onClick={() => stepAppend({})}>
                    <FontAwesomeIcon icon={faPlus} color="grey" size="lg" />
                  </span>
                </div>
              </div>
              <div className="shadow-md p-4 flex flex-col w-full h-auto rounded-lg">
                {stepFields.map((item, index) => (
                  <div key={index}>
                    <Step index={index} boardId={boardId} onDelete={() => stepDelete(index)} />
                  </div>
                ))}
              </div>
              <div>
                <button type="submit" className=" rounded-md h-10 w-full text-white my-1 bg-red-600 items-center">
                  등록하기
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
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
