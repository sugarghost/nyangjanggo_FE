import commentApi from '@apis/CommentApi';
import { userSelector } from '@recoil/userSelector';
import moment from 'moment';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

type CommentProps = {
  boardId: number;
  content: {
    id: number;
    nickname: string;
    userImg: string;
    comment: string;
    createAt: Date;
    modifiedAt: Date;
  };
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};
const Comment = ({ boardId, content, onClick }: CommentProps) => {
  const userInfomation = useRecoilValue(userSelector);
  const putCommentApi = commentApi.putComment;
  const createAtString = moment(content.createAt).format('YY.MM.DD');
  const modifiedAtString = moment(content.modifiedAt).format('YY.MM.DD');

  return (
    <CommentWrapper>
      <CommentHeader>
        <CommentNickname>{content.nickname}</CommentNickname>|<CommentDate>{createAtString}</CommentDate>
        {userInfomation?.nickname === content.nickname && <CommentDelete onClick={onClick}>X</CommentDelete>}
      </CommentHeader>
      <CommentContent>{content.comment}</CommentContent>
      <hr />
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  padding: 0.25rem;
`;

const CommentHeader = styled.div`
  align-items: flex-end;
  background: #ffffff;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
`;
const CommentNickname = styled.span`
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));

  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  margin-left: 0.25rem; /* 4px */
  margin-right: 0.25rem; /* 4px */
  font-weight: 900;
  text-align: left;
`;

const CommentDate = styled.span`
  color: #d9d9d9;

  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  margin-left: 0.25rem; /* 4px */
  margin-right: 0.25rem; /* 4px */
  font-weight: 300;
  text-align: left;
`;
const CommentDelete = styled.span`
  float: right;
  text-align: right;
  font-size: 16px;
  margin-right: 0.25rem; /* 4px */
  margin-left: auto;
`;

const CommentContent = styled.p`
  text-align: left;
  font-size: 16px;
  margin-left: 0.25rem; /* 4px */
  margin-right: 0.25rem; /* 4px */
`;
export default Comment;
