export type Recipe = {
  title: string;
  subTitle: string;
  content: string;
  userImg: string;
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
  content: string;
  imageLink: string;
};

// 레시피 재료 추가 단계에서 사용함
export type Resource = {
  resourceName: string;
  amount: string;
};
export type Category = {
  name: string;
  resource: Resource[];
};
export type ResourceFormData = {
  categories: Category[];
};
