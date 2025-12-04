import axios from "../config/axios";

const RatingAPI = {
  submitRating: async (storeId, score) => {
    const res = await axios.post(`/ratings/${storeId}`, { score });
    return res.data;
  },

  updateRating: async (storeId, score) => {
    const res = await axios.put(`/ratings/${storeId}`, { score });
    return res.data;
  },

  getStoreRating: async (storeId) => {
    const res = await axios.get(`/ratings/${storeId}`);
    return res.data;
  },
};

export default RatingAPI;
