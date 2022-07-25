import * as yup from 'yup';

export type RecipeDetail = {
  title: string;
  content: string;
  mainImg: string;
  nickname: string;
  userImg: string;
};

// 레시피
export type RecipeRegister = {
  title: string;
  content: string;
  mainImageLink: string;
  resourceRequestDtoList: Resource[];
  recipeStepRequestDtoList: Step[];
};

export type Resource = {
  stepNum: number;
  stepContent: string;
  imageLink: string;
};

export type Step = {
  stepNum: number;
  stepContent: string;
  imageLink: string;
};

export type RecipeForm = {
  title: string;
  content: string;
  mainImageLink: string;
  resourceRequestDtoList: ResourceForm[];
  recipeStepRequestDtoList: StepForm[];
};

export type ResourceForm = {
  category: string;
  resources: ResourcesForm[];
};

export type ResourcesForm = {
  resourceName: string;
  amount: string;
};
export type StepForm = {
  stepNum: number;
  stepContent: string;
  imageLink: string;
};

export const recipeValidationSchema = yup.object().shape({
  title: yup.string().required('요리명을 입력해 주세요'),
  content: yup.string().required('요리 설명을 입력해 주세요'),
  mainImageLink: yup.string().required('이미지 등록은 필수 입니다'),
  resourceRequestDtoList: yup.array(
    yup.object().shape({
      category: yup.string().required('재료 분류를 입력해 주세요'),
      resources: yup.array(
        yup.object().shape({
          resourceName: yup.string().required('재료명을 입력해주세요'),
          amount: yup.string().required('재료량을 입력해주세요'),
        }),
      ),
    }),
  ),
  recipeStepRequestDtoList: yup.array(
    yup.object().shape({
      stepNum: yup.number().required(),
      stepContent: yup.string().required('조리 내용을 입력해주세요'),
      imageLink: yup.string().required('이미지 등록은 필수입니다'),
    }),
  ),
});

export const recipeDefaultValues = {
  title: '',
  content: '',
  mainImageLink: '',
  resourceRequestDtoList: [
    {
      category: '',
      resources: [
        {
          resourceName: '',
          amount: '',
        },
      ],
    },
  ],
  recipeStepRequestDtoList: [
    {
      stepNum: 0,
      stepContent: '',
      imageLink: '',
    },
  ],
};
