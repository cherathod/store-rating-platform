import axiosClient from "./axiosClient";

const authAPI = {
  register: (data) =>
    axiosClient.post("/auth/register", data, {
      headers: { "Content-Type": "application/json" },
    }),

  login: (data) =>
    axiosClient.post("/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    }),

  getProfile: () => axiosClient.get("/auth/profile"),

  updatePassword: (data) =>
    axiosClient.put("/auth/password", data, {
      headers: { "Content-Type": "application/json" },
    }),
};

export default authAPI;
