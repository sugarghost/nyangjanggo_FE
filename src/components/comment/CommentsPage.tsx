import commentApi from '@apis/CommentApi';
import Comment from '@components/comment/Comment';
import useIntersectionObserver from '@hook/intersectionObserver';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

type CommentsPageProps = {
  boardId: number;
};
const CommentsPage = ({ boardId }: CommentsPageProps) => {
  const postCommentApi = commentApi.postComment;
  const getCommentApi = commentApi.getComment;
  const deleteCommentApi = commentApi.deleteComment;

  // comment 처리를 위한 ref
  const commentRef = useRef<HTMLInputElement>(null);

  // 무한 스크롤을 위해 특정 요소가 보이는지 판별하기 위한 Intersection Observer
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // 타겟이 보이는 경우 fetchNextPage를 실행해 다음 페이지 데이터를 가져옴
    isIntersecting && fetchNextPage();
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  // 서버와 통신하기 위한 axios를 실행하는 함수로, 리턴 값을 무한 스크롤에서 활용하기 위해 재가공
  const fetchPostList = async (pageParam: number) => {
    const paramTemplate = {
      page: pageParam,
      size: 10,
      boardId,
    };
    const res = await getCommentApi(paramTemplate);
    const { content, last } = res.data;
    // 페이지 번호를 증가시키는 용도로 사용 될 nextPage는 기존 pageParam(페이지 넘버)에 +1을 해줌
    return { content, nextPage: pageParam + 1, last: last === undefined || last === true };
  };

  // 무한 스크롤을 위해 useInfiniteQuery를 사용함,
  const {
    data: commentListData,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    remove,
  } = useInfiniteQuery('infiniteComments', async ({ pageParam = 0 }) => fetchPostList(pageParam), {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) return lastPage.nextPage;
      return undefined;
    },
  });
  const postCommentMutation = useMutation((formData: FormData) => postCommentApi(formData), {
    onSuccess: (res) => {
      refetch();
    },
    onError: (e) => {
      console.log('postCommentMutation Error:', e);
    },
  });
  const onCommentRegister = () => {
    const formData = new FormData();
    formData.append('boardId', String(boardId));
    formData.append(
      'commentRequestDto',
      new Blob(
        [
          JSON.stringify({
            content: commentRef.current.value,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    postCommentMutation.mutate(formData);
  };

  const deleteCommentMutation = useMutation((formData: FormData) => deleteCommentApi(formData), {
    onSuccess: (res) => {
      console.log('deleteCommentMutation res:', res);
      refetch();
    },
    onError: (e) => {
      console.log('deleteCommentMutation Error:', e);
    },
  });

  const onDeleteClick = (commentId: number) => {
    const formData = new FormData();
    formData.append('boardId', String(boardId));
    formData.append('commentId', String(commentId));

    deleteCommentMutation.mutate(formData);
  };

  return (
    <>
      <CommentInputWrapper className="">
        <CommentInput placeholder="코멘트를 입력해주세요" ref={commentRef} />
        <CommentRegister onClick={onCommentRegister}>등록</CommentRegister>
      </CommentInputWrapper>
      <p className="text-gray-700 text-lg my-1 font-900 text-left">코멘트</p>
      <hr />
      {commentListData?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page?.content?.map((content: any, subIndex: number) => (
            <Comment key={content.id} boardId={boardId} content={content} onClick={() => onDeleteClick(content.id)} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? (
        <div className="py-3 text-center">로딩 중</div>
      ) : hasNextPage ? (
        <div ref={setTarget} className="py-3 text-center" />
      ) : (
        <></>
      )}
    </>
  );
};

const CommentInputWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 0.375rem;
  padding: 12px;
  &:focus {
    outline: none;
  }
  margin-top: 1rem;
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

const CommentInput = styled.input`
  flex: 1 0 0;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const CommentRegister = styled.span`
  float: right;
  font-size: 16px;
  margin: auto;
`;

export default CommentsPage;
