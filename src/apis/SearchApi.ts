import { FieldValues } from 'react-hook-form';

import { Step } from '../type/recipeType';
import { elasticInstance, axiosInstance } from './axiosInstance';

const title = '/title';
const resource = '/resource';
const recommend = '/recommend';
const boards = '/boards';
const board = '/board';
const preview = '/preview';
const search = '/_search';
const resourceKeyword = '/resource_keyword';

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
    const res = await axiosInstance.get(`${boards}?page=${payload.page}&size=${payload.size}&sort=${payload.query}`);
    return res;
  },
  async getRecipeListByEntity10(entityName: string) {
    const res = await axiosInstance.get(`${boards}${preview}?entityName=${entityName}`);
    return res;
  },

  /*
  엘라스틱 서치를 직접 접근하는 방식으로 변경하며 기존 코드 일부 비활성화 후 대체
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
  */

  async getRecipeListByResource(payload: Pageable) {
    const query = {
      _source: [
        'id',
        'title',
        'userNickname',
        'goodCount',
        'commentCount',
        'mainImageLink',
        'userImageLink',
        'createdAt',
        'modifiedAt',
      ],
      query: {
        match: {
          'resourceInBoardList.resourceName': payload.query,
        },
      },
      size: payload.size,
      from: payload.page * payload.size,
    };
    const res = await elasticInstance.post(`${board}${search}`, query, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },
  async getRecipeListByTitle(payload: Pageable) {
    const query = {
      _source: [
        'id',
        'title',
        'userNickname',
        'goodCount',
        'commentCount',
        'mainImageLink',
        'userImageLink',
        'createdAt',
        'modifiedAt',
      ],
      query: {
        match: {
          title: payload.query,
        },
      },
      size: payload.size,
      from: payload.page * payload.size,
    };

    const res = await elasticInstance.post(`${board}${search}`, query, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },
  async getResourceRecommend(resourceName: string) {
    const query = {
      query: {
        bool: {
          must: [
            {
              match: {
                resourceName,
              },
            },
            {
              range: {
                cnt: {
                  gte: 2,
                },
              },
            },
          ],
        },
      },
      size: 10,
      from: 0,
    };
    const res = await elasticInstance.post(`${resourceKeyword}${search}`, query, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },

  async getTitleRecommend(titleWord: string) {
    const query = {
      _source: ['title'],
      query: {
        match: {
          title: titleWord,
        },
      },
      size: 5,
      from: 0,
    };

    const res = await elasticInstance.post(`${board}${search}`, query, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },
};
