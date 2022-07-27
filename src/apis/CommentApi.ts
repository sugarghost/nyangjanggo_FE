import { Pageable } from '@type/commentType';
import { FieldValues } from 'react-hook-form';

import { authInstance, axiosInstance } from './axiosInstance';

const comments = '/comments';
const comment = '/comment';
const board = '/board';

export default {
  async getComment(payload: Pageable) {
    const res = await axiosInstance.get(
      `${board}/${payload.boardId}${comments}?&page=${payload.page}&size=${payload.size}&sort=createdAt,desc`,
    );
    return res;
  },
  async postComment(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const res = await authInstance.post(`${board}/${boardId}${comment}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },
  async putComment(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const commentId = payload.get('commentId');
    payload.delete('commentId');
    const res = await authInstance.put(`${board}/${boardId}${comment}/${commentId}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  },

  async deleteComment(payload: FormData) {
    const boardId = payload.get('boardId');
    payload.delete('boardId');
    const commentId = payload.get('commentId');
    payload.delete('commentId');
    const res = await authInstance.delete(`${board}/${boardId}${comment}/${commentId}`);
    return res;
  },
};
