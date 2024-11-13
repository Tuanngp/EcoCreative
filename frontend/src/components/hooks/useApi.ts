import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ROOT_API } from "../constants/api";

interface ApiProps {
  path: string;
  data?: any;
  method: string;
  errorTitle?: string;
  config?: AxiosRequestConfig;
}

// Tạo một instance của axios để cấu hình chung cho tất cả request
const axiosInstance = axios.create({
  baseURL: ROOT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm callApi để sử dụng chung
const callApi = async ({path, data, method, errorTitle = "Error", config}: ApiProps) => {
  let response: AxiosResponse;
  try {
    switch (method.toUpperCase()) {
      case "GET":
        response = await axiosInstance.get(path);
        break;
      case "POST":
        response = await axiosInstance.post(path, data, config);
        break;
      case "PUT":
        response = await axiosInstance.put(path, data, config);
        break;
      case "DELETE":
        response = await axiosInstance.delete(path);
        break;
      default:
        throw new Error("Method not supported");
    }
    return response;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error(errorTitle);
    }
  }
};
// Hàm callApi để sử dụng chung
// const callApi = async <T>(
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
//   data?: any,
//   config: AxiosRequestConfig = {}
// ): Promise<AxiosResponse<T>> => {
//   try {
//     // Tạo cấu hình cho request
//     const requestConfig: AxiosRequestConfig = {
//       url: endpoint,
//       method: method,
//       data: data,
//       ...config, // Bao gồm các config tùy chọn khác như headers
//     };

//     // Gọi API và trả về kết quả
//     const response = await axiosInstance.request<T>(requestConfig);
//     return response;
//   } catch (error: any) {
//     // Xử lý lỗi từ API (ví dụ: 401 Unauthorized, 500 Internal Server Error)
//     if (error.response) {
//       // Lỗi từ server, trả về response lỗi
//       throw error.response;
//     } else {
//       // Lỗi không kết nối được với server hoặc lỗi không xác định
//       throw new Error("An unexpected error occurred");
//     }
//   }
// };

// const UseApi = async ({path, data, method, errorTitle = "Error", config}: ApiProps): Promise<any> => {
//   const response = await callApi({path, data, method, errorTitle, config});
//   return response;
// }

// Hàm để thêm token vào axiosInstance sau khi đăng nhập
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export { axiosInstance, callApi };