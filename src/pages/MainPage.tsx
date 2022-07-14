import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import boardPostApi from "../apis/RecipeApi";
import useIntersectionObserver from "../hook/intersectionObserver";

export type Pageable = {
  page: number;
  size: number;
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
  const navigate = useNavigate();

  // 게시글 목록 전처리

  const [boardType, setBoardType] = useState<string>("date");
  const [axiosParam, setAxiosParam] = useState<any>({
    size: 5,
    sort: "createdAt,desc",
  });

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
  // 무한 스크롤을 위해 특정 요소가 보이는지 판별하기 위한 Intersection Observer
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // 타겟이 보이는 경우 fetchNextPage를 실행해 다음 페이지 데이터를 가져옴
    isIntersecting && fetchNextPage();
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  // 서버와 통신하기 위한 axios를 실행하는 함수로, 리턴 값을 무한 스크롤에서 활용하기 위해 재가공
  const fetchPostList = async (pageParam: any) => {
    // 추후에 다른 모드(좋아요 정렬 등)를 지원 시 재 사용성을 높이기 위해 선언
    const paramTemplate = {
      page: pageParam,
      size: 5,
      sort: axiosParam.sort,
    };
    // API가 명확하지 않은 시점이라 getPostsByDate라는 함수로 호출 중
    // 나중에 API가 정리되면, 한개에 기능에 sort 를 기반으로 정렬 로직이 좀 달라질 예정
    const res = await boardPostApi.getRecipeListByDate(paramTemplate);
    const { content, last } = res.data;
    // 페이지 번호를 증가시키는 용도로 사용 될 nextPage는 기존 pageParam(페이지 넘버)에 +1을 해줌
    return { content, nextPage: pageParam + 1, last };
  };

  // 무한 스크롤을 위해 useInfiniteQuery를 사용함,
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      "infinitePosts",
      // pageParam(페이지 번호)를 파라미터로 axios 실행을 위한 fetchPostList를 실행
      // 페이지 번호는 getNextPageParam을 통해 1씩 증가하다가 마지막 도달 시 undefined로 작동을 멈춤
      async ({ pageParam = 0 }) => fetchPostList(pageParam),
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, pages) => {
          if (!lastPage.last) return lastPage.nextPage;
          return undefined;
        },
      }
    );
  console.log(data);
  // 상세 페이지 기능
  const viewRecipeDetail = (boardId: number) => {
    navigate("/recipeDetailPage", { state: { boardId } });
  };

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
    // input에 값이 있을때만 작동
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

  //
  return (
    <>
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
            <div className="mx-auto w-full">
              <div className="p-4 sticky top-0 w-100vw">
                <div className="rounded-md bg-gray-100 flex flex-row p-1vw">
                  <FontAwesomeIcon
                    className="m-1"
                    icon={faSearch}
                    color="grey"
                  />
                  <Input
                    type="text"
                    value={searchValue}
                    onChange={changeSearchValue}
                    onKeyUp={handleDropDownKey}
                  />
                  <div
                    className="cursor-pointer mr-1"
                    onClick={() => setSearchValue("")}
                  >
                    &times;
                  </div>
                </div>
                {isSearchedValue && (
                  <DropDownBox>
                    {searchedList.length === 0 && (
                      <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
                    )}
                    {searchedList.map((searchedItem, searchedIndex) => (
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
                      ))}
                  </DropDownBox>
                )}
              </div>
              <hr />
              {data?.pages?.map((page, index) => (
                <div key={index}>
                  {page.content.map((content: any, subIndex: number) => (
                    <div
                      className="flex my-2"
                      onClick={(e) => viewRecipeDetail(content.boardId)}
                      key={`${index  }_${  subIndex}`}
                    >
                      <img src={content.mainImg} className="w-2/5" />
                      <div className="w-full">
                        <p>{content.title}</p>
                        <p>{content.subTitle}</p>
                        <div className="flex">
                          <div>
                            <p>{content.nickname}</p>좋아요: {content.goodCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {isFetchingNextPage ? (
                <div className="py-3 text-center">로딩 중</div>
              ) : hasNextPage ? (
                <div ref={setTarget} className="py-3 text-center" />
              ) : (
                <></>
              )}

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
