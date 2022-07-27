import { FieldValues } from 'react-hook-form';

import { Step } from '../type/recipeType';
import { authInstance, axiosInstance } from './axiosInstance';

const title = '/title';
const resource = '/resource';
const recommend = '/recommend';
const boards = '/boards';
const board = '/board';
const preview = '/preview';

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
  query: string;
};

export default {
  get() {
    return axiosInstance.get(board).then((res) => res.data);
  },

  async getRecipeListByEntity(payload: Pageable) {
    const res = await axiosInstance.get(`${boards}?&page=${payload.page}&size=${payload.size}&sort=${payload.query}`);
    return res;
  },
  async getRecipeListByEntity10(entityName: string) {
    const res = await axiosInstance.get(`${boards}${preview}?entityName=${entityName}`);
    return res;
  },

  async getRecipeListByResource(payload: Pageable) {
    const res = await axiosInstance.get(
      `${boards}${resource}?resourceName=${payload.query}&page=${payload.page}&size=${payload.size}`,
    );
    return res;
  },
  async getRecipeListByTitle(payload: Pageable) {
    const res = await axiosInstance.get(
      `${boards}${title}?page=${payload.page}&size=${payload.size}&titleWords=${payload.query}`,
    );
    return res;
  },
  async getResourceRecommend(resourceName: string) {
    const res = await axiosInstance.get(`${board}${resource}${recommend}?resourceName=${resourceName}`);
    return res;
  },

  async getTitleRecommend(titleWord: string) {
    const res = await axiosInstance.get(`${board}${title}${recommend}?titleWords=${titleWord}`);
    return res;
  },
};
