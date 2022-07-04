import React, { useEffect, useState, useRef } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import boardPostApi from "../apis/useBoradtApi";
import Button from "../components/Botton";
import Figure from "../components/Figure";
import InputV2 from "../components/InputV2";
import Textarea from "../components/Textarea";

export type StepPostFormFileds = {
  stepNum: number;
  stepContent: string;
  image: any;
  imgUrl: string;
};

export type ResourcePostFileds = {
  category: string;
  resources: [
    {
      resourceName: string;
      amount: string;
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

const RecipeRegisterPage = () => {
  const [mainImage, setMainImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  // 레시피 정보 등록, 재료 등록, 조리 과정 등록 페이지를 나누기 위한 상태값
  const [registerStep, setRegisterStep] = useState(3);

  const queryClient = useQueryClient();
  // 레시피 정보 등록 파트
  const [boardId, setBoardId] = useState<number>(2);

  const mainImageRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mainImageFile, setMainImageFile] = useState<any>();
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2016/03/21/05/05/plus-1270001_960_720.png"
  );

  const postStep1Api = boardPostApi.step1Post;
  const postStep2Api = boardPostApi.step2Post;
  const postStep3Api = boardPostApi.step3Post;

  const onSaveMainImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadFile);
      setMainImageUrl(imgUrl);
      setMainImageFile(uploadFile);
    }
  };

  const mainImageClick = () => {
    mainImageRef.current?.click();
  };

  const postStep1mutation = useMutation(
    (addData: FormData) => postStep1Api(addData),
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
    postStep1mutation.mutate(formData);
  };

  // 재료 정보 파트
  const [resourceList, setResourceList] = useState<ResourcePostFileds[]>([
    { category: "", resources: [{ resourceName: "", amount: "" }] },
  ]);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const list = [...resourceList];
    list[index]["category"] = value;
    setResourceList(list);
  };

  const handleCategoryRemove = (index: number) => {
    const list = [...resourceList];
    list.splice(index, 1);
    setResourceList(list);
  };

  const handleCategoryAdd = () => {
    setResourceList([
      ...resourceList,
      { category: "", resources: [{ resourceName: "", amount: "" }] },
    ]);
  };

  const handleResourceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    subIndex: number
  ) => {
    const { name, value } = e.target;
    const list = [...resourceList];
    list[index]["resources"][subIndex][name] = value;
    setResourceList(list);
  };

  const handleResourceRemove = (index: number, subIndex: number) => {
    const list = [...resourceList];
    list[index]["resources"].splice(subIndex, 1);
    setResourceList(list);
  };

  const handleResourceAdd = (index: number) => {
    const list = [...resourceList];
    list[index]["resources"] = [
      ...list[index]["resources"],
      { resourceName: "", amount: "" },
    ];
    setResourceList(list);
  };

  const postStep2mutation = useMutation(
    (addData: resourceRequestDtoTemplate) => postStep2Api(addData),
    {
      onSuccess: (res) => {
        setRegisterStep(3);
        window.scrollTo(0, 0);
      },
      onError: () => {},
    }
  );

  const resourceSaveBtnClick = () => {
    let resourceRequestDtoTemplate: any = {
      boardId: boardId,
      resourceRequestDtoList: [],
    };

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
    postStep2mutation.mutate(resourceRequestDtoTemplate);
  };

  // 조리 과정 파트
  const stepRefList = useRef<null | HTMLInputElement[]>([]);
  const [stepList, setStepList] = useState<StepPostFormFileds[]>([
    {
      stepNum: 1,
      stepContent: "",
      image: File,
      imgUrl: "",
    },
  ]);

  const onSaveStepImageFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadFile);
      const list = [...stepList];
      list[index].image = uploadFile;
      list[index].imgUrl = imgUrl;
      setStepList(list);
    }
  };

  const stepImageClick = (index: number) => {
    stepRefList.current[index].click();
  };

  const handleStepChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const list = [...stepList];
    list[index]["stepContent"] = value;
    setStepList(list);
  };

  const handleStepRemove = (index: number) => {
    const list = [...stepList];
    list.splice(index, 1);
    setStepList(list);
  };
  const handleStepAdd = () => {
    setStepList([
      ...stepList,
      { stepNum: 0, stepContent: "", image: File, imgUrl: "" },
    ]);
  };

  const postStep3mutation = useMutation(
    (addData: FormData) => postStep3Api(addData),
    {
      onSuccess: (res) => {},
      onError: () => {},
    }
  );

  const stepSaveBtnClick = () => {
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
      postStep3mutation.mutate(formData);
    });
  };

  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            {registerStep === 1 ? (
              <>
                <MainImgWrapperLabel>요리 메인 페이지</MainImgWrapperLabel>

                <Figure
                  className="img-render"
                  key={mainImageUrl}
                  alt={mainImageUrl}
                  src={mainImageUrl}
                  width="80%"
                  onClick={mainImageClick}
                />

                <input
                  type="file"
                  onChange={onSaveMainImageFile}
                  accept="image/jpg,impge/png,image/jpeg"
                  ref={mainImageRef}
                  hidden
                />
                <InputV2
                  className="test"
                  inputLabel={"요리 이름"}
                  onChange={(event) => setTitle(event.target.value)}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />
                <InputV2
                  inputLabel={"요리 소개"}
                  onChange={(event) => setSubTitle(event.target.value)}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />

                <Textarea
                  inputLabel={"요리 설명"}
                  rows={10}
                  onChange={(event) => setContent(event.target.value)}
                  styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
                />
                <Button
                  styleCustom={{ margin: "10px 0 0 0" }}
                  onClick={boardSaveBtnClick}
                >
                  <div>등록하기</div>
                </Button>
              </>
            ) : registerStep === 2 ? (
              <>
                <RegisterTitle>
                  <Button styleCustom={{}} onClick={handleCategoryAdd}>
                    <span>재료 분류 추가</span>
                  </Button>
                </RegisterTitle>
                <div style={{ position: "relative" }}>
                  {resourceList.map((categorys, index) => (
                    <>
                      <IngredientsWrapper className="box-shadow">
                        <IngredientTitle>
                          <input
                            name="category"
                            type="text"
                            value={categorys.category}
                            placeholder="재료 분류"
                            onChange={(e) => handleCategoryChange(e, index)}
                            required
                          />

                          <button onClick={(e) => handleCategoryRemove(index)}>
                            <span>삭제</span>
                          </button>
                        </IngredientTitle>
                        {categorys.resources.map((resource, subIndex) => (
                          <>
                            <IngredientInfoWrapper>
                              <div className="float-left">
                                <input
                                  name="resourceName"
                                  type="text"
                                  value={resource.resourceName}
                                  placeholder="재료명"
                                  onChange={(e) =>
                                    handleResourceChange(e, index, subIndex)
                                  }
                                  required
                                />

                                <input
                                  name="amount"
                                  type="text"
                                  value={resource.amount}
                                  placeholder="재료량"
                                  onChange={(e) =>
                                    handleResourceChange(e, index, subIndex)
                                  }
                                  required
                                />

                                <button
                                  onClick={(e) =>
                                    handleResourceRemove(index, subIndex)
                                  }
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <div className="float-right"></div>
                            </IngredientInfoWrapper>
                          </>
                        ))}

                        <Button
                          styleCustom={{
                            margin: "30px auto 0 auto",
                            width: "40px",
                            height: "40px",
                          }}
                          onClick={(e) => handleResourceAdd(index)}
                        >
                          <span>재료 추가</span>
                        </Button>
                      </IngredientsWrapper>
                    </>
                  ))}

                  <Button
                    styleCustom={{ margin: "10px 0 0 0" }}
                    onClick={resourceSaveBtnClick}
                  >
                    <div>등록하기</div>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <RegisterTitle margin={"30px 0 0 0"}>
                  조리 과정
                  <Button styleCustom={{}} onClick={handleStepAdd}>
                    <span>조리 과정 추가</span>
                  </Button>
                </RegisterTitle>
                <IngredientsWrapper className="box-shadow">
                  {stepList.map((field, index) => (
                    <>
                      <IngredientTitle>
                        조리과정 {index + 1}
                        <button onClick={(e) => handleStepRemove(index)}>
                          <span>삭제</span>
                        </button>
                      </IngredientTitle>
                      <RecipeInfoWrapper>
                        <IngredientInfoWrapper>
                          <RecipeStepImage
                            src={field.imgUrl}
                            className="img-render"
                            onClick={(e) => stepImageClick(index)}
                          />

                          <input
                            key={index}
                            type="file"
                            onChange={(e) => onSaveStepImageFile(e, index)}
                            accept="image/jpg,impge/png,image/jpeg"
                            ref={(itself) =>
                              (stepRefList.current[index] = itself)
                            }
                            hidden
                          />
                          <textarea
                            placeholder="조리 과정을 알려주세요!"
                            value={field.stepContent}
                            onChange={(e) => handleStepChange(e, index)}
                          ></textarea>
                        </IngredientInfoWrapper>
                      </RecipeInfoWrapper>
                    </>
                  ))}
                </IngredientsWrapper>
                <Button
                  styleCustom={{ margin: "10px 0 0 0" }}
                  onClick={stepSaveBtnClick}
                >
                  <div>등록하기</div>
                </Button>
              </>
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
