import { atom } from 'recoil';

export const searchQueryAtom = atom<any>({
  key: 'searchQuery',
  default: {
    query: '',
    size: 10,
    page: 0,
  },
});
export const searchTypeAtom = atom<any>({
  key: 'searchType',
  default: '',
});
