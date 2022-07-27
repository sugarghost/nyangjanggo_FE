import { getResource, Ingredient } from '@apis/ResourceApi';
import { authInstance } from '@apis/axiosInstance';
import { isExist } from '@utils/jwt';
import { selector, useRecoilValue, atom, selectorFamily } from 'recoil';

export const ingredientsSelector = selector({
  key: 'ingredientsSelector',
  get: async () => {
    const response = await getResource();
    const data = response.data ? response.data : ([] as unknown as Ingredient[]);
    return data;
  },
});

export const ingredientsNameSelector = selector({
  key: 'ingredientsNameSelector',
  get: async () => {
    const data = [];
    if (isExist()) {
      const response = await getResource();
      response.data.map((value) => data.push(value.resourceName));
    }
    return data;
  },
});
