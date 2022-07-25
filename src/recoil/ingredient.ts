import { getResource } from '@/apis/ResourceApi';
import { authInstance } from '@/apis/axiosInstance';
import { Ingredient } from '@/apis/ResourceApi';
import { selector, useRecoilValue, atom, selectorFamily } from 'recoil';


export const ingredientsSelector = selector({
  key: 'userSelector',
  get: async () => {
    const response = await getResource();
    const data = response.data ? response.data : [] as unknown as Ingredient[];
    return data;
  },
});

