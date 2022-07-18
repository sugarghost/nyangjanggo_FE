import { atom , selector } from "recoil";

import { recoilPersist } from "recoil-persist";
import { Test } from "../interfaces/test";

// recoil-persist
// 페이지가 변경되더라도 상태관리를 유지하기 위해 Recoil-persist
const { persistAtom } = recoilPersist();

// 비동기 처리 셀렉터
export const recoilStarCountState = selector({
  key: "asyncState",
  get: async () => {
    const response = await fetch(
      "https://api.github.com/repos/facebookexperimental/Recoil"
    );
    const recoilProjectInfo:Test = await response.json();
    console.log("response", recoilProjectInfo);
    // stargazers_count 반환
    
    return recoilProjectInfo.id;
  },
});

export const increaseValueSelector = selector({
    key: "setStarCount",
    get: (opt) => opt.get(recoilStarCountState) + 1
})
