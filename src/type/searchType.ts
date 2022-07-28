export type Pageable = {
  page: number;
  size: number;
  query: string;
};

export type SearchContent = {
  boardId: number;
  title: string;
  nickname: string;
  userImg: string;
  goodCount: number;
  commentCount: number;
  mainImg: string;
  createdAt: string;
  modifiedAt: string;
};
