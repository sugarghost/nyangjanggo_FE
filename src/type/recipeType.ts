import * as yup from 'yup';

export type RecipeDetail = {
  title: string;
  subTitle: string;
  content: string;
  mainImg: string;
  nickname: string;
  userImg: string;
};

// 레시피
export type RecipeRegister = {
  title: string;
  subTitle: string;
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
  subTitle: string;
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
  title: yup.string().required(),
  subTitle: yup.string().required(),
  content: yup.string().required(),
  mainImageLink: yup.string().required(),
  resourceRequestDtoList: yup.array(
    yup.object().shape({
      category: yup.string().required(),
      resources: yup.array(
        yup.object().shape({
          resourceName: yup.string().required(),
          amount: yup.string().required(),
        }),
      ),
    }),
  ),
  recipeStepRequestDtoList: yup.array(
    yup.object().shape({
      stepNum: yup.number().required(),
      stepContent: yup.string().required(),
      imageLink: yup.string().required(),
    }),
  ),
});

export const recipeDefaultValues = {
  title: '',
  subTitle: '',
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
