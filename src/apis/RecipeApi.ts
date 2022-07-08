import { FieldValues } from "react-hook-form";

import { authInstance, axiosInstance } from "./axiosInstance";

const board = "/board";
const boards = "/boards";
const step = "/step";

export type ResourcePostTemplate = {
  boardId: Number;
  resourceRequestDtoList: [
    {
      resourceName: string;
      amount: string;
      category: string;
    }
  ];
};

export type Pageable = {
  page: Number;
  size: Number;
  sort: string;
};

export default {
  get() {
    return authInstance.get(board).then((res) => res.data);
  },

  async getRecipePosting() {
    const res = await authInstance.get(`${board}${step}/0`);
    return res;
  },

  async postRecipe(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/1`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async postResourceList(payload: ResourcePostTemplate) {
    const postDatas = {
      boardId: payload.boardId,
      resourceRequestDtoList: payload.resourceRequestDtoList,
    };
    const res = await authInstance.post(`${board}${step}/2`, postDatas, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async postStep(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/3`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async postRegiste(payload: FormData) {
    const res = await authInstance.put(`${board}${step}/-1`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async putRecipe(payload: FormData) {
    const res = await authInstance.put(`${board}${step}/1`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async putResourceList(payload: ResourcePostTemplate) {
    const postDatas = {
      boardId: payload.boardId,
      resourceRequestDtoList: payload.resourceRequestDtoList,
    };
    const res = await authInstance.put(`${board}${step}/2`, postDatas, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async putStep(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/3`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async getRecipeListByDate(payload: Pageable) {
    const res = await axiosInstance.get(
      `${boards}?&page=${payload.page}&page=${payload.page}&size=${payload.size}&sort=${payload.sort}`
    );
    return res;
  },
  async getRecipeDetail(boardId: number) {
    const res = await axiosInstance.get(`${board}/${boardId}`);
    return res;
  },
};
