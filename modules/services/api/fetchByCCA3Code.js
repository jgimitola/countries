import { get } from '@services/http';

const fetchByCCA3Code = async (code) => {
  const response = await get(`/alpha/${code}`, {
    baseURL: process.env.API_URL,
  });

  if (response.status < 400) return response.data;

  return null;
};

export default fetchByCCA3Code;
