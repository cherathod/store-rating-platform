import axios from "../config/axios";

const StoreAPI = {
  listStores: async (params = {}) => {
    const res = await axios.get("/stores", { params });
    return res.data;
  },

  getStore: async (id) => {
    const res = await axios.get(`/stores/${id}`);
    return res.data;
  },

  createStore: async (payload) => {
    const res = await axios.post("/stores", payload);
    return res.data;
  },

  updateStore: async (id, payload) => {
    const res = await axios.put(`/stores/${id}`, payload);
    return res.data;
  },
};

export default StoreAPI;
