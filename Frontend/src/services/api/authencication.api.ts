import axios from "axios";

const login = (data: { email: string; password: string }) => {
  // return instance.post(ENDPOINTS.LOGIN, { ...data, deviceId: "deviceId" });
  return axios.post(
    "https://fiveglassesnews-backend.onrender.com/v1/login/local",
    {
      ...data,
      deviceId: "",
    }
  );
};

const myProfile = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.get(
    "https://fiveglassesnews-backend.onrender.com/v1/self/my-profile",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const refreshToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  return axios.put(
    "https://fiveglassesnews-backend.onrender.com/v1/refresh",
    {
      deviceId: "",
      refreshToken: refreshToken,
      type: "ACCESS_TOKEN",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const AuthApi = {
  login,
  myProfile,
  refreshToken,
};