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
