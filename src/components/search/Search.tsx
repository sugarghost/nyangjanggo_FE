import { getResource } from '@apis/ResourceApi';
import searchApi from '@apis/SearchApi';
import Tag from '@components/search/Tag';
import { ReactComponent as SearchIcon } from '@icon/search.svg';
import RecipeSearchIcon from '@images/recipe_search_icon.png';
import { ingredientsNameSelector } from '@recoil/ingredient';
import { searchQueryAtom, searchTypeAtom } from '@recoil/searchAtom';
import { isExist } from '@utils/jwt';
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Search = () => {
  const queryClient = useQueryClient();
  // 검색창 값 관리용 state
  const [searchValue, setSearchValue] = useState<string>('');
  // 검색창에 값이 입력되었는지 여부
  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);
  // 검색된 태그 리스트
  const [searchedTagList, setSearchedTagList] = useState([]);
  // 재료 검색을 위해 선택 된 tag list
  const [selectedTagList, setSelectedTagList] = useState([]);
  // 재료 검색이 비어있을 때 사용할 냉장고 재료 리스트
  // const ingredientsList = useRecoilValue(ingredientsNameSelector);
  const [ingredientsList, setIngredientsList] = useState([]);

  // 재료 검색, 요리 이름 검색을 전환하기 위한 state
  // 1: 재료 검색, 0: 요리 이름 검색
  const [searchType, setSearchType] = useState(1);

  // 검색 이벤트 발생 시 컴포넌트간 검색 방식을 교환하기 위한 recoil
  const [searchQueryState, setSearchQueryState] = useRecoilState(searchQueryAtom);
  const [searchTypeState, setSearchTypeState] = useRecoilState(searchTypeAtom);

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
        const resourceList = [];
        res.data.hits?.hits.map((hit) => {
          resourceList.push(hit._source.resourceName);
        });
        setSearchedTagList(resourceList);
      },
    },
  );

  useQuery(['getingredientsName'], async () => getResource(), {
    refetchOnWindowFocus: false,
    enabled: isExist(),
    onSuccess: (res) => {
      const resourceList = [];
      res.data.map((value) => resourceList.push(value.resourceName));
      setIngredientsList(resourceList);
    },
  });

  // 검색창 기능
  const changeSearchValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchValue(event.target.value);

    if (searchType) {
      if (event.target.value.length === 0) {
        setIsSearchedValue(false);
        // 나중에 냉장고 연결해서 냉장고 데이터 있으면 여기에 연결함
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
      }
    }
  };

  const onSearchResource = () => {
    if (selectedTagList.length !== 0) {
      setSearchTypeState('resource');
      setSearchQueryState({
        query: selectedTagList.join(' '),
        size: 10,
        page: 0,
      });
    }
  };

  const handleDropDownKey = (event: any) => {
    // input에 값이 있을때만 작동
    if (isSearchedValue && !searchType) {
      if (event.key === 'Enter') {
        setSearchTypeState('title');
        setSearchQueryState({
          query: searchValue,
          size: 10,
          page: 0,
        });
      }
    }
  };

  const addTags = (tag: string) => {
    if (!selectedTagList.includes(tag)) setSelectedTagList([...selectedTagList, tag]);
  };

  const removeTags = (tag: string) => {
    setSelectedTagList(selectedTagList.filter((element) => element !== tag));
  };

  useEffect(() => {
    if (ingredientsList.length !== 0) {
      setSearchedTagList(ingredientsList);
    }
  }, [ingredientsList]);

  return (
    <>
      {searchType ? (
        <>
          <div className="p-4 top-0 w-full z-100">
            <div className="flex flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                className="rounded-md flex flex-row p-1"
                style={{ background: '#EFEFF0', padding: '10px', width: '88%' }}
              >
                <SearchIcon fill="gray" className="m-1" />
                <Input type="text" value={searchValue} onChange={changeSearchValue} onKeyUp={handleDropDownKey} />
                <div className="cursor-pointer ml-auto" onClick={() => setSearchValue('')}>
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
            {ingredientsList.length === 0 && searchValue === '' ? <p>등록된 냉장고 재료가 없습니다!</p> : ''}
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
              <SearchIcon className="m-auto" fill="white" />
            </ResourceSearchButton>
          </ResourceSearchWrapper>
        </>
      ) : (
        <div className="p-4 top-0 w-full z-100">
          <div className="flex flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              className="rounded-md flex flex-row p-1"
              style={{ background: '#EFEFF0', padding: '10px', width: '88%' }}
            >
              <SearchIcon fill="gray" className="m-1" />
              <Input type="text" value={searchValue} onChange={changeSearchValue} onKeyUp={handleDropDownKey} />
              <div className="cursor-pointer ml-auto" onClick={() => setSearchValue('')}>
                &times;
              </div>
            </div>
            <div className="flex flex-col justify-center" onClick={switchSearchType}>
              <RecipeSearchIconWrapper src={RecipeSearchIcon} className="img-render" />
              <RecipeSearchTitle>이름검색</RecipeSearchTitle>
            </div>
          </div>
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
const Input = styled.input`
  width: 80%;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;
