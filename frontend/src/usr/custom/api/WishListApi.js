import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const addWishList = async (userIdx, customCno) => {
  return await axios.post(`${API_BASE_URL}/api/usr/feed/wishlist/add`, null, {
    params: { userIdx, customCno },
  });
};

export const removeWishList = async (userIdx, customCno) => {
  return await axios.delete(`${API_BASE_URL}/api/usr/feed/wishlist/remove`, {
    params: { userIdx, customCno },
  });
};

export const getWishList = async (userIdx, param) => {
  const config = {
    params: param,
  };

  const response = await axios.get(
    `${API_BASE_URL}/api/usr/feed/wishlist/${userIdx}`,
    config
  );
  return response.data;
};
