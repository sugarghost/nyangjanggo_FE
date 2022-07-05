import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import boardPostApi from "../apis/useBoardApi";
import useIntersectionObserver from "../hook/intersectionObserver";

export type Pageable = {
  page: Number;
  size: Number;
  sort: string;
};

export type PostContent = {
  boardId: number;
  commentCount: number;
  content: string;
  createdAt: string;
  goodCount: number;
  mainImg: string;
  modifiedAt: string;
  nickname: string;
  subTitle: string;
  title: string;
  userImg: string;
};

const MainPage = () => {
  // 공통 처리
  const location = useLocation();
  const state = location.state;
  // 게시글 목록 전처리

  const [boardType, setBoardType] = useState<string>("date");
  const [axiosParam, setAxiosParam] = useState<any>({
    size: 5,
    sort: "createdAt,desc",
  });
  const [load, setLoad] = useState<boolean>(true);

  const preventRef = useRef(true);
  const obsRef = useRef(null);

  // 검색어 전처리
  const wholeTextArray = [
    "양파",
    "바나나",
    "쌀",
    "당근",
    "파",
    "대파",
    "파프리카",
    "다시마",
    "파슬리",
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);
  const [searchedList, setSearchedList] = useState(wholeTextArray);
  const [searchedItemIndex, setSearchedItemIndex] = useState(-1);

  // 게시글 목록 기능
  const chagneMode = () => {
    if (boardType == "date")
      setAxiosParam({
        page: 0,
        size: 5,
        sort: "createdAt,desc",
      });
  };
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    isIntersecting && fetchNextPage();
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const fetchPostList = async (pageParam: any) => {
    console.log("pageParam", pageParam);
    const paramTemplate = {
      page: pageParam,
      size: 5,
      sort: axiosParam.sort,
    };
    const res = await boardPostApi.getPostsByDate(paramTemplate);
    setLoad(false);
    const { content, last } = res.data;
    console.log("res", res);
    console.log("pageParam", pageParam);
    return { content, nextPage: pageParam + 1, last };
  };

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "infinitePosts",
    async ({ pageParam = 0 }) => await fetchPostList(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.last) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  // 검색창 기능
  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsSearchedValue(true);
  };

  const showSearchedList = () => {
    if (searchValue === "") {
      setIsSearchedValue(false);
      setSearchedList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(searchValue)
      );
      setSearchedList(choosenTextList);
    }
  };

  const clickDropDownItem = (clickedItem: any) => {
    setSearchValue(clickedItem);
    setIsSearchedValue(false);
  };

  const handleDropDownKey = (event: any) => {
    //input에 값이 있을때만 작동
    if (isSearchedValue) {
      if (
        event.key === "ArrowDown" &&
        searchedList.length - 1 > searchedItemIndex
      ) {
        setSearchedItemIndex(searchedItemIndex + 1);
      }

      if (event.key === "ArrowUp" && searchedItemIndex >= 0)
        setSearchedItemIndex(searchedItemIndex - 1);
      if (event.key === "Enter" && searchedItemIndex >= 0) {
        clickDropDownItem(searchedList[searchedItemIndex]);
        setSearchedItemIndex(-1);
      }
    }
  };

  useEffect(showSearchedList, [searchValue]);

  return (
    <>
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
            <div className="max-w-md mx-auto w-full">
              <div className="m-4">
                <WholeBox>
                  <InputBox>
                    <Input
                      type="text"
                      value={searchValue}
                      onChange={changeSearchValue}
                      onKeyUp={handleDropDownKey}
                    />
                    <DeleteButton onClick={() => setSearchValue("")}>
                      &times;
                    </DeleteButton>
                  </InputBox>
                  {isSearchedValue && (
                    <DropDownBox>
                      {searchedList.length === 0 && (
                        <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
                      )}
                      {searchedList.map((searchedItem, searchedIndex) => {
                        return (
                          <DropDownItem
                            key={searchedIndex}
                            onClick={() => clickDropDownItem(searchedItem)}
                            onMouseOver={() =>
                              setSearchedItemIndex(searchedIndex)
                            }
                            className={
                              searchedItemIndex === searchedIndex
                                ? "selected"
                                : ""
                            }
                          >
                            {searchedItem}
                          </DropDownItem>
                        );
                      })}
                    </DropDownBox>
                  )}
                </WholeBox>
              </div>
              <hr />
              {data?.pages?.map((page, index) => (
                <div key={index}>
                  {page.content.map((content: any) => (
                    <div className="flex my-2">
                      <img src={content.mainImg} className="w-2/5"></img>
                      <div className="w-full">
                        <p>{content.title}</p>
                        <p>{content.subTitle}</p>
                        <div className="flex">
                          <img
                            className="w-40px h-40px place-self-center rounded-full m-1"
                            src={content.userImg}
                          ></img>{" "}
                          <div>
                            <p>{content.nickname}</p>좋아요: {content.goodCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {load ? <div className="py-3 text-center">로딩 중</div> : <></>}
              <div ref={setTarget} className="py-3 text-center"></div>
              <hr />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

const activeBorderRadius = "1vw 1vw 0 0";
const inactiveBorderRadius = "1vw 1vw 1vw 1vw";

const WholeBox = styled.div`
  padding: 1vw;
  width: 90vw;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1vw;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 0.5vw 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 1vw;

  &.selected {
    background-color: lightgray;
  }
`;
export default MainPage;
