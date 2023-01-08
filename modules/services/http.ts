import axios, { AxiosRequestConfig } from 'axios';

const baseURL: string = '/api';

interface RequestResponse<T> {
  status: number;
  data: T | null;
}

const get = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  try {
    const requestObject = await axios.get<T>(url, { baseURL, ...options });
    const requestData = requestObject.data;

    return {
      status: requestObject.status,
      data: requestData,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return { status: err.response!.status, data: null };
    return { status: -1, data: null };
  }
};

export { get };
