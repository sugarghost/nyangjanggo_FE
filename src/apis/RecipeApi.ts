import { FieldValues } from "react-hook-form";

import { Step, StepFormData, StepFormDataWithId } from "../type/recipeType";
import { authInstance, axiosInstance } from "./axiosInstance";

const board = "/board";
const boards = "/boards";
const step = "/step";

export type ResourcePostTemplate = {
  boardId: Number;
  resourceRequestDtoList: [
    {
      resourceName: string;
      amount: string;
      category: string;
    }
  ];
};

export type Pageable = {
  page: Number;
  size: Number;
  sort: string;
};

export default {
  get() {
    return authInstance.get(board).then((res) => res.data);
  },

  async getRecipePosting() {
    const res = await authInstance.get(`${board}${step}/0`);
    return res;
  },

  async postRecipe(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/1`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async postResourceList(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/2`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async loopStep(payload: StepFormDataWithId) {
    let res;
    for await (const param of payload.boardRequestDtoStepRecipe) {
      let boardRequestDtoStepRecipe = {
        boardId: payload.boardId,
        recipeStepRequestDto: {
          stepNum: param.stepNum,
          stepContent: param.stepContent,
        },
      };

      console.log(
        `loop stepNum:${
          param.stepNum
        }, multipart: ${!!param.multipartFile}, fromServer: ${param.fromServer}`
      );
      console.log(JSON.stringify(boardRequestDtoStepRecipe, null, 2));
      const formData = new FormData();
      if (!!param.multipartFile)
        formData.append("multipartFile", param.multipartFile);
      else
        formData.append(
          "multipartFile",
          new File([], "", { type: "multipart/form-data" })
        );

      formData.append(
        "boardRequestDtoStepRecipe",
        new Blob([JSON.stringify(boardRequestDtoStepRecipe)], {
          type: "application/json",
        })
      );

      res = !param.fromServer
        ? await postStep(formData)
        : await putStep(formData);
      // 실패한 경우 break
      if (res.status !== 200) {
        console.log("status:", res.status, res.statusText);
        break;
      }
    }
    return res;
  },

  async postRegiste(payload: FormData) {
    const res = await authInstance.post(`${board}${step}/-1`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },

  async putRecipe(payload: FormData) {
    const res = await authInstance.put(`${board}${step}/1`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async putResourceList(payload: FormData) {
    const res = await authInstance.put(`${board}${step}/2`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  },
  async deleteStep(payload: FormData) {
    const res = await authInstance.delete(`${board}${step}/3`, {
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },

  async getRecipeListByDate(payload: Pageable) {
    const res = await axiosInstance.get(
      `${boards}?&page=${payload.page}&page=${payload.page}&size=${payload.size}&sort=${payload.sort}`
    );
    return res;
  },
  async getRecipeDetail(boardId: number) {
    const res = await axiosInstance.get(`${board}/${boardId}`);
    return res;
  },
  async deleteRecipe(boardId: number) {
    const res = await authInstance.delete(`${board}/${boardId}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },
};

const postStep = (payload: FormData) => {
  const res = authInstance.post(`${board}${step}/3`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

const putStep = (payload: FormData) => {
  const res = authInstance.put(`${board}${step}/3`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
