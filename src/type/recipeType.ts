import * as yup from "yup";

export type RecipeView = {
  title: string;
  subTitle: string;
  content: string;
  mainImg: string;
  nickname: string;
  userImg: string;
};

// 레시피 추가, 수정 단계에서 사용할 타입
export type Recipe = {
  title: string;
  subTitle: string;
  content: string;
};
// 레시피 추가, 수정 단계에서 전송 될 타입
export type RecipeFormData = {
  boardRequestDtoStepMain: Recipe;
  multipartFile: File;
};

export const recipeValidationSchema = yup.object().shape({
  boardRequestDtoStepMain: yup.object().shape({
    title: yup.string().required(),
    subTitle: yup.string().required(),
    content: yup.string().required(),
  }),
  multipartFile: yup.mixed(),
});

export const recipeDefaultValues = {
  multipartFile: undefined,
  boardRequestDtoStepMain: {
    title: "",
    subTitle: "",
    content: "",
  },
};

export type ResourceList = {
  category: string;
  resources: [
    {
      resourceName: string;
      amount: string;
    }
  ];
};

export type StepList = {
  stepNum: number;
  stepContent: string;
  imageLink: string;
};

// 레시피 재료 추가 단계에서 사용함
export type Resource = {
  resourceName: string;
  amount: string;
};
export type Category = {
  name: string;
  resources: Resource[];
};
export type ResourceFormData = {
  categories: Category[];
};

export const resourceValidationSchema = yup.object().shape({
  categories: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      resources: yup.array(
        yup.object().shape({
          resourceName: yup.string().required(),
          amount: yup.string().required(),
        })
      ),
    })
  ),
});

export const resourceDefaultValues = {
  categories: [
    {
      name: "",
      resources: [
        {
          resourceName: "",
          amount: "",
        },
        {
          resourceName: "",
          amount: "",
        },
        {
          resourceName: "",
          amount: "",
        },
      ],
    },
  ],
};

// 조리 과정 단계에서 사용

// 레시피 추가, 수정 단계에서 사용할 타입
export type Step = {
  stepNum: number;
  stepContent: string;
  multipartFile: any;
  imageLink: string;
  fromServer: boolean;
};

// 레시피 추가, 수정 단계에서 전송 될 타입
export type StepFormData = {
  boardRequestDtoStepRecipe: Step[];
};
export type StepFormDataWithId = {
  boardId: number;
  boardRequestDtoStepRecipe: Step[];
};

export const stepValidationSchema = yup.object().shape({
  boardRequestDtoStepRecipe: yup.array(
    yup.object().shape({
      stepNum: yup.number().required(),
      stepContent: yup.string().required(),
      imageLink: yup.string().required(),
      multipartFile: yup.mixed(),
    })
  ),
});

export const stepDefaultValues = {
  boardRequestDtoStepRecipe: [],
};
