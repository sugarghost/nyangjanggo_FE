import React, { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Button from "../components/Botton";
import InputV2 from "../components/Input";

const MainPage = ({}) => {
  useEffect(() => {}, []);
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

  const changesearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsSearchedValue(true);
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
                      onMouseOver={() => setSearchedItemIndex(searchedIndex)}
                      className={
                        searchedItemIndex === searchedIndex ? "selected" : ""
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
      </Suspense>
    </>
  );
};

const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
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
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`;
export default MainPage;
