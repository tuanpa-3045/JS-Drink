import { GET_PRODUCT, GET_CATEGORY } from "./constant.js";

export const getProducts = async (params) => {
  try {
    const data = await axios.get(`${GET_PRODUCT}`, {
      params,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const data = await axios.get(`${GET_CATEGORY}`).then((res) => {
      return res.data;
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
