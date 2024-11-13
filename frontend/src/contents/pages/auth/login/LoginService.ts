import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "./type";
import { ROOT_API } from "../../../../components/constants/api";



const apiClient = axios.create({
    baseURL: ROOT_API,
    headers: {
      'Content-Type': 'application/json',
    }
  });

 export const login = async (username: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    return await apiClient.post('/auth/login', { username, password });
  }