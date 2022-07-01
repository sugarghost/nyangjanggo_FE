import { authInstance } from "./axiosInstance";

const board = "/board";

export type StepPostFormFileds = {
  stepContent: string;
  image: File;
};

export type ResourcePostFormFileds = {
  resourceName: string;
  amount: string;
  category: string;
};

export type BoardPostFormFileds = {
  title: string;
  subTitle: string;
  content: string;
  frontImageLink: File;
  step: StepPostFormFileds[];
  resource: ResourcePostFormFileds[];
};

export default {
  get() {
    return authInstance.get(board).then((res) => res.data);
  },
  async post(payload: BoardPostFormFileds) {
    const res = await authInstance.post(`${board}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },
};
