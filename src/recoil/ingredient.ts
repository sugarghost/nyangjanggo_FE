import { getResource } from '@/apis/ResourceApi';
import { authInstance } from '@/apis/axiosInstance';
import { Ingredient } from '@/apis/ResourceApi';
import { selector, useRecoilValue, atom, selectorFamily } from 'recoil';

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 'ddd', // default value (aka initial value)
});

export const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

export const ingredientsSelector = selector({
  key: 'userSelector',
  get: async () => {
    const response = await getResource();
    const data = response.data ? response.data : [] as unknown as Ingredient[];
    return data;
  },
});

