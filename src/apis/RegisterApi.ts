import { axiosInstance } from "./axiosInstance";

export const registerRecipe = async (payload) => {
  try {
    const res = await axiosInstance.post(``, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
