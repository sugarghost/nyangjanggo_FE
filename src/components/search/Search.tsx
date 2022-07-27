import searchApi from '@apis/SearchApi';
import Tag from '@components/search/Tag';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as ResourceSearchIcon } from '@icon/search.svg';
import RecipeSearchIcon from '@images/recipe_search_icon.png';
import { ingredientsNameSelector } from '@recoil/ingredient';
import { searchQuery } from '@recoil/searchAtom';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Search = () => {
  // 검색어 전처리
  const wholeTextArray = ['양파', '바나나', '쌀', '당근', '파', '대파', '파프리카', '다시마', '파슬리'];
  // 검색창 값 관리용 state
  const [searchValue, setSearchValue] = useState<string>('');
  // 검색창에 값이 입력되었는지 여부
  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);
  // 검색된 태그 리스트
  const [searchedTagList, setSearchedTagList] = useState([]);
  // 재료 검색을 위해 선택 된 tag list
  const [selectedTagList, setSelectedTagList] = useState([]);
  // 재료 검색이 비어있을 때 사용할 냉장고 재료 리스트
  const ingredientsList = useRecoilValue(ingredientsNameSelector);

  // 요리이름 검색된 결과들 리스트
  const [searchedList, setSearchedList] = useState(wholeTextArray);
  const [searchedItemIndex, setSearchedItemIndex] = useState(-1);

  // 재료 검색, 요리 이름 검색을 전환하기 위한 state
  // 1: 재료 검색, 0: 요리 이름 검색
  const [searchType, setSearchType] = useState(1);

  // 검색 이벤트 발생 시 컴포넌트간 검색 방식을 교환하기 위한 recoil
  const [searchQueryState, setSearchQueryState] = useRecoilState(searchQuery);

  const switchSearchType = () => {
    setSearchValue('');
    setIsSearchedValue(false);
    if (searchType) setSearchType(0);
    else setSearchType(1);
  };

  const { data: resourceRecommendData, refetch: resourceRecommendRefetch } = useQuery(
    ['getResourceRecommend'],
    async () => searchApi.getResourceRecommend(searchValue),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (res) => {
        console.log('getResourceRecommend', res);
        setSearchedTagList(res.data.resourceRecommendList);
      },
    },
  );

  const { data: titleRecommendData, refetch: titleRecommendRefetch } = useQuery(
    ['getTitleRecommend'],
    async () => searchApi.getTitleRecommend(searchValue),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (res) => {
        console.log('getTitleRecommend', res);
        setSearchedList(res.data.titleRecommendList);
      },
    },
  );

  // 검색창 기능
  const changeSearchValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchValue(event.target.value);

    if (searchType) {
      if (event.target.value.length === 0) {
        setIsSearchedValue(false);
        // 나중에 냉장고 연결해서 냉장고 데이터 있으면 여기에 연결함
        console.log('ingredientsList :', ingredientsList);
        setSearchedTagList(ingredientsList);
      } else {
        setIsSearchedValue(true);
        // 검색어가 변화하면 재료 추천 태그들을 가져와 searchedTagList에 넣어줌
        await resourceRecommendRefetch();
      }
    } else if (searchType === 0) {
      if (event.target.value.length === 0) {
        setIsSearchedValue(false);
      } else {
        setIsSearchedValue(true);
        // 검색어가 변화하면 요리 추천 목록을 가져와 searchedList에 넣어줌
        await titleRecommendRefetch();
      }
    }
  };

  const onSearchResource = () => {
    setSearchQueryState({
      type: 'resource',
      query: selectedTagList.join(),
      size: 10,
      page: 0,
    });
  };

  // 요리 이름 검색시 아래로 검색 목록이 나옴
  const showSearchedList = () => {
    if (searchValue === '') {
      setIsSearchedValue(false);
      setSearchedList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) => textItem.includes(searchValue));
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
      if (event.key === 'ArrowDown' && searchedList.length - 1 > searchedItemIndex) {
        setSearchedItemIndex(searchedItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && searchedItemIndex >= 0) setSearchedItemIndex(searchedItemIndex - 1);
      if (event.key === 'Enter' && searchedItemIndex >= 0) {
        console.log('enter');
        clickDropDownItem(searchedList[searchedItemIndex]);
        setSearchedItemIndex(-1);
      }
    }
  };

  useEffect(showSearchedList, [searchValue]);

  const addTags = (tag: string) => {
    if (!selectedTagList.includes(tag)) setSelectedTagList([...selectedTagList, tag]);
  };

  const removeTags = (tag: string) => {
    setSelectedTagList(selectedTagList.filter((element) => element !== tag));
  };
  return (
    <>
      {searchType ? (
        <>
          <div className="p-4 top-0 w-100vw z-100">
            <div className="flex flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                className="rounded-md flex flex-row p-1vw"
                style={{ background: '#EFEFF0', padding: '10px', width: '88%' }}
              >
                <FontAwesomeIcon className="m-1" icon={faSearch} color="grey" />
                <Input type="text" value={searchValue} onChange={changeSearchValue} onKeyUp={handleDropDownKey} />
                <div className="cursor-pointer mr-1" onClick={() => setSearchValue('')}>
                  &times;
                </div>
              </div>
              <div className="flex flex-col justify-center border-main" onClick={switchSearchType}>
                <RecipeSearchIconWrapper src={RecipeSearchIcon} className="img-render" />
                <RecipeSearchTitle>재료검색</RecipeSearchTitle>
              </div>
            </div>
            {/* <TagTitle>{isSearchedValue ? '추천 재료' : 'MY 냉장고'}</TagTitle> */}
          </div>

          <SearchedBox>
            {searchedTagList.map((tags: string, index: number) =>
              !selectedTagList.includes(tags) ? (
                <Tag key={index} tag={tags} onClick={() => addTags(tags)} bgColor="bg-box" />
              ) : (
                ''
              ),
            )}
          </SearchedBox>

          <ResourceSearchWrapper>
            {selectedTagList.map((tags: string, index: number) => (
              <Tag key={index} tag={tags} onClick={() => removeTags(tags)} bgColor="bg-white" isCancle />
            ))}
            <ResourceSearchButton
              className={selectedTagList.length === 0 ? 'bg-empty' : 'bg-main'}
              onClick={onSearchResource}
            >
              <ResourceSearchIcon className="m-auto" fill="white" />
            </ResourceSearchButton>
          </ResourceSearchWrapper>
        </>
      ) : (
        <div className="p-4 top-0 w-100vw z-100">
          <div className="flex flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              className="rounded-md flex flex-row p-1vw"
              style={{ background: '#EFEFF0', padding: '10px', width: '88%' }}
            >
              <FontAwesomeIcon className="m-1" icon={faSearch} color="grey" />
              <Input type="text" value={searchValue} onChange={changeSearchValue} onKeyUp={handleDropDownKey} />
              <div className="cursor-pointer mr-1" onClick={() => setSearchValue('')}>
                &times;
              </div>
            </div>
            <div className="flex flex-col justify-center" onClick={switchSearchType}>
              <RecipeSearchIconWrapper src={RecipeSearchIcon} className="img-render" />
              <RecipeSearchTitle>이름검색</RecipeSearchTitle>
            </div>
          </div>
          {isSearchedValue && (
            <DropDownBox>
              {searchedList.length === 0 && <DropDownItem>해당하는 단어가 없습니다</DropDownItem>}
              {searchedList.map((searchedItem, searchedIndex) => (
                <DropDownItem
                  key={searchedIndex}
                  onClick={() => clickDropDownItem(searchedItem)}
                  onMouseOver={() => setSearchedItemIndex(searchedIndex)}
                  className={searchedItemIndex === searchedIndex ? 'selected' : ''}
                >
                  {searchedItem}
                </DropDownItem>
              ))}
            </DropDownBox>
          )}
        </div>
      )}
    </>
  );
};

export default Search;

const RecipeSearchIconWrapper = styled.img`
  width: 20px;
  height: 14px;
  margin: 0 auto;
`;

const RecipeSearchTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  /* Main */
  color: #eb3120;
  margin: 5px auto 0 auto;
`;
const TagTitle = styled.div`
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-family: 'NEXON Lv2 Gothic';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #eb3120;
`;

const ResourceSearchWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  background-color: rgba(239, 239, 240, 1);
  border-width: 2px;
  padding: 1rem;
  margin: 0.75rem;
  min-height: 10vh;
`;
const ResourceSearchButton = styled.button`
  position: absolute;
  border-radius: 0.5rem;
  width: 50px;
  height: 50px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const SearchedBox = styled.div`
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  border-radius: 1rem;
`;
const TagBox = styled.div`
  font-family: 'NEXON Lv2 Gothic';
  font-style: normal;
  border-radius: 1rem;
  --tw-border-opacity: 1;
  border-color: rgba(217, 217, 217, var(--tw-border-opacity));
  border-width: 2px;
  padding: 1rem;
`;
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
