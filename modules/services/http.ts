import axios from 'axios';

const baseURL = '/api';

const requestWrapper = async (request, { url, options, data }) => {
  const config = { baseURL, ...options };

  const requestObject = await request.apply(
    this,
    data ? [url, data, config] : [url, config]
  );
  const requestData = requestObject.data;

  return { status: requestObject.status, data: requestData };
};

const get = async (url, options) => {
  try {
    return await requestWrapper(axios.get, { url, options });
  } catch (error) {
    return error.response;
  }
};

const remove = async (url, options) => {
  try {
    return await requestWrapper(axios.delete, { url, options });
  } catch (error) {
    return error.response;
  }
};

const post = async (url, data, options) => {
  try {
    return await requestWrapper(axios.post, { url, data, options });
  } catch (error) {
    return error.response;
  }
};

const put = async (url, data, options) => {
  try {
    return await requestWrapper(axios.put, { url, data, options });
  } catch (error) {
    return error.response;
  }
};

const patch = async (url, data, options) => {
  try {
    return await requestWrapper(axios.patch, { url, data, options });
  } catch (error) {
    return error.response;
  }
};

export { get, remove, post, put, patch };
