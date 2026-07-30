import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/refresh-token")
    ) {
      originalRequest._retry = true;

      try {

    const { data } = await API.post("/users/refresh-token");

    localStorage.setItem("accessToken", data.accessToken);

    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;


    return API(originalRequest);

} catch (refreshError) {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.location.href = "/login";

    return Promise.reject(refreshError);
}
    }

    return Promise.reject(error);
  }
);

export default API;