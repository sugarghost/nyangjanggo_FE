import { FieldValues } from 'react-hook-form';

import { Step } from '../type/recipeType';
import { authInstance, axiosInstance } from './axiosInstance';

const title = '/title';
const resource = '/resource';
const recommend = '/recommend';
const boards = '/boards';
const board = '/board';

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

  async getResourceRecommend(resourceName: string) {
    const res = await authInstance.get(`${board}${resource}${recommend}?resourceName=${resourceName}`);
    return res;
  },
};
