import { atom } from 'recoil';

export const searchQuery = atom<any>({
  key: 'searchQuery',
  default: {
    type: '',
    query: [],
    page: '',
  },
});
