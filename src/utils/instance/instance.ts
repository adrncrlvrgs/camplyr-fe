import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

const getToken = () => Cookies.get("token");

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  if (getToken) request.headers.Authorization = `Bearer ${getToken()}`;

  return request;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function api<T = any>(
  method: RequestMethod,
  url: string,
  data?: any,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const _options: AxiosRequestConfig = {
    method,
    url,
    ...options,
  };

  if (method === "GET") _options.params = data;
  else _options.data = data;

  const response: T = await instance(_options);

  return response;
}

export default instance;
