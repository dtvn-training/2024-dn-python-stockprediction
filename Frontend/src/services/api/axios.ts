import axios, { AxiosRequestConfig } from "axios";
import { AuthApi } from ".";

export const sendRequestWithTokenRefresh = async <T>(
  config: AxiosRequestConfig
): Promise<{ data: T; status: number }> => {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (error.response && error.response.status === 401) {
      try {
        const res = await AuthApi.refreshToken();
        const { access_token, refresh_token } = res.data;

        sessionStorage.setItem("accessToken", access_token);
        sessionStorage.setItem("refreshToken", refresh_token);

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${access_token}`,
        };

        const retryResponse = await axios(config);

        return retryResponse;
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        throw refreshError;
      }
    } else {
      console.error("Request failed:", error);
      throw error;
    }
  }
};