import { axiosInstance } from "./axiosInstance";

export const registerRecipe = async () => {
  try {
    const res = await axiosInstance.post(``, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
