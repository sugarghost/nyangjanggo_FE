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
  async step1Post(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/1`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async step2Post(payload: ResourcePostTemplate) {
    const postDatas = {
      boardId: payload.boardId,
      resourceRequestDtoList: payload.resourceRequestDtoList,
    };
    const res = await authInstance.post(`${board}${step}/2`, postDatas, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async step3Post(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/3`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async getPostsByDate(payload: Pageable) {
    const res = await axiosInstance.get(
      `${boards}?&page=${payload.page}&page=${payload.page}&size=${payload.size}&sort=${payload.sort}`
    );
    return res;
  },
  async getPostDetail(boardId: number) {
    const res = await axiosInstance.get(`${boards}/${boardId}`);
    return res;
  },
};
