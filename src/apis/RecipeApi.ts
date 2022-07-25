import { FieldValues } from 'react-hook-form';

import { Step } from '../type/recipeType';
import { authInstance, axiosInstance } from './axiosInstance';

const board = '/board';
const boards = '/boards';
const step = '/step';

export type ResourcePostTemplate = {
  boardId: number;
  resourceRequestDtoList: [
    {
      resourceName: string;
      amount: string;
      category: string;
    },
  ];
};

export type Pageable = {
  page: number;
  size: number;
  sort: string;
};

export default {
  get() {
    return authInstance.get(board).then((res) => res.data);
  },

  async getRecipePosting() {
    const res = await authInstance.get(`${board}/check`);
    return res;
  },

  async postRecipe(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const res = await authInstance.post(`${board}?boardId=${boardId}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },

  async putRecipe(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const res = await authInstance.put(`${board}?boardId=${boardId}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },

  async postImage(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const res = await authInstance.post(`${board}/image?boardId=${boardId}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },

  async postRegiste(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/-1`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },

  async deleteStep(payload: FormData) {
    const res = await authInstance.delete(`${board}${step}/3`, {
      data: payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },

  async getRecipeListByDate(payload: Pageable) {
    const res = await axiosInstance.get(`${boards}?&page=${payload.page}&size=${payload.size}&sort=${payload.sort}`);
    return res;
  },
  async getRecipeDetail(boardId: number) {
    const res = await axiosInstance.get(`${board}/${boardId}`);
    return res;
  },
  async deleteRecipe(boardId: number) {
    const res = await authInstance.delete(`${board}/${boardId}`, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },

  async likeRecipe(boardId: number) {
    const res = await authInstance.get(`${board}/${boardId}/good`, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },
};
