import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FieldValues,
  useForm,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { DefaultValue } from "recoil";
import styled from "styled-components";

import recipeApi from "../apis/RecipeApi";
import { registerRecipe } from "../apis/RegisterApi";
import Button from "../components/Botton";
import Figure from "../components/Figure";
import InputV2 from "../components/InputV2";
import Textarea from "../components/Textarea";
import Category from "../components/recipe/Category";
import Step from "../components/recipe/Step";
import { ResourceFormData } from "../type/recipeType";
import {
  Recipe,
  RecipeFormData,
  recipeValidationSchema,
  recipeDefaultValues,
  ResourceList,
  StepList,
  resourceDefaultValues,
  resourceValidationSchema,
  StepFormData,
  stepDefaultValues,
  stepValidationSchema,
} from "../type/recipeType";

export type StepPostFormFileds = {
  stepNum: number;
  stepContent: string;
  image: any;
  imgUrl: string;
};
// 이슈 #15번 string을 인덱스로 사용시 발생한 오류에 대해 해결을 고민한 흔적
// 결국 기존 방법 if 체제를 유지함(기능 개발에 집중)
export type Status = "resourceName" | "amount";
export type ResourcePostFileds = {
  category: string;
  resources: [
    {
      [key in Status]: string;
      //[amount:string]:string
      //resourceName: string;
      //amount: string;
    }
  ];
};

export type resourceRequestDtoTemplate = {
  boardId: Number;
  resourceRequestDtoList: [
    {
      resourceName: string;
      amount: string;
      category: string;
    }
  ];
};

export type BoardPostFormFileds = {
  title: string;
  subTitle: string;
  content: string;
  frontImageLink: File;
};

const RecipeRegisterPage = (props: any) => {
  console.log("props:", props);
  // 공통 처리
  const location = useLocation();
  const state = location.state as {
    boardId: number;
    recipe: Recipe;
    resourceList: ResourceList[];
    stepList: StepList[];
    type: string;
  };

  // 이미지 등록 전에 보여줄 샘플 이미지를 기본으로 등록
  const [mainImage, setMainImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  // 수정이냐 신규 작성이냐 여부를 나누기 위한 상태값
  const isModify = state?.type == "modify";
  const [registerType, setRegisterType] = useState("Write");
  // 레시피 정보 등록, 재료 등록, 조리 과정 등록 페이지를 나누기 위한 상태값
  const [registerStep, setRegisterStep] = useState(1);
  const queryClient = useQueryClient();
  // step 1 이후 반환되는 boardId를 저장하고, step2->step1으로 이동 시 수정여부를 구분을 하기 위한 용도
  const [boardId, setBoardId] = useState<number>();
  // 레시피 정보 상태
  const mainImageRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mainImageFile, setMainImageFile] = useState<any>();
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2016/03/21/05/05/plus-1270001_960_720.png"
  );

  // 재료 등록 상태
  const [resourceList, setResourceList] = useState<ResourcePostFileds[]>([
    { category: "", resources: [{ resourceName: "", amount: "" }] },
  ]);

  // 조리 과정 상태
  const stepRefList = useRef<any[]>([]);
  const [stepList, setStepList] = useState<StepPostFormFileds[]>([
    {
      stepNum: 1,
      stepContent: "",
      image: File,
      // 초기 등록 시 샘플 이미지 사용
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/03/21/05/05/plus-1270001_960_720.png",
    },
  ]);

  // 처음 페이지 진입시 해당 유저가 작성중이었던 레시피가 있는지 확인해 조회
  // 수정 모드인 경우 작동 안함
  const { isLoading, data: postingData } = useQuery(
    ["getRecipePosting"],
    async () => await recipeApi.getRecipePosting(),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !isModify,
      onSuccess: () => {},
    }
  );

  // 최초 1회 실행되어 작성 모드가 수정인지 여부를 확인해 같이 들어온 값을 매핑 시키기 위함
  useEffect(() => {
    console.log("useEffect", state);
    if (isModify) {
      setRegisterType(state.type);
      setTitle(state.recipe.title);
      setSubTitle(state.recipe.subTitle);
      setContent(state.recipe.content);
      // setMainImageUrl(state.recipe.userImg);

      setResourceList(state.resourceList);

      // 조리 과정에는 image 변수에 File 객체가 포함되어 있기에 넘어온 데이터를 재가공해서 각각 넣어줌
      const list: StepPostFormFileds[] = [];
      state.stepList.map((field) =>
        list.push({
          stepNum: field.stepNum,
          stepContent: field.content,
          image: null,
          imgUrl: field.imageLink,
        })
      );
      setStepList(list);
    } else {
    }
  }, []);
  const postRecipeApi = recipeApi.postRecipe;
  const postResourceListApi = recipeApi.postResourceList;
  const postStepApi = recipeApi.postStep;
  const postRegistApi = recipeApi.postRegiste;

  //레시피 정보 등록 파트

  const recipeMethods = useForm<RecipeFormData>({
    resolver: yupResolver(recipeValidationSchema),
    defaultValues: recipeDefaultValues,
    mode: "onChange",
  });

  const {
    register: recipeRegister,
    handleSubmit: recipeHandleSubmit,
    control: recipeControl,
  } = recipeMethods;

  const onSubmitRecipe = recipeHandleSubmit((values) => {
    console.log(JSON.stringify(values, null, 2));
  });

  const onSaveMainImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadFile);
      setMainImageUrl(imgUrl);
    }
  };

  const mainImageClick = () => {
    mainImageRef.current?.click();
  };

  const postRecipeMutation = useMutation(
    (addData: FormData) => postRecipeApi(addData),
    {
      onSuccess: (res) => {
        //setBoardId(res.data.boardId);
        setBoardId(2);
        setRegisterStep(2);
        window.scrollTo(0, 0);
      },
      onError: () => {},
    }
  );

  // 레시피 정보 등록 단계에서 저장 버튼 클릭 시 실행
  const boardSaveBtnClick = () => {
    const formData = new FormData();
    formData.append("multipartFile", mainImageFile);
    formData.append(
      "boardRequestDtoStepMain ",
      new Blob(
        [
          JSON.stringify({
            title: title,
            subTitle: subTitle,
            content: content,
          }),
        ],
        { type: "application/json" }
      )
    );

    // 만약 boardId가 존재하는 경우라면 재료 등록 단계에서 회귀한 상태로
    // 추가가 아닌 수정 모드로 전환 해야함
    postRecipeMutation.mutate(formData);
  };

  // 재료 정보 파트
  const resourceMethods = useForm<ResourceFormData>({
    resolver: yupResolver(resourceValidationSchema),
    defaultValues: resourceDefaultValues,
    mode: "onChange",
  });

  const { handleSubmit: resourceHandleSubmit, control: resourceControl } =
    resourceMethods;
  const {
    fields: resourceFields,
    append: resourceAppend,
    remove: resourceRemove,
  } = useFieldArray({
    control: resourceControl,
    name: "categories", // unique name for your Field Array
  });

  const onSubmitResource = resourceHandleSubmit((values) => {
    console.log(JSON.stringify(values, null, 2));
  });

  // 재료 리스트를 서버로 전송하기 위해 react query로 API 호출 하는 부분
  const postResourceListMutation = useMutation(
    (addData: resourceRequestDtoTemplate) => postResourceListApi(addData),
    {
      onSuccess: (res) => {
        setRegisterStep(3);
        window.scrollTo(0, 0);
      },
      onError: () => {},
    }
  );

  // 재료 단계에서 저장 버튼 클릭 시 실행
  const resourceSaveBtnClick = (data: ResourcePostFileds[]) => {
    // 화면에서 그려주는 구조와 서버에서 받는 구조가 조금 다르기 때문에 별도의 list로 재정의
    let resourceRequestDtoTemplate: any = {
      boardId: boardId,
      resourceRequestDtoList: [],
    };

    // 화면을 그리는데 사용한 resourceList 변수에 내용을 꺼내 resourceRequestDtoList 리스트로 넣어줌
    resourceList.map((categorys, index) =>
      categorys.resources.map(
        (resource, subIndex) =>
          (resourceRequestDtoTemplate.resourceRequestDtoList = [
            ...resourceRequestDtoTemplate.resourceRequestDtoList,
            {
              resourceName: resource.resourceName,
              amount: resource.amount,
              category: categorys.category,
            },
          ])
      )
    );
    postResourceListMutation.mutate(resourceRequestDtoTemplate);
  };

  // 재료 단계에서 돌아가기 버튼 클릭 시 레시피 정보 단계로 이동
  const resourcePreStepBtnClick = () => {
    setRegisterStep(1);
    window.scrollTo(0, 0);
  };

  // 조리 과정 파트

  // 조리 과정 정보 파트
  const stepMethods = useForm<StepFormData>({
    resolver: yupResolver(stepValidationSchema),
    defaultValues: stepDefaultValues,
    mode: "onChange",
  });

  const { handleSubmit: stepHandleSubmit, control: stepControl } = stepMethods;
  const {
    fields: stepFields,
    append: stepAppend,
    remove: stepRemove,
  } = useFieldArray({
    control: stepControl,
    name: "boardRequestDtoStepRecipe", // unique name for your Field Array
  });

  const onSubmitStep = stepHandleSubmit((values) => {
    console.log(JSON.stringify(values, null, 2));
  });

  // 조리 과정을 DB에 저장하기 위한 API
  const postStepMutation = useMutation(
    (addData: FormData) => postStepApi(addData),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => {},
    }
  );

  // 레시피 등록을 종료하기 위한 API
  const postRegistMutation = useMutation(
    (addData: FormData) => postRegistApi(addData),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => {},
    }
  );

  // 조리 과정 저장 버튼 클릭 시 실행
  const stepSaveBtnClick = () => {
    // 조리 과정은 이미지를 개별로 보내기 위해서 별도로 호출을 진행함
    stepList.map((step, index) => {
      let boardRequestDtoStepRecipe = {
        boardId: boardId,
        recipeStepRequestDto: { stepNum: index, stepContent: step.stepContent },
      };

      const formData = new FormData();
      formData.append("multipartFile", step.image);

      formData.append(
        "boardRequestDtoStepRecipe",
        new Blob([JSON.stringify(boardRequestDtoStepRecipe)], {
          type: "application/json",
        })
      );
      // 동기 처리가 필요한지 고민이 필요함
      // 동기 처리가 들어가는 경우 then의 형태로 이전 작업 결과여부에 따라 다음 작업 진행 여부 판별이 필요
      // 만약 특정 작업이 실패한 경우 해당 위치에서부터 다시 작업하기 위한 상태값 관리 필요
      postStepMutation.mutate(formData);
    });

    const RegistData = new FormData();
    RegistData.append("boardId", JSON.stringify({ boardId: boardId }));
    postRegistMutation.mutate(RegistData);
  };

  const stepPreStepBtnClick = () => {
    setRegisterStep(2);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            {registerStep === 1 ? (
              <form onSubmit={onSubmitRecipe}>
                <MainImgWrapperLabel>요리 메인 페이지</MainImgWrapperLabel>

                <RegisterImage
                  className="img-render"
                  src={mainImageUrl}
                  onClick={mainImageClick}
                />

                <input
                  type="file"
                  {...recipeRegister("multipartFile", { required: true })}
                  onChange={onSaveMainImageFile}
                  accept="image/jpg,impge/png,image/jpeg"
                  ref={mainImageRef}
                  hidden
                />
                <InputV2
                  className="test"
                  inputLabel={"요리 이름"}
                  {...recipeRegister("boardRequestDtoStepMain.title", {
                    required: true,
                  })}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />
                <InputV2
                  inputLabel={"요리 소개"}
                  {...recipeRegister("boardRequestDtoStepMain.subTitle", {
                    required: true,
                  })}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />

                <Textarea
                  inputLabel={"요리 설명"}
                  rows={10}
                  {...recipeRegister("boardRequestDtoStepMain.content", {
                    required: true,
                  })}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />
                <Button styleCustom={{ margin: "10px 0 0 0" }}>
                  <div>등록하기</div>
                </Button>
              </form>
            ) : registerStep === 2 ? (
              <FormProvider {...resourceMethods}>
                <form onSubmit={onSubmitResource}>
                  <RegisterTitle>
                    <Button
                      styleCustom={{}}
                      onClick={() =>
                        resourceAppend({
                          name: "",
                          resources: [{ resourceName: "", amount: "" }],
                        })
                      }
                    >
                      <span>재료 분류 추가</span>
                    </Button>
                  </RegisterTitle>
                  <div style={{ position: "relative" }}>
                    {resourceFields.map((item, index) => (
                      <div key={index}>
                        <Category
                          name={item.name}
                          index={index}
                          onDelete={() => resourceRemove(index)}
                        />
                      </div>
                    ))}

                    <input
                      type="button"
                      onClick={resourcePreStepBtnClick}
                      value="되돌아가기"
                    />
                    <button type="submit">
                      <div>등록하기</div>
                    </button>
                  </div>
                </form>
              </FormProvider>
            ) : (
              <FormProvider {...stepMethods}>
                <form onSubmit={onSubmitStep}>
                  <RegisterTitle margin={"30px 0 0 0"}>
                    조리 과정
                    <Button styleCustom={{}} onClick={() => stepAppend({})}>
                      <span>조리 과정 추가</span>
                    </Button>
                  </RegisterTitle>
                  <IngredientsWrapper className="box-shadow">
                    {stepFields.map((item, index) => (
                      <div key={index}>
                        <Step
                          index={index}
                          onDelete={() => stepRemove(index)}
                        />
                      </div>
                    ))}
                  </IngredientsWrapper>
                  <Button
                    styleCustom={{ margin: "10px 0 0 0" }}
                    onClick={stepPreStepBtnClick}
                  >
                    <div>되돌아가기</div>
                  </Button>
                  <Button
                    styleCustom={{ margin: "10px 0 0 0" }}
                    onClick={stepSaveBtnClick}
                  >
                    <div>등록하기</div>
                  </Button>
                </form>
              </FormProvider>
            )}
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
